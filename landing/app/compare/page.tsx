"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bot,
  Target,
  Shield,
  PieChart,
  TrendingUp,
  TrendingDown,
  Copy,
  ShoppingCart,
  ExternalLink,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

// Mock agent data for comparison
const mockAgents = [
  {
    id: "#1042",
    strategy: "SUI_MAXIMIZER",
    strategyLabel: "SUI Maximizer",
    icon: Target,
    color: "bg-[#4DA2FF]/10 text-[#4DA2FF]",
    mintPrice: 1000,
    currentValue: 1172.2,
    marketPrice: 1220,
    evolutionStage: 3,
    maxStage: 4,
    winRate: 72.4,
    avgTradeSize: 245.8,
    totalTrades: 47,
    daysActive: 18,
    strategyEfficiency: 85,
    performanceData: [1000, 1015, 1008, 1045, 1089, 1102, 1172.2],
    owner: "0x1234...5678",
  },
  {
    id: "#0987",
    strategy: "BTC_HODLER",
    strategyLabel: "BTC Hodler",
    icon: Shield,
    color: "bg-orange-100 text-orange-600",
    mintPrice: 2500,
    currentValue: 2891.5,
    marketPrice: 2750,
    evolutionStage: 4,
    maxStage: 4,
    winRate: 68.9,
    avgTradeSize: 1250.0,
    totalTrades: 23,
    daysActive: 45,
    strategyEfficiency: 78,
    performanceData: [2500, 2520, 2480, 2650, 2780, 2820, 2891.5],
    owner: "0x9876...4321",
  },
  {
    id: "#1337",
    strategy: "STABLE_OPTIMIZER",
    strategyLabel: "Stable Optimizer",
    icon: PieChart,
    color: "bg-green-100 text-green-600",
    mintPrice: 5000,
    currentValue: 5234.8,
    marketPrice: 5400,
    evolutionStage: 2,
    maxStage: 4,
    winRate: 89.2,
    avgTradeSize: 425.0,
    totalTrades: 156,
    daysActive: 12,
    strategyEfficiency: 92,
    performanceData: [5000, 5025, 5040, 5080, 5120, 5180, 5234.8],
    owner: "0x5555...9999",
  },
];

type FilterStrategy =
  | "all"
  | "SUI_MAXIMIZER"
  | "BTC_HODLER"
  | "STABLE_OPTIMIZER";
type SortOption = "roi" | "marketPrice" | "winRate" | "efficiency";

export default function ComparePage() {
  const [selectedAgents, setSelectedAgents] = useState<string[]>([
    "#1042",
    "#0987",
    "#1337",
  ]);
  const [filterStrategy, setFilterStrategy] = useState<FilterStrategy>("all");
  const [sortBy, setSortBy] = useState<SortOption>("roi");

  // Filter and sort agents
  const filteredAgents = mockAgents
    .filter((agent) => {
      if (filterStrategy === "all") return true;
      return agent.strategy === filterStrategy;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "roi":
          const aRoi = ((a.currentValue - a.mintPrice) / a.mintPrice) * 100;
          const bRoi = ((b.currentValue - b.mintPrice) / b.mintPrice) * 100;
          return bRoi - aRoi;
        case "marketPrice":
          return b.marketPrice - a.marketPrice;
        case "winRate":
          return b.winRate - a.winRate;
        case "efficiency":
          return b.strategyEfficiency - a.strategyEfficiency;
        default:
          return 0;
      }
    });

  const calculatePnL = (agent: (typeof mockAgents)[0]) => {
    const pnl = agent.currentValue - agent.mintPrice;
    const percentage = (pnl / agent.mintPrice) * 100;
    return { pnl, percentage };
  };

  const getMaxValue = (metric: keyof (typeof mockAgents)[0]) => {
    return Math.max(...filteredAgents.map((agent) => agent[metric] as number));
  };

  const renderSparkline = (data: number[]) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    return (
      <div className="flex items-end h-8 space-x-1">
        {data.map((value, index) => {
          const height = range > 0 ? ((value - min) / range) * 100 : 50;
          return (
            <div
              key={index}
              className="bg-[#4DA2FF] rounded-t-sm flex-1 min-h-[2px]"
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#011829] mb-2">
              Compare Agents
            </h1>
            <p className="text-lg text-[#030F1C]">
              Evaluate different conviction-based AI agents before deciding to
              buy or copy.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select
                value={filterStrategy}
                onValueChange={(value: FilterStrategy) =>
                  setFilterStrategy(value)
                }
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Strategies</SelectItem>
                  <SelectItem value="SUI_MAXIMIZER">SUI Maximizer</SelectItem>
                  <SelectItem value="BTC_HODLER">BTC Hodler</SelectItem>
                  <SelectItem value="STABLE_OPTIMIZER">
                    Stable Optimizer
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={sortBy}
                onValueChange={(value: SortOption) => setSortBy(value)}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="roi">Best ROI</SelectItem>
                  <SelectItem value="marketPrice">Market Price</SelectItem>
                  <SelectItem value="winRate">Win Rate</SelectItem>
                  <SelectItem value="efficiency">
                    Strategy Efficiency
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Badge className="bg-[#4DA2FF]/10 text-[#4DA2FF]">
              Comparing {filteredAgents.length} agents
            </Badge>
          </div>

          {/* Agent Comparison Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {filteredAgents.map((agent) => {
              const { pnl, percentage } = calculatePnL(agent);
              const isProfit = pnl >= 0;

              return (
                <Card
                  key={agent.id}
                  className="border-2 hover:border-[#4DA2FF] transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-[#011829] flex items-center">
                        <Bot className="mr-2 h-5 w-5 text-[#4DA2FF]" />
                        Agent {agent.id}
                      </CardTitle>
                      <Badge className="bg-green-100 text-green-700">
                        🟢 Active
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <agent.icon className="h-4 w-4 text-[#4DA2FF]" />
                      <Badge className={agent.color}>
                        {agent.strategyLabel}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Financial Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-[#011829]">
                          Mint Price
                        </p>
                        <p className="text-[#030F1C]">{agent.mintPrice} USDC</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#011829]">
                          Current Value
                        </p>
                        <p className="text-[#030F1C] font-semibold">
                          {agent.currentValue} USDC
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#011829]">
                          Market Price
                        </p>
                        <p className="text-[#030F1C] font-bold">
                          {agent.marketPrice} USDC
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#011829]">
                          P&L
                        </p>
                        <div className="flex items-center space-x-1">
                          {isProfit ? (
                            <TrendingUp className="h-3 w-3 text-green-600" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-600" />
                          )}
                          <span
                            className={`text-sm font-semibold ${
                              isProfit ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {isProfit ? "+" : ""}
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#030F1C]">Win Rate</span>
                          <span className="font-medium text-[#011829]">
                            {agent.winRate}%
                          </span>
                        </div>
                        <Progress value={agent.winRate} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#030F1C]">Evolution</span>
                          <span className="font-medium text-[#011829]">
                            {agent.evolutionStage}/{agent.maxStage}
                          </span>
                        </div>
                        <Progress
                          value={(agent.evolutionStage / agent.maxStage) * 100}
                          className="h-2"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#030F1C]">
                            Strategy Efficiency
                          </span>
                          <span className="font-medium text-[#011829]">
                            {agent.strategyEfficiency}%
                          </span>
                        </div>
                        <Progress
                          value={agent.strategyEfficiency}
                          className="h-2"
                        />
                      </div>
                    </div>

                    {/* Performance Sparkline */}
                    <div>
                      <p className="text-sm font-medium text-[#011829] mb-2">
                        7-Day Trend
                      </p>
                      {renderSparkline(agent.performanceData)}
                    </div>

                    {/* Additional Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-[#030F1C]">Total Trades</p>
                        <p className="font-medium text-[#011829]">
                          {agent.totalTrades}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#030F1C]">Avg Trade Size</p>
                        <p className="font-medium text-[#011829]">
                          {agent.avgTradeSize} USDC
                        </p>
                      </div>
                      <div>
                        <p className="text-[#030F1C]">Days Active</p>
                        <p className="font-medium text-[#011829]">
                          {agent.daysActive}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#030F1C]">Owner</p>
                        <p className="font-mono text-xs text-[#4DA2FF]">
                          {agent.owner}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 pt-2">
                      <Button className="w-full bg-[#4DA2FF] hover:bg-[#3d8ae6] text-white">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy for {agent.marketPrice} USDC
                      </Button>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 border-[#4DA2FF] text-[#4DA2FF] hover:bg-[#4DA2FF] hover:text-white text-sm"
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Strategy
                        </Button>
                        <Link href={`/agent/${agent.id.slice(1)}/history`}>
                          <Button
                            variant="outline"
                            className="border-gray-300 text-[#030F1C] hover:bg-gray-50 text-sm"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Full History
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Metric Comparison Bars */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#011829] flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Metric Comparison
              </CardTitle>
              <CardDescription>
                Visual comparison of key performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* P&L Comparison */}
                <div>
                  <h4 className="font-medium text-[#011829] mb-3">
                    Return on Investment (ROI)
                  </h4>
                  <div className="space-y-3">
                    {filteredAgents.map((agent) => {
                      const { percentage } = calculatePnL(agent);
                      const maxRoi = Math.max(
                        ...filteredAgents.map(
                          (a) =>
                            ((a.currentValue - a.mintPrice) / a.mintPrice) * 100
                        )
                      );
                      const barWidth =
                        (Math.abs(percentage) / Math.abs(maxRoi)) * 100;

                      return (
                        <div
                          key={agent.id}
                          className="flex items-center space-x-4"
                        >
                          <div className="w-20 text-sm font-medium text-[#011829]">
                            {agent.id}
                          </div>
                          <div className="flex-1 bg-gray-100 rounded-full h-4 relative">
                            <div
                              className={`h-4 rounded-full ${
                                percentage >= 0 ? "bg-green-500" : "bg-red-500"
                              }`}
                              style={{ width: `${barWidth}%` }}
                            />
                          </div>
                          <div className="w-16 text-sm font-medium text-right">
                            <span
                              className={
                                percentage >= 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            >
                              {percentage >= 0 ? "+" : ""}
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Win Rate Comparison */}
                <div>
                  <h4 className="font-medium text-[#011829] mb-3">Win Rate</h4>
                  <div className="space-y-3">
                    {filteredAgents.map((agent) => {
                      const maxWinRate = getMaxValue("winRate");
                      const barWidth = (agent.winRate / maxWinRate) * 100;

                      return (
                        <div
                          key={agent.id}
                          className="flex items-center space-x-4"
                        >
                          <div className="w-20 text-sm font-medium text-[#011829]">
                            {agent.id}
                          </div>
                          <div className="flex-1 bg-gray-100 rounded-full h-4">
                            <div
                              className="bg-blue-500 h-4 rounded-full"
                              style={{ width: `${barWidth}%` }}
                            />
                          </div>
                          <div className="w-16 text-sm font-medium text-right text-[#011829]">
                            {agent.winRate}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Strategy Efficiency Comparison */}
                <div>
                  <h4 className="font-medium text-[#011829] mb-3">
                    Strategy Efficiency
                  </h4>
                  <div className="space-y-3">
                    {filteredAgents.map((agent) => {
                      const maxEfficiency = getMaxValue("strategyEfficiency");
                      const barWidth =
                        (agent.strategyEfficiency / maxEfficiency) * 100;

                      return (
                        <div
                          key={agent.id}
                          className="flex items-center space-x-4"
                        >
                          <div className="w-20 text-sm font-medium text-[#011829]">
                            {agent.id}
                          </div>
                          <div className="flex-1 bg-gray-100 rounded-full h-4">
                            <div
                              className="bg-purple-500 h-4 rounded-full"
                              style={{ width: `${barWidth}%` }}
                            />
                          </div>
                          <div className="w-16 text-sm font-medium text-right text-[#011829]">
                            {agent.strategyEfficiency}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
