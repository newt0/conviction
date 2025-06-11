export interface SuiContractAddresses {
  convictionNFT: string; // NFT module package ID
  agentWallet: string; // Agent wallet package ID
  executorModule: string; // AI Executor module package ID
  [key: string]: string; // 将来的に他モジュールも追加しやすくする
}

// 本番用コントラクトID
export const SUI_MAINNET_CONTRACTS: SuiContractAddresses = {
  convictionNFT: "0xabc123...mainnet",
  agentWallet: "0xdef456...mainnet",
  executorModule: "0x789abc...mainnet",
};

// テストネット用コントラクトID（例：Sui Testnet or Devnet）
export const SUI_TESTNET_CONTRACTS: SuiContractAddresses = {
  convictionNFT: "0xabc123...testnet",
  agentWallet: "0xdef456...testnet",
  executorModule: "0x789abc...testnet",
};

// 統合エクスポート
export const SUI_CONTRACTS = {
  mainnet: SUI_MAINNET_CONTRACTS,
  testnet: SUI_TESTNET_CONTRACTS,
};
