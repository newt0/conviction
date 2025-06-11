export interface EvmContractAddresses {
  convictionNFT: string;
  agentWallet: string;
  executor: string;
  [key: string]: string;
}

// 本番用アドレス（例：Ethereum Mainnet）
export const EVM_MAINNET_CONTRACTS: EvmContractAddresses = {
  convictionNFT: "0x1234567890abcdef1234567890abcdef12345678",
  agentWallet: "0x234567890abcdef1234567890abcdef123456789",
  executor: "0x34567890abcdef1234567890abcdef1234567890",
};

// テストネット用アドレス（例：Goerli / Sepolia / Polygon Mumbaiなど）
export const EVM_TESTNET_CONTRACTS: EvmContractAddresses = {
  convictionNFT: "0xabc1234567890abcdef1234567890abcdef1234",
  agentWallet: "0xbcd234567890abcdef1234567890abcdef12345",
  executor: "0xcde34567890abcdef1234567890abcdef123456",
};

// 統合エクスポート（必要に応じて mainnet/testnet 両方を利用可能に）
export const EVM_CONTRACTS = {
  mainnet: EVM_MAINNET_CONTRACTS,
  testnet: EVM_TESTNET_CONTRACTS,
};
