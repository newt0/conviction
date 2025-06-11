export interface ArweaveAOChainInfo {
  id: "arweave-ao";
  name: string;
  network: "mainnet" | "testnet";
  gateway: string;
  explorer?: string;
  processRegistryUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export const ARWEAVE_AO_CHAIN: ArweaveAOChainInfo = {
  id: "arweave-ao",
  name: "Arweave AO",
  network: "mainnet",
  gateway: "https://ao.arweave.dev",
  explorer: "https://ao.arweave.dev/explorer",
  processRegistryUrl: "https://ao.arweave.dev/registry",
  nativeCurrency: {
    name: "Compute Units",
    symbol: "CU",
    decimals: 9, // AOのリソース表現（参考値）
  },
};
