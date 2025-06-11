declare global {
  interface Window {
    suiWallet?: {
      requestPermissions: (params: {
        permissions: string[];
      }) => Promise<{ granted: boolean }>;
      getAccounts: () => Promise<Array<{ address: string }>>;
      getChain: () => Promise<string>;
      disconnect?: () => Promise<void>;
      switchNetwork?: (network: string) => Promise<void>;
    };
  }
}

export {};
