"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HistoryEntry } from "@/lib/portfolio-data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp } from "lucide-react";

interface PerformanceChartProps {
  history: HistoryEntry[];
  startingCapital: number;
}

export function PerformanceChart({ history, startingCapital }: PerformanceChartProps) {
  const chartData = history.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: entry.totalValueCAD,
    return: ((entry.totalValueCAD - startingCapital) / startingCapital) * 100,
  }));

  const latestReturn = chartData[chartData.length - 1]?.return || 0;

  return (
    <Card className="col-span-full lg:col-span-2 bg-zinc-900/50 border-zinc-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-zinc-100">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              Portfolio Performance
            </CardTitle>
            <CardDescription className="text-zinc-500">
              Value over time (CAD)
            </CardDescription>
          </div>
          <div className={`text-lg font-semibold ${latestReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {latestReturn >= 0 ? '+' : ''}{latestReturn.toFixed(2)}%
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis 
                dataKey="date" 
                stroke="#71717a" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#71717a" 
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
                domain={['dataMin - 100', 'dataMax + 100']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: '1px solid #27272a',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#a1a1aa' }}
                formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
