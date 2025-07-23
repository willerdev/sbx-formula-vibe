import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Users } from "lucide-react";
import { useState } from "react";

export const CommunitySection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Joining community:", { name, email });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary mr-3">
              <Users className="w-8 h-8" />
            </div>
            <div className="p-3 rounded-xl bg-accent/10 text-accent">
              <MessageCircle className="w-8 h-8" />
            </div>
          </div>
          
          <h2 className="font-space-grotesk font-bold text-4xl md:text-5xl mb-6">
            <span className="text-gradient-primary">Join Our</span>
            <span className="text-foreground"> Community</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get access to our exclusive trading Discord & Telegram group. Connect with fellow traders, 
            get live signals, and accelerate your trading journey with SBX Formula.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 text-lg"
            required
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 text-lg"
            required
          />
          <Button variant="hero" size="lg" type="submit" className="w-full animate-glow">
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