import { useAuth } from "@/hooks/useAuth";
import { Outlet, useLocation } from "react-router-dom";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardHome } from "./dashboard/DashboardHome";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Show DashboardHome for exact /dashboard path
  const isDashboardHome = location.pathname === "/dashboard";

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Mobile Header with Menu Trigger */}
        {isMobile && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border lg:hidden">
            <div className="flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="h-10 w-10 p-0 hover:bg-primary/10"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">SBX</span>
                </div>
                <span className="font-semibold text-foreground text-sm">SAVII BANKS FX</span>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <DashboardSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          isMobile={isMobile}
        />
        
        {/* Mobile Overlay */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className={`flex-1 flex flex-col overflow-hidden ${isMobile ? 'w-full pt-16' : ''}`}>
          {!isMobile && <DashboardHeader />}
          {isDashboardHome ? <DashboardHome user={user} isMobile={isMobile} /> : (
            <div className={isMobile ? 'pt-2' : ''}>
              <Outlet context={{ isMobile }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;