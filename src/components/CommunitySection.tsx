import { Button } from "@/components/ui/button";
import { MessageCircle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CommunitySection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 animate-slide-in-right">
      <div className="w-full max-w-4xl mx-auto text-center">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-2 sm:p-3 rounded-xl bg-primary/10 text-primary mr-2 sm:mr-3">
              <Users className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-accent/10 text-accent">
              <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
          </div>

          <h2 className="font-space-grotesk font-bold text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
            <span className="text-gradient-primary">Join Our</span>
            <span className="text-foreground"> Community</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
            Get access to our exclusive trading Discord & Telegram group. Connect with fellow traders,
            use the SBX Formula Trading Bot, and accelerate your trading journey with SBX Formula.
          </p>
        </div>

        <div className="max-w-sm sm:max-w-md mx-auto px-4 sm:px-0">
          <Button
            type="button"
            variant="hero"
            size="lg"
            className="w-full animate-glow text-sm sm:text-base"
            onClick={() => navigate("/auth")}
          >
            Join Community
          </Button>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Join 10,000+ traders already in our community</p>
        </div>
      </div>
    </section>
  );
};
