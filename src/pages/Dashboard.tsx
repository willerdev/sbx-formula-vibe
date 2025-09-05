import { useAuth } from "@/hooks/useAuth";
import { Outlet, useLocation } from "react-router-dom";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHome } from "./dashboard/DashboardHome";

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Show DashboardHome for exact /dashboard path
  const isDashboardHome = location.pathname === "/dashboard";

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {isDashboardHome ? <DashboardHome user={user} /> : <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;