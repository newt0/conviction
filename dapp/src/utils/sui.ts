import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";

// Network configuration
export type SuiNetwork = "devnet" | "testnet" | "mainnet";

export const SUI_NETWORKS: Record<SuiNetwork, string> = {
  devnet: getFullnodeUrl("devnet"),
  testnet: getFullnodeUrl("testnet"),  
  mainnet: getFullnodeUrl("mainnet"),
};

// Get current network from environment
export const getCurrentNetwork = (): SuiNetwork => {
  const network = process.env.NEXT_PUBLIC_SUI_NETWORK as SuiNetwork;
  return network || "testnet";
};

// Create Sui client instance
export const createSuiClient = (network?: SuiNetwork): SuiClient => {
  const targetNetwork = network || getCurrentNetwork();
  return new SuiClient({ url: SUI_NETWORKS[targetNetwork] });
};

// Default client instance
export const suiClient = createSuiClient();

// Contract configuration
export const CONTRACT_CONFIG = {
  packageId: process.env.NEXT_PUBLIC_DEFAI_PACKAGE_ID || "0x1",
  moduleName: process.env.NEXT_PUBLIC_DEFAI_MODULE_NAME || "defai_agent",
  mintFunction: process.env.NEXT_PUBLIC_DEFAI_MINT_FUNCTION || "mint_agent",
  gaseBudget: parseInt(process.env.NEXT_PUBLIC_DEFAULT_GAS_BUDGET || "10000000"),
};

// Explorer URLs
export const getExplorerUrl = (network: SuiNetwork = getCurrentNetwork()): string => {
  const baseUrls = {
    devnet: "https://suiexplorer.com/?network=devnet",
    testnet: "https://suiexplorer.com/?network=testnet", 
    mainnet: "https://suiexplorer.com",
  };
  return baseUrls[network];
};

export const getTransactionUrl = (txDigest: string, network?: SuiNetwork): string => {
  const explorerUrl = getExplorerUrl(network);
  return `${explorerUrl}/txblock/${txDigest}`;
};

export const getObjectUrl = (objectId: string, network?: SuiNetwork): string => {
  const explorerUrl = getExplorerUrl(network);
  return `${explorerUrl}/object/${objectId}`;
};

// Utility functions for transaction building
export const createMintTransaction = (
  sender: string,
  agentName: string,
  description: string,
  imageUrl: string
): Transaction => {
  const tx = new Transaction();
  
  // Set sender
  tx.setSender(sender);
  
  // Set gas budget
  tx.setGasBudget(CONTRACT_CONFIG.gaseBudget);
  
  // Add moveCall for minting
  tx.moveCall({
    target: `${CONTRACT_CONFIG.packageId}::${CONTRACT_CONFIG.moduleName}::${CONTRACT_CONFIG.mintFunction}`,
    arguments: [
      tx.pure.string(agentName),
      tx.pure.string(description), 
      tx.pure.string(imageUrl),
    ],
  });
  
  return tx;
};

// NFT metadata generation
export const generateNFTMetadata = (strategy: string, mintPrice: string) => {
  const strategyLabels: Record<string, string> = {
    SUI_MAXIMIZER: "SUI Maximizer",
    BTC_HODLER: "BTC Hodler", 
    STABLE_OPTIMIZER: "Stable Optimizer",
    DEFI_ARBITRAGE: "DeFi Arbitrage",
    TREND_FOLLOWER: "Trend Follower",
    MULTICHAIN_BRIDGE: "Multichain Bridge",
  };
  
  const strategyLabel = strategyLabels[strategy] || strategy;
  
  return {
    name: `DeFAI Agent - ${strategyLabel}`,
    description: `Autonomous AI trading agent with ${strategyLabel} strategy. Budget: ${mintPrice} USDC. Powered by ConvictionFi.`,
    imageUrl: `https://api.dicebear.com/7.x/shapes/svg?seed=${strategy}&backgroundColor=4DA2FF`,
  };
};

