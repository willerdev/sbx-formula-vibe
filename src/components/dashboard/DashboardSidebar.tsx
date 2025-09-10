import { 
  LayoutDashboard, 
  CreditCard, 
  Home, 
  Users, 
  TrendingUp,
  Bell,
  Mail,
  Phone,
  User,
  LogOut,
  ChevronDown,
  Info,
  MessageCircle,
  BookOpen,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      { icon: Users, label: "Manage Profile", path: "/dashboard/profile" }
    ]
  },
  {
    title: "NAVIGATION",
    items: [
      { 
        icon: Info, 
        label: "About Us", 
        path: "/#about",
        external: true,
        description: "Learn about our services"
      },
      { 
        icon: TrendingUp, 
        label: "Signals", 
        path: "/#signals",
        external: true,
        description: "View trading signals"
      },
      { 
        icon: BookOpen, 
        label: "Mentorship", 
        path: "/#mentorship",
        external: true,
        description: "Join our mentorship program"
      },
      { 
        icon: MessageCircle, 
        label: "FAQs", 
        path: "/#faqs",
        external: true,
        description: "Frequently asked questions"
      },
      { 
        icon: FileText, 
        label: "Register", 
        path: "/#register",
        external: true,
        description: "Register for services"
      }
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
  const { user, signOut } = useAuth();

  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || "User";
  const userEmail = user?.email || "";

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
      {/* Logo & User Profile */}
      <div className="p-6 border-b border-sidebar-border space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">SBX</span>
          </div>
          <span className="font-semibold text-foreground text-sm">SAVII BANKS FX</span>
        </div>
        
        {/* User Profile with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between p-3 h-auto bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground text-sm">{displayName}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[120px]">{userEmail}</p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 bg-card border border-border shadow-lg">
            <DropdownMenuItem onClick={() => window.location.href = "/dashboard/profile"}>
              <User className="w-4 h-4 mr-2" />
              Manage Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signOut} className="text-red-600 focus:text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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