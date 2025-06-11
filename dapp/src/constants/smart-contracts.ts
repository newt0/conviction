// Contractのデプロイ形態を表す型
export type DeploymentType =
  | "smart-contract" // EVM
  | "package" // Sui
  | "module" // Moveベースの抽象単位
  | "program" // Solana
  | "process"; // Arweave AO

// 各チェーンごとのコントラクト情報を定義
export interface ChainContracts {
  id: string; // チェーン識別子（例: "sui", "solana", "ethereum"）
  name: string; // 表示名（例: "Sui", "Solana", "Ethereum"）
  network?: string; // 任意（例: "mainnet", "testnet", "devnet"）
  contracts: {
    id: string; // 実際のContract/Package IDなど
    explorerUrl: string;
    type: DeploymentType;
    label?: string; // 任意表示用（例: "Agent", "NFT Vault"など）
  }[];
}

// 実際の使用データ
export const CHAIN_CONTRACTS: ChainContracts[] = [
  {
    id: "sui",
    name: "Sui",
    network: "testnet",
    contracts: [
      {
        id: "0x...", // 実際の Package ID
        explorerUrl: "https://explorer.sui.io/object/0x...?network=testnet",
        type: "package",
        label: "Conviction Package",
      },
    ],
  },
  {
    id: "solana",
    name: "Solana",
    network: "devnet",
    contracts: [
      {
        id: "ComingSoon",
        explorerUrl:
          "https://explorer.solana.com/address/ComingSoon?cluster=devnet",
        type: "program",
        label: "NFT Program",
      },
    ],
  },
  {
    id: "ethereum",
    name: "Ethereum",
    network: "mainnet",
    contracts: [
      {
        id: "ComingSoon",
        explorerUrl: "https://etherscan.io/address/ComingSoon",
        type: "smart-contract",
        label: "ERC-721 Contract",
      },
    ],
  },
];
