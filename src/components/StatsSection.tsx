export const StatsSection = () => {
  const stats = [
    {
      number: "300k+",
      label: "Current Members"
    },
    {
      number: "116k+", 
      label: "Chat Members"
    },
    {
      number: "17k+",
      label: "Signals Received"
    },
    {
      number: "15.5k+",
      label: "Won Signals"
    }
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 xl:px-12 bg-secondary/20">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-accent mb-2">
                {stat.number}
              </div>
              <div className="text-lg md:text-xl text-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};