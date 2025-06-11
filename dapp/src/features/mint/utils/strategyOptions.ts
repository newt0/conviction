import {
  Target,
  Shield,
  PieChart,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { StrategyOption } from "../types";

export const strategyOptions: StrategyOption[] = [
  {
    value: "SUI_MAXIMIZER",
    label: "SUI Maximizer",
    description: "Aggressive SUI ecosystem accumulation",
    details:
      "Focuses on SUI tokens, liquid staking, and ecosystem DeFi protocols",
    riskLevel: "High",
    expectedAPY: "15-25%",
    icon: Target,
    color: "bg-[#4DA2FF]/10 text-[#4DA2FF]",
  },
  {
    value: "BTC_HODLER",
    label: "BTC Hodler",
    description: "Long-term Bitcoin accumulation",
    details: "DCA strategy with periodic Bitcoin purchases and cold storage",
    riskLevel: "Medium",
    expectedAPY: "8-15%",
    icon: Shield,
    color: "bg-orange-100 text-orange-600",
  },
  {
    value: "STABLE_OPTIMIZER",
    label: "Stable Optimizer",
    description: "Conservative yield farming",
    details:
      "Focuses on stablecoin yields, lending protocols, and low-risk strategies",
    riskLevel: "Low",
    expectedAPY: "5-8%",
    icon: PieChart,
    color: "bg-green-100 text-green-600",
  },
  {
    value: "DEFI_ARBITRAGE",
    label: "DeFi Arbitrage",
    description: "Multi-protocol arbitrage opportunities",
    details: "Automated arbitrage across DEXs and lending protocols",
    riskLevel: "High",
    expectedAPY: "20-40%",
    icon: Zap,
    color: "bg-purple-100 text-purple-600",
  },
  {
    value: "TREND_FOLLOWER",
    label: "Trend Follower",
    description: "Momentum-based trading strategy",
    details: "Technical analysis driven with stop-loss protection",
    riskLevel: "Medium-High",
    expectedAPY: "12-30%",
    icon: TrendingUp,
    color: "bg-blue-100 text-blue-600",
  },
  {
    value: "MULTICHAIN_BRIDGE",
    label: "Multichain Bridge",
    description: "Cross-chain yield optimization",
    details: "Leverages opportunities across multiple blockchain networks",
    riskLevel: "Medium",
    expectedAPY: "10-20%",
    icon: Sparkles,
    color: "bg-indigo-100 text-indigo-600",
  },
];
