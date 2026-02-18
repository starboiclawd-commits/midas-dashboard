"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Position, formatCurrency } from "@/lib/portfolio-data";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { PieChartIcon } from "lucide-react";

interface HoldingsChartProps {
  positions: Position[];
  cashUSD: number;
  exchangeRate: number;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export function HoldingsChart({ positions, cashUSD, exchangeRate }: HoldingsChartProps) {
  const positionsData = positions.map((pos, index) => ({
    name: pos.symbol,
    value: pos.currentValue,
    color: COLORS[index % COLORS.length],
  }));
  
  const chartData = [
    ...positionsData,
    {
      name: 'Cash',
      value: cashUSD,
      color: '#71717a',
    },
  ];

  const totalValueUSD = chartData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalValueUSD) * 100).toFixed(1);
      return (
        <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-3 shadow-lg">
          <p className="text-zinc-100 font-medium">{data.name}</p>
          <p className="text-zinc-400 text-sm">
            {formatCurrency(data.value, 'USD')} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-zinc-100">
          <PieChartIcon className="h-5 w-5 text-blue-400" />
          Holdings Breakdown
        </CardTitle>
        <CardDescription className="text-zinc-500">
          Current allocation (USD)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="mt-4 space-y-2">
          {chartData.map((item) => {
            const percentage = ((item.value / totalValueUSD) * 100).toFixed(1);
            return (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-zinc-300">{item.name}</span>
                </div>
                <div className="text-zinc-400">
                  {formatCurrency(item.value, 'USD')} ({percentage}%)
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
