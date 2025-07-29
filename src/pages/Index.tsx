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
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header />
      <main className="w-full">
        <section className="w-full bg-gradient-to-br from-background via-background to-primary/5 animate-fade-in">
          <Hero />
        </section>
        
        <section className="w-full bg-secondary/10 animate-slide-in-right border-t border-border/20">
          <TradingTicker />
        </section>
        
        <section className="w-full bg-background animate-fade-in">
          <ServicesSection />
        </section>
        
        <section className="w-full bg-gradient-to-r from-primary/5 via-background to-accent/5 animate-slide-in-right border-y border-border/10">
          <WhyChooseSection />
        </section>
        
        <section className="w-full bg-secondary/5 animate-fade-in">
          <TestimonialsSection />
        </section>
        
        <section className="w-full bg-gradient-to-t from-primary/10 to-background animate-slide-in-right">
          <CommunitySection />
        </section>
        
        <section className="w-full bg-gradient-to-b from-secondary/20 to-secondary/30 animate-fade-in">
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default Index;
