"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/portfolio-data";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Trophy,
  AlertTriangle
} from "lucide-react";

interface StatsCardsProps {
  totalValue: number;
  totalPnL: number;
  openPnL: number;
  closedPnL: number;
  wins: number;
  losses: number;
  totalTrades: number;
  startingCapital: number;
}

export function StatsCards({
  totalValue,
  totalPnL,
  openPnL,
  closedPnL,
  wins,
  losses,
  totalTrades,
  startingCapital,
}: StatsCardsProps) {
  const winRate = totalTrades > 0 ? ((wins / (wins + losses)) * 100) : 0;
  const returnPercent = ((totalValue - startingCapital) / startingCapital) * 100;
  
  const stats = [
    {
      title: "Portfolio Value",
      value: formatCurrency(totalValue),
      change: returnPercent,
      icon: DollarSign,
      color: "text-emerald-400",
      bgColor: "bg-emerald-950/30",
    },
    {
      title: "Total P&L",
      value: formatCurrency(totalPnL, 'USD'),
      change: null,
      icon: totalPnL >= 0 ? TrendingUp : TrendingDown,
      color: totalPnL >= 0 ? "text-green-400" : "text-red-400",
      bgColor: totalPnL >= 0 ? "bg-green-950/30" : "bg-red-950/30",
    },
    {
      title: "Open P&L",
      value: formatCurrency(openPnL, 'USD'),
      subtitle: "Unrealized",
      icon: Activity,
      color: openPnL >= 0 ? "text-blue-400" : "text-orange-400",
      bgColor: "bg-blue-950/30",
    },
    {
      title: "Closed P&L",
      value: formatCurrency(closedPnL, 'USD'),
      subtitle: "Realized",
      icon: closedPnL >= 0 ? Trophy : AlertTriangle,
      color: closedPnL >= 0 ? "text-purple-400" : "text-orange-400",
      bgColor: "bg-purple-950/30",
    },
  ];

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title} className={`${stat.bgColor} border-zinc-800`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            {stat.change !== null && stat.change !== undefined && (
              <p className={`text-xs mt-1 ${stat.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change >= 0 ? '+' : ''}{stat.change.toFixed(2)}% from start
              </p>
            )}
            {stat.subtitle && (
              <p className="text-xs text-zinc-500 mt-1">{stat.subtitle}</p>
            )}
          </CardContent>
        </Card>
      ))}
      
      {/* Win Rate Card */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-zinc-400">
            Win Rate
          </CardTitle>
          <Trophy className="h-4 w-4 text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-400">
            {winRate.toFixed(0)}%
          </div>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline" className="bg-green-950/30 text-green-400 border-green-700">
              {wins}W
            </Badge>
            <Badge variant="outline" className="bg-red-950/30 text-red-400 border-red-700">
              {losses}L
            </Badge>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
