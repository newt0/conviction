"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
  Search,
  TrendingUp,
  TrendingDown,
  Copy,
  ShoppingCart,
  Filter,
} from "lucide-react";
import Link from "next/link";

// Mock agent data
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
    status: "Active",
    owner: "0x1234...5678",
    daysActive: 18,
    winRate: 72.4,
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
    status: "Evolving",
    owner: "0x9876...4321",
    daysActive: 45,
    winRate: 68.9,
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
    status: "Active",
    owner: "0x5555...9999",
    daysActive: 12,
    winRate: 89.2,
  },
  {
    id: "#0756",
    strategy: "SUI_MAXIMIZER",
    strategyLabel: "SUI Maximizer",
    icon: Target,
    color: "bg-[#4DA2FF]/10 text-[#4DA2FF]",
    mintPrice: 1500,
    currentValue: 1423.7,
    marketPrice: 1350,
    evolutionStage: 1,
    maxStage: 4,
    status: "Active",
    owner: "0x7777...1111",
    daysActive: 7,
    winRate: 45.2,
  },
  {
    id: "#1205",
    strategy: "BTC_HODLER",
    strategyLabel: "BTC Hodler",
    icon: Shield,
    color: "bg-orange-100 text-orange-600",
    mintPrice: 3000,
    currentValue: 3456.9,
    marketPrice: 3600,
    evolutionStage: 3,
    maxStage: 4,
    status: "Active",
    owner: "0x2222...8888",
    daysActive: 28,
    winRate: 71.8,
  },
  {
    id: "#0892",
    strategy: "STABLE_OPTIMIZER",
    strategyLabel: "Stable Optimizer",
    icon: PieChart,
    color: "bg-green-100 text-green-600",
    mintPrice: 800,
    currentValue: 847.2,
    marketPrice: 825,
    evolutionStage: 2,
    maxStage: 4,
    status: "Active",
    owner: "0x3333...7777",
    daysActive: 15,
    winRate: 82.1,
  },
];

type SortOption = "newest" | "pnl" | "stage" | "strategy";
type FilterOption = "all" | "SUI_MAXIMIZER" | "BTC_HODLER" | "STABLE_OPTIMIZER";

export default function MarketplacePage() {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and sort agents
  const filteredAgents = mockAgents
    .filter((agent) => {
      if (filterBy === "all") return true;
      return agent.strategy === filterBy;
    })
    .filter((agent) => {
      if (!searchQuery) return true;
      return (
        agent.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.strategyLabel.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "pnl":
          const aPnL = ((a.currentValue - a.mintPrice) / a.mintPrice) * 100;
          const bPnL = ((b.currentValue - b.mintPrice) / b.mintPrice) * 100;
          return bPnL - aPnL;
        case "stage":
          return b.evolutionStage - a.evolutionStage;
        case "strategy":
          return a.strategy.localeCompare(b.strategy);
        case "newest":
        default:
          return (
            Number.parseInt(b.id.slice(1)) - Number.parseInt(a.id.slice(1))
          );
      }
    });

  const calculatePnL = (agent: (typeof mockAgents)[0]) => {
    const pnl = agent.currentValue - agent.mintPrice;
    const percentage = (pnl / agent.mintPrice) * 100;
    return { pnl, percentage };
  };

  const calculateMarketStatus = (agent: (typeof mockAgents)[0]) => {
    const difference = agent.marketPrice - agent.currentValue;
    const percentageDiff = (difference / agent.currentValue) * 100;

    if (Math.abs(percentageDiff) < 2) {
      return { status: "fair", badge: null };
    } else if (percentageDiff > 0) {
      return {
        status: "premium",
        badge: {
          text: `+${percentageDiff.toFixed(1)}%`,
          color: "bg-red-100 text-red-700",
        },
      };
    } else {
      return {
        status: "discount",
        badge: {
          text: `${percentageDiff.toFixed(1)}%`,
          color: "bg-green-100 text-green-700",
        },
      };
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#011829] mb-2">
              Agent Marketplace
            </h1>
            <p className="text-lg text-[#030F1C]">
              Explore conviction-based AI agents minted by others. Filter by
              strategy, performance, or evolution stage.
            </p>
          </div>

          {/* Filter & Sort Bar */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Strategy Filter */}
              <Select
                value={filterBy}
                onValueChange={(value: FilterOption) => setFilterBy(value)}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="mr-2 h-4 w-4" />
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
            </div>

            {/* Sort */}
            <Select
              value={sortBy}
              onValueChange={(value: SortOption) => setSortBy(value)}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="pnl">Best Performance</SelectItem>
                <SelectItem value="stage">Evolution Stage</SelectItem>
                <SelectItem value="strategy">Strategy Type</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-[#030F1C]">
              Showing {filteredAgents.length} of {mockAgents.length} agents
            </p>
          </div>

          {/* Agent Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                        Agent NFT {agent.id}
                      </CardTitle>
                      <Badge
                        className={
                          agent.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      >
                        {agent.status === "Active" ? "🟢" : "🟡"} {agent.status}
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
                    </div>

                    {/* Market Price */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-[#011829]">
                            Market Price
                          </p>
                          <p className="text-[#030F1C] font-bold text-lg">
                            {agent.marketPrice} USDC
                          </p>
                        </div>
                        {(() => {
                          const marketStatus = calculateMarketStatus(agent);
                          return marketStatus.badge ? (
                            <Badge className={marketStatus.badge.color}>
                              {marketStatus.badge.text}
                            </Badge>
                          ) : null;
                        })()}
                      </div>
                    </div>

                    {/* P&L */}
                    <div>
                      <p className="text-sm font-medium text-[#011829]">
                        Performance
                      </p>
                      <div className="flex items-center space-x-2">
                        {isProfit ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                        <span
                          className={`font-semibold ${
                            isProfit ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {isProfit ? "+" : ""}
                          {pnl.toFixed(1)} USDC ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                    </div>

                    {/* Evolution Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-[#011829]">
                          Evolution
                        </p>
                        <span className="text-sm text-[#030F1C]">
                          Stage {agent.evolutionStage}/{agent.maxStage}
                        </span>
                      </div>
                      <Progress
                        value={(agent.evolutionStage / agent.maxStage) * 100}
                        className="h-2"
                      />
                    </div>

                    {/* Agent Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-[#030F1C]">Win Rate</p>
                        <p className="font-medium text-[#011829]">
                          {agent.winRate}%
                        </p>
                      </div>
                      <div>
                        <p className="text-[#030F1C]">Active</p>
                        <p className="font-medium text-[#011829]">
                          {agent.daysActive} days
                        </p>
                      </div>
                    </div>

                    {/* Owner */}
                    <div>
                      <p className="text-xs text-[#030F1C]">
                        Owner: {agent.owner}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 bg-[#4DA2FF] hover:bg-[#3d8ae6] text-white text-sm">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy Agent
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-[#4DA2FF] text-[#4DA2FF] hover:bg-[#4DA2FF] hover:text-white text-sm"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Strategy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Load More */}
          <div className="text-center">
            <Button
              variant="outline"
              className="border-[#4DA2FF] text-[#4DA2FF] hover:bg-[#4DA2FF] hover:text-white"
              disabled
            >
              Load More Agents
            </Button>
            <p className="text-sm text-[#030F1C] mt-2">
              Showing all available agents
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