// Enhanced NFT metadata generation with all agent configuration
export const generateEnhancedNFTMetadata = (params: {
  strategy: string;
  mintPrice: string;
  agentName: string;
  description: string;
  riskTolerance: string;
  autoRebalance: boolean;
}) => {
  const { strategy, mintPrice, agentName, description, riskTolerance, autoRebalance } = params;
  
  const strategyLabels: Record<string, string> = {
    SUI_MAXIMIZER: "SUI Maximizer",
    BTC_HODLER: "BTC Hodler", 
    STABLE_OPTIMIZER: "Stable Optimizer",
    DEFI_ARBITRAGE: "DeFi Arbitrage",
    TREND_FOLLOWER: "Trend Follower",
    MULTICHAIN_BRIDGE: "Multichain Bridge",
  };
  
  const strategyLabel = strategyLabels[strategy] || strategy;
  const agentDisplayName = agentName || `DeFAI Agent - ${strategyLabel}`;
  
  // Create comprehensive metadata
  const metadata = {
    name: agentDisplayName,
    description: description || `Autonomous AI trading agent with ${strategyLabel} strategy. Budget: ${mintPrice} USDC. Risk tolerance: ${riskTolerance}. Auto-rebalancing: ${autoRebalance ? 'enabled' : 'disabled'}. Powered by ConvictionFi.`,
    imageUrl: `https://api.dicebear.com/7.x/shapes/svg?seed=${strategy}-${agentName}&backgroundColor=4DA2FF`,
    attributes: [
      { trait_type: "Strategy", value: strategyLabel },
      { trait_type: "Budget", value: `${mintPrice} USDC` },
      { trait_type: "Risk Tolerance", value: riskTolerance },
      { trait_type: "Auto Rebalance", value: autoRebalance ? "Enabled" : "Disabled" },
      { trait_type: "Agent Type", value: "DeFAI Trading Agent" },
      { trait_type: "Platform", value: "ConvictionFi" },
    ]
  };
  
  return metadata;
};

// Gas estimation utilities
export const estimateGasCost = async (
  transaction: Transaction,
  client: SuiClient = suiClient
): Promise<string> => {
  try {
    // Dry run the transaction to get gas estimation
    const dryRunResult = await client.dryRunTransactionBlock({
      transactionBlock: await transaction.build({ client }),
    });
    
    if (dryRunResult.effects.status.status === "success") {
      const gasUsed = dryRunResult.effects.gasUsed;
      const totalGas = BigInt(gasUsed.computationCost) + BigInt(gasUsed.storageCost);
      
      // Convert from MIST to SUI (1 SUI = 1,000,000,000 MIST)
      const suiAmount = Number(totalGas) / 1_000_000_000;
      return `${suiAmount.toFixed(6)} SUI`;
    } else {
      throw new Error("Gas estimation failed");
    }
  } catch (error) {
    console.error("Gas estimation error:", error);
    // Return fallback estimate
    return "0.005 SUI";
  }
};

// Price fetching utilities
export const fetchSuiPrice = async (): Promise<number> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PRICE_API_URL}?ids=sui&vs_currencies=usd`
    );
    const data = await response.json();
    return data.sui?.usd || 0;
  } catch (error) {
    console.error("Failed to fetch SUI price:", error);
    return 0;
  }
};

export const convertUSDCToSUI = async (usdcAmount: number): Promise<number> => {
  const suiPrice = await fetchSuiPrice();
  if (suiPrice === 0) return 0;
  return usdcAmount / suiPrice;
};

// Error handling utilities
export const parseSuiError = (error: unknown): string => {
  if (typeof error === 'string') return error;
  
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    if (message.includes('insufficient')) {
      return "Insufficient balance for transaction";
    }
    if (message.includes('gas')) {
      return "Insufficient gas for transaction";
    }
    if (message.includes('rejected')) {
      return "Transaction was rejected";
    }
    if (message.includes('timeout')) {
      return "Transaction timed out";
    }
    if (message.includes('network')) {
      return "Network error occurred";
    }
    
    return error.message;
  }
  
  return "Unknown transaction error";
};

// Address validation
export const isValidSuiAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{64}$/.test(address);
};

// Format address for display
export const formatAddress = (address: string, length: number = 6): string => {
  if (!address) return "";
  if (address.length <= length * 2) return address;
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};