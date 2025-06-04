import { create } from 'zustand'

interface WalletState {
  address: string | null
  isConnected: boolean
  setAddress: (address: string | null) => void
  setIsConnected: (isConnected: boolean) => void
  disconnect: () => void
}

export const useWalletStore = create<WalletState>((set) => ({
  address: null,
  isConnected: false,
  setAddress: (address) => set({ address }),
  setIsConnected: (isConnected) => set({ isConnected }),
  disconnect: () => set({ address: null, isConnected: false }),
})) 