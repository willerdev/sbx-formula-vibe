import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Manzi Johnson",
      text: "Great signals on Volatility 75(1s)! The accuracy is incredible and I've been consistently profitable since joining SBX Formula.",
      rating: 5,
      profit: "+2,450%"
    },
    {
      name: "Umutoni Sarah",
      text: "Mentorship helped me stay profitable on Deriv. The one-on-one guidance transformed my trading mindset completely.",
      rating: 5,
      profit: "+1,890%"
    },
    {
      name: "Niyonshuti David",
      text: "The synthetic indices strategies are pure gold. I went from losing trader to consistent profits in just 3 months with SBX Formula.",
      rating: 5,
      profit: "+3,120%"
    }
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 animate-fade-in">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-space-grotesk font-bold text-4xl md:text-5xl mb-6">
            <span className="text-foreground">What Our</span>
            <span className="text-gradient-primary"> Traders Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real results from real traders using SBX Formula strategies on Deriv synthetic indices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-secondary/30 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-primary/60 mb-2" />
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <div className="flex items-center mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gradient-accent">{testimonial.profit}</div>
                    <div className="text-xs text-muted-foreground">ROI</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-lg">
            Join thousands of successful traders who trust SBX Formula for their Deriv trading journey.
          </p>
        </div>
      </div>
    </section>
  );
};