'use client';

import { ConnectButton, useCurrentWallet } from '@mysten/dapp-kit';
import { Button } from '@/components/ui/button';
import { useWalletStore } from '@/lib/store/wallet';
import { useEffect } from 'react';

export function SuiWalletConnect() {
  const { currentWallet } = useCurrentWallet();
  const { account, setAccount } = useWalletStore();

  useEffect(() => {
    const handleAccountsChanged = () => {
      if (currentWallet?.accounts[0]) {
        setAccount(currentWallet.accounts[0]);
      } else {
        setAccount(null);
      }
    };

    handleAccountsChanged();

    // ウォレットの状態変更を監視
    window.addEventListener('storage', handleAccountsChanged);
    return () => {
      window.removeEventListener('storage', handleAccountsChanged);
    };
  }, [currentWallet, setAccount]);

  const handleDisconnect = () => {
    setAccount(null);
    // ウォレットの接続を解除するためにページをリロード
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-4">
      {account ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {account.address.slice(0, 6)}...{account.address.slice(-4)}
          </span>
          <Button variant="outline" size="sm" onClick={handleDisconnect}>
            切断
          </Button>
        </div>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
} 