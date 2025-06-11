export interface AgentConfig {
  strategy: string;
  mintPrice: string;
  agentName?: string;
  description?: string;
}

export interface MintFormData {
  selectedStrategy: string;
  mintPrice: string;
  agentName: string;
  agentDescription: string;
  riskTolerance: "low" | "medium" | "high";
  autoRebalance: boolean;
  transactionPriority: "standard" | "fast" | "instant";
}

export interface MintedAgent {
  nftId: string;
  transactionHash: string;
  blockHeight?: number;
  gasEstimate?: string;
  explorerUrl?: string;
  timestamp: Date;
}