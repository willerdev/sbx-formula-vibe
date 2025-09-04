import { 
  LayoutDashboard, 
  CreditCard, 
  History, 
  Settings, 
  Home, 
  Users, 
  Facebook,
  Banknote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "MENU",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", active: true },
      { icon: CreditCard, label: "My Subscription" },
      { icon: History, label: "Transaction History" },
      { icon: Banknote, label: "Services" },
      { icon: Settings, label: "Account Setting" }
    ]
  },
  {
    title: "RETURN TO",
    items: [
      { icon: Home, label: "Home Website" },
      { icon: Users, label: "Account Management" }
    ]
  },
  {
    title: "SOCIAL MEDIA",
    items: [
      { icon: Facebook, label: "Facebook" }
    ]
  }
];

export const DashboardSidebar = () => {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">SFX</span>
          </div>
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
              {section.items.map((item, itemIndex) => (
                <Button
                  key={itemIndex}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    item.active && "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};