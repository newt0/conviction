'use client';

import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { SuiClient } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useWalletStore } from '@/lib/store/wallet';
import { useEffect } from 'react';

const queryClient = new QueryClient();

export function SuiProviders({ children }: { children: React.ReactNode }) {
  const { setAccount } = useWalletStore();

  useEffect(() => {
    // ページロード時にウォレットの状態をクリア
    setAccount(null);
  }, [setAccount]);

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={{ mainnet: new SuiClient({ url: 'https://fullnode.mainnet.sui.io' }) }} defaultNetwork="mainnet">
        <WalletProvider>
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
} 