import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router-dom";
import { 
  User, 
  CreditCard, 
  FileText, 
  RefreshCw,
  ArrowRight,
  TrendingUp,
  Star,
  Target,
  Award,
  Bell
} from "lucide-react";

const dashboardCards = [
  {
    icon: TrendingUp,
    title: "Trading Signals",
    description: "Access real-time forex trading signals and market analysis from our expert team with detailed entry and exit points.",
    buttonText: "View Live Signals",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    link: "/dashboard/signals",
    gradientBg: "bg-gradient-to-br from-card to-primary/5",
    buttonVariant: "default",
    buttonClassName: "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70",
    badge: {
      variant: "outline",
      className: "bg-primary/10 text-primary border-primary/30",
      text: "5 New"
    },
    stats: [
      { label: "Active Signals", value: "5", className: "text-primary bg-primary/10 px-2 py-1 rounded" },
      { label: "Win Rate", value: "87%", className: "text-green-600 bg-green-100 px-2 py-1 rounded" },
      { label: "Last Signal", value: "2h ago", className: "text-blue-600" }
    ]
  },
  {
    icon: CreditCard,
    title: "Premium Plan",
    description: "Manage your subscription plan, billing information, and access exclusive premium features.",
    buttonText: "Manage Subscription",
    iconBg: "bg-accent/20",
    iconColor: "text-accent-foreground",
    link: "/dashboard/subscription",
    gradientBg: "bg-gradient-to-br from-card to-accent/5",
    buttonVariant: "secondary",
    buttonClassName: "hover:bg-accent/10",
    badge: {
      variant: "default",
      className: "bg-green-500 text-white border-0",
      text: "Active"
    },
    stats: [
      { label: "Current Plan", value: "Premium VIP", className: "text-accent-foreground bg-accent/10 px-2 py-1 rounded" },
      { label: "Renewal Date", value: "Dec 15, 2024", className: "font-semibold" },
      { label: "Status", value: "Auto-Renew", className: "text-green-600 bg-green-100 px-2 py-1 rounded" }
    ]
  },
  {
    icon: User,
    title: "Account Settings",
    description: "Update your personal information, security settings, and customize your trading preferences.",
    buttonText: "Complete Profile",
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary-foreground",
    link: "/dashboard/profile",
    gradientBg: "bg-gradient-to-br from-card to-secondary/5",
    buttonVariant: "outline",
    buttonClassName: "hover:bg-secondary/10",
    badge: {
      variant: "outline",
      className: "bg-blue-50 text-blue-700 border-blue-200",
      text: "85% Complete"
    },
    stats: [
      { label: "Profile Status", value: "85% Complete", className: "text-blue-600 bg-blue-100 px-2 py-1 rounded" },
      { label: "Security", value: "Verified", className: "text-green-600 bg-green-100 px-2 py-1 rounded" },
      { label: "2FA", value: "Setup Required", className: "text-orange-600 bg-orange-100 px-2 py-1 rounded" }
    ]
  },
  {
    icon: FileText,
    title: "Transaction History",
    description: "Track your payment history, invoices, and billing information with detailed records.",
    buttonText: "View History",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
    link: "/dashboard/transactions",
    gradientBg: "bg-gradient-to-br from-card to-orange-50/50",
    buttonVariant: "outline",
    buttonClassName: "hover:bg-orange-50",
    badge: {
      variant: "secondary",
      className: "bg-orange-100 text-orange-700",
      text: "Recent"
    },
    stats: [
      { label: "Last Payment", value: "$99.00", className: "text-green-600 bg-green-100 px-2 py-1 rounded" },
      { label: "Payment Method", value: "Visa ****1234", className: "font-semibold" },
      { label: "Next Billing", value: "Dec 15", className: "text-orange-600 bg-orange-100 px-2 py-1 rounded" }
    ]
  }
];

export const DashboardCards = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-center space-x-3">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Signals</p>
              <p className="text-2xl font-bold text-primary">12</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-200">
          <CardContent className="p-4 flex items-center space-x-3">
            <div className="bg-green-500/20 p-2 rounded-lg">
              <Award className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold text-green-600">87.5%</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="p-4 flex items-center space-x-3">
            <div className="bg-accent/20 p-2 rounded-lg">
              <Star className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Member Level</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-accent-foreground">Premium</p>
                <Badge variant="secondary" className="text-xs">VIP</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl">
        {dashboardCards.map((card, index) => (
          <Card key={index} className={`gradient-card border-border/20 hover:border-primary/20 transition-all duration-300 group hover:shadow-xl ${card.gradientBg}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${card.iconBg}`}>
                  <card.icon className={`h-8 w-8 ${card.iconColor}`} />
                </div>
                {card.badge && (
                  <Badge variant={card.badge.variant as any} className={card.badge.className}>
                    {card.badge.text}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-2 text-xl">{card.title}</CardTitle>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {card.description}
              </p>
              {card.stats && (
                <div className="space-y-3 mb-4 p-3 bg-background/50 rounded-lg">
                  {card.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{stat.label}:</span>
                      <span className={`font-semibold ${stat.className}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              )}
              <NavLink to={card.link}>
                <Button 
                  variant={card.buttonVariant as any}
                  className={`w-full group ${card.buttonClassName}`}
                >
                  {card.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </NavLink>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};