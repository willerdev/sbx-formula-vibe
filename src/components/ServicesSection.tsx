import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Bell, 
  Shield, 
  Zap,
  Target,
  BarChart3,
  LineChart
} from "lucide-react";

export const ServicesSection = () => {
  const services = [
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Premium Signals",
      description: "Receive real-time trading signals with 98.99% accuracy using our SBX Formula. Pure price action signals for synthetic indices.",
      features: ["Real-time alerts", "98.99% accuracy", "Risk management", "Premium signals access"],
      price: "$30/month",
      popular: true
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Online Mentorship",
      description: "Learn the SBX Formula in our group mentorship program. Master price action trading for Deriv synthetic indices.",
      features: ["Group sessions", "SBX Formula training", "Risk management", "Premium signals access"],
      price: "$120/month",
      popular: false
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "1-on-1 Mentorship",
      description: "Get personalized trading guidance from Savii Banks. Master advanced SBX strategies with direct mentorship.",
      features: ["Personal mentor", "Market analysis", "Advanced SBX strategies", "Risk management", "Premium signals access"],
      price: "$240/month",
      popular: false
    }
  ];

  return (
    <section id="services" className="w-full py-16 sm:py-20 lg:py-24 animate-slide-in-right">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-16">
          <h2 className="font-space-grotesk font-bold text-4xl md:text-6xl mb-6">
            <span className="text-gradient-primary">Our Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our comprehensive suite of trading services designed to accelerate your success in the financial markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className={`relative p-8 gradient-card border-gradient transition-all duration-300 hover:scale-105 ${
              service.popular ? 'ring-2 ring-primary glow-primary' : ''
            }`}>
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="gradient-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-xl ${service.popular ? 'gradient-primary text-primary-foreground' : 'bg-accent/10 text-accent'}`}>
                  {service.icon}
                </div>
              </div>
              
              <h3 className="font-space-grotesk font-bold text-2xl mb-4 text-foreground">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-gradient-primary">
                  {service.price}
                </div>
                <Button variant={service.popular ? "hero" : "premium"} size="sm">
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