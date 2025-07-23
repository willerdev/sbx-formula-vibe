import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TradingTicker } from "@/components/TradingTicker";
import { ServicesSection } from "@/components/ServicesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TradingTicker />
      <ServicesSection />
    </div>
  );
};

export default Index;
