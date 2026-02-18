// Portfolio data types and loader
export interface Position {
  symbol: string;
  name: string;
  shares: number;
  entryPrice: number;
  entryDate: string;
  avgCost: string;
  currentValue: number;
  signalSource?: string;
}

export interface ClosedTrade {
  symbol: string;
  entryDate: string;
  exitDate: string;
  units?: number;
  shares?: number;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  reason: string;
}

export interface HistoryEntry {
  date: string;
  totalValueUSD: number;
  totalValueCAD: number;
  note: string;
}

export interface PortfolioStats {
  totalTrades: number;
  wins: number;
  losses: number;
  closedPnL: number;
  openPnL: number;
  totalPnL: number;
}

export interface PortfolioData {
  name: string;
  currency: string;
  startDate: string;
  startingCapital: number;
  exchangeRate: number;
  strategy: string;
  positions: Position[];
  cashUSD: number;
  closedTrades: ClosedTrade[];
  history: HistoryEntry[];
  stats: PortfolioStats;
  stopLevels: Record<string, string>;
}

// Static portfolio data (will be loaded from API later)
export const portfolioData: PortfolioData = {
  "name": "Midas Mock Portfolio",
  "currency": "CAD",
  "startDate": "2026-02-07",
  "startingCapital": 10000.00,
  "exchangeRate": 0.73,
  "strategy": "Concentrated SOXL (80/20)",
  "positions": [
    {
      "symbol": "SOXL",
      "name": "3x Semiconductors",
      "shares": 88,
      "entryPrice": 63.90,
      "entryDate": "2026-02-07",
      "avgCost": "Blended (59 @ $61.75, 29 @ $69.58)",
      "currentValue": 6123.04,
      "signalSource": "SOXX"
    }
  ],
  "cashUSD": 1576.86,
  "closedTrades": [
    {
      "symbol": "BTC-USD",
      "entryDate": "2026-02-07",
      "exitDate": "2026-02-12",
      "units": 0.026348,
      "entryPrice": 69264.20,
      "exitPrice": 67765.71,
      "pnl": -39.48,
      "reason": "Rebalance - bear trend, underperforming"
    },
    {
      "symbol": "TQQQ",
      "entryDate": "2026-02-07",
      "exitDate": "2026-02-12",
      "shares": 21,
      "entryPrice": 50.59,
      "exitPrice": 51.39,
      "pnl": 16.80,
      "reason": "Rebalance - concentrating on SOXL"
    }
  ],
  "history": [
    {
      "date": "2026-02-07",
      "totalValueUSD": 7260.64,
      "totalValueCAD": 10000.00,
      "note": "Portfolio inception - Aggressive allocation deployed"
    },
    {
      "date": "2026-02-10",
      "totalValueUSD": 7402.66,
      "totalValueCAD": 10141.00,
      "note": "Day 3 - SOXL carrying gains"
    },
    {
      "date": "2026-02-12",
      "totalValueUSD": 7699.90,
      "totalValueCAD": 10547.81,
      "note": "REBALANCED: 80% SOXL / 20% Cash - Closed BTC & TQQQ"
    }
  ],
  "stats": {
    "totalTrades": 4,
    "wins": 1,
    "losses": 1,
    "closedPnL": -22.68,
    "openPnL": 462.54,
    "totalPnL": 439.26
  },
  "stopLevels": {
    "SOXL": "Keltner Lower Band (HLCC) - recalculate daily"
  }
};

// Goal tracking
export const GOAL_AMOUNT = 1000000;

export function calculateProgress(currentValue: number): number {
  return (currentValue / GOAL_AMOUNT) * 100;
}

export function formatCurrency(amount: number, currency: string = 'CAD'): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function getCurrentValue(data: PortfolioData): number {
  const positionsValue = data.positions.reduce((sum, pos) => sum + pos.currentValue, 0);
  const totalUSD = positionsValue + data.cashUSD;
  return totalUSD / data.exchangeRate; // Convert to CAD
}

export function getTotalReturn(data: PortfolioData): number {
  const currentValue = getCurrentValue(data);
  return ((currentValue - data.startingCapital) / data.startingCapital) * 100;
}
