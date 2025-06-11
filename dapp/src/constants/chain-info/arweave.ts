export interface ArweaveChainInfo {
  id: "arweave";
  name: string;
  network: "mainnet"; // Arweaveは基本的にMainnetのみ
  gateway: string;
  explorer: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export const ARWEAVE_CHAIN: ArweaveChainInfo = {
  id: "arweave",
  name: "Arweave",
  network: "mainnet",
  gateway: "https://arweave.net",
  explorer: "https://viewblock.io/arweave",
  nativeCurrency: {
    name: "Arweave Token",
    symbol: "AR",
    decimals: 12, // Arweaveはwinston単位（1 AR = 10^12 winston）
  },
};
