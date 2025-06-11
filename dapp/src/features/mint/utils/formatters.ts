import { RiskLevel } from "../types";

export const getRiskColor = (risk: RiskLevel): string => {
  switch (risk) {
    case "High":
      return "text-red-600 bg-red-100";
    case "Medium-High":
      return "text-orange-600 bg-orange-100";
    case "Medium":
      return "text-yellow-600 bg-yellow-100";
    case "Low":
      return "text-green-600 bg-green-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export const formatTransactionHash = (hash?: string): string => {
  if (!hash) return "0x9d2f...e34a";
  return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
};

export const formatWalletAddress = (address?: string): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatTimestamp = (date: Date = new Date()): string => {
  const dateStr = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
  
  return `${dateStr} — ${timeStr}`;
};

export const formatBlockHeight = (height?: number): string => {
  return height?.toLocaleString() || "12,847,392";
};

export const formatGasEstimate = (estimate?: string): string => {
  return estimate || "0.00234 SUI";
};