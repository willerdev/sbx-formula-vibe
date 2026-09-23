import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSiteSettings } from "@/lib/siteContent";

const defaultQuoteTitle = "WE ARE SAVII BANKS FX GROUP";
const defaultQuoteBody = "WE PLAN OUR TRADES AND TRADE OUR PLANS EVERY TIME";

export const WhyChooseSection = () => {
  const navigate = useNavigate();
  const [quoteTitle, setQuoteTitle] = useState(defaultQuoteTitle);
  const [quoteBody, setQuoteBody] = useState(defaultQuoteBody);

  useEffect(() => {
    fetchSiteSettings().then((settings) => {
      if (!settings) return;
      if (settings.quote_title) setQuoteTitle(settings.quote_title);
      if (settings.quote_body) setQuoteBody(settings.quote_body);
    });
  }, []);

  const quoteIsDefault = quoteTitle === defaultQuoteTitle && quoteBody === defaultQuoteBody;
  const features = [
    {
      title: "Consistent Signals",
      description: "Signals sent to the signal group is consistent."
    },
    {
      title: "Mentorship Package", 
      description: "Assurance of latest market strategy available to us."
    },
    {
      title: "Flexible Payment",
      description: "We offer various payment methods."
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left side - Features */}
          <div className="animate-fade-in">
            <div className="text-primary text-lg font-semibold mb-4">About Savii Banks Fx Group</div>
            <h2 className="font-poppins font-bold text-4xl md:text-5xl mb-12 text-foreground leading-tight">
              Mastering Deriv with Pure Price Action
            </h2>
            
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 animate-fade-in" style={{animationDelay: '0.6s'}}>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => navigate("/auth")}
                className="w-full sm:w-auto"
              >
                Get Started Today
              </Button>
            </div>
          </div>

          {/* Right side - Quote */}
          <div className="relative">
            <div className="bg-secondary/30 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-primary/20 relative overflow-hidden animate-slide-in-right">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              
              <div className="relative">
                 <div className="space-y-4 mb-6">
                   {quoteIsDefault ? (
                     <>
                       <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                         WE ARE
                         <br />
                         <span className="text-gradient-primary">SAVII BANKS</span>
                         <br />
                         <span className="text-gradient-primary">FX GROUP,</span>
                       </h3>
                       <h3 className="text-lg md:text-xl lg:text-2xl font-bold leading-tight">
                         <span className="text-foreground">WE PLAN </span>
                         <span className="text-gradient-accent">OUR TRADES</span>
                         <span className="text-foreground"> AND TRADE </span>
                         <span className="text-gradient-accent">OUR PLANS</span>
                         <br />
                         <span className="text-gradient-primary">EVERY TIME</span>
                       </h3>
                     </>
                   ) : (
                     <>
                       <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gradient-primary leading-tight whitespace-pre-line">
                         {quoteTitle}
                       </h3>
                       <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground leading-tight whitespace-pre-line">
                         {quoteBody}
                       </h3>
                     </>
                   )}
                 </div>

                 <div className="pt-4 border-t border-primary/20">
                   <p className="text-sm lg:text-base text-muted-foreground mb-3 leading-relaxed">
                     At Savii Banks Fx Group, we specialize in mastering Deriv Synthetic Indices using pure price action—no indicators, no noise. Just clean charts, sharp entries, and a powerful SBX formula designed for consistent growth.
                   </p>
                   <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                     We believe trading is about discipline, focus, and mastering how price truly behaves. With the right mindset and precision strategies, success isn't just possible — it's scalable.
                   </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};