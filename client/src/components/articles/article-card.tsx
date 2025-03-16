import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Article } from "@shared/schema";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";

export function ArticleCard({ article }: { article: Article }) {
  const { t } = useLanguage();

  return (
    <Link href={`/article/${article.id}`}>
      <Card className="hover:bg-accent cursor-pointer">
        {article.imageUrl && (
          <div className="aspect-video relative overflow-hidden rounded-t-lg">
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
  );
}
