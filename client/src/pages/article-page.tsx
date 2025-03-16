import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Article } from "@shared/schema";
import { Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function ArticlePage() {
  const { id } = useParams();
  const { t } = useLanguage();
  
  const { data: article, isLoading } = useQuery<Article>({
    queryKey: ["/api/articles", id],
    queryFn: async () => {
      const res = await fetch(`/api/articles/${id}`);
      if (!res.ok) throw new Error("Failed to fetch article");
      return res.json();
    },
  });

  const handleDownload = async () => {
    // TODO: Implement offline storage using IndexedDB/LocalStorage
    console.log("Download for offline reading");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Atik la pa disponib.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container py-6 flex-1">
        <article className="prose prose-lg mx-auto">
          {article.imageUrl && (
            <img
              src={article.imageUrl}
              alt={t(article.title)}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
          
          <h1 className="mt-8">{t(article.title)}</h1>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-8">
            <time dateTime={article.createdAt.toString()}>
              {format(new Date(article.createdAt), "PP")}
            </time>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Li Offline
            </Button>
          </div>

          <div className="whitespace-pre-wrap">{t(article.content)}</div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
