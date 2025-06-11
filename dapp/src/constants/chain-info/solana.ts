export interface SolanaChainInfo {
  id: "solana";
  name: string;
  symbol: string;
  cluster: "mainnet-beta" | "devnet" | "testnet";
  explorer: string;
  rpcUrls: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export const SOLANA_CHAIN: SolanaChainInfo = {
  id: "solana",
  name: "Solana",
  symbol: "SOL",
  cluster: "mainnet-beta",
  explorer: "https://solscan.io",
  rpcUrls: ["https://api.mainnet-beta.solana.com"],
  nativeCurrency: {
    name: "Solana",
    symbol: "SOL",
    decimals: 9,
  },
};
