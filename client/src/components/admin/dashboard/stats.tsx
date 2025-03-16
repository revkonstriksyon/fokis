import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Eye, ArrowUpRight } from "lucide-react";

const stats = [
  {
    title: "Total Itilizatè",
    value: "2,350",
    change: "+12.3%",
    icon: Users,
  },
  {
    title: "Atik Aktif",
    value: "1,203",
    change: "+8.2%",
    icon: FileText,
  },
  {
    title: "Visit Jodi a",
    value: "12.5K",
    change: "+19.4%",
    icon: Eye,
  },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              {stat.change}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
