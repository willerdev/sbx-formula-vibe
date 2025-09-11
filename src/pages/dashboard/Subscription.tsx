import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Check, Calendar, CreditCard, Bell, BookOpen, Users } from "lucide-react";
import { useOutletContext } from "react-router-dom";

interface OutletContext {
  isMobile?: boolean;
}

const plans = [
  {
    icon: <Bell className="w-8 h-8" />,
    name: "Premium Signals",
    price: "$30",
    period: "month",
    description: "Receive real-time trading signals with 98.99% accuracy using our SBX Formula. Pure price action signals for synthetic indices.",
    features: [
      "Real-time alerts",
      "98.99% accuracy", 
      "Risk management",
      "Premium signals access"
    ],
    current: true,
    popular: true
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    name: "Online Mentorship",
    price: "$120",
    period: "month", 
    description: "Learn the SBX Formula in our group mentorship program. Master price action trading for Deriv synthetic indices.",
    features: [
      "Group sessions",
      "SBX Formula training",
      "Risk management",
      "Premium signals access"
    ],
    current: false,
    popular: false
  },
  {
    icon: <Users className="w-8 h-8" />,
    name: "1-on-1 Mentorship",
    price: "$240",
    period: "month",
    description: "Get personalized trading guidance from Savii Banks. Master advanced SBX strategies with direct mentorship.",
    features: [
      "Personal mentor",
      "Market analysis", 
      "Advanced SBX strategies",
      "Risk management",
      "Premium signals access"
    ],
    current: false,
    popular: false
  }
];

export const Subscription = () => {
  const { isMobile = false } = useOutletContext<OutletContext>();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header - Mobile responsive */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className={isMobile ? 'p-4' : 'p-6'}>
          <h1 className={`font-bold text-foreground ${isMobile ? 'text-xl' : 'text-3xl'}`}>
            My Subscription
          </h1>
          <p className={`text-muted-foreground ${isMobile ? 'mt-1 text-sm' : 'mt-2'}`}>
            Manage your subscription and upgrade your plan
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto ${isMobile ? 'p-4' : 'p-6'}`}>
        {/* Current Subscription */}
        <Card className="gradient-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Crown className="h-5 w-5 mr-2 text-yellow-500" />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-foreground">Premium Signals</div>
                <div className="text-muted-foreground">$30/month</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Next billing</div>
                <div className="font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  March 15, 2024
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Payment method</div>
                <div className="font-medium flex items-center">
                  <CreditCard className="h-4 w-4 mr-1" />
                  •••• 4242
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative p-6 sm:p-8 gradient-card border-gradient transition-all duration-300 hover:scale-105 ${
              plan.popular ? 'ring-2 ring-primary glow-primary' : ''
            } ${plan.current ? 'ring-2 ring-green-500' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="gradient-primary text-primary-foreground px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-xl ${plan.popular ? 'gradient-primary text-primary-foreground' : 'bg-accent/10 text-accent'}`}>
                  {plan.icon}
                </div>
              </div>
              
              <h3 className="font-space-grotesk font-bold text-xl sm:text-2xl mb-4 text-foreground">
                {plan.name}
              </h3>
              
              <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                {plan.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                    <span className="text-sm sm:text-base text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl sm:text-3xl font-bold text-gradient-primary">
                  {plan.price}/{plan.period}
                </div>
              </div>
              
              <Button 
                className="w-full" 
                variant={plan.current ? "outline" : (plan.popular ? "hero" : "premium")}
                disabled={plan.current}
                size="sm"
              >
                {plan.current ? "Current Plan" : "Get Started"}
              </Button>
            </Card>
          ))}
        </div>

        {/* Billing History */}
        <Card className="gradient-card mt-8">
          <CardHeader>
            <CardTitle>Recent Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: "Feb 15, 2024", amount: "$30.00", status: "Paid", plan: "Premium Signals" },
                { date: "Jan 15, 2024", amount: "$30.00", status: "Paid", plan: "Premium Signals" }, 
                { date: "Dec 15, 2023", amount: "$30.00", status: "Paid", plan: "Premium Signals" }
              ].map((bill, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <div className="font-medium">{bill.plan} Plan</div>
                    <div className="text-sm text-muted-foreground">{bill.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{bill.amount}</div>
                    <Badge variant="secondary">{bill.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};