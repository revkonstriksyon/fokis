import { AdminLayout } from "@/components/admin/admin-layout";
import { DashboardStats } from "@/components/admin/dashboard/stats";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Rezime aktivite ak estatistik platfòm nan.
          </p>
        </div>
        
        <DashboardStats />
        
        {/* TODO: Add additional dashboard components like:
          - Recent activity feed
          - Content moderation queue
          - System alerts/notifications
        */}
      </div>
    </AdminLayout>
  );
}
