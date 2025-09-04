import { useAuth } from "@/hooks/useAuth";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardMain } from "@/components/dashboard/DashboardMain";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <DashboardSidebar />
        <DashboardMain user={user} />
      </div>
    </div>
  );
};

export default Dashboard;