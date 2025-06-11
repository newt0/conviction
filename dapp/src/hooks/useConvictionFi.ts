import { useEffect } from "react";
import { useWalletStore } from "../stores/walletStore";
import { useNFTStore } from "../stores/nftStore";
import { useUIStore } from "../stores/uiStore";
import type { NFTData } from "../types/store";

/**
 * ConvictionFi専用の統合フック
 * ウォレット接続状態の監視とNFTデータの同期を行う
 */
export const useConvictionFi = () => {
  const {
    address,
    isConnected,
    isConnecting,
    error: walletError,
    connectSuiWallet,
    disconnectSuiWallet,
  } = useWalletStore();

  const {
    selectedNFT,
    ownedNFTs,
    loading: nftLoading,
    setOwnedNFTs,
    setLoading: setNFTLoading,
    clearStore: clearNFTStore,
  } = useNFTStore();

  const { addNotification } = useUIStore();

  // ウォレット接続時にNFTデータを取得
  useEffect(() => {
    if (isConnected && address) {
      fetchUserNFTs(address);
    } else {
      clearNFTStore();
    }
  }, [isConnected, address]);

  // ウォレットエラーの通知
  useEffect(() => {
    if (walletError) {
      addNotification({
        type: "error",
        title: "Wallet Error",
        message: walletError,
        duration: 5000,
      });
    }
  }, [walletError]);

  const fetchUserNFTs = async (walletAddress: string) => {
    try {
      setNFTLoading(true);

      // TODO: Sui NFT APIとの統合
      // const response = await fetch(`/api/nfts/${walletAddress}`);
      // const nfts = await response.json();

      // デモ用のモックデータ

      const mockNFTs: NFTData[] = [
        {
          id: "nft-1",
          name: "Conviction Genesis #001",
          description:
            "The first ConvictionFi NFT representing unwavering belief",
          imageUrl: "/images/conviction-nft-1.png",
          owner: walletAddress,
          collection: "ConvictionFi Genesis",
          attributes: {
            rarity: "Legendary",
            conviction_level: 95,
            creation_date: "2024-01-15",
          },
        },
      ];

      setOwnedNFTs(mockNFTs);

      addNotification({
        type: "success",
        title: "NFTs Loaded",
        message: `Found ${mockNFTs.length} NFTs in your wallet`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to fetch NFTs:", error);
      addNotification({
        type: "error",
        title: "NFT Loading Failed",
        message: "Could not load your NFTs. Please try again.",
        duration: 5000,
      });
    } finally {
      setNFTLoading(false);
    }
  };

  return {
    // Wallet state
    wallet: {
      address,
      isConnected,
      isConnecting,
      error: walletError,
      connect: connectSuiWallet,
      disconnect: disconnectSuiWallet,
    },
    // NFT state
    nfts: {
      selected: selectedNFT,
      owned: ownedNFTs,
      loading: nftLoading,
    },
    // Utility methods
    refetch: () => address && fetchUserNFTs(address),
  };
};
