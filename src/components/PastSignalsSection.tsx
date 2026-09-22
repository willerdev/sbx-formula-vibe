import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const PastSignalsSection = () => {
  const navigate = useNavigate();

  return (
    <section id="signals" className="w-full py-16 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Past </span>
            <span className="text-yellow-500">Signals</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Real results from real traders using SBX Formula strategies on Deriv synthetic indices.
          </p>
        </div>

        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">Live signals available daily</span>
          </div>
          
          <div>
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => navigate("/auth")}
            >
              Join For Live Signals
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};