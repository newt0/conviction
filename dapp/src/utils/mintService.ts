import { SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { 
  suiClient, 
  generateNFTMetadata, 
  generateEnhancedNFTMetadata,
  estimateGasCost, 
  parseSuiError,
  getTransactionUrl,
  getObjectUrl 
} from "./sui";

// Types for minting
export interface MintParams {
  strategy: string;
  mintPrice: string;
  senderAddress: string;
  agentName: string;
  description: string;
  riskTolerance: "low" | "medium" | "high";
  autoRebalance: boolean;
  priority: "standard" | "fast" | "instant";
}

export interface MintResult {
  success: boolean;
  transactionDigest?: string;
  nftObjectId?: string;
  gasUsed?: string;
  blockHeight?: number;
  explorerUrl?: string;
  nftUrl?: string;
  error?: string;
}

export interface GasEstimate {
  estimate: string;
  suiAmount: string;
  usdEquivalent?: string;
}

// Mock contract package ID - in real implementation this would be the deployed contract
const TESTNET_NFT_PACKAGE = "0x2"; // Using Sui Framework for testnet NFT example

/**
 * Create a transaction for minting a DeFAI Agent NFT
 * Based on MystenLabs testnet_nft.move pattern
 */
export const createDeFAIAgentMintTransaction = async (
  params: MintParams
): Promise<Transaction> => {
  const { strategy, mintPrice, senderAddress, agentName, description, riskTolerance, autoRebalance, priority } = params;
  
  // Generate enhanced NFT metadata
  const metadata = generateEnhancedNFTMetadata(params);
  
  const tx = new Transaction();
  tx.setSender(senderAddress);
  
  // Adjust gas budget based on priority
  const gasBudgets = {
    standard: 10_000_000,
    fast: 15_000_000,
    instant: 25_000_000,
  };
  tx.setGasBudget(gasBudgets[priority]);
  
  // For Phase 2, we'll use the Sui framework's mint_to_sender function
  // This is equivalent to the MystenLabs testnet_nft pattern
  tx.moveCall({
    target: `${TESTNET_NFT_PACKAGE}::devnet_nft::mint`,
    arguments: [
      tx.pure.string(metadata.name),
      tx.pure.string(metadata.description),
      tx.pure.string(metadata.imageUrl),
    ],
  });
  
  return tx;
};

/**
 * Estimate gas cost for minting transaction
 */
export const estimateMintGas = async (
  params: MintParams,
  client: SuiClient = suiClient
): Promise<GasEstimate> => {
  try {
    const transaction = await createDeFAIAgentMintTransaction(params);
    const gasEstimate = await estimateGasCost(transaction, client);
    
    // Extract SUI amount from estimate string
    const suiMatch = gasEstimate.match(/([0-9.]+) SUI/);
    const suiAmount = suiMatch ? suiMatch[1] : "0.005";
    
    return {
      estimate: gasEstimate,
      suiAmount,
      // TODO: Add USD equivalent calculation
    };
  } catch (error) {
    console.error("Gas estimation failed:", error);
    return {
      estimate: "~0.005 SUI",
      suiAmount: "0.005",
    };
  }
};

/**
 * Execute the actual minting transaction
 */
export const executeMintTransaction = async (
  params: MintParams,
  signAndExecuteTransaction: (transaction: { transactionBlock: Uint8Array }) => Promise<any>,
  client: SuiClient = suiClient
): Promise<MintResult> => {
  try {
    // Create the transaction
    const transaction = await createDeFAIAgentMintTransaction(params);
    
    // Build the transaction block
    const transactionBlock = await transaction.build({ client });
    
    // Execute the transaction using the wallet's signAndExecute function
    const result = await signAndExecuteTransaction({
      transactionBlock,
    });
    
    // Parse the result
    if (result.effects?.status?.status === "success") {
      const transactionDigest = result.digest;
      
      // Extract NFT object ID from created objects
      const createdObjects = result.effects.created || [];
      const nftObject = createdObjects.find((obj: any) => 
        obj.owner && typeof obj.owner === 'object' && 'AddressOwner' in obj.owner
      );
      
      const nftObjectId = nftObject?.reference?.objectId;
      
      // Get gas usage
      const gasUsed = result.effects.gasUsed;
      const totalGasUsed = gasUsed ? 
        (BigInt(gasUsed.computationCost) + BigInt(gasUsed.storageCost)) : BigInt(0);
      const gasInSui = Number(totalGasUsed) / 1_000_000_000;
      
      return {
        success: true,
        transactionDigest,
        nftObjectId,
        gasUsed: `${gasInSui.toFixed(6)} SUI`,
        explorerUrl: getTransactionUrl(transactionDigest),
        nftUrl: nftObjectId ? getObjectUrl(nftObjectId) : undefined,
      };
    } else {
      // Transaction failed
      const error = result.effects?.status?.error || "Transaction failed";
      return {
        success: false,
        error: parseSuiError(error),
      };
    }
  } catch (error) {
    console.error("Mint transaction failed:", error);
    return {
      success: false,
      error: parseSuiError(error),
    };
  }
};

/**
 * Check if user has sufficient balance for minting
 */
export const checkSufficientBalance = async (
  address: string,
  requiredAmount: string,
  client: SuiClient = suiClient
): Promise<{ sufficient: boolean; currentBalance: string; required: string }> => {
  try {
    const balance = await client.getBalance({ owner: address });
    const currentBalanceInSui = Number(balance.totalBalance) / 1_000_000_000;
    const requiredInSui = parseFloat(requiredAmount);
    
    return {
      sufficient: currentBalanceInSui >= requiredInSui,
      currentBalance: `${currentBalanceInSui.toFixed(6)} SUI`,
      required: `${requiredInSui.toFixed(6)} SUI`,
    };
  } catch (error) {
    console.error("Balance check failed:", error);
    return {
      sufficient: false,
      currentBalance: "Unknown",
      required: requiredAmount,
    };
  }
};

/**
 * Validate minting parameters
 */
export const validateMintParams = (params: MintParams): { valid: boolean; error?: string } => {
  const { strategy, mintPrice, senderAddress, agentName, description } = params;
  
  if (!strategy) {
    return { valid: false, error: "Strategy selection is required" };
  }
  
  if (!mintPrice || parseFloat(mintPrice) < 100) {
    return { valid: false, error: "Minimum mint price is 100 USDC" };
  }
  
  if (parseFloat(mintPrice) > 100000) {
    return { valid: false, error: "Maximum mint price is 100,000 USDC" };
  }
  
  if (!senderAddress || !senderAddress.startsWith("0x")) {
    return { valid: false, error: "Valid wallet address is required" };
  }
  
  if (agentName && agentName.length > 50) {
    return { valid: false, error: "Agent name must be 50 characters or less" };
  }
  
  if (description && description.length > 200) {
    return { valid: false, error: "Description must be 200 characters or less" };
  }
  
  return { valid: true };
};

/**
 * Mock implementation for development/testing
 * This simulates the real transaction flow
 */
export const executeMockMintTransaction = async (
  params: MintParams
): Promise<MintResult> => {
  console.log("Mock transaction params:", params); // Use params to avoid lint error
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
  
  // Simulate 10% failure rate
  if (Math.random() < 0.1) {
    const errors = [
      "Insufficient gas for transaction",
      "Network congestion, please try again",
      "Transaction rejected by user",
      "RPC endpoint unavailable"
    ];
    return {
      success: false,
      error: errors[Math.floor(Math.random() * errors.length)],
    };
  }
  
  // Generate mock successful result
  const mockTxDigest = `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
  const mockNftId = `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
  const mockGasUsed = (Math.random() * 0.009 + 0.001).toFixed(6);
  
  return {
    success: true,
    transactionDigest: mockTxDigest,
    nftObjectId: mockNftId,
    gasUsed: `${mockGasUsed} SUI`,
    explorerUrl: getTransactionUrl(mockTxDigest),
    nftUrl: getObjectUrl(mockNftId),
  };
};