import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { NFTData } from "../types/store";

interface NFTStore {
  // State
  selectedNFT: NFTData | null;
  ownedNFTs: NFTData[];
  loading: boolean;
  error: string | null;

  // Actions
  setSelectedNFT: (nft: NFTData | null) => void;
  setOwnedNFTs: (nfts: NFTData[]) => void;
  addOwnedNFT: (nft: NFTData) => void;
  removeOwnedNFT: (nftId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearStore: () => void;

  // Utility methods
  getNFTById: (id: string) => NFTData | undefined;
  hasNFT: (id: string) => boolean;
}

export const useNFTStore = create<NFTStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        selectedNFT: null,
        ownedNFTs: [],
        loading: false,
        error: null,

        // Actions
        setSelectedNFT: (nft) =>
          set({ selectedNFT: nft }, false, "nft/setSelected"),

        setOwnedNFTs: (nfts) => set({ ownedNFTs: nfts }, false, "nft/setOwned"),

        addOwnedNFT: (nft) =>
          set(
            (state) => ({
              ownedNFTs: [
                ...state.ownedNFTs.filter((n) => n.id !== nft.id),
                nft,
              ],
            }),
            false,
            "nft/addOwned"
          ),

        removeOwnedNFT: (nftId) =>
          set(
            (state) => ({
              ownedNFTs: state.ownedNFTs.filter((nft) => nft.id !== nftId),
              selectedNFT:
                state.selectedNFT?.id === nftId ? null : state.selectedNFT,
            }),
            false,
            "nft/removeOwned"
          ),

        setLoading: (loading) => set({ loading }, false, "nft/setLoading"),

        setError: (error) => set({ error }, false, "nft/setError"),

        clearStore: () =>
          set(
            {
              selectedNFT: null,
              ownedNFTs: [],
              loading: false,
              error: null,
            },
            false,
            "nft/clear"
          ),

        // Utility methods
        getNFTById: (id) => {
          const { ownedNFTs } = get();
          return ownedNFTs.find((nft) => nft.id === id);
        },

        hasNFT: (id) => {
          const { ownedNFTs } = get();
          return ownedNFTs.some((nft) => nft.id === id);
        },
      }),
      {
        name: "nft-store",
        partialize: (state) => ({
          selectedNFT: state.selectedNFT,
          ownedNFTs: state.ownedNFTs,
        }),
      }
    ),
    {
      name: "nft-store",
    }
  )
);
