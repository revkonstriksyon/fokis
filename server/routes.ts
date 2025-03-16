import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertArticleSchema, insertCategorySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Articles
  app.get("/api/articles", async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const articles = await storage.getArticles(page, limit);
    res.json(articles);
  });

  app.get("/api/articles/:id", async (req, res) => {
    const article = await storage.getArticle(parseInt(req.params.id));
    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }
    res.json(article);
  });

  app.post("/api/articles", async (req, res) => {
    if (!req.isAuthenticated() || req.user?.role !== "admin") {
      res.status(403).json({ message: "Not authorized" });
      return;
    }

    const parsed = insertArticleSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Invalid article data" });
      return;
    }

    const article = await storage.createArticle({
      ...parsed.data,
      authorId: req.user.id,
    });
    res.status(201).json(article);
  });

  // Categories
  app.get("/api/categories", async (_req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  app.post("/api/categories", async (req, res) => {
    if (!req.isAuthenticated() || req.user?.role !== "admin") {
      res.status(403).json({ message: "Not authorized" });
      return;
    }

    const parsed = insertCategorySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Invalid category data" });
      return;
    }

    const category = await storage.createCategory(parsed.data);
    res.status(201).json(category);
  });

  const httpServer = createServer(app);
  return httpServer;
}
