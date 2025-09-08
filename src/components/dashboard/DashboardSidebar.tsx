import { 
  LayoutDashboard, 
  CreditCard, 
  Home, 
  Users, 
  TrendingUp,
  Bell,
  Mail,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "MENU",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
      { icon: TrendingUp, label: "Trading Signals", path: "/dashboard/signals" },
      { icon: CreditCard, label: "My Subscription", path: "/dashboard/subscription" },
      { icon: Bell, label: "Notifications", path: "/dashboard/notifications" }
    ]
  },
  {
    title: "ACCOUNT",
    items: [
      { icon: Users, label: "Manage Profile", path: "/dashboard/profile" }
    ]
  },
  {
    title: "SUPPORT",
    items: [
      { 
        icon: Mail, 
        label: "Email: dominic.rwego@gmail.com", 
        path: "mailto:dominic.rwego@gmail.com",
        external: true
      },
      { 
        icon: Phone, 
        label: "Phone: +250 788 974 179", 
        path: "tel:+250788974179",
        external: true
      }
    ]
  },
  {
    title: "RETURN TO",
    items: [
      { icon: Home, label: "Home Website", path: "/" }
    ]
  }
];

export const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">SBX</span>
          </div>
          <span className="font-semibold text-foreground">SAVII BANKS FX GROUP</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {menuItems.map((section, index) => (
          <div key={index}>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item, itemIndex) => {
                const isActive = location.pathname === item.path;
                const isExternal = item.path === "/" || item.external;
                
                if (isExternal) {
                  if (item.external) {
                    return (
                      <a key={itemIndex} href={item.path}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
                        >
                          <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </Button>
                      </a>
                    );
                  }
                  return (
                    <NavLink key={itemIndex} to={item.path}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      >
                        <item.icon className="mr-3 h-4 w-4" />
                        {item.label}
                      </Button>
                    </NavLink>
                  );
                }
                
                return (
                  <NavLink key={itemIndex} to={item.path}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200",
                        isActive && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                      )}
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.label}
                    </Button>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};