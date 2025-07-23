import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Zap, Target } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,183,3,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(34,197,94,0.1),transparent_50%)]" />
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary/5 rounded-full animate-float" style={{ animationDelay: '4s' }} />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="font-space-grotesk font-black text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight">
            <span className="text-gradient-primary">Master The</span>
            <br />
            <span className="text-foreground">Trading Game</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto font-medium">
            Join SBX Formula and transform your trading journey with our proven strategies, 
            expert mentorship, and cutting-edge signals.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button variant="hero" className="animate-glow">
              Start Trading Now
            </Button>
            <Button variant="premium" size="lg">
              Discover Our Formula
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gradient-primary">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 rounded-xl bg-accent/10 text-accent">
                  <Shield className="w-6 h-6" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gradient-accent">10K+</div>
              <div className="text-muted-foreground">Satisfied Traders</div>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Zap className="w-6 h-6" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gradient-primary">24/7</div>
              <div className="text-muted-foreground">Live Signals</div>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 rounded-xl bg-accent/10 text-accent">
                  <Target className="w-6 h-6" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gradient-accent">500%</div>
              <div className="text-muted-foreground">Avg. Monthly ROI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trading chart graphics */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent">
        <div className="absolute bottom-0 left-1/4 w-1 h-20 bg-accent animate-pulse" />
        <div className="absolute bottom-0 left-1/3 w-1 h-16 bg-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-0 right-1/3 w-1 h-24 bg-accent animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 right-1/4 w-1 h-12 bg-primary animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
    </section>
  );
};