"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, GOAL_AMOUNT, calculateProgress } from "@/lib/portfolio-data";
import { Target, TrendingUp } from "lucide-react";

interface GoalProgressProps {
  currentValue: number;
  startingCapital: number;
}

export function GoalProgress({ currentValue, startingCapital }: GoalProgressProps) {
  const progress = calculateProgress(currentValue);
  const remaining = GOAL_AMOUNT - currentValue;
  const totalReturn = ((currentValue - startingCapital) / startingCapital) * 100;
  
  return (
    <Card className="col-span-full bg-gradient-to-br from-amber-950/50 to-yellow-900/30 border-amber-700/50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2 text-amber-100">
              <Target className="h-6 w-6 text-amber-400" />
              Journey to $1,000,000
            </CardTitle>
            <CardDescription className="text-amber-200/70">
              Midas Mock Portfolio • Mission Progress
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-amber-100">
              {formatCurrency(currentValue)}
            </div>
            <div className={`flex items-center justify-end gap-1 text-sm ${totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              <TrendingUp className="h-4 w-4" />
              {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}% all-time
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Progress 
            value={progress} 
            className="h-4 bg-amber-950/50" 
          />
          <div className="flex justify-between text-sm text-amber-200/80">
            <span>{progress.toFixed(3)}% complete</span>
            <span>{formatCurrency(remaining)} to go</span>
          </div>
        </div>
        
        {/* Milestone markers */}
        <div className="mt-6 grid grid-cols-5 gap-2 text-xs text-amber-300/60">
          {[10000, 50000, 100000, 500000, 1000000].map((milestone) => {
            const reached = currentValue >= milestone;
            return (
              <div 
                key={milestone}
                className={`text-center p-2 rounded ${
                  reached 
                    ? 'bg-amber-600/30 text-amber-200' 
                    : 'bg-amber-950/30'
                }`}
              >
                <div className="font-medium">
                  {milestone >= 1000000 ? '$1M' : `$${milestone / 1000}K`}
                </div>
                <div className="text-[10px] mt-1">
                  {reached ? '✓ Reached' : `${((currentValue / milestone) * 100).toFixed(1)}%`}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
