import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TradingTicker } from "@/components/TradingTicker";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CommunitySection } from "@/components/CommunitySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TradingTicker />
      <ServicesSection />
      <TestimonialsSection />
      <CommunitySection />
    </div>
  );
};

export default Index;
