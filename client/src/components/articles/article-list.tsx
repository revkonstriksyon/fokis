import { useInfiniteQuery } from "@tanstack/react-query";
import { Article } from "@shared/schema";
import { ArticleCard } from "./article-card";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export function ArticleList() {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["/api/articles"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(`/api/articles?page=${pageParam}&limit=10`);
      if (!res.ok) throw new Error("Failed to fetch articles");
      return res.json();
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 10 ? pages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "pending") {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (status === "error") {
    return <div>Error loading articles</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.pages.map((group, i) => (
          group.map((article: Article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        ))}
      </div>
      
      <div 
        ref={ref}
        className="flex justify-center p-4"
      >
        {isFetchingNextPage && (
          <Loader2 className="h-6 w-6 animate-spin" />
        )}
      </div>
    </div>
  );
}
