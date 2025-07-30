import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Zap, Target } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Enhanced Background with better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/10">
        {/* Darker gradient orbs for better contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,183,3,0.08),transparent_50%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.06),transparent_60%)] animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(168,85,247,0.04),transparent_70%)] animate-pulse" style={{animationDelay: '2s'}} />
        
        {/* Floating particles */}
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-bounce" style={{animationDelay: '0.5s'}} />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-accent/30 rounded-full animate-bounce" style={{animationDelay: '1.5s'}} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary/15 rounded-full animate-bounce" style={{animationDelay: '2.5s'}} />
      </div>

      {/* Centered Content */}
      <div className="relative w-full max-w-4xl mx-auto px-4 text-center">
        <div className="space-y-6">
          {/* Main Headline */}
          <div className="animate-fade-in">
            <h1 className="font-montserrat font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] tracking-tight uppercase text-white drop-shadow-lg">
              UNLOCK SYNTHETIC INDICES EXCELLENCE
            </h1>
          </div>
          
          {/* Sub-text */}
          <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
            <p className="font-montserrat font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 drop-shadow-md">
              Precision. Confidence. Growth in Synthetic Indices.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in pt-8" style={{animationDelay: '0.6s'}}>
            <Button variant="hero" size="lg" className="group relative overflow-hidden text-base sm:text-lg font-semibold">
              <span className="relative z-10">Start Trading Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Button>
            <Button variant="premium" size="lg" className="group hover:scale-105 transition-transform duration-200 text-base sm:text-lg font-semibold">
              Discover Our SBX Formula
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Remove the old code - keeping only the closing bracket
