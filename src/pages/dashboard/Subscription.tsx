import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Check, X, Calendar, CreditCard } from "lucide-react";
import { useOutletContext } from "react-router-dom";

interface OutletContext {
  isMobile?: boolean;
}

const plans = [
  {
    name: "Basic",
    price: "$29",
    period: "month",
    features: [
      "5 signals per day",
      "Basic market analysis",
      "Email notifications",
      "Community access"
    ],
    limitations: [
      "No SMS alerts",
      "No advanced analysis"
    ],
    current: false
  },
  {
    name: "Premium",
    price: "$79",
    period: "month",
    features: [
      "15 signals per day",
      "Advanced market analysis",
      "Email & SMS notifications",
      "Priority community access",
      "Video analysis",
      "Risk management tools"
    ],
    limitations: [],
    current: true,
    popular: true
  },
  {
    name: "VIP",
    price: "$149",
    period: "month",
    features: [
      "Unlimited signals",
      "Real-time notifications",
      "1-on-1 support",
      "Custom analysis",
      "Early access features",
      "Portfolio management"
    ],
    limitations: [],
    current: false
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
                <div className="text-2xl font-bold text-foreground">Premium Plan</div>
                <div className="text-muted-foreground">$79/month</div>
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
            <Card key={index} className={`gradient-card relative ${
              plan.current ? 'ring-2 ring-primary' : ''
            }`}>
              {plan.popular && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold">
                  {plan.price}
                  <span className="text-base font-normal text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                  {plan.limitations.map((limitation, idx) => (
                    <div key={idx} className="flex items-center text-sm text-muted-foreground">
                      <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                      {limitation}
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full" 
                  variant={plan.current ? "outline" : "default"}
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
                </Button>
              </CardContent>
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
                { date: "Feb 15, 2024", amount: "$79.00", status: "Paid", plan: "Premium" },
                { date: "Jan 15, 2024", amount: "$79.00", status: "Paid", plan: "Premium" },
                { date: "Dec 15, 2023", amount: "$29.00", status: "Paid", plan: "Basic" }
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