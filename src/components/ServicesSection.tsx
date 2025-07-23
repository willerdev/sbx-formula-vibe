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
      description: "Receive real-time trading signals with 95% accuracy rate. Our AI-powered system analyzes market trends 24/7.",
      features: ["Real-time alerts", "95% accuracy", "24/7 monitoring", "Multi-asset coverage"],
      price: "$197/month",
      popular: true
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "1-on-1 Mentorship",
      description: "Get personalized trading guidance from our expert mentors. Transform your trading skills with proven strategies.",
      features: ["Personal mentor", "Weekly sessions", "Custom strategy", "Progress tracking"],
      price: "$497/month",
      popular: false
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Trading Academy",
      description: "Master the fundamentals with our comprehensive trading course. From beginner to advanced levels.",
      features: ["Video lessons", "Live webinars", "Trading tools", "Certificate"],
      price: "$97/month",
      popular: false
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Risk Management",
      description: "Advanced risk management tools and strategies to protect your capital and maximize profits.",
      features: ["Risk calculator", "Portfolio analysis", "Stop-loss automation", "Profit optimization"],
      price: "$147/month",
      popular: false
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Market Analysis",
      description: "Daily market insights and analysis from our team of professional traders and analysts.",
      features: ["Daily reports", "Technical analysis", "Market outlook", "Economic calendar"],
      price: "$67/month",
      popular: false
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Copy Trading",
      description: "Automatically copy trades from our top-performing traders. Perfect for passive income generation.",
      features: ["Auto-copy trades", "Top performers", "Risk settings", "Performance tracking"],
      price: "$297/month",
      popular: false
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl gradient-card border-gradient">
            <Shield className="w-8 h-8 text-accent" />
            <div className="text-left">
              <h3 className="font-semibold text-foreground mb-1">30-Day Money Back Guarantee</h3>
              <p className="text-muted-foreground text-sm">Try any service risk-free for 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};