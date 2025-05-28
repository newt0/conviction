"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Bot,
  Target,
  Shield,
  PieChart,
  TrendingUp,
  TrendingDown,
  User,
  Share,
  Trophy,
  Calendar,
  Activity,
  Copy,
  Plus,
  BarChart3,
  Eye,
} from "lucide-react";
import Link from "next/link";

// Mock user data
const userData = {
  handle: "@kyohei_nft",
  walletAddress: "0x1234...5678",
  totalAgents: 3,
  cumulativeROI: 412.4,
  avgWinRate: 68.3,
  totalCapitalDeployed: 6500,
  totalTrades: 126,
  totalEarnings: 412.4,
};

// Mock owned agents
const ownedAgents = [
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
    daysActive: 18,
    performanceData: [1000, 1015, 1008, 1045, 1089, 1102, 1172.2],
  },
  {
    id: "#1078",
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
    daysActive: 25,
    performanceData: [2500, 2520, 2480, 2650, 2780, 2820, 2891.5],
  },
  {
    id: "#1120",
    strategy: "STABLE_OPTIMIZER",
    strategyLabel: "Stable Optimizer",
    icon: PieChart,
    color: "bg-green-100 text-green-600",
    mintPrice: 3000,
    currentValue: 3148.7,
    marketPrice: 3200,
    evolutionStage: 2,
    maxStage: 4,
    winRate: 89.2,
    daysActive: 8,
    performanceData: [3000, 3025, 3040, 3080, 3120, 3135, 3148.7],
  },
];

// Mock portfolio performance data
const portfolioPerformance = [
  { day: "Mon", value: 6500 },
  { day: "Tue", value: 6560 },
  { day: "Wed", value: 6528 },
  { day: "Thu", value: 6775 },
  { day: "Fri", value: 6989 },
  { day: "Sat", value: 7057 },
  { day: "Sun", value: 7212.4 },
];

// Mock copy history
const copyHistory = [
  {
    id: 1,
    sourceAgent: "#0987",
    sourceStrategy: "BTC_HODLER",
    copyDate: "2025-05-15",
    currentROI: 15.7,
    myAgent: "#1078",
  },
  {
    id: 2,
    sourceAgent: "#1337",
    sourceStrategy: "STABLE_OPTIMIZER",
    copyDate: "2025-05-18",
    currentROI: 4.9,
    myAgent: "#1120",
  },
];

// Mock milestones
const milestones = [
  {
    id: 1,
    title: "Evolution Master",
    description: "Agent #1078 reached Stage 4",
    date: "2025-05-20",
    type: "evolution",
    icon: Trophy,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: 2,
    title: "Profit Milestone",
    description: "Portfolio exceeded +25% ROI",
    date: "2025-05-18",
    type: "profit",
    icon: TrendingUp,
    color: "bg-green-100 text-green-700",
  },
  {
    id: 3,
    title: "Top Performer",
    description: "Agent #1042 in top 5% of SUI_MAXIMIZER agents",
    date: "2025-05-16",
    type: "ranking",
    icon: Target,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 4,
    title: "Strategy Diversifier",
    description: "Deployed 3 different strategy types",
    date: "2025-05-14",
    type: "diversity",
    icon: PieChart,
    color: "bg-orange-100 text-orange-700",
  },
];

