import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPlans, formatPlanPrice, type Plan } from "@/lib/siteContent";

const planIcons = {
  "premium-signals": <Bell className="w-8 h-8" />,
  "online-mentorship": <BookOpen className="w-8 h-8" />,
  "physical-mentorship": <Users className="w-8 h-8" />,
};

const fallbackPlans: Plan[] = [
    {
      id: "premium-signals",
      slug: "premium-signals",
      name: "SBX Formula Trading Bot",
      description: "Receive real-time trading signals with 78% accuracy using our SBX Formula. Pure price action signals for synthetic indices.",
      features: ["Real-time alerts", "78% accuracy", "Risk management", "SBX Formula Trading Bot"],
      price_amount: 50,
      billing_period: "month",
      is_popular: true,
      sort_order: 1,
    },
    {
      id: "online-mentorship",
      slug: "online-mentorship",
      name: "1-on-1 Online Mentorship",
      description: "Learn the SBX Formula in 1-on-1 online mentorship. Master price action trading for Deriv synthetic indices.",
      features: ["Online sessions", "SBX Formula training", "Risk management", "SBX Formula Trading Bot"],
      price_amount: 130,
      billing_period: "2month",
      is_popular: false,
      sort_order: 2,
    },
    {
      id: "physical-mentorship",
      slug: "physical-mentorship",
      name: "1-on-1 Physical Mentorship",
      description: "Get personalized in-person trading guidance from Savii Banks. Master advanced SBX strategies with direct mentorship.",
      features: ["Personal mentor", "Market analysis", "Advanced SBX strategies", "Risk management", "SBX Formula Trading Bot"],
      price_amount: 350,
      billing_period: "2month",
      is_popular: false,
      sort_order: 3,
    },
  ];

export const ServicesSection = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Plan[]>(fallbackPlans);

  useEffect(() => {
    fetchPlans().then((plans) => {
      if (plans?.length) setServices(plans);
    });
  }, []);

  return (
    <section id="mentorship" className="w-full py-12 sm:py-16 md:py-20 lg:py-24 animate-slide-in-right">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-space-grotesk font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6">
            <span className="text-gradient-primary">Our Services</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0">
            Choose from our comprehensive suite of trading services designed to accelerate your success in the financial markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <Card key={service.id} className={`relative p-6 sm:p-8 gradient-card border-gradient transition-all duration-300 hover:scale-105 ${
              service.is_popular ? 'ring-2 ring-primary glow-primary' : ''
            }`}>
              {service.is_popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="gradient-primary text-primary-foreground px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-xl ${service.is_popular ? 'gradient-primary text-primary-foreground' : 'bg-accent/10 text-accent'}`}>
                  {planIcons[service.slug as keyof typeof planIcons] ?? <Bell className="w-8 h-8" />}
                </div>
              </div>
              
              <h3 className="font-space-grotesk font-bold text-xl sm:text-2xl mb-4 text-foreground">
                {service.name}
              </h3>
              
              <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                    <span className="text-sm sm:text-base text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-bold text-gradient-primary">
                  {formatPlanPrice(service.price_amount, service.billing_period)}
                </div>
                <Button 
                  variant={service.is_popular ? "hero" : "premium"} 
                  size="sm" 
                  className="text-xs sm:text-sm"
                  onClick={() => navigate("/auth")}
                >
                  Get Started
                </Button>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};