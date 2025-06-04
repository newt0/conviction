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
  Bot,
  Wallet,
  Target,
  PieChart,
  Eye,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { Twitter, Linkedin, Github, Facebook } from "lucide-react";
import HowItWorks from "@/components/how-it-works/HowItWorks";

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
              Your NFT is the safety layer standing between you and DeFi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Mint DeFAI Agent → /mint に遷移 */}
              <Link href="/mint" passHref>
                <Button
                  size="lg"
                  className="bg-[#011829] hover:bg-[#022a3d] text-white px-8 py-4 text-lg transition-all hover:scale-105"
                >
                  Mint DeFAI Agent
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              {/* Watch Marketplace → /marketplace に遷移 */}
              <Link href="/marketplace" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#4DA2FF] text-[#4DA2FF] hover:bg-[#4DA2FF] hover:text-white px-8 py-4 text-lg transition-all hover:scale-105"
                >
                  Watch Marketplace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
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
          <HowItWorks />
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

      {/* Mint Your DeFAI Agent Agent */}
      <section
        id="mint-section"
        className="py-20 bg-gradient-to-br from-[#4DA2FF]/5 to-[#011829]/5"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#011829] mb-4">
              Mint Your DeFAI Agent
            </h2>
            <p className="text-lg text-[#030F1C]">
              Transform your conviction into an autonomous trading agent in
              minutes.
            </p>
          </div>

          <Card className="border-2 border-[#4DA2FF]/20 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* 左側: デモ情報 */}
                <div>
                  <h3 className="text-xl font-bold text-[#011829] mb-4">
                    Sample Configuration
                  </h3>
                  <div className="space-y-4 text-[#030F1C] text-sm">
                    <p>
                      <strong>Strategy:</strong> SUI_MAXIMIZER
                    </p>
                    <p>
                      <strong>Mint Price:</strong> 1000 USDC
                    </p>
                    <p>
                      <strong>Total Cost:</strong> 1010 USDC (incl. minting fee)
                    </p>
                    <p>This is the budget your AI agent will manage.</p>
                  </div>
                </div>

                {/* 右側: 遷移ボタン */}
                <div className="flex flex-col justify-center items-center space-y-6">
                  <Wallet className="h-10 w-10 text-[#011829]" />
                  <Link href="/mint">
                    <Button className="bg-[#011829] hover:bg-[#022a3d] text-white text-lg px-8 py-4">
                      Mint Now
                    </Button>
                  </Link>
                  <p className="text-sm text-[#030F1C]">
                    Connect your wallet and mint directly from the dedicated
                    page.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-500 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* 著作権 & SNS */}
          <div className="flex items-center space-x-6">
            <span className="text-sm">
              © 2025 VillainsLeague. All rights reserved.
            </span>
            <div className="flex space-x-4 text-gray-500">
              <a
                href="https://x.com/conviction_sui"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/convictionfi/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/ConvictionFi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Founder */}
          <div className="text-sm">
            Founder:{" "}
            <a
              href="https://x.com/kyohei_nft"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              @kyohei_nft
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
