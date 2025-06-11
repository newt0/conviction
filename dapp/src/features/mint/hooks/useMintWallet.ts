import { useEffect } from "react";
import { useCurrentAccount, useConnectWallet, useDisconnectWallet, useWallets } from "@mysten/dapp-kit";
import { useMintStore } from "@/stores/mintStore";

export const useMintWallet = () => {
  const currentAccount = useCurrentAccount();
  const wallets = useWallets();
  const { mutate: connect, isPending: isConnecting } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();

  const {
    walletAddress,
    isWalletConnected,
    setWalletConnection,
  } = useMintStore();

  // Sync wallet connection state with Sui wallet
  useEffect(() => {
    if (currentAccount?.address) {
      setWalletConnection(currentAccount.address, true);
    } else {
      setWalletConnection(null, false);
    }
  }, [currentAccount, setWalletConnection]);

  const handleWalletConnect = () => {
    if (isWalletConnected) {
      disconnect();
    } else {
      // Find Sui Wallet or use the first available wallet
      const suiWallet = wallets.find((w) => w.name === "Sui Wallet") || wallets[0];
      
      if (suiWallet) {
        connect(
          { wallet: suiWallet },
          {
            onSuccess: () => {
              console.log("Wallet connected successfully");
            },
            onError: (error) => {
              console.error("Failed to connect wallet:", error);
            },
          }
        );
      } else {
        console.error("No wallets available");
      }
    }
  };

  return {
    walletAddress,
    isWalletConnected,
    isConnecting,
    handleWalletConnect,
  };
};