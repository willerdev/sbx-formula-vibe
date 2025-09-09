import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Clock, Target } from "lucide-react";
import { useOutletContext } from "react-router-dom";

interface OutletContext {
  isMobile?: boolean;
}

const signals = [
  {
    id: 1,
    pair: "Volatility 75 (1s)",
    type: "BUY",
    entry: "12,450",
    takeProfit: "12,520",
    stopLoss: "12,400",
    status: "Active",
    timestamp: "2 hours ago",
    pips: "+45"
  },
  {
    id: 2,
    pair: "Volatility 50 (1s)",
    type: "SELL",
    entry: "8,750",
    takeProfit: "8,680",
    stopLoss: "8,820",
    status: "Completed",
    timestamp: "5 hours ago",
    pips: "+70"
  },
  {
    id: 3,
    pair: "Volatility 25",
    type: "BUY",
    entry: "4,320",
    takeProfit: "4,380",
    stopLoss: "4,280",
    status: "Pending",
    timestamp: "1 hour ago",
    pips: "0"
  }
];

export const TradingSignals = () => {
  const { isMobile = false } = useOutletContext<OutletContext>();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header - Mobile responsive */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className={isMobile ? 'p-4' : 'p-6'}>
          <h1 className={`font-bold text-foreground ${isMobile ? 'text-xl' : 'text-3xl'}`}>
            Trading Signals
          </h1>
          <p className={`text-muted-foreground ${isMobile ? 'mt-1 text-sm' : 'mt-2'}`}>
            Real-time forex trading signals and analysis
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto ${isMobile ? 'p-4' : 'p-6'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Signals</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pips</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+1,247</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <Card className="gradient-card">
          <CardHeader>
            <CardTitle>Recent Signals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {signals.map((signal) => (
                <div key={signal.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card/50">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      signal.type === 'BUY' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {signal.type === 'BUY' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className="font-medium">{signal.pair}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {signal.timestamp}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Entry:</span> {signal.entry}
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">TP:</span> {signal.takeProfit} | 
                      <span className="text-muted-foreground ml-1">SL:</span> {signal.stopLoss}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant={
                      signal.status === 'Active' ? 'default' : 
                      signal.status === 'Completed' ? 'secondary' : 'outline'
                    }>
                      {signal.status}
                    </Badge>
                    <div className={`text-sm font-medium ${
                      signal.pips.startsWith('+') ? 'text-green-500' : 'text-muted-foreground'
                    }`}>
                      {signal.pips} pips
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button>View All Signals</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};