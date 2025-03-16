import { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { 
  BarChart3, 
  Users, 
  FileText, 
  Bell, 
  Globe, 
  BarChart, 
  Megaphone,
  Shield 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: BarChart3,
  },
  {
    title: "Jesyon Itilizatè",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Kontni",
    href: "/admin/content",
    icon: FileText,
  },
  {
    title: "Notifikasyon",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    title: "Tradiksyon",
    href: "/admin/translations",
    icon: Globe,
  },
  {
    title: "Analitik",
    href: "/admin/analytics",
    icon: BarChart,
  },
  {
    title: "Jesyon Anons",
    href: "/admin/ads",
    icon: Megaphone,
  },
  {
    title: "Sekirite",
    href: "/admin/security",
    icon: Shield,
  },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container grid grid-cols-[240px_1fr] gap-12 py-8">
        <aside className="space-y-6">
          <nav className="space-y-1">
            {adminNavItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                    isActive ? "bg-accent" : "transparent"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
