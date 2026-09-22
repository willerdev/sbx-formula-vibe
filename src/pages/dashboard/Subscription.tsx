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
    price: "$40",
    period: "month",
    description: "Receive real-time trading signals with 78% accuracy using our SBX Formula. Pure price action signals for synthetic indices.",
    features: [
      "Real-time alerts",
      "78% accuracy", 
      "Risk management",
      "Premium signals access"
    ],
    current: true,
    popular: true
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    name: "Online Mentorship",
    price: "$130",
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
    price: "$350",
    period: "month",
    description: "Get personalized trading guidance from Savii Banks. Master advanced SBX strategies with direct mentorship.",
    features: [
      "Personal mentor",
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

        {/* Available Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className="flex flex-col gap-4">
              <Card className={`relative p-6 sm:p-8 gradient-card border-gradient transition-all duration-300 ${
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
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl sm:text-3xl font-bold text-gradient-primary">
                    {plan.price}/{plan.period}
                  </div>
                </div>
              </Card>
              
              <a 
                href={`https://wa.me/250788974179?text=${encodeURIComponent(`Hi, I would like to subscribe to the ${plan.name} plan at ${plan.price}/${plan.period}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button 
                  variant="success"
                  className="w-full" 
                  size="lg"
                >
                  Select Plan
                </Button>
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};