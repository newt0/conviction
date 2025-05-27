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
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  RotateCcw,
  CheckCircle,
  Clock,
  ExternalLink,
  Zap,
  Settings,
  AlertTriangle,
  Brain,
  Activity,
} from "lucide-react";
import Link from "next/link";

// Mock agent data
const getAgentData = (id: string) => {
  const agents = {
    "1042": {
      id: "#1042",
      strategy: "SUI_MAXIMIZER",
      strategyLabel: "SUI Maximizer",
      icon: Target,
      color: "bg-[#4DA2FF]/10 text-[#4DA2FF]",
    },
    "0987": {
      id: "#0987",
      strategy: "BTC_HODLER",
      strategyLabel: "BTC Hodler",
      icon: Shield,
      color: "bg-orange-100 text-orange-600",
    },
  };
  return agents[id as keyof typeof agents] || agents["1042"];
};

// Mock evolution timeline data
const evolutionTimeline = [
  {
    id: 1,
    stage: "Stage 3 → 4",
    date: "2025-05-20",
    time: "14:30",
    title: "Advanced Pattern Recognition Unlocked",
    description:
      "Agent learned to identify complex market patterns and improved prediction accuracy by 15%.",
    status: "completed",
    icon: Brain,
    color: "text-purple-600",
  },
  {
    id: 2,
    stage: "Stage 2 → 3",
    date: "2025-05-15",
    time: "09:45",
    title: "Dynamic Rebalancing Enabled",
    description:
      "Increased allocation to SUI after detecting ecosystem growth spike. Reduced rebalancing interval to 3 days.",
    status: "completed",
    icon: Settings,
    color: "text-blue-600",
  },
  {
    id: 3,
    stage: "Stage 1 → 2",
    date: "2025-05-10",
    time: "16:20",
    title: "Risk Management Upgrade",
    description:
      "Implemented advanced stop-loss mechanisms and volatility-based position sizing.",
    status: "completed",
    icon: Shield,
    color: "text-green-600",
  },
  {
    id: 4,
    stage: "Genesis",
    date: "2025-05-08",
    time: "12:00",
    title: "Agent Deployed",
    description:
      "Initial deployment with SUI_MAXIMIZER strategy. Beginning autonomous trading operations.",
    status: "completed",
    icon: Zap,
    color: "text-yellow-600",
  },
];

// Mock strategy adaptation log
const strategyAdaptations = [
  {
    id: 1,
    date: "2025-05-22",
    time: "11:15",
    type: "Rebalancing",
    change: "Changed rebalancing interval from 7d to 3d",
    reason: "Increased market volatility detected",
    impact: "+3.2% efficiency",
    icon: RotateCcw,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    date: "2025-05-19",
    time: "08:30",
    type: "Risk Management",
    change: "Enabled fallback strategy after USDT depeg event",
    reason: "Stablecoin risk mitigation",
    impact: "Protected 12% of portfolio",
    icon: AlertTriangle,
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: 3,
    date: "2025-05-16",
    time: "14:45",
    type: "Oracle Update",
    change: "Added new oracle source for SUI price feeds",
    reason: "Improved price accuracy",
    impact: "+1.8% trade precision",
    icon: Activity,
    color: "bg-green-100 text-green-700",
  },
  {
    id: 4,
    date: "2025-05-12",
    time: "10:20",
    type: "Allocation",
    change: "Increased SUI allocation from 60% to 75%",
    reason: "Ecosystem growth indicators",
    impact: "+5.4% portfolio value",
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-700",
  },
];

// Mock detailed transaction log
const detailedTransactions = [
  {
    id: 1,
    date: "2025-05-26",
    time: "14:32",
    action: "Buy",
    asset: "SUI",
    amount: "245.8 USDC",
    price: "1.24 USDC",
    reason: "DCA trigger - weekly accumulation",
    performanceImpact: "+2.3%",
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
    price: "0.998 USDC",
    reason: "Yield optimization - move to higher APY",
    performanceImpact: "+0.8%",
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
    price: "—",
    reason: "Weekly rebalancing - maintain target allocation",
    performanceImpact: "+1.2%",
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
    price: "1.18 USDC",
    reason: "Dip buying - 5% price drop detected",
    performanceImpact: "+4.1%",
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
    price: "67,450 USDC",
    reason: "Diversification - reduce SUI concentration",
    performanceImpact: "-0.5%",
    status: "Confirmed",
    icon: ArrowUpRight,
    color: "text-green-600",
    hash: "0x5678...9012",
  },
];

// Mock agent thoughts/notes
const agentThoughts = [
  {
    id: 1,
    date: "2025-05-26",
    time: "15:00",
    thought:
      "Volatility detected in SUI ecosystem. Reallocating to stable yield vaults temporarily to preserve gains.",
    sentiment: "cautious",
    icon: AlertTriangle,
  },
  {
    id: 2,
    date: "2025-05-25",
    time: "12:30",
    thought:
      "Strong ecosystem growth signals detected. Increasing SUI allocation confidence level to 85%.",
    sentiment: "bullish",
    icon: TrendingUp,
  },
  {
    id: 3,
    date: "2025-05-24",
    time: "09:15",
    thought:
      "Market correlation analysis shows BTC divergence opportunity. Adding small position for diversification.",
    sentiment: "analytical",
    icon: Brain,
  },
];

interface AgentHistoryProps {
  params: {
    id: string;
  };
}

