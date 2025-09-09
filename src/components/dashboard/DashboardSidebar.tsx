import { 
  LayoutDashboard, 
  CreditCard, 
  Home, 
  Users, 
  TrendingUp,
  Bell,
  Mail,
  Phone,
  LogOut,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Separator } from "@/components/ui/separator";

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

export const DashboardSidebar = ({ isOpen = true, onClose, isMobile = false }: DashboardSidebarProps) => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleNavClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    if (isMobile && onClose) {
      onClose();
    }
  };

  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || "User";
  const userInitials = displayName.charAt(0).toUpperCase();

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
      <div className="p-6 border-b border-sidebar-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-primary-foreground font-bold text-sm">SBX</span>
          </div>
          <div>
            <span className="font-bold text-foreground text-lg">SAVII BANKS FX</span>
            <p className="text-xs text-muted-foreground">Professional Trading</p>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-sidebar-border bg-card/50">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10 border-2 border-primary/20">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground text-sm truncate">{displayName}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Separator className="my-3" />
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sign Out
        </Button>
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
                       <a key={itemIndex} href={item.path} onClick={handleNavClick}>
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