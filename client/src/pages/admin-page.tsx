import { Header } from "@/components/layout/header";
import { ArticleForm } from "@/components/admin/article-form";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";

export default function AdminPage() {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container py-6">
        <h1 className="text-3xl font-bold mb-8">Content Management</h1>
        <div className="max-w-2xl">
          <ArticleForm />
        </div>
      </main>
    </div>
  );
}
