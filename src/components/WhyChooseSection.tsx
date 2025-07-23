import { CheckCircle } from "lucide-react";

export const WhyChooseSection = () => {
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left side - Features */}
          <div>
            <div className="text-primary text-lg font-semibold mb-2">Why Choose SBX Formula</div>
            <h2 className="font-space-grotesk font-bold text-4xl md:text-5xl mb-12 text-foreground">
              Reason For Choosing Us
            </h2>
            
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
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
          </div>

          {/* Right side - Quote */}
          <div className="relative">
            <div className="bg-secondary/30 backdrop-blur-sm rounded-3xl p-12 border border-primary/20 relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              
              <div className="relative">
                <div className="text-8xl text-primary/20 font-serif leading-none mb-4">"</div>
                
                <div className="space-y-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                    MY NAME IS
                    <br />
                    <span className="text-gradient-primary">SBX FORMULA,</span>
                  </h3>
                  
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                    <span className="text-foreground">I TRADE WHAT </span>
                    <span className="text-gradient-accent">I SEE</span>
                    <br />
                    <span className="text-foreground">NOT WHAT </span>
                    <span className="text-gradient-accent">I FEEL</span>
                  </h3>
                </div>

                <div className="mt-8 pt-6 border-t border-primary/20">
                  <div className="text-primary font-semibold text-lg italic">
                    Looking for the Best? 
                    <span className="text-gradient-primary font-bold"> Join Us</span>
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