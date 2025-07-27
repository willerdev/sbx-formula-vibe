import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Zap, Target } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,183,3,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(34,197,94,0.08),transparent_70%)]" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left side - Content */}
          <div className="space-y-8">
            <div>
              <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                <span className="text-foreground">Welcome to the Home of</span>
                <br />
                <span className="text-gradient-primary">Precision Trading</span>
              </h1>
              
              <h2 className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed">
                Join the elite 1% who trade with clarity, confidence, and consistency.
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                At SBX, we don't just trade — we execute with purpose. Powered by pure price action, we dominate 
                Deriv's synthetic indices with focus, discipline, and results. No indicators. No noise. Just clean strategy.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="animate-glow">
                Start Trading Now
              </Button>
              <Button variant="premium" size="lg">
                Discover Our SBX Formula
              </Button>
            </div>
          </div>

          {/* Right side - Quote and SBX Info */}
          <div className="relative">
            <div className="bg-secondary/30 backdrop-blur-sm rounded-3xl p-8 border border-primary/20">
              <div className="flex items-start mb-6">
                <div className="text-6xl text-primary/60 font-serif leading-none mr-4">"</div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                    Once you understand how price truly moves, the market becomes your playground.
                  </h2>
                </div>
              </div>
              
              {/* SBX Logo */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-primary/30 flex items-center justify-center mb-4">
                  <div className="text-2xl font-bold text-primary">SBX</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">SAVII BANKS</div>
                  <div className="text-lg font-medium text-white">FX GROUP</div>
                </div>
              </div>

              {/* Indices Traded */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Indices We Trade:</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  {[
                    "Volatility 25 (1s)", "Volatility 50 (1s)", "Volatility 75 (1s)", "Volatility 150 (1s)",
                    "Volatility 25", "Volatility 50", "Volatility 75", "Jump 50", "Jump 100"
                  ].map((index, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                      {index}
                    </span>
                  ))}
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
