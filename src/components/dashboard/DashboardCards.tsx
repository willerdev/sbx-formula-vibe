import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { 
  User, 
  CreditCard, 
  FileText, 
  RefreshCw,
  ArrowRight,
  TrendingUp
} from "lucide-react";

const dashboardCards = [
  {
    icon: TrendingUp,
    title: "Trading Signals",
    description: "Access real-time forex trading signals and market analysis from our expert team.",
    buttonText: "View Signals",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    link: "/dashboard/signals"
  },
  {
    icon: User,
    title: "Profile Settings",
    description: "Update your personal information, preferences, and account details.",
    buttonText: "Manage Profile",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    link: "/dashboard/profile"
  },
  {
    icon: RefreshCw,
    title: "My Subscription",
    description: "Manage your subscription plan, billing, and upgrade options.",
    buttonText: "View Subscription",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
    link: "/dashboard/subscription"
  },
  {
    icon: FileText,
    title: "Transaction History",
    description: "Track your payment history, invoices, and billing information.",
    buttonText: "View History",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
    link: "/dashboard/transactions"
  }
];

export const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl">
      {dashboardCards.map((card, index) => (
        <Card key={index} className="gradient-card border-border/20 hover:border-primary/20 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg ${card.iconBg} flex-shrink-0`}>
                <card.icon className={`h-6 w-6 ${card.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {card.description}
                </p>
                <NavLink to={card.link}>
                  <Button 
                    variant="ghost" 
                    className="text-primary hover:text-primary-foreground hover:bg-primary p-0 h-auto font-medium group-hover:translate-x-1 transition-transform duration-300"
                  >
                    {card.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </NavLink>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};