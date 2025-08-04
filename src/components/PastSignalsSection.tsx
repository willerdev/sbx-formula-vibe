export const PastSignalsSection = () => {
  const signals = [
    {
      pair: "Volatility 50 (1s) Index",
      action: "sell 0.01",
      result: "+108.80",
      profit: true,
      entry: "213906.31",
      exit: "203026.06",
      date: "2024.01.15 14:30:25"
    },
    {
      pair: "Volatility 50 (1s) Index", 
      action: "sell 0.01",
      result: "+109.13",
      profit: true,
      entry: "213939.14",
      exit: "203026.06",
      date: "2024.01.15 14:32:18"
    },
    {
      pair: "Volatility 25 Index",
      action: "buy 2",
      result: "-16.88",
      profit: false,
      entry: "1640.371",
      exit: "1631.929",
      date: "2022.12.22 08:09:24"
    },
    {
      pair: "Volatility 25 Index",
      action: "buy 3",
      result: "-38.90",
      profit: false,
      entry: "1650.215",
      exit: "1630.767",
      date: "2022.12.22 09:06:20"
    },
    {
      pair: "Volatility 25 Index",
      action: "buy 2.5",
      result: "-40.60",
      profit: false,
      entry: "1650.634",
      exit: "1630.333",
      date: "2022.12.22 09:07:50"
    },
    {
      pair: "Volatility 50 (1s) Index",
      action: "buy 0.05",
      result: "+554.67",
      profit: true,
      entry: "550426.34",
      exit: "561519.77",
      date: "2022.12.24 02:52:42"
    },
    {
      pair: "Volatility 50 (1s) Index",
      action: "buy 0.05", 
      result: "+404.27",
      profit: true,
      entry: "553085.27",
      exit: "561170.66",
      date: "2022.12.24 05:01:14"
    },
    {
      pair: "Balance",
      action: "Final Result",
      result: "+1,075.32",
      profit: true,
      entry: "1,000.00",
      exit: "2,075.32",
      date: "2022.12.24 07:04:27"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* First two signals as images */}
          <div className="bg-card/80 backdrop-blur-sm border border-border/20 rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <img 
              src="/lovable-uploads/6b57f6b0-e233-4f42-8122-b0952c2f1774.png" 
              alt="Trading signals screenshot showing Volatility 50 (1s) Index results"
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Skip the first two text signals and show the rest */}
          {signals.slice(2).map((signal, index) => (
            <div
              key={index + 2}
              className="bg-card/80 backdrop-blur-sm border border-border/20 rounded-lg p-4 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {signal.pair}
                  </span>
                  <span className={`text-sm font-bold ${
                    signal.profit ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {signal.result}
                  </span>
                </div>
                
                <div className="bg-secondary/20 rounded p-2">
                  <p className="text-xs text-muted-foreground mb-1">Action</p>
                  <p className="text-sm font-medium text-accent">{signal.action}</p>
                </div>

                {signal.entry !== signal.exit && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-blue-500/10 rounded p-2">
                      <p className="text-xs text-blue-400 mb-1">Entry</p>
                      <p className="text-xs font-medium text-foreground">{signal.entry}</p>
                    </div>
                    <div className="bg-purple-500/10 rounded p-2">
                      <p className="text-xs text-purple-400 mb-1">Exit</p>
                      <p className="text-xs font-medium text-foreground">{signal.exit}</p>
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-border/20">
                  <p className="text-xs text-muted-foreground">{signal.date}</p>
                </div>
              </div>
            </div>
          ))}
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