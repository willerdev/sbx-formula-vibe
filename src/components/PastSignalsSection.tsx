import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PastSignalsSection = () => {
  const navigate = useNavigate();

  return (
    <section id="deriv-account" className="w-full py-16 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">How to Create a </span>
            <span className="text-yellow-500">Deriv Account</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch how to open your Deriv account and start using the SBX Formula Trading Bot.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl aspect-video overflow-hidden rounded-2xl border border-primary/30 bg-secondary/40">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-secondary" />
          <div className="relative flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg sm:h-20 sm:w-20">
              <Play className="h-7 w-7 fill-current sm:h-8 sm:w-8" />
            </div>
            <p className="text-sm font-medium text-muted-foreground sm:text-base">Video placeholder</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            type="button"
            variant="hero"
            size="lg"
            onClick={() => navigate("/auth")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};
