import { useEffect, useState } from "react";

interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

export const TradingTicker = () => {
  const [tickerData] = useState<TickerItem[]>([
    { symbol: "S&P 500", price: "6,334.0", change: "+23.7", changePercent: "+0.38%", isPositive: true },
    { symbol: "NASDAQ", price: "23,124.1", change: "+80.90", changePercent: "+0.35%", isPositive: true },
    { symbol: "EUR/USD", price: "1.17325", change: "-0.001", changePercent: "-0.14%", isPositive: false },
    { symbol: "Bitcoin", price: "118,413", change: "-1,598.00", changePercent: "-1.33%", isPositive: false },
    { symbol: "Ethereum", price: "3,681.1", change: "-67.2", changePercent: "-1.79%", isPositive: false },
    { symbol: "Gold", price: "2,745.80", change: "+12.40", changePercent: "+0.45%", isPositive: true },
    { symbol: "Oil", price: "73.26", change: "+1.82", changePercent: "+2.55%", isPositive: true },
    { symbol: "GBP/USD", price: "1.2845", change: "+0.0012", changePercent: "+0.09%", isPositive: true },
  ]);

  return (
    <div className="w-full bg-secondary/20 border-y border-border py-3 overflow-hidden animate-slide-in-right">
      <div className="relative">
        <div className="flex animate-[scroll_30s_linear_infinite] whitespace-nowrap">
          {/* First set */}
          {tickerData.map((item, index) => (
            <div key={index} className="inline-flex items-center mx-8 min-w-fit">
              <span className="font-semibold text-foreground mr-2">{item.symbol}</span>
              <span className="text-foreground mr-2">{item.price}</span>
              <span className={`text-sm ${item.isPositive ? 'text-accent' : 'text-destructive'}`}>
                {item.change} ({item.changePercent})
              </span>
            </div>
          ))}
          
          {/* Duplicate for seamless loop */}
          {tickerData.map((item, index) => (
            <div key={`dup-${index}`} className="inline-flex items-center mx-8 min-w-fit">
              <span className="font-semibold text-foreground mr-2">{item.symbol}</span>
              <span className="text-foreground mr-2">{item.price}</span>
              <span className={`text-sm ${item.isPositive ? 'text-accent' : 'text-destructive'}`}>
                {item.change} ({item.changePercent})
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};