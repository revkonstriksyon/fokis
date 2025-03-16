import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ArticleCard } from "@/components/articles/article-card";
import { Loader2 } from "lucide-react";
import { Article } from "@shared/schema";

export default function CategoryPage() {
  const { slug } = useParams();
  
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles", "category", slug],
    queryFn: async () => {
      const res = await fetch(`/api/articles?category=${slug}`);
      if (!res.ok) throw new Error("Failed to fetch articles");
      return res.json();
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container py-6 flex-1">
        <h1 className="text-3xl font-bold mb-8 capitalize">{slug?.replace("-", " ")}</h1>
        
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : articles?.length === 0 ? (
          <p>Pa gen atik nan kategori sa a pou kounye a.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles?.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
