import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  CreditCard, 
  FileText, 
  RefreshCw,
  ArrowRight
} from "lucide-react";

const dashboardCards = [
  {
    icon: User,
    title: "Personal Info",
    description: "Edit your username and update your password on our user system.",
    buttonText: "Manage Your Account",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500"
  },
  {
    icon: CreditCard,
    title: "Pricing",
    description: "View our services and pricing for each service.",
    buttonText: "Services",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500"
  },
  {
    icon: FileText,
    title: "Billing History",
    description: "Check out all your payment history. You can also save or print your invoice.",
    buttonText: "Payment History",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500"
  },
  {
    icon: RefreshCw,
    title: "Subscriptions",
    description: "Create and manage your subscriptions.",
    buttonText: "Manage Subscription",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500"
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
                <Button 
                  variant="ghost" 
                  className="text-primary hover:text-primary-foreground hover:bg-primary p-0 h-auto font-medium group-hover:translate-x-1 transition-transform duration-300"
                >
                  {card.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};