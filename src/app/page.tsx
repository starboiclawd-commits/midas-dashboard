import { GoalProgress } from "@/components/dashboard/goal-progress";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { HoldingsChart } from "@/components/dashboard/holdings-chart";
import { PositionsTable } from "@/components/dashboard/positions-table";
import { TradeHistory } from "@/components/dashboard/trade-history";
import { portfolioData, getCurrentValue } from "@/lib/portfolio-data";
import { Coins } from "lucide-react";

export default function Dashboard() {
  const currentValue = getCurrentValue(portfolioData);
  
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Coins className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-amber-100">Midas Dashboard</h1>
              <p className="text-sm text-zinc-500">
                {portfolioData.strategy} • Started {portfolioData.startDate}
              </p>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Goal Progress - Full Width */}
          <GoalProgress 
            currentValue={currentValue}
            startingCapital={portfolioData.startingCapital}
          />
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatsCards
              totalValue={currentValue}
              totalPnL={portfolioData.stats.totalPnL}
              openPnL={portfolioData.stats.openPnL}
              closedPnL={portfolioData.stats.closedPnL}
              wins={portfolioData.stats.wins}
              losses={portfolioData.stats.losses}
              totalTrades={portfolioData.stats.totalTrades}
              startingCapital={portfolioData.startingCapital}
            />
          </div>
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <PerformanceChart 
              history={portfolioData.history}
              startingCapital={portfolioData.startingCapital}
            />
            <HoldingsChart 
              positions={portfolioData.positions}
              cashUSD={portfolioData.cashUSD}
              exchangeRate={portfolioData.exchangeRate}
            />
          </div>
          
          {/* Positions Table */}
          <PositionsTable 
            positions={portfolioData.positions}
            stopLevels={portfolioData.stopLevels}
          />
          
          {/* Trade History */}
          <TradeHistory trades={portfolioData.closedTrades} />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-zinc-500">
            <div>
              💰 Mission: $1,000,000 • Mock Portfolio (Not Real Money)
            </div>
            <div>
              Last updated: {portfolioData.history[portfolioData.history.length - 1]?.date || 'N/A'}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
