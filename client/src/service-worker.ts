/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'fokis-cache-v1';
const OFFLINE_URL = '/offline.html';

// Assets to cache
const ASSETS_TO_CACHE = [
  '/',
  '/offline.html',
  '/index.html',
  '/src/index.css',
  '/src/main.tsx',
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // Cache core assets
      await cache.addAll(ASSETS_TO_CACHE);
      // Cache offline page
      const offlineResponse = new Response(
        '<html><head><title>Offline</title></head><body><h1>Offline</h1><p>You are currently offline. Please check your internet connection.</p></body></html>',
        {
          headers: { 'Content-Type': 'text/html' },
        }
      );
      await cache.put(OFFLINE_URL, offlineResponse);
    })()
  );
  // Force waiting service worker to become active
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Get all cache keys
      const cacheKeys = await caches.keys();
      // Delete old caches
      await Promise.all(
        cacheKeys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })()
  );
  // Take control of all pages under this service worker's scope
  self.clients.claim();
});

// Fetch event - network first, falling back to cache
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Handle API requests differently
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      (async () => {
        try {
          // Try network first for API requests
          const response = await fetch(event.request);
          if (response.ok) {
            // Cache successful API responses
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, response.clone());
            return response;
          }
          throw new Error('Network response was not ok');
        } catch (error) {
          // If network fails, try cache
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // If cache fails, return a generic error response
          return new Response(
            JSON.stringify({ error: 'Network request failed' }),
            {
              status: 503,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
      })()
    );
    return;
  }

  // For non-API requests, try network first then cache
  event.respondWith(
    (async () => {
      try {
        // Try network first
        const response = await fetch(event.request);
        if (response.ok) {
          // Cache successful responses
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, response.clone());
          return response;
        }
        throw new Error('Network response was not ok');
      } catch (error) {
        // If network fails, try cache
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        // If cache fails, return offline page
        return caches.match(OFFLINE_URL) as Promise<Response>;
      }
    })()
  );
});

// Handle background sync for pending posts
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-articles') {
    event.waitUntil(syncArticles());
  }
});

// Sync pending articles
async function syncArticles() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const pendingArticles = await cache.match('pending-articles');
    if (!pendingArticles) return;

    const articles = await pendingArticles.json();
    await Promise.all(
      articles.map(async (article: any) => {
        try {
          await fetch('/api/articles', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(article),
          });
        } catch (error) {
          console.error('Failed to sync article:', error);
        }
      })
    );

    // Clear pending articles after successful sync
    await cache.delete('pending-articles');
  } catch (error) {
    console.error('Failed to sync articles:', error);
  }
}
