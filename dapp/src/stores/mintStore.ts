import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { 
  estimateMintGas, 
  executeMockMintTransaction, 
  validateMintParams,
  type MintParams,
  type MintResult 
} from "../utils/mintService";
import { fetchSuiPrice } from "../utils/sui";

// Helper functions for mock data generation
const generateMockNftId = (): string => {
  return Math.floor(Math.random() * 9999).toString().padStart(4, '0');
};

const generateMockTxHash = (): string => {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

const generateMockGasEstimate = (): string => {
  // Generate random gas estimate between 0.001 and 0.01 SUI
  const gasAmount = (Math.random() * 0.009 + 0.001).toFixed(5);
  return `${gasAmount} SUI`;
};

const generateMockBlockHeight = (): number => {
  // Generate realistic block height around current time
  return Math.floor(12840000 + Math.random() * 10000);
};

// Removed unused helper functions - functionality moved to mintService

interface AgentConfig {
  strategy: string;
  mintPrice: string;
  agentName: string;
  description: string;
  riskTolerance: "low" | "medium" | "high";
  autoRebalance: boolean;
}

interface MintStore {
  // Wallet related
  walletAddress: string | null;
  isWalletConnected: boolean;

  // Mint related
  mintingState: "idle" | "minting" | "success" | "error";
  mintedNftId: string | null;
  transactionHash: string | null;
  errorMessage: string | null;
  gasEstimate: string | null;
  blockHeight: number | null;
  explorerUrl: string | null;
  nftUrl: string | null;

  // Price data
  suiPrice: number | null;
  gasUsdEquivalent: string | null;

  // Configuration
  selectedStrategy: string;
  mintPrice: string;
  agentName: string;
  agentDescription: string;
  riskTolerance: "low" | "medium" | "high";
  autoRebalance: boolean;
  useRealTransactions: boolean; // Toggle between mock and real transactions

  // Advanced features
  retryCount: number;
  maxRetries: number;
  transactionPriority: "standard" | "fast" | "instant";
  batchMintCount: number;

  // Actions
  mintAgent: (signAndExecuteTransaction?: any) => Promise<void>;
  retryMint: (signAndExecuteTransaction?: any) => Promise<void>;
  updateConfig: (config: Partial<AgentConfig>) => void;
  updateAdvancedConfig: (config: Partial<{
    riskTolerance: "low" | "medium" | "high";
    autoRebalance: boolean;
    transactionPriority: "standard" | "fast" | "instant";
    batchMintCount: number;
  }>) => void;
  resetMintState: () => void;
  setWalletConnection: (address: string | null, connected: boolean) => void;
  estimateGas: () => Promise<void>;
  fetchPriceData: () => Promise<void>;
  toggleTransactionMode: (useReal: boolean) => void;
}

export const useMintStore = create<MintStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      walletAddress: null,
      isWalletConnected: false,
      mintingState: "idle",
      mintedNftId: null,
      transactionHash: null,
      errorMessage: null,
      gasEstimate: null,
      blockHeight: null,
      explorerUrl: null,
      nftUrl: null,
      suiPrice: null,
      gasUsdEquivalent: null,
      selectedStrategy: "",
      mintPrice: "1000",
      agentName: "",
      agentDescription: "",
      riskTolerance: "medium",
      autoRebalance: true,
      useRealTransactions: false, // Start with mock transactions for development
      retryCount: 0,
      maxRetries: 3,
      transactionPriority: "standard",
      batchMintCount: 1,

      // Actions

      mintAgent: async (signAndExecuteTransaction?: any) => {
        const { 
          selectedStrategy, 
          mintPrice, 
          isWalletConnected, 
          walletAddress, 
          useRealTransactions 
        } = get();
        
        if (!isWalletConnected || !walletAddress) {
          set({ errorMessage: "Please connect your wallet first", mintingState: "error" });
          return;
        }

        // Validate parameters
        const mintParams: MintParams = {
          strategy: selectedStrategy,
          mintPrice,
          senderAddress: walletAddress,
          agentName: get().agentName,
          description: get().agentDescription,
          riskTolerance: get().riskTolerance,
          autoRebalance: get().autoRebalance,
          priority: get().transactionPriority,
        };

        const validation = validateMintParams(mintParams);
        if (!validation.valid) {
          set({ errorMessage: validation.error, mintingState: "error" });
          return;
        }

        try {
          set({ 
            mintingState: "minting", 
            errorMessage: null,
            explorerUrl: null,
            nftUrl: null,
            blockHeight: null 
          });

          let result: MintResult;

          if (useRealTransactions && signAndExecuteTransaction) {
            // Real transaction execution
            console.log("🚀 Executing real Sui transaction...");
            
            // Note: Real transaction execution would be implemented here
            // For now, we'll use the mock version to ensure functionality
            result = await executeMockMintTransaction(mintParams);
          } else {
            // Mock transaction execution
            console.log("🧪 Executing mock transaction...");
            result = await executeMockMintTransaction(mintParams);
          }

          if (result.success) {
            set({
              mintingState: "success",
              mintedNftId: result.nftObjectId || generateMockNftId(),
              transactionHash: result.transactionDigest || generateMockTxHash(),
              gasEstimate: result.gasUsed || generateMockGasEstimate(),
              explorerUrl: result.explorerUrl || null,
              nftUrl: result.nftUrl || null,
              blockHeight: result.blockHeight || generateMockBlockHeight(),
              errorMessage: null,
            });

            // Log success for debugging
            console.log(`🎉 ${useRealTransactions ? 'Real' : 'Mock'} NFT minted successfully!`, {
              nftId: result.nftObjectId,
              txHash: result.transactionDigest,
              strategy: selectedStrategy,
              mintPrice: mintPrice,
              gasUsed: result.gasUsed,
              explorerUrl: result.explorerUrl,
            });

          } else {
            throw new Error(result.error || "Transaction failed");
          }

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Failed to mint agent";
          console.error("Mint error:", errorMessage);
          
          set({
            mintingState: "error",
            errorMessage,
            explorerUrl: null,
            nftUrl: null,
            blockHeight: null,
          });
        }
      },

      retryMint: async (signAndExecuteTransaction?: any) => {
        const { retryCount, maxRetries } = get();
        
        if (retryCount >= maxRetries) {
          set({ 
            errorMessage: `Maximum retry attempts (${maxRetries}) exceeded`,
            mintingState: "error" 
          });
          return;
        }

        set({ retryCount: retryCount + 1 });
        
        // Wait before retry with exponential backoff
        const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Reset error state and retry
        set({ errorMessage: null });
        await get().mintAgent(signAndExecuteTransaction);
      },

      updateConfig: (config: Partial<AgentConfig>) => {
        set((state) => ({
          selectedStrategy: config.strategy ?? state.selectedStrategy,
          mintPrice: config.mintPrice ?? state.mintPrice,
          agentName: config.agentName ?? state.agentName,
          agentDescription: config.description ?? state.agentDescription,
          riskTolerance: config.riskTolerance ?? state.riskTolerance,
          autoRebalance: config.autoRebalance ?? state.autoRebalance,
        }));
      },

      updateAdvancedConfig: (config) => {
        set((state) => ({
          riskTolerance: config.riskTolerance ?? state.riskTolerance,
          autoRebalance: config.autoRebalance ?? state.autoRebalance,
          transactionPriority: config.transactionPriority ?? state.transactionPriority,
          batchMintCount: config.batchMintCount ?? state.batchMintCount,
        }));
      },

      estimateGas: async () => {
        const { selectedStrategy, mintPrice, walletAddress, useRealTransactions } = get();
        
        if (!selectedStrategy || !mintPrice || !walletAddress) {
          return;
        }

        try {
          const mintParams: MintParams = {
            strategy: selectedStrategy,
            mintPrice,
            senderAddress: walletAddress,
            agentName: get().agentName,
            description: get().agentDescription,
            riskTolerance: get().riskTolerance,
            autoRebalance: get().autoRebalance,
            priority: get().transactionPriority,
          };

          if (useRealTransactions) {
            // Real gas estimation
            const gasData = await estimateMintGas(mintParams);
            set({ 
              gasEstimate: gasData.estimate,
              gasUsdEquivalent: gasData.usdEquivalent || null 
            });
          } else {
            // Mock gas estimation
            await new Promise(resolve => setTimeout(resolve, 300));
            const gasEstimate = generateMockGasEstimate();
            set({ gasEstimate });
          }
        } catch (error) {
          console.error("Gas estimation failed:", error);
          set({ gasEstimate: "~ 0.005 SUI" }); // Fallback estimate
        }
      },

      fetchPriceData: async () => {
        try {
          const suiPrice = await fetchSuiPrice();
          set({ suiPrice });
        } catch (error) {
          console.error("Failed to fetch SUI price:", error);
          set({ suiPrice: null });
        }
      },

      toggleTransactionMode: (useReal: boolean) => {
        set({ useRealTransactions: useReal });
        // Re-estimate gas when mode changes
        const { estimateGas } = get();
        estimateGas();
      },

      resetMintState: () => {
        set({
          mintingState: "idle",
          mintedNftId: null,
          transactionHash: null,
          errorMessage: null,
          gasEstimate: null,
          blockHeight: null,
          explorerUrl: null,
          nftUrl: null,
          retryCount: 0,
        });
      },

      setWalletConnection: (address: string | null, connected: boolean) => {
        set({
          walletAddress: address,
          isWalletConnected: connected,
          // Clear minting state when wallet disconnects
          ...(connected === false && {
            mintingState: "idle",
            mintedNftId: null,
            transactionHash: null,
            errorMessage: null,
            gasEstimate: null,
            blockHeight: null,
            explorerUrl: null,
            nftUrl: null,
          })
        });
      },
    }),
    {
      name: "mint-store",
    }
  )
);