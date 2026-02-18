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
import { ClosedTrade, formatCurrency } from "@/lib/portfolio-data";
import { History, TrendingUp, TrendingDown } from "lucide-react";

interface TradeHistoryProps {
  trades: ClosedTrade[];
}

export function TradeHistory({ trades }: TradeHistoryProps) {
  return (
    <Card className="col-span-full bg-zinc-900/50 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-zinc-100">
          <History className="h-5 w-5 text-purple-400" />
          Trade History
        </CardTitle>
        <CardDescription className="text-zinc-500">
          Closed positions and realized P&L
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400">Symbol</TableHead>
              <TableHead className="text-zinc-400">Entry Date</TableHead>
              <TableHead className="text-zinc-400">Exit Date</TableHead>
              <TableHead className="text-zinc-400 text-right">Entry</TableHead>
              <TableHead className="text-zinc-400 text-right">Exit</TableHead>
              <TableHead className="text-zinc-400 text-right">P&L</TableHead>
              <TableHead className="text-zinc-400">Reason</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-zinc-500 py-8">
                  No closed trades yet
                </TableCell>
              </TableRow>
            ) : (
              trades.map((trade, index) => {
                const isProfit = trade.pnl >= 0;
                return (
                  <TableRow key={index} className="border-zinc-800">
                    <TableCell className="font-medium text-zinc-100">
                      <div className="flex items-center gap-2">
                        {trade.symbol}
                        {trade.units && (
                          <Badge variant="outline" className="text-xs bg-orange-950/30 text-orange-400 border-orange-700">
                            Crypto
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-zinc-400">
                      {new Date(trade.entryDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-zinc-400">
                      {new Date(trade.exitDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right text-zinc-300">
                      ${trade.entryPrice.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-zinc-300">
                      ${trade.exitPrice.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className={`flex items-center justify-end gap-1 font-medium ${
                        isProfit ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {isProfit ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {formatCurrency(trade.pnl, 'USD')}
                      </div>
                    </TableCell>
                    <TableCell className="text-zinc-500 text-sm max-w-[200px] truncate">
                      {trade.reason}
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
