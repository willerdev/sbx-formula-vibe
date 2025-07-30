import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Zap, Target } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Animated Background with Particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,183,3,0.15),transparent_50%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.12),transparent_60%)] animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(168,85,247,0.08),transparent_70%)] animate-pulse" style={{animationDelay: '2s'}} />
        
        {/* Floating particles */}
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-bounce" style={{animationDelay: '0.5s'}} />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-accent/40 rounded-full animate-bounce" style={{animationDelay: '1.5s'}} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary/20 rounded-full animate-bounce" style={{animationDelay: '2.5s'}} />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-[70vh] sm:min-h-[80vh]">
          
          {/* Left side - Content */}
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="font-poppins font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight">
                <span className="text-foreground block mb-1 sm:mb-2 animate-fade-in">Master the art of</span>
                <span className="bg-gradient-to-r from-primary via-yellow-400 to-primary bg-clip-text text-transparent block animate-fade-in" style={{animationDelay: '0.2s'}}>
                  Unlock Synthetic Indices Excellence
                </span>
              </h1>
              
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-medium animate-fade-in px-2 sm:px-0" style={{animationDelay: '0.6s'}}>
                Join the elite 1% who trade with clarity, confidence, and consistency.
              </h2>
              
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl animate-fade-in px-2 sm:px-0" style={{animationDelay: '0.8s'}}>
                At SBX, we don't just trade — we execute with purpose. Powered by pure price action, we dominate 
                Deriv's synthetic indices with focus, discipline, and results.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in px-2 sm:px-0" style={{animationDelay: '1s'}}>
              <Button variant="hero" size="lg" className="group relative overflow-hidden w-full sm:w-auto text-sm sm:text-base">
                <span className="relative z-10">Start Trading Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
              <Button variant="premium" size="lg" className="group hover:scale-105 transition-transform duration-200 w-full sm:w-auto text-sm sm:text-base">
                Discover Our SBX Formula
              </Button>
            </div>
          </div>

          {/* Right side - Enhanced Quote Box */}
          <div className="relative animate-fade-in mt-8 lg:mt-0" style={{animationDelay: '0.4s'}}>
            <div className="relative bg-gradient-to-br from-secondary/40 via-secondary/30 to-secondary/20 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-primary/20 shadow-2xl hover:shadow-primary/10 transition-all duration-500 group mx-2 sm:mx-0">
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
              
              {/* Quote content */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="text-3xl sm:text-4xl lg:text-5xl text-primary/70 font-serif leading-none">"</div>
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground leading-tight">
                      Once you understand how price truly moves, the market becomes your playground.
                    </h2>
                  </div>
                </div>
                
                {/* Enhanced SBX Logo */}
                <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                  <div className="relative group">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border-3 border-primary/40 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <div className="text-base sm:text-lg lg:text-2xl font-bold text-primary">SBX</div>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="text-center space-y-1 sm:space-y-2">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                      SAVII BANKS
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base font-normal text-muted-foreground/80">
                      FX GROUP
                    </div>
                  </div>
                </div>

                {/* Compact Indices */}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-foreground">Indices We Trade:</h3>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 text-xs sm:text-sm">
                    {[
                      "Vol 25 (1s)", "Vol 50 (1s)", "Vol 75 (1s)", "Vol 150 (1s)",
                      "Vol 25", "Vol 50", "Vol 75", "Jump 50", "Jump 100"
                    ].map((index, i) => (
                      <span key={i} className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors duration-200 cursor-default">
                        {index}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Remove the old code - keeping only the closing bracket
