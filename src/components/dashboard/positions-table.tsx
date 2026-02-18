"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Position, formatCurrency } from "@/lib/portfolio-data";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

interface PositionsTableProps {
  positions: Position[];
  stopLevels: Record<string, string>;
}

export function PositionsTable({ positions, stopLevels }: PositionsTableProps) {
  return (
    <Card className="col-span-full lg:col-span-2 bg-zinc-900/50 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-zinc-100">
          <Wallet className="h-5 w-5 text-emerald-400" />
          Open Positions
        </CardTitle>
        <CardDescription className="text-zinc-500">
          Current holdings and unrealized P&L
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400">Symbol</TableHead>
              <TableHead className="text-zinc-400">Name</TableHead>
              <TableHead className="text-zinc-400 text-right">Shares</TableHead>
              <TableHead className="text-zinc-400 text-right">Avg Cost</TableHead>
              <TableHead className="text-zinc-400 text-right">Current Value</TableHead>
              <TableHead className="text-zinc-400">Stop Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-zinc-500 py-8">
                  No open positions
                </TableCell>
              </TableRow>
            ) : (
              positions.map((position, index) => {
                const costBasis = position.shares * position.entryPrice;
                const unrealizedPnL = position.currentValue - costBasis;
                const unrealizedPnLPercent = (unrealizedPnL / costBasis) * 100;
                const isProfit = unrealizedPnL >= 0;
                
                return (
                  <TableRow key={index} className="border-zinc-800">
                    <TableCell className="font-medium text-zinc-100">
                      <div className="flex items-center gap-2">
                        {position.symbol}
                        {position.signalSource && (
                          <Badge variant="outline" className="text-xs bg-blue-950/30 text-blue-400 border-blue-700">
                            via {position.signalSource}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-zinc-400">
                      {position.name}
                    </TableCell>
                    <TableCell className="text-right text-zinc-300">
                      {position.shares}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="text-zinc-300">${position.entryPrice.toFixed(2)}</div>
                      <div className="text-xs text-zinc-500">{position.avgCost}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="text-zinc-100 font-medium">
                        {formatCurrency(position.currentValue, 'USD')}
                      </div>
                      <div className={`flex items-center justify-end gap-1 text-xs ${
                        isProfit ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {isProfit ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {isProfit ? '+' : ''}{formatCurrency(unrealizedPnL, 'USD')} ({unrealizedPnLPercent.toFixed(2)}%)
                      </div>
                    </TableCell>
                    <TableCell className="text-zinc-500 text-sm max-w-[200px]">
                      {stopLevels[position.symbol] || 'N/A'}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
