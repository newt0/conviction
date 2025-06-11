// 型定義：Solana上のプログラム識別子（Program ID群）
export interface SolanaProgramAddresses {
  convictionNftProgram: string;
  agentWalletProgram: string;
  executorProgram: string;
  [key: string]: string; // 拡張性確保
}

// 各ネットワークごとのプログラムID

export const SOLANA_MAINNET_PROGRAMS: SolanaProgramAddresses = {
  convictionNftProgram: "CnV1ct1oNnFTProgrAm111111111111111111111111",
  agentWalletProgram: "AgEnTwALLetProgrAm11111111111111111111111",
  executorProgram: "ExEcUTorProgrAm11111111111111111111111111",
};

export const SOLANA_DEVNET_PROGRAMS: SolanaProgramAddresses = {
  convictionNftProgram: "CnV1ct1oNnFTProgrAm22222222222222222222222",
  agentWalletProgram: "AgEnTwALLetProgrAm22222222222222222222222",
  executorProgram: "ExEcUTorProgrAm22222222222222222222222222",
};

// 統合エクスポート（用途別切り替え可能）
export const SOLANA_PROGRAMS = {
  mainnet: SOLANA_MAINNET_PROGRAMS,
  devnet: SOLANA_DEVNET_PROGRAMS,
};
