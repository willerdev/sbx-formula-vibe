import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const PastSignalsSection = () => {
  const screenshots = [
    {
      src: "/lovable-uploads/f0546ae6-3edc-4847-917e-47c180834408.png",
      alt: "Trading results showing Volatility 50 (1s) Index positions with profits"
    },
    {
      src: "/lovable-uploads/d74e6fad-a812-41a9-81df-83fef14e762c.png", 
      alt: "Volatility 50 (1s) Index trading chart with sell signal"
    },
    {
      src: "/lovable-uploads/8602f6ae-2e55-4da1-93bb-d8e7c5b0d2ff.png",
      alt: "Trading results showing Volatility 75 Index positions with profits"
    },
    {
      src: "/lovable-uploads/4c5cc41c-bd89-4826-affa-ea1248e59504.png",
      alt: "Volatility 75 Index trading chart with buy signal"
    }
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-to-br from-background via-secondary/5 to-primary/5">
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

        <div className="w-full max-w-4xl mx-auto">
          <Carousel className="w-full" opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {screenshots.map((screenshot, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-card/80 backdrop-blur-sm border border-border/20 rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                    <img 
                      src={screenshot.src}
                      alt={screenshot.alt}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">Live signals available daily</span>
          </div>
        </div>
      </div>
    </section>
  );
};