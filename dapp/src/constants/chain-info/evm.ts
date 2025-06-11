export interface EvmChainInfo {
  id: string; // 識別子（例: "ethereum"）
  name: string; // 表示名
  chainId: number; // EVMのChain ID
  symbol: string; // 通貨のシンボル（例: ETH, BNB）
  explorer: string; // ブロックエクスプローラーのURL
  rpcUrls: string[]; // 推奨RPCエンドポイント
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

// EVM互換チェーンの一覧
export const EVM_CHAINS: EvmChainInfo[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    chainId: 1,
    symbol: "ETH",
    explorer: "https://etherscan.io",
    rpcUrls: ["https://rpc.ankr.com/eth"],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
  {
    id: "bnb",
    name: "BNB Smart Chain",
    chainId: 56,
    symbol: "BNB",
    explorer: "https://bscscan.com",
    rpcUrls: ["https://bsc-dataseed.binance.org"],
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
  },
  {
    id: "polygon",
    name: "Polygon",
    chainId: 137,
    symbol: "MATIC",
    explorer: "https://polygonscan.com",
    rpcUrls: ["https://polygon-rpc.com"],
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
  },
  {
    id: "base",
    name: "Base",
    chainId: 8453,
    symbol: "ETH",
    explorer: "https://basescan.org",
    rpcUrls: ["https://mainnet.base.org"],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
  {
    id: "hyperliquid-evm",
    name: "Hyperliquid EVM",
    chainId: 999999, // 仮の値、実際のchainIdがあるなら差し替え
    symbol: "HLP",
    explorer: "https://explorer.hyperliquid.xyz",
    rpcUrls: [],
    nativeCurrency: {
      name: "HLP",
      symbol: "HLP",
      decimals: 18,
    },
  },
  {
    id: "berachain",
    name: "Berachain",
    chainId: 80085,
    symbol: "BERA",
    explorer: "https://beratrail.io",
    rpcUrls: ["https://artio.rpc.berachain.com"],
    nativeCurrency: {
      name: "BERA",
      symbol: "BERA",
      decimals: 18,
    },
  },
  {
    id: "soneium",
    name: "Soneium",
    chainId: 123456, // 仮の値、正式なものがあれば更新
    symbol: "SONE",
    explorer: "https://explorer.soneium.xyz",
    rpcUrls: [],
    nativeCurrency: {
      name: "Soneium",
      symbol: "SONE",
      decimals: 18,
    },
  },
];