export default function AgentHistoryPage({ params }: AgentHistoryProps) {
  const agent = getAgentData(params.id);

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
              <Link href={`/agent/${params.id}`}>
                <Button variant="ghost" className="text-[#030F1C]">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Agent Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <Bot className="h-8 w-8 text-[#4DA2FF]" />
              <h1 className="text-3xl md:text-4xl font-bold text-[#011829]">
                Agent {agent.id} History
              </h1>
            </div>
            <p className="text-lg text-[#030F1C]">
              A complete log of this agent's evolution and trading decisions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Evolution Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829] flex items-center">
                    <Brain className="mr-2 h-5 w-5" />
                    Evolution Timeline
                  </CardTitle>
                  <CardDescription>
                    Major milestones in agent development
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {evolutionTimeline.map((milestone, index) => (
                      <div
                        key={milestone.id}
                        className="flex items-start space-x-4"
                      >
                        <div className="flex flex-col items-center">
                          <div
                            className={`p-2 rounded-full bg-white border-2 border-gray-200 ${milestone.color}`}
                          >
                            <milestone.icon className="h-4 w-4" />
                          </div>
                          {index < evolutionTimeline.length - 1 && (
                            <div className="w-px h-16 bg-gray-200 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge className="bg-[#4DA2FF]/10 text-[#4DA2FF]">
                              {milestone.stage}
                            </Badge>
                            <span className="text-sm text-[#030F1C]">
                              {milestone.date} • {milestone.time}
                            </span>
                          </div>
                          <h3 className="font-semibold text-[#011829] mb-1">
                            {milestone.title}
                          </h3>
                          <p className="text-[#030F1C] text-sm">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Strategy Adaptation Log */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829] flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Strategy Adaptations
                  </CardTitle>
                  <CardDescription>
                    How the agent has modified its approach over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {strategyAdaptations.map((adaptation) => (
                      <div
                        key={adaptation.id}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`p-1 rounded-full ${adaptation.color}`}
                            >
                              <adaptation.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <Badge className={adaptation.color}>
                                {adaptation.type}
                              </Badge>
                              <p className="text-sm text-[#030F1C] mt-1">
                                {adaptation.date} • {adaptation.time}
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-700">
                            {adaptation.impact}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-[#011829] mb-1">
                          {adaptation.change}
                        </h4>
                        <p className="text-sm text-[#030F1C]">
                          {adaptation.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Transaction Log */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829] flex items-center">
                    <Activity className="mr-2 h-5 w-5" />
                    Detailed Transaction Log
                  </CardTitle>
                  <CardDescription>
                    Complete trading history with reasoning and impact
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {detailedTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`p-2 rounded-full bg-white ${transaction.color}`}
                            >
                              <transaction.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-[#011829]">
                                  {transaction.action}
                                </span>
                                <span className="text-[#030F1C]">
                                  {transaction.asset}
                                </span>
                                {transaction.status === "Confirmed" ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Clock className="h-4 w-4 text-yellow-600" />
                                )}
                              </div>
                              <p className="text-sm text-[#030F1C]">
                                {transaction.date} • {transaction.time}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-[#011829]">
                              {transaction.amount}
                            </p>
                            {transaction.price !== "—" && (
                              <p className="text-sm text-[#030F1C]">
                                @ {transaction.price}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="ml-11 space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-[#030F1C]">
                              <span className="font-medium">Reason:</span>{" "}
                              {transaction.reason}
                            </p>
                            <Badge
                              className={
                                transaction.performanceImpact.startsWith("+")
                                  ? "bg-green-100 text-green-700"
                                  : transaction.performanceImpact.startsWith(
                                      "-"
                                    )
                                  ? "bg-red-100 text-red-700"
                                  : "bg-gray-100 text-gray-700"
                              }
                            >
                              {transaction.performanceImpact} ROI
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-[#030F1C] font-mono">
                              {transaction.hash}
                            </span>
                            <button className="text-xs text-[#4DA2FF] hover:text-[#3d8ae6]">
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

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agent Thoughts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829] flex items-center">
                    <Brain className="mr-2 h-5 w-5" />
                    Agent Thoughts
                  </CardTitle>
                  <CardDescription>
                    AI reasoning and decision-making process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {agentThoughts.map((thought) => (
                      <div
                        key={thought.id}
                        className="p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <thought.icon className="h-4 w-4 text-[#4DA2FF]" />
                          <span className="text-xs text-[#030F1C]">
                            {thought.date} • {thought.time}
                          </span>
                          <Badge
                            className={
                              thought.sentiment === "bullish"
                                ? "bg-green-100 text-green-700"
                                : thought.sentiment === "cautious"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                            }
                          >
                            {thought.sentiment}
                          </Badge>
                        </div>
                        <p className="text-sm text-[#030F1C] italic">
                          "{thought.thought}"
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#011829]">
                    Historical Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#030F1C]">
                      Total Evolutions:
                    </span>
                    <span className="font-medium text-[#011829]">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#030F1C]">
                      Strategy Changes:
                    </span>
                    <span className="font-medium text-[#011829]">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#030F1C]">
                      Total Transactions:
                    </span>
                    <span className="font-medium text-[#011829]">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#030F1C]">
                      Avg Performance Impact:
                    </span>
                    <span className="font-medium text-green-600">+2.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#030F1C]">
                      Days Since Genesis:
                    </span>
                    <span className="font-medium text-[#011829]">18</span>
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
