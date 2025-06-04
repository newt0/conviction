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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Wallet,
  Bot,
  CheckCircle,
  Target,
  Shield,
  PieChart,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface AgentConfig {
  strategy: string;
  mintPrice: string;
}

type MintingState = "idle" | "minting" | "success";

const strategyOptions = [
  {
    value: "SUI_MAXIMIZER",
    label: "SUI Maximizer",
    description: "Aggressive SUI ecosystem accumulation",
    icon: Target,
    color: "bg-[#4DA2FF]/10 text-[#4DA2FF]",
  },
  {
    value: "BTC_HODLER",
    label: "BTC Hodler",
    description: "Long-term Bitcoin accumulation",
    icon: Shield,
    color: "bg-orange-100 text-orange-600",
  },
  {
    value: "STABLE_OPTIMIZER",
    label: "Stable Optimizer",
    description: "Conservative yield farming",
    icon: PieChart,
    color: "bg-green-100 text-green-600",
  },
];

export default function MintPage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [mintingState, setMintingState] = useState<MintingState>("idle");
  const [agentConfig, setAgentConfig] = useState<AgentConfig>({
    strategy: "",
    mintPrice: "1000",
  });

  const handleWalletConnect = () => {
    setIsWalletConnected(!isWalletConnected);
  };

  const handleConfigChange = (field: keyof AgentConfig, value: string) => {
    setAgentConfig((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    agentConfig.strategy && agentConfig.mintPrice && isWalletConnected;

  const handleMint = async () => {
    if (!isFormValid) return;

    setMintingState("minting");

    // Simulate minting process
    setTimeout(() => {
      setMintingState("success");
    }, 2000);
  };

  const selectedStrategy = strategyOptions.find(
    (s) => s.value === agentConfig.strategy
  );

  const mintingFee = 10;
  const totalCost = Number.parseInt(agentConfig.mintPrice || "0") + mintingFee;

  if (mintingState === "success") {
    return (
      <div className="min-h-screen bg-white">
        {/* Success Content */}
        <div className="py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#011829] mb-4">
                🎉 Agent Successfully Deployed!
              </h1>
              <p className="text-lg text-[#030F1C]">
                Your conviction has been transformed into an autonomous AI
                trading agent.
              </p>
            </div>

            <Card className="border-2 border-green-200 bg-green-50/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#011829] flex items-center">
                    <Bot className="mr-2 h-6 w-6 text-[#4DA2FF]" />
                    Agent NFT #1337
                  </CardTitle>
                  <Badge className="bg-green-100 text-green-700">Active</Badge>
                </div>
                <CardDescription>
                  Your autonomous trading agent is now live and ready to execute
                  your strategy.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-[#011829]">
                      Strategy
                    </Label>
                    <div className="flex items-center mt-1">
                      {selectedStrategy && (
                        <selectedStrategy.icon className="mr-2 h-4 w-4 text-[#4DA2FF]" />
                      )}
                      <span className="text-[#030F1C]">
                        {selectedStrategy?.label}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-[#011829]">
                      Mint Price
                    </Label>
                    <p className="text-[#030F1C] mt-1">
                      {agentConfig.mintPrice} USDC
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-[#011829]">
                      Status
                    </Label>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-[#030F1C]">Agent Deployed</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-[#011829]">
                      Agent ID
                    </Label>
                    <p className="text-[#030F1C] mt-1">#1337</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="mb-4">
                    <Label className="text-sm font-medium text-[#011829] flex items-center">
                      Transaction Details
                      <Badge className="ml-2 bg-green-100 text-green-700 text-xs">
                        ✅ Confirmed
                      </Badge>
                    </Label>
                  </div>

                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#030F1C]">
                        Transaction Hash:
                      </span>
                      <button className="font-mono text-sm text-[#4DA2FF] hover:text-[#3d8ae6] transition-colors cursor-pointer">
                        0x9d2f...e34a
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#030F1C]">Timestamp:</span>
                      <span className="font-mono text-sm text-[#030F1C]">
                        {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        —{" "}
                        {new Date().toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZoneName: "short",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#030F1C]">
                        Block Height:
                      </span>
                      <span className="font-mono text-sm text-[#030F1C]">
                        12,847,392
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#030F1C]">Gas Used:</span>
                      <span className="font-mono text-sm text-[#030F1C]">
                        0.00234 SUI
                      </span>
                    </div>

                    <div className="pt-2 border-t border-gray-200">
                      <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors cursor-default">
                        View on Sui Explorer →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Link href="/dashboard" className="flex flex-1">
                    <Button className="flex-1 bg-[#4DA2FF] hover:bg-[#3d8ae6] text-white">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Agent Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="flex-1 border-[#4DA2FF] text-[#4DA2FF] hover:bg-[#4DA2FF] hover:text-white"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Mint Another Agent
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-sm text-[#030F1C] mb-4">
                Your agent will begin trading based on your conviction. You can
                monitor its performance and evolution in the dashboard.
              </p>
              <Link href="/">
                <Button
                  variant="ghost"
                  className="text-[#4DA2FF] hover:text-[#3d8ae6]"
                >
                  Return to Homepage
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      {/* Main Content */}
      <div className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[#011829] mb-4">
              Mint Your DeFAI Agent
            </h1>
            <p className="text-lg text-[#030F1C]">
              Configure your autonomous trading agent and transform your
              conviction into action.
            </p>
          </div>

          <div className="space-y-8">
            {/* Wallet Connection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#011829] flex items-center">
                  <Wallet className="mr-2 h-5 w-5" />
                  Wallet Connection
                </CardTitle>
                <CardDescription>
                  Connect your Sui wallet to proceed with minting.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleWalletConnect}
                  className={`w-full ${
                    isWalletConnected
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-[#4DA2FF] hover:bg-[#3d8ae6]"
                  } text-white`}
                >
                  {isWalletConnected ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Wallet Connected
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-5 w-5" />
                      Connect Sui Wallet
                    </>
                  )}
                </Button>
                {isWalletConnected && (
                  <div className="mt-3 text-sm text-[#030F1C] text-center">
                    Connected: 0x1234...5678
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Agent Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#011829] flex items-center">
                  <Bot className="mr-2 h-5 w-5" />
                  Agent Configuration
                </CardTitle>
                <CardDescription>
                  Define your agent's strategy, capital, and risk parameters.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Strategy Selection */}
                <div className="space-y-2">
                  <Label
                    htmlFor="strategy"
                    className="text-[#011829] font-medium"
                  >
                    Strategy Archetype
                  </Label>
                  <Select
                    value={agentConfig.strategy}
                    onValueChange={(value) =>
                      handleConfigChange("strategy", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your trading strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      {strategyOptions.map((strategy) => (
                        <SelectItem key={strategy.value} value={strategy.value}>
                          <div className="flex items-center">
                            <strategy.icon className="mr-2 h-4 w-4" />
                            <div>
                              <div className="font-medium">
                                {strategy.label}
                              </div>
                              <div className="text-sm text-gray-500">
                                {strategy.description}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedStrategy && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                      <Badge className={selectedStrategy.color}>
                        {selectedStrategy.label}
                      </Badge>
                      <p className="text-sm text-[#030F1C] mt-1">
                        {selectedStrategy.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Mint Price */}
                <div className="space-y-2">
                  <Label
                    htmlFor="mintPrice"
                    className="text-[#011829] font-medium"
                  >
                    Mint Price (USDC)
                  </Label>
                  <Input
                    id="mintPrice"
                    type="number"
                    value={agentConfig.mintPrice}
                    onChange={(e) =>
                      handleConfigChange("mintPrice", e.target.value)
                    }
                    placeholder="1000"
                    min="100"
                    step="100"
                  />
                  <p className="text-sm text-[#030F1C]">
                    This is the total budget your AI agent will manage.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cost Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#011829]">Cost Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-[#030F1C]">
                    <span>Mint Price:</span>
                    <span>{agentConfig.mintPrice || "0"} USDC</span>
                  </div>
                  <div className="flex justify-between text-[#030F1C]">
                    <span>Minting Fee:</span>
                    <span>{mintingFee} USDC</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-[#011829]">
                    <span>Total Cost:</span>
                    <span>{totalCost} USDC</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mint Button */}
            <Button
              onClick={handleMint}
              disabled={!isFormValid || mintingState === "minting"}
              className="w-full bg-[#011829] hover:bg-[#022a3d] text-white py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mintingState === "minting" ? (
                <>
                  <Zap className="mr-2 h-5 w-5 animate-spin" />
                  Minting DeFAI Agent NFT...
                </>
              ) : (
                <>
                  <Bot className="mr-2 h-5 w-5" />
                  Mint DeFAI Agent
                </>
              )}
            </Button>

            {!isFormValid && (
              <div className="text-center text-sm text-gray-500">
                {!isWalletConnected && "Connect your wallet to continue"}
                {isWalletConnected &&
                  (!agentConfig.strategy || !agentConfig.mintPrice) &&
                  "Complete all configuration fields to mint"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
