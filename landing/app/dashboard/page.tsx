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
import {
  Bot,
  TrendingUp,
  Activity,
  Wallet,
  Target,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  RotateCcw,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";

// Mock data
const agentData = {
  id: "#1337",
  strategy: "SUI_MAXIMIZER",
  mintPrice: 1000,
  currentValue: 1124.3,
  status: "Active",
  evolutionStage: 2,
  maxEvolutionStage: 4,
  dailyChange: 2.4,
  weeklyChange: 12.4,
};

const performanceData = [
  { day: "Mon", value: 1000 },
  { day: "Tue", value: 1015 },
  { day: "Wed", value: 1008 },
  { day: "Thu", value: 1045 },
  { day: "Fri", value: 1089 },
  { day: "Sat", value: 1102 },
  { day: "Sun", value: 1124.3 },
];

const transactionLog = [
  {
    id: 1,
    date: "2025-05-26",
    time: "14:32",
    action: "Buy",
    asset: "SUI",
    amount: "245.8",
    status: "Confirmed",
    icon: ArrowUpRight,
    color: "text-green-600",
  },
  {
    id: 2,
    date: "2025-05-26",
    time: "09:15",
    action: "Sell",
    asset: "USDT",
    amount: "150.0",
    status: "Confirmed",
    icon: ArrowDownRight,
    color: "text-red-600",
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
  },
  {
    id: 4,
    date: "2025-05-25",
    time: "11:20",
    action: "Buy",
    asset: "SUI",
    amount: "89.2",
    status: "Pending",
    icon: ArrowUpRight,
    color: "text-green-600",
  },
  {
    id: 5,
    date: "2025-05-24",
    time: "13:08",
    action: "Buy",
    asset: "BTC",
    amount: "0.015",
    status: "Confirmed",
    icon: ArrowUpRight,
    color: "text-green-600",
  },
];

export default function DashboardPage() {
  const profitLoss = agentData.currentValue - agentData.mintPrice;
  const profitLossPercentage = (
    (profitLoss / agentData.mintPrice) *
    100
  ).toFixed(1);
  const isProfit = profitLoss >= 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#011829] mb-2">
              Agent Dashboard
            </h1>
            <p className="text-lg text-[#030F1C]">
              Track the performance and evolution of your conviction-based
              agent.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Agent Summary & Performance */}
            <div className="lg:col-span-2 space-y-6">
              {/* Agent Summary Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#011829] flex items-center">
                      <Bot className="mr-2 h-6 w-6 text-[#4DA2FF]" />
                      Agent NFT {agentData.id}
                    </CardTitle>
                    <Badge className="bg-green-100 text-green-700">
                      🟢 {agentData.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    SUI Maximizer • Autonomous Trading Agent
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium text-[#011829]">
                        Strategy
                      </p>
                      <div className="flex items-center mt-1">
                        <Target className="mr-1 h-4 w-4 text-[#4DA2FF]" />
                        <span className="text-[#030F1C]">
                          {agentData.strategy}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#011829]">
                        Mint Price
                      </p>
                      <p className="text-[#030F1C] mt-1">
                        {agentData.mintPrice} USDC
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#011829]">
                        Current Value
                      </p>
                      <p className="text-[#030F1C] mt-1 font-semibold">
                        {agentData.currentValue} USDC
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#011829]">P&L</p>
                      <p
                        className={`mt-1 font-semibold ${
                          isProfit ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isProfit ? "+" : ""}
                        {profitLoss.toFixed(1)} USDC ({profitLossPercentage}%)
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-[#011829]">
                        Evolution Progress
                      </p>
                      <span className="text-sm text-[#030F1C]">
                        Stage {agentData.evolutionStage}/
                        {agentData.maxEvolutionStage}
                      </span>
                    </div>
                    <Progress
                      value={
                        (agentData.evolutionStage /
                          agentData.maxEvolutionStage) *
                        100
                      }
                      className="h-2"
                    />
                    <p className="text-xs text-[#030F1C] mt-1">
                      Agent is learning and adapting to market conditions
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829] flex items-center">
                    <Activity className="mr-2 h-5 w-5" />
                    Performance Overview
                  </CardTitle>
                  <CardDescription>7-day value tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm text-[#030F1C]">Today</p>
                        <p className="font-semibold text-green-600">
                          +{agentData.dailyChange}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm text-[#030F1C]">This Week</p>
                        <p className="font-semibold text-green-600">
                          +{agentData.weeklyChange}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Simple Chart Visualization */}
                  <div className="h-48 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-end justify-between h-full space-x-2">
                      {performanceData.map((data, index) => {
                        const height = ((data.value - 1000) / 124.3) * 100;
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1"
                          >
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

            {/* Right Column - Transaction Log & Actions */}
            <div className="space-y-6">
              {/* Transaction Log */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829]">
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Latest agent transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactionLog.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-1 rounded-full bg-white ${transaction.color}`}
                          >
                            <transaction.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-[#011829] text-sm">
                              {transaction.action}
                            </p>
                            <p className="text-xs text-[#030F1C]">
                              {transaction.asset} • {transaction.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-[#011829] text-sm">
                            {transaction.amount}
                          </p>
                          <div className="flex items-center space-x-1">
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
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829]">
                    Agent Controls
                  </CardTitle>
                  <CardDescription>Manage your agent and funds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full bg-[#4DA2FF] hover:bg-[#3d8ae6] text-white"
                    disabled
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Withdraw Funds
                  </Button>
                  <p className="text-xs text-[#030F1C] text-center">
                    Withdrawals available after 30-day lock period
                  </p>
                  <Link href="/mint" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-[#4DA2FF] text-[#4DA2FF] hover:bg-[#4DA2FF] hover:text-white"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Mint Another Agent
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Agent Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829]">
                    Agent Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#030F1C]">
                      Total Trades:
                    </span>
                    <span className="font-medium text-[#011829]">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#030F1C]">Win Rate:</span>
                    <span className="font-medium text-green-600">68.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#030F1C]">
                      Active Since:
                    </span>
                    <span className="font-medium text-[#011829]">12 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#030F1C]">
                      Next Evolution:
                    </span>
                    <span className="font-medium text-[#4DA2FF]">3 days</span>
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
