import { User } from "@supabase/supabase-js";
import { DashboardCards } from "@/components/dashboard/DashboardCards";

interface DashboardHomeProps {
  user: User | null;
}

export const DashboardHome = ({ user }: DashboardHomeProps) => {
  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || "User";

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome, {displayName}
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your trading signals and account settings from your dashboard
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <DashboardCards />
      </div>
    </div>
  );
};