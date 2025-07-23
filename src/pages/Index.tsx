import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TradingTicker } from "@/components/TradingTicker";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CommunitySection } from "@/components/CommunitySection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TradingTicker />
      <ServicesSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <CommunitySection />
      <Footer />
    </div>
  );
};

export default Index;
