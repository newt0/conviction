import { useWallet } from '@mysten/dapp-kit'
import { useWalletStore } from '@/store/walletStore'
import { useEffect } from 'react'

export const WalletConnectButton = () => {
  const { currentAccount, connecting, disconnect, connect } = useWallet()
  const { address, isConnected, setAddress, setIsConnected, disconnect: disconnectStore } = useWalletStore()

  useEffect(() => {
    if (currentAccount?.address) {
      setAddress(currentAccount.address)
      setIsConnected(true)
    } else {
      disconnectStore()
    }
  }, [currentAccount?.address, setAddress, setIsConnected, disconnectStore])

  const handleConnect = async () => {
    try {
      await connect()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
      disconnectStore()
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <button
      onClick={isConnected ? handleDisconnect : handleConnect}
      disabled={connecting}
      className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {connecting ? (
        'Connecting...'
      ) : isConnected && address ? (
        formatAddress(address)
      ) : (
        'Connect Wallet'
      )}
    </button>
  )
} 