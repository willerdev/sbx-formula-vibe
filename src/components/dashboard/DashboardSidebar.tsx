import { 
  LayoutDashboard, 
  CreditCard, 
  Home, 
  Users, 
  TrendingUp,
  Mail,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";
import logoTransparent from "@/assets/logo-transparent.png";

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

const menuItems = [
  {
    title: "MENU",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
      { icon: TrendingUp, label: "Trading Signals", path: "/dashboard/signals" },
      { icon: CreditCard, label: "My Subscription", path: "/dashboard/subscription" }
    ]
  },
  {
    title: "ACCOUNT", 
    items: [
      { icon: Users, label: "Profile Settings", path: "/dashboard/profile" }
    ]
  },
  {
    title: "SUPPORT",
    items: [
      { 
        icon: Mail, 
        label: "Email Support", 
        path: "mailto:dominic.rwego@gmail.com",
        external: true,
        description: "dominic.rwego@gmail.com"
      },
      { 
        icon: Phone, 
        label: "Call Support", 
        path: "tel:+250788974179",
        external: true,
        description: "+250 788 974 179"
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

export const DashboardSidebar = ({ isOpen = true, onClose, isMobile = false }: DashboardSidebarProps) => {
  const location = useLocation();

  const handleNavClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <div className={cn(
      "bg-sidebar border-r border-sidebar-border flex flex-col h-full transition-transform duration-300 ease-in-out",
      isMobile 
        ? cn(
            "fixed left-0 top-0 z-50 w-80",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )
        : "w-72 relative"
    )}>
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <img 
          src={logoTransparent} 
          alt="Savii Banks FX Group Logo" 
          className="h-20 w-auto object-contain"
        />
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
                      <a key={itemIndex} href={item.path} onClick={handleNavClick} className="block">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm p-3 h-auto"
                        >
                          <div className="flex items-center space-x-3 w-full">
                            <div className="flex-shrink-0">
                              <item.icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="font-medium">{item.label}</div>
                              {item.description && (
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </Button>
                      </a>
                    );
                  }
                  return (
                    <NavLink key={itemIndex} to={item.path} onClick={handleNavClick}>
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
                  <NavLink key={itemIndex} to={item.path} onClick={handleNavClick}>
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