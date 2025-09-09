import { User } from "@supabase/supabase-js";
import { DashboardCards } from "@/components/dashboard/DashboardCards";

interface DashboardHomeProps {
  user: User | null;
  isMobile?: boolean;
}

export const DashboardHome = ({ user, isMobile = false }: DashboardHomeProps) => {
  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || "User";

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header - Different styling for mobile */}
      <div className={`border-b border-border bg-card/50 backdrop-blur-sm ${isMobile ? 'pt-2' : ''}`}>
        <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
          <h1 className={`font-bold text-foreground ${isMobile ? 'text-xl' : 'text-3xl'}`}>
            Welcome, {displayName}
          </h1>
          <p className={`text-muted-foreground ${isMobile ? 'mt-1 text-sm' : 'mt-2'}`}>
            Manage your trading signals and account settings from your dashboard
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto ${isMobile ? 'p-4' : 'p-6'}`}>
        <DashboardCards />
      </div>
    </div>
  );
};