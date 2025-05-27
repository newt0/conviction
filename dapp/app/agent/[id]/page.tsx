"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Bot,
  Target,
  Shield,
  TrendingUp,
  TrendingDown,
  Copy,
  ShoppingCart,
  Calendar,
  User,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  RotateCcw,
  CheckCircle,
  Clock,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

// Mock agent data - in real app this would come from API based on [id]
const getAgentData = (id: string) => {
  const agents = {
    "1042": {
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
      status: "Active",
      owner: "0x1234...5678",
      minter: "@kyohei_nft",
      daysActive: 18,
      winRate: 72.4,
      lockPeriodRemaining: 12,
      description:
        "This SUI_MAXIMIZER agent aggressively accumulates SUI ecosystem tokens during market dips. It uses advanced DCA strategies and rebalances weekly based on ecosystem growth metrics. Ideal for believers in Sui's long-term potential.",
      totalTrades: 47,
      avgTradeSize: 245.8,
      lastActive: "2 hours ago",
    },
    "0987": {
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
      status: "Evolving",
      owner: "0x9876...4321",
      minter: "@bitcoin_maxi",
      daysActive: 45,
      winRate: 68.9,
      lockPeriodRemaining: 0,
      description:
        "This BTC_HODLER agent uses DCA and rebalances weekly with a focus on long-term Bitcoin accumulation. It's designed for maximum conviction holders who believe in Bitcoin as digital gold.",
      totalTrades: 23,
      avgTradeSize: 1250.0,
      lastActive: "1 day ago",
    },
  };

  return agents[id as keyof typeof agents] || agents["1042"];
};

const performanceData = [
  { day: "Mon", value: 1000 },
  { day: "Tue", value: 1015 },
  { day: "Wed", value: 1008 },
  { day: "Thu", value: 1045 },
  { day: "Fri", value: 1089 },
  { day: "Sat", value: 1102 },
  { day: "Sun", value: 1172.2 },
];

const transactionHistory = [
  {
    id: 1,
    date: "2025-05-26",
    time: "14:32",
    action: "Buy",
    asset: "SUI",
    amount: "245.8 USDC",
    status: "Confirmed",
    icon: ArrowUpRight,
    color: "text-green-600",
    hash: "0x1234...5678",
  },
  {
    id: 2,
    date: "2025-05-26",
    time: "09:15",
    action: "Sell",
    asset: "USDT",
    amount: "150.0 USDC",
    status: "Confirmed",
    icon: ArrowDownRight,
    color: "text-red-600",
    hash: "0x2345...6789",
  },
  {
    id: 3,
    date: "2025-05-25",
    time: "16:45",
    action: "Rebalance",
    asset: "Portfolio",
    amount: "—",
    status: "Confirmed",
    icon: RotateCcw,
    color: "text-blue-600",
    hash: "0x3456...7890",
  },
  {
    id: 4,
    date: "2025-05-25",
    time: "11:20",
    action: "Buy",
    asset: "SUI",
    amount: "89.2 USDC",
    status: "Pending",
    icon: ArrowUpRight,
    color: "text-green-600",
    hash: "0x4567...8901",
  },
  {
    id: 5,
    date: "2025-05-24",
    time: "13:08",
    action: "Buy",
    asset: "BTC",
    amount: "0.015 BTC",
    status: "Confirmed",
    icon: ArrowUpRight,
    color: "text-green-600",
    hash: "0x5678...9012",
  },
];

interface AgentProfileProps {
  params: {
    id: string;
  };
}

export default function AgentProfilePage({ params }: AgentProfileProps) {
  const agent = getAgentData(params.id);
  const pnl = agent.currentValue - agent.mintPrice;
  const pnlPercentage = ((pnl / agent.mintPrice) * 100).toFixed(1);
  const isProfit = pnl >= 0;

  const marketDifference = agent.marketPrice - agent.currentValue;
  const marketDiffPercentage = (
    (marketDifference / agent.currentValue) *
    100
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#011829] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-[#011829] font-bold text-xl">
                ConvictionFi
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/marketplace">
                <Button variant="ghost" className="text-[#030F1C]">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Marketplace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Agent Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-[#011829] flex items-center mb-2">
                        <Bot className="mr-3 h-7 w-7 text-[#4DA2FF]" />
                        Agent NFT {agent.id}
                      </CardTitle>
                      <div className="flex items-center space-x-4 mb-4">
                        <Badge
                          className={
                            agent.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : agent.status === "Evolving"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {agent.status === "Active"
                            ? "🟢"
                            : agent.status === "Evolving"
                            ? "🟡"
                            : "🔴"}{" "}
                          {agent.status}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <agent.icon className="h-4 w-4 text-[#4DA2FF]" />
                          <Badge className={agent.color}>
                            {agent.strategyLabel}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-[#030F1C]">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>Minted by {agent.minter}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Active for {agent.daysActive} days</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Activity className="h-4 w-4" />
                          <span>Last active {agent.lastActive}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Evolution Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-[#011829]">
                        Evolution Progress
                      </p>
                      <span className="text-sm text-[#030F1C]">
                        Stage {agent.evolutionStage}/{agent.maxStage}
                      </span>
                    </div>
                    <Progress
                      value={(agent.evolutionStage / agent.maxStage) * 100}
                      className="h-3"
                    />
                    <p className="text-xs text-[#030F1C] mt-1">
                      {agent.evolutionStage === agent.maxStage
                        ? "Agent has reached maximum evolution"
                        : "Agent is learning and adapting to market conditions"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829]">Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm font-medium text-[#011829] mb-1">
                        Mint Price
                      </p>
                      <p className="text-xl font-semibold text-[#030F1C]">
                        {agent.mintPrice} USDC
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#011829] mb-1">
                        Current Value
                      </p>
                      <p className="text-xl font-semibold text-[#030F1C]">
                        {agent.currentValue} USDC
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#011829] mb-1">
                        Market Price
                      </p>
                      <div className="flex items-center space-x-2">
                        <p className="text-xl font-bold text-[#030F1C]">
                          {agent.marketPrice} USDC
                        </p>
                        {Math.abs(Number.parseFloat(marketDiffPercentage)) >
                          2 && (
                          <Badge
                            className={
                              marketDifference > 0
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }
                          >
                            {marketDifference > 0 ? "+" : ""}
                            {marketDiffPercentage}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#011829] mb-1">
                        P&L
                      </p>
                      <div className="flex items-center space-x-2">
                        {isProfit ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                        <p
                          className={`text-xl font-semibold ${
                            isProfit ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {isProfit ? "+" : ""}
                          {pnl.toFixed(1)} USDC ({pnlPercentage}%)
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#011829] mb-1">
                        Lock Period
                      </p>
                      <p className="text-xl font-semibold text-[#030F1C]">
                        {agent.lockPeriodRemaining > 0
                          ? `${agent.lockPeriodRemaining} days`
                          : "Unlocked"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#011829] mb-1">
                        Win Rate
                      </p>
                      <p className="text-xl font-semibold text-green-600">
                        {agent.winRate}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829]">
                    7-Day Performance
                  </CardTitle>
                  <CardDescription>
                    Value tracking over the past week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-end justify-between h-full space-x-2">
                      {performanceData.map((data, index) => {
                        const height = ((data.value - 1000) / 172.2) * 100;
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1"
                          >
                            <div className="text-xs text-[#030F1C] mb-2">
                              {data.value}
                            </div>
                            <div
                              className="bg-[#4DA2FF] rounded-t-sm w-full min-h-[4px] transition-all"
                              style={{ height: `${Math.max(height, 4)}%` }}
                            ></div>
                            <span className="text-xs text-[#030F1C] mt-2">
                              {data.day}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transaction History */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829]">
                    Transaction History
                  </CardTitle>
                  <CardDescription>Recent trading activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactionHistory.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-2 rounded-full bg-white ${transaction.color}`}
                          >
                            <transaction.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-[#011829]">
                              {transaction.action}
                            </p>
                            <p className="text-sm text-[#030F1C]">
                              {transaction.asset} • {transaction.date}{" "}
                              {transaction.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-[#011829]">
                            {transaction.amount}
                          </p>
                          <div className="flex items-center space-x-2">
                            {transaction.status === "Confirmed" ? (
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            ) : (
                              <Clock className="h-3 w-3 text-yellow-600" />
                            )}
                            <span
                              className={`text-xs ${
                                transaction.status === "Confirmed"
                                  ? "text-green-600"
                                  : "text-yellow-600"
                              }`}
                            >
                              {transaction.status}
                            </span>
                            <button className="text-xs text-[#4DA2FF] hover:text-[#3d8ae6] ml-2">
                              <ExternalLink className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-6">
              {/* Call to Action */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829]">
                    Purchase Agent
                  </CardTitle>
                  <CardDescription>
                    Take ownership of this agent and its trading history
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-[#4DA2FF]/5 rounded-lg">
                    <p className="text-sm text-[#030F1C] mb-2">Market Price</p>
                    <p className="text-2xl font-bold text-[#011829]">
                      {agent.marketPrice} USDC
                    </p>
                  </div>

                  <Button className="w-full bg-[#4DA2FF] hover:bg-[#3d8ae6] text-white py-3">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Buy Agent for {agent.marketPrice} USDC
                  </Button>

                  <Separator />

                  <Button
                    variant="outline"
                    className="w-full border-[#4DA2FF] text-[#4DA2FF] hover:bg-[#4DA2FF] hover:text-white py-3"
                  >
                    <Copy className="mr-2 h-5 w-5" />
                    Copy This Strategy
                  </Button>

                  <p className="text-xs text-[#030F1C] text-center">
                    When you buy this agent, you take over its wallet and
                    trading history.
                  </p>
                </CardContent>
              </Card>

              {/* Agent Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829]">
                    Strategy Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#030F1C] leading-relaxed">
                    {agent.description}
                  </p>
                </CardContent>
              </Card>

              {/* Agent Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829]">
                    Agent Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#030F1C]">
                      Total Trades:
                    </span>
                    <span className="font-medium text-[#011829]">
                      {agent.totalTrades}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#030F1C]">
                      Avg Trade Size:
                    </span>
                    <span className="font-medium text-[#011829]">
                      {agent.avgTradeSize} USDC
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#030F1C]">Win Rate:</span>
                    <span className="font-medium text-green-600">
                      {agent.winRate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#030F1C]">Days Active:</span>
                    <span className="font-medium text-[#011829]">
                      {agent.daysActive}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#030F1C]">
                      Current Owner:
                    </span>
                    <span className="font-mono text-sm text-[#4DA2FF]">
                      {agent.owner}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
