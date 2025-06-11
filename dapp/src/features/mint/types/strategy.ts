import { LucideIcon } from "lucide-react";

export interface StrategyOption {
  value: string;
  label: string;
  description: string;
  details: string;
  riskLevel: "Low" | "Medium" | "Medium-High" | "High";
  expectedAPY: string;
  icon: LucideIcon;
  color: string;
}

export type RiskLevel = "Low" | "Medium" | "Medium-High" | "High";

export interface StrategyConfig {
  selectedStrategy: string;
  riskTolerance: "low" | "medium" | "high";
  autoRebalance: boolean;
}