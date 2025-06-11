export interface SuiChainInfo {
  id: "sui";
  name: string;
  network: "mainnet" | "testnet" | "devnet";
  explorer: string;
  rpcUrls: string[];
  faucetUrl?: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export const SUI_CHAIN: SuiChainInfo = {
  id: "sui",
  name: "Sui",
  network: "mainnet",
  explorer: "https://explorer.sui.io",
  rpcUrls: ["https://rpc.mainnet.sui.io"],
  faucetUrl: "https://faucet.testnet.sui.io", // テスト用（必要に応じて）
  nativeCurrency: {
    name: "SUI",
    symbol: "SUI",
    decimals: 9,
  },
};
