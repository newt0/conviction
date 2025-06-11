import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { WalletState } from "../types/store";

interface WalletStore extends WalletState {
  // Actions
  setWalletConnecting: (connecting: boolean) => void;
  setWalletConnected: (address: string, chain: string) => void;
  setWalletDisconnected: () => void;
  setWalletError: (error: string) => void;
  clearWalletError: () => void;

  // Sui-specific methods
  connectSuiWallet: () => Promise<void>;
  disconnectSuiWallet: () => Promise<void>;
  switchSuiNetwork: (network: string) => Promise<void>;
}

export const useWalletStore = create<WalletStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      address: null,
      chain: null,
      isConnected: false,
      isConnecting: false,
      error: null,

      // Actions
      setWalletConnecting: (connecting) =>
        set(
          { isConnecting: connecting, error: null },
          false,
          "wallet/setConnecting"
        ),

      setWalletConnected: (address, chain) =>
        set(
          {
            address,
            chain,
            isConnected: true,
            isConnecting: false,
            error: null,
          },
          false,
          "wallet/setConnected"
        ),

      setWalletDisconnected: () =>
        set(
          {
            address: null,
            chain: null,
            isConnected: false,
            isConnecting: false,
            error: null,
          },
          false,
          "wallet/setDisconnected"
        ),

      setWalletError: (error) =>
        set({ error, isConnecting: false }, false, "wallet/setError"),

      clearWalletError: () => set({ error: null }, false, "wallet/clearError"),

      // Sui Wallet Integration Methods
      connectSuiWallet: async () => {
        const { setWalletConnecting, setWalletConnected, setWalletError } =
          get();

        try {
          setWalletConnecting(true);

          // Check if Sui wallet is available
          if (typeof window === "undefined" || !window.suiWallet) {
            throw new Error(
              "Sui wallet not found. Please install a Sui wallet extension."
            );
          }

          // Request wallet connection
          const response = await window.suiWallet.requestPermissions({
            permissions: ["viewAccount"],
          });

          if (!response.granted) {
            throw new Error("Wallet connection was rejected by user.");
          }

          // Get account info
          const accounts = await window.suiWallet.getAccounts();
          if (!accounts || accounts.length === 0) {
            throw new Error("No accounts found in wallet.");
          }

          const address = accounts[0].address;
          const chain = await window.suiWallet.getChain();

          setWalletConnected(address, chain || "sui:mainnet");
        } catch (error) {
          console.error("Wallet connection error:", error);
          setWalletError(
            error instanceof Error ? error.message : "Failed to connect wallet"
          );
        }
      },

      disconnectSuiWallet: async () => {
        const { setWalletDisconnected } = get();

        try {
          if (window.suiWallet?.disconnect) {
            await window.suiWallet.disconnect();
          }
          setWalletDisconnected();
        } catch (error) {
          console.error("Wallet disconnection error:", error);
          // Still disconnect on client side even if wallet API fails
          setWalletDisconnected();
        }
      },

      switchSuiNetwork: async (network) => {
        const { setWalletError, address } = get();

        try {
          if (!window.suiWallet) {
            throw new Error("Sui wallet not available");
          }

          if (!window.suiWallet.switchNetwork) {
            throw new Error("Network switching not supported by this wallet");
          }

          await window.suiWallet.switchNetwork(network);

          // Update chain info after successful switch
          if (address) {
            set({ chain: network }, false, "wallet/switchNetwork");
          }
        } catch (error) {
          console.error("Network switch error:", error);
          setWalletError(
            error instanceof Error ? error.message : "Failed to switch network"
          );
        }
      },
    }),
    {
      name: "wallet-store",
    }
  )
);
