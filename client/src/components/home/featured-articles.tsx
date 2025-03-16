import { useQuery } from "@tanstack/react-query";
import { Article } from "@shared/schema";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Loader2 } from "lucide-react";

export function FeaturedArticles() {
  const { t } = useLanguage();
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
    queryFn: async () => {
      const res = await fetch("/api/articles?limit=3");
      if (!res.ok) throw new Error("Failed to fetch featured articles");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Aktualite Trending</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {articles?.map((article) => (
          <Link key={article.id} href={`/article/${article.id}`}>
            <Card className="h-full hover:bg-accent transition-colors">
              {article.imageUrl && (
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={article.imageUrl}
                    alt={t(article.title)}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="line-clamp-2">{t(article.title)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {t(article.summary)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