export default function ProfilePage() {
  const calculatePnL = (agent: (typeof ownedAgents)[0]) => {
    const pnl = agent.currentValue - agent.mintPrice;
    const percentage = (pnl / agent.mintPrice) * 100;
    return { pnl, percentage };
  };

  const convictionDistribution = [
    { strategy: "SUI_MAXIMIZER", percentage: 60, color: "bg-[#4DA2FF]" },
    { strategy: "BTC_HODLER", percentage: 30, color: "bg-orange-500" },
    { strategy: "STABLE_OPTIMIZER", percentage: 10, color: "bg-green-500" },
  ];

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
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <User className="h-8 w-8 text-[#4DA2FF]" />
                  <h1 className="text-3xl md:text-4xl font-bold text-[#011829]">
                    My Conviction Dashboard
                  </h1>
                </div>
                <div className="flex items-center space-x-4 text-[#030F1C]">
                  <span className="font-medium">{userData.handle}</span>
                  <span className="font-mono text-sm">
                    {userData.walletAddress}
                  </span>
                </div>
              </div>
              <Button className="bg-[#4DA2FF] hover:bg-[#3d8ae6] text-white">
                <Share className="mr-2 h-4 w-4" />
                Share My Conviction
              </Button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-5 w-5 text-[#4DA2FF]" />
                    <div>
                      <p className="text-sm text-[#030F1C]">Total Agents</p>
                      <p className="text-2xl font-bold text-[#011829]">
                        {userData.totalAgents}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-[#030F1C]">Cumulative ROI</p>
                      <p className="text-2xl font-bold text-green-600">
                        +{userData.cumulativeROI} USDC
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-[#4DA2FF]" />
                    <div>
                      <p className="text-sm text-[#030F1C]">Avg Win Rate</p>
                      <p className="text-2xl font-bold text-[#011829]">
                        {userData.avgWinRate}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-[#4DA2FF]" />
                    <div>
                      <p className="text-sm text-[#030F1C]">Total Trades</p>
                      <p className="text-2xl font-bold text-[#011829]">
                        {userData.totalTrades}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Conviction Portfolio */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829] flex items-center">
                    <Bot className="mr-2 h-5 w-5" />
                    My Agent Portfolio
                  </CardTitle>
                  <CardDescription>
                    Your conviction-based AI trading agents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {ownedAgents.map((agent) => {
                      const { pnl, percentage } = calculatePnL(agent);
                      const isProfit = pnl >= 0;

                      return (
                        <Card
                          key={agent.id}
                          className="border hover:border-[#4DA2FF] transition-colors"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <agent.icon className="h-5 w-5 text-[#4DA2FF]" />
                                <div>
                                  <h3 className="font-semibold text-[#011829]">
                                    Agent {agent.id}
                                  </h3>
                                  <Badge className={agent.color}>
                                    {agent.strategyLabel}
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-[#011829]">
                                  {agent.currentValue} USDC
                                </p>
                                <div className="flex items-center space-x-1">
                                  {isProfit ? (
                                    <TrendingUp className="h-3 w-3 text-green-600" />
                                  ) : (
                                    <TrendingDown className="h-3 w-3 text-red-600" />
                                  )}
                                  <span
                                    className={`text-sm ${
                                      isProfit
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {isProfit ? "+" : ""}
                                    {percentage.toFixed(1)}%
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-[#030F1C]">
                                  Mint Price
                                </p>
                                <p className="font-medium text-[#011829]">
                                  {agent.mintPrice} USDC
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-[#030F1C]">
                                  Market Price
                                </p>
                                <p className="font-medium text-[#011829]">
                                  {agent.marketPrice} USDC
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-[#030F1C]">
                                  Evolution
                                </p>
                                <p className="font-medium text-[#011829]">
                                  {agent.evolutionStage}/{agent.maxStage}
                                </p>
                              </div>
                            </div>

                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-[#030F1C]">
                                  7-Day Trend
                                </span>
                                <span className="text-[#030F1C]">
                                  {agent.daysActive} days active
                                </span>
                              </div>
                              {renderSparkline(agent.performanceData)}
                            </div>

                            <Link href={`/agent/${agent.id.slice(1)}`}>
                              <Button className="w-full bg-[#4DA2FF] hover:bg-[#3d8ae6] text-white">
                                <Eye className="mr-2 h-4 w-4" />
                                View Agent Details
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829] flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Portfolio Performance
                  </CardTitle>
                  <CardDescription>
                    7-day portfolio value tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-[#030F1C]">Total Capital</p>
                      <p className="text-lg font-semibold text-[#011829]">
                        {userData.totalCapitalDeployed} USDC
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#030F1C]">Current Value</p>
                      <p className="text-lg font-semibold text-[#011829]">
                        {userData.totalCapitalDeployed + userData.cumulativeROI}{" "}
                        USDC
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#030F1C]">Total Earnings</p>
                      <p className="text-lg font-semibold text-green-600">
                        +{userData.totalEarnings} USDC
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#030F1C]">Avg ROI</p>
                      <p className="text-lg font-semibold text-green-600">
                        +
                        {(
                          (userData.cumulativeROI /
                            userData.totalCapitalDeployed) *
                          100
                        ).toFixed(1)}
                        %
                      </p>
                    </div>
                  </div>

                  <div className="h-48 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-end justify-between h-full space-x-2">
                      {portfolioPerformance.map((data, index) => {
                        const height = ((data.value - 6500) / 712.4) * 100;
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
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Conviction Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829] flex items-center">
                    <PieChart className="mr-2 h-5 w-5" />
                    Conviction Distribution
                  </CardTitle>
                  <CardDescription>
                    Your ideological focus breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {convictionDistribution.map((item) => (
                      <div key={item.strategy}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#030F1C]">
                            {item.strategy.replace("_", " ")}
                          </span>
                          <span className="font-medium text-[#011829]">
                            {item.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Copy History */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829] flex items-center">
                    <Copy className="mr-2 h-5 w-5" />
                    Copy History
                  </CardTitle>
                  <CardDescription>
                    Agents created by copying others
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {copyHistory.map((copy) => (
                      <div key={copy.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-[#011829]">
                              My Agent {copy.myAgent}
                            </p>
                            <p className="text-xs text-[#030F1C]">
                              Copied from {copy.sourceAgent}
                            </p>
                          </div>
                          <Badge
                            className={
                              copy.currentROI > 0
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          >
                            {copy.currentROI > 0 ? "+" : ""}
                            {copy.currentROI}%
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-[#030F1C]">
                          <Calendar className="h-3 w-3" />
                          <span>{copy.copyDate}</span>
                          <span>•</span>
                          <span>{copy.sourceStrategy.replace("_", " ")}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Agent Milestones */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829] flex items-center">
                    <Trophy className="mr-2 h-5 w-5" />
                    Recent Milestones
                  </CardTitle>
                  <CardDescription>
                    Your achievements and progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {milestones.slice(0, 4).map((milestone) => (
                      <div
                        key={milestone.id}
                        className="flex items-start space-x-3"
                      >
                        <div className={`p-1 rounded-full ${milestone.color}`}>
                          <milestone.icon className="h-3 w-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#011829] text-sm">
                            {milestone.title}
                          </p>
                          <p className="text-xs text-[#030F1C]">
                            {milestone.description}
                          </p>
                          <p className="text-xs text-[#030F1C] mt-1">
                            {milestone.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829]">
                    Expand Your Conviction
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/mint">
                    <Button className="w-full bg-[#011829] hover:bg-[#022a3d] text-white">
                      <Plus className="mr-2 h-4 w-4" />
                      Mint Another Agent
                    </Button>
                  </Link>
                  <Link href="/compare">
                    <Button
                      variant="outline"
                      className="w-full border-[#4DA2FF] text-[#4DA2FF] hover:bg-[#4DA2FF] hover:text-white"
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Compare My Agents
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
