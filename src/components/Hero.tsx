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
          
          {/* Left side - Quote and Image */}
          <div className="relative">
            <div className="bg-secondary/30 backdrop-blur-sm rounded-3xl p-8 border border-primary/20">
              <div className="flex items-start mb-6">
                <div className="text-6xl text-primary/60 font-serif leading-none mr-4">"</div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                    Synthetic indices is 90% knowledge, once you hack it, you're made for life.
                  </h2>
                  <div className="text-lg text-primary font-semibold">- SBX Formula</div>
                </div>
              </div>
              
              {/* Profile Image Placeholder */}
              <div className="flex justify-center mt-8">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-primary/30 flex items-center justify-center">
                  <div className="text-4xl font-bold text-primary">SBX</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <div>
              <div className="text-primary text-lg font-semibold mb-2">About SBX Formula</div>
              <h1 className="font-space-grotesk font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                <span className="text-foreground">Deriv Signals And</span>
                <br />
                <span className="text-gradient-primary">Professional Mentorship</span>
                <br />
                <span className="text-foreground">Services</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                SBX Formula Group is the Best Deriv volatility Group around... JUMP INDICES, 
                BOOM AND CRASH, STEP INDEX, VOLATILITY INDICES, V75 Best signal Group 2024, 
                best Price Action Analysis, we trade all Volatility indices: we trade V75, 
                V100, V50, V25, V10, V25s, V50s, V10s,V100s, Boom and Crash like Boom 500, 
                Booom 1000, Crash 500, Crash 1000, Step Index, Range Break Indices, Jump Indices.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-secondary/20 border border-primary/10">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Shield className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Mentorship Package</h3>
                  <p className="text-sm text-muted-foreground">Join the Mentorship Programme</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-xl bg-secondary/20 border border-primary/10">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">98.99% Success</h3>
                  <p className="text-sm text-muted-foreground">Accurate Deriv Market Signals.</p>
                </div>
              </div>
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
        </div>
      </div>
    </section>
  );
};