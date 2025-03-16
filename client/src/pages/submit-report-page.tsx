import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertArticleSchema, type InsertArticle } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Mic, Send } from "lucide-react";

export default function SubmitReportPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { language } = useLanguage();

  const form = useForm<InsertArticle>({
    resolver: zodResolver(insertArticleSchema),
    defaultValues: {
      title: { kr: "", fr: "", en: "" },
      content: { kr: "", fr: "", en: "" },
      summary: { kr: "", fr: "", en: "" },
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertArticle) => {
      const res = await apiRequest("POST", "/api/articles", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({
        title: "Siksè",
        description: "Rapò ou a resevwa. L ap revize anvan piblikasyon.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Erè",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container py-6 flex-1">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Soumèt Rapò</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-8">
              <Button variant="outline" className="flex-1">
                <Camera className="h-5 w-5 mr-2" />
                Ajoute Foto
              </Button>
              <Button variant="outline" className="flex-1">
                <Mic className="h-5 w-5 mr-2" />
                Anrejistre Odyo
              </Button>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name={`title.${language}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tit ({language})</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`content.${language}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kontni ({language})</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="min-h-[200px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`summary.${language}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rezime ({language})</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lyen Imaj</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  <Send className="h-5 w-5 mr-2" />
                  {mutation.isPending ? "Ap soumèt..." : "Soumèt Rapò"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
