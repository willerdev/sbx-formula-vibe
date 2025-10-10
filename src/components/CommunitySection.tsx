import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CommunitySection = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/auth");
  };

  return (
    <section id="faqs" className="w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 animate-slide-in-right">
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
            get live signals, and accelerate your trading journey with SBX Formula.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-sm sm:max-w-md mx-auto space-y-3 sm:space-y-4 px-4 sm:px-0">
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 sm:h-12 text-sm sm:text-base md:text-lg"
            required
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 sm:h-12 text-sm sm:text-base md:text-lg"
            required
          />
          <Button variant="hero" size="lg" type="submit" className="w-full animate-glow text-sm sm:text-base">
            Join Community
          </Button>
        </form>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Join 10,000+ traders already in our community</p>
        </div>
      </div>
    </section>
  );
};