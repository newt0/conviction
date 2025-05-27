"use client";

import { useRef } from "react";
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
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Bot,
  Wallet,
  Github,
  Twitter,
  Linkedin,
  MessageCircle,
  Play,
  Coins,
  Target,
  PieChart,
  Sparkles,
  Eye,
  Cpu,
} from "lucide-react";
import Link from "next/link";

export default function ConvictionFiLanding() {
  const mintSectionRef = useRef<HTMLElement>(null);

  const scrollToMintSection = () => {
    mintSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-[#4DA2FF]/10 text-[#4DA2FF] border-[#4DA2FF]/20">
              Built on Sui • Evolving on Walrus
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#011829] mb-6 leading-tight">
              Mint Your Conviction.
              <br />
              <span className="text-[#4DA2FF]">DeFAI Agent as NFT.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#030F1C] mb-10 max-w-3xl mx-auto leading-relaxed">
              The NFT isn’t just a token. It’s your Guardian — standing between
              you and DeFi & Crypto Investing. A Safety Layer, encoded with
              conviction.{" "}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#011829] hover:bg-[#022a3d] text-white px-8 py-4 text-lg transition-all hover:scale-105"
                onClick={scrollToMintSection}
              >
                Mint Agent
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#4DA2FF] text-[#4DA2FF] hover:bg-[#4DA2FF] hover:text-white px-8 py-4 text-lg transition-all hover:scale-105"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#4DA2FF]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#011829]/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Why DeFAI Needs to Evolve */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#011829] mb-4">
              Why DeFAI Needs to Evolve
            </h2>
            <p className="text-lg text-[#030F1C] max-w-2xl mx-auto">
              Current DeFi trading is broken. ConvictionFi fixes it with
              autonomous AI agents.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Problems */}
            <div>
              <h3 className="text-2xl font-bold text-[#011829] mb-8 flex items-center">
                <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3 text-sm">
                  ✗
                </span>
                What's Wrong
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-[#011829] mb-2">
                      Manual Trading Fatigue
                    </h4>
                    <p className="text-[#030F1C]">
                      Constant monitoring, emotional decisions, and missed
                      opportunities plague traditional DeFi trading.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-[#011829] mb-2">
                      Static Strategies
                    </h4>
                    <p className="text-[#030F1C]">
                      Current DeFi protocols offer rigid, non-adaptive
                      strategies that can't evolve with market conditions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-[#011829] mb-2">
                      Lack of Conviction
                    </h4>
                    <p className="text-[#030F1C]">
                      Traders abandon strategies too early, lacking the
                      conviction to see long-term thesis through.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-2xl font-bold text-[#011829] mb-8 flex items-center">
                <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm">
                  ✓
                </span>
                How ConvictionFi Solves It
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-[#4DA2FF] rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-[#011829] mb-2">
                      Autonomous AI Agents
                    </h4>
                    <p className="text-[#030F1C]">
                      Your NFT becomes an AI agent that trades 24/7 based on
                      your conviction, removing emotional interference.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-[#4DA2FF] rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-[#011829] mb-2">
                      Evolving Intelligence
                    </h4>
                    <p className="text-[#030F1C]">
                      Agents learn and adapt using Walrus storage, continuously
                      improving their strategies over time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-[#4DA2FF] rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-[#011829] mb-2">
                      Conviction-Driven
                    </h4>
                    <p className="text-[#030F1C]">
                      Your beliefs are encoded into the agent, ensuring it stays
                      true to your long-term investment thesis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#011829] mb-4">
              How It Works
            </h2>
            <p className="text-lg text-[#030F1C] max-w-2xl mx-auto">
              Five simple steps to transform your conviction into an autonomous
              trading agent.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              {
                step: "01",
                title: "Mint",
                description:
                  "Create your conviction NFT with your trading thesis and risk parameters",
                icon: Coins,
              },
              {
                step: "02",
                title: "Deploy",
                description:
                  "Your NFT becomes an autonomous AI agent on the Sui blockchain",
                icon: Bot,
              },
              {
                step: "03",
                title: "Trade",
                description:
                  "Agent executes trades 24/7 based on your encoded conviction",
                icon: TrendingUp,
              },
              {
                step: "04",
                title: "Evolve",
                description:
                  "Agent learns and adapts using Walrus decentralized storage",
                icon: Sparkles,
              },
              {
                step: "05",
                title: "Exit",
                description:
                  "Withdraw profits or transfer your evolved agent NFT",
                icon: ArrowRight,
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-[#4DA2FF] rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#011829] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#011829] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#030F1C] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy Archetypes */}
      <section id="strategies" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#011829] mb-4">
              Strategy Archetypes
            </h2>
            <p className="text-lg text-[#030F1C] max-w-2xl mx-auto">
              Choose from proven conviction-based strategies or create your own.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/mint?strategy=SUI_MAXIMIZER" className="block">
              <Card className="border-2 hover:border-[#4DA2FF] transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer h-full min-h-[420px]">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-[#4DA2FF]/10 text-[#4DA2FF]">
                            SUI_MAXIMIZER
                          </Badge>
                          <Badge className="bg-orange-100 text-orange-600 text-xs">
                            Popular
                          </Badge>
                        </div>
                        <Target className="h-6 w-6 text-[#4DA2FF]" />
                      </div>
                      <CardTitle className="text-[#011829]">
                        SUI Ecosystem Bull
                      </CardTitle>
                      <CardDescription className="text-[#030F1C]">
                        Aggressive accumulation of SUI and ecosystem tokens
                        during market dips
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="font-semibold text-[#011829] mb-2">
                          Ideological Thesis:
                        </h4>
                        <p className="text-sm text-[#030F1C]">
                          "Sui represents the future of blockchain scalability.
                          Every dip is an opportunity to accumulate before mass
                          adoption."
                        </p>
                      </div>
                    </CardContent>
                  </div>
                  <div className="px-6 pb-6">
                    <Button className="w-full bg-[#011829] hover:bg-[#022a3d] text-white transition-all hover:scale-105">
                      Mint DeFAI Agent
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/mint?strategy=BTC_HODLER" className="block">
              <Card className="border-2 hover:border-[#4DA2FF] transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer h-full min-h-[420px]">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-orange-100 text-orange-600">
                          BTC_HODLER
                        </Badge>
                        <Shield className="h-6 w-6 text-orange-600" />
                      </div>
                      <CardTitle className="text-[#011829]">
                        Bitcoin Maximalist
                      </CardTitle>
                      <CardDescription className="text-[#030F1C]">
                        Long-term Bitcoin accumulation with DCA and volatility
                        exploitation
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="font-semibold text-[#011829] mb-2">
                          Ideological Thesis:
                        </h4>
                        <p className="text-sm text-[#030F1C]">
                          "Bitcoin is digital gold and the ultimate store of
                          value. Time in market beats timing the market."
                        </p>
                      </div>
                    </CardContent>
                  </div>
                  <div className="px-6 pb-6">
                    <Button className="w-full bg-[#011829] hover:bg-[#022a3d] text-white transition-all hover:scale-105">
                      Mint DeFAI Agent
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/mint?strategy=STABLE_OPTIMIZER" className="block">
              <Card className="border-2 hover:border-[#4DA2FF] transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer h-full min-h-[420px]">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-green-100 text-green-600">
                          STABLE_OPTIMIZER
                        </Badge>
                        <PieChart className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle className="text-[#011829]">
                        Yield Farmer
                      </CardTitle>
                      <CardDescription className="text-[#030F1C]">
                        Conservative yield optimization across stable pools and
                        lending protocols
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="font-semibold text-[#011829] mb-2">
                          Ideological Thesis:
                        </h4>
                        <p className="text-sm text-[#030F1C]">
                          "Consistent yield generation with capital
                          preservation. Compound interest is the eighth wonder
                          of the world."
                        </p>
                      </div>
                    </CardContent>
                  </div>
                  <div className="px-6 pb-6">
                    <Button className="w-full bg-[#011829] hover:bg-[#022a3d] text-white transition-all hover:scale-105">
                      Mint DeFAI Agent
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#011829] mb-4">
              Key Features
            </h2>
            <p className="text-lg text-[#030F1C] max-w-2xl mx-auto">
              Revolutionary features that make ConvictionFi the future of
              autonomous trading.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#4DA2FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="h-8 w-8 text-[#4DA2FF]" />
              </div>
              <h3 className="text-xl font-bold text-[#011829] mb-3">
                🤖 NFT-Based Automation
              </h3>
              <p className="text-[#030F1C]">
                Your conviction becomes a tradeable NFT that autonomously
                executes your strategy
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#4DA2FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-[#4DA2FF]" />
              </div>
              <h3 className="text-xl font-bold text-[#011829] mb-3">
                👁️ Full Transparency
              </h3>
              <p className="text-[#030F1C]">
                Every trade, decision, and evolution is recorded on-chain for
                complete auditability
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#4DA2FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-[#4DA2FF]" />
              </div>
              <h3 className="text-xl font-bold text-[#011829] mb-3">
                ⚡ Zero-Dashboard UX
              </h3>
              <p className="text-[#030F1C]">
                Set it and forget it. No constant monitoring or manual
                intervention required
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#4DA2FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="h-8 w-8 text-[#4DA2FF]" />
              </div>
              <h3 className="text-xl font-bold text-[#011829] mb-3">
                🧠 Evolving Intelligence
              </h3>
              <p className="text-[#030F1C]">
                Agents learn from market data and improve their strategies using
                Walrus storage
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#4DA2FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-[#4DA2FF]" />
              </div>
              <h3 className="text-xl font-bold text-[#011829] mb-3">
                🛡️ Risk Management
              </h3>
              <p className="text-[#030F1C]">
                Built-in stop-losses, position sizing, and risk controls protect
                your capital
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#4DA2FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-8 w-8 text-[#4DA2FF]" />
              </div>
              <h3 className="text-xl font-bold text-[#011829] mb-3">
                🔄 Transferable Agents
              </h3>
              <p className="text-[#030F1C]">
                Trade your evolved agents as NFTs, creating a marketplace for
                proven strategies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mint Your DeFAI NFT Agent */}
      <section
        ref={mintSectionRef}
        id="mint-section"
        className="py-20 bg-gradient-to-br from-[#4DA2FF]/5 to-[#011829]/5"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#011829] mb-4">
              Mint Your DeFAI NFT Agent
            </h2>
            <p className="text-lg text-[#030F1C]">
              Transform your conviction into an autonomous trading agent in
              minutes.
            </p>
          </div>

          <Card className="border-2 border-[#4DA2FF]/20 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-[#011829] mb-4">
                    Configure Your Agent
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#011829] mb-2">
                        Strategy Archetype
                      </label>
                      <div className="w-full p-3 border border-gray-200 rounded-lg bg-white">
                        <span className="text-[#030F1C]">SUI_MAXIMIZER</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#011829] mb-2">
                        Mint Price (USDC)
                      </label>
                      <div className="w-full p-3 border border-gray-200 rounded-lg bg-white">
                        <span className="text-[#030F1C]">1000</span>
                      </div>
                      <p className="text-sm text-[#030F1C] mt-1">
                        This is the total budget your AI agent will manage.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#011829] mb-4">
                    Wallet Connection
                  </h3>
                  <div className="space-y-4">
                    <Button className="w-full bg-[#4DA2FF] hover:bg-[#3d8ae6] text-white p-4 text-lg">
                      <Wallet className="mr-2 h-5 w-5" />
                      Connect Sui Wallet
                    </Button>
                    <div className="text-center text-sm text-[#030F1C]">
                      Wallet not connected
                    </div>
                    <div className="border-t pt-4">
                      <div className="text-sm text-[#030F1C] mb-4">
                        <div className="flex justify-between">
                          <span>Minting Fee:</span>
                          <span>10 USDC</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mint Price:</span>
                          <span>1000 USDC</span>
                        </div>
                        <div className="flex justify-between font-bold text-[#011829] border-t pt-2 mt-2">
                          <span>Total:</span>
                          <span>1010 USDC</span>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-[#011829] hover:bg-[#022a3d] text-white p-4 text-lg"
                        disabled
                      >
                        Mint Agent NFT
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#011829] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                {/* <div className="w-8 h-8 bg-[#4DA2FF] rounded-lg flex items-center justify-center"> */}
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  {/* <span className="text-white font-bold text-sm">C</span> */}
                  <img
                    src="convictionfi_icon.png"
                    alt="ConvictionFi Logo"
                    className="h-6 w-6"
                  />
                </div>
                <span className="text-white font-bold text-xl">
                  ConvictionFi
                </span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Transforming conviction into autonomous AI trading agents. Built
                on Sui, evolving on Walrus, powered by your beliefs.
              </p>
              <div className="flex space-x-4">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-white/10"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-white/10"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-white/10"
                >
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-white/10"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Strategies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Whitepaper
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm">
              © 2025 ConvictionFi. All rights reserved.
            </div>
            <div className="flex space-x-6 text-gray-300 text-sm mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Credits
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
