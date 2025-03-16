import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Category } from "@shared/schema";
import { Link } from "wouter";

export function Sidebar() {
  const { data: categories } = useQuery<Category[]>({ 
    queryKey: ["/api/categories"]
  });

  return (
    <div className="pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Categories
          </h2>
          <ScrollArea className="h-[300px] px-2">
            <div className="space-y-1">
              {categories?.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={`/category/${category.slug}`}>
                    {category.name}
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
