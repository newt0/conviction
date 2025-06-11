# Fix Wallet Connection TypeScript Error

## Error Description

```
Type '{ name: string; }' is not assignable to type 'WalletWithRequiredFeatures'.
Type '{ name: string; }' is missing the following properties from type 'Omit<Wallet, "features">': version, icon, chains, accounts
```

## Root Cause

The `useConnectWallet` hook from `@mysten/dapp-kit` expects a full `Wallet` object, not just a wallet name string. The current implementation is trying to pass `{ name: string }` instead of the actual wallet instance.

## Required Fixes

### 1. Update Wallet Connection Logic

Instead of passing wallet name, use the actual wallet instance from `useWallets()`:

```typescript
// ❌ Incorrect - Don't do this
const { mutate: connectWallet } = useConnectWallet();
connectWallet({ name: "Sui Wallet" });

// ✅ Correct - Use wallet instance
import { useWallets, useConnectWallet } from "@mysten/dapp-kit";

const wallets = useWallets();
const { mutate: connectWallet } = useConnectWallet();

const handleConnect = (walletName: string) => {
  const wallet = wallets.find((w) => w.name === walletName);
  if (wallet) {
    connectWallet({ wallet });
  }
};
```

### 2. Complete Wallet Integration Pattern

```typescript
import {
  useWallets,
  useConnectWallet,
  useCurrentAccount,
} from "@mysten/dapp-kit";

export const WalletConnection = () => {
  const wallets = useWallets();
  const { mutate: connectWallet, isPending } = useConnectWallet();
  const currentAccount = useCurrentAccount();

  const handleWalletSelect = (selectedWallet: any) => {
    connectWallet(
      { wallet: selectedWallet },
      {
        onSuccess: () => {
          console.log("Wallet connected successfully");
        },
        onError: (error) => {
          console.error("Wallet connection failed:", error);
        },
      }
    );
  };

  return (
    <div>
      {!currentAccount ? (
        <div>
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleWalletSelect(wallet)}
              disabled={isPending}
            >
              <img src={wallet.icon} alt={wallet.name} />
              {wallet.name}
            </button>
          ))}
        </div>
      ) : (
        <div>Connected: {currentAccount.address}</div>
      )}
    </div>
  );
};
```

### 3. Update Zustand Store Implementation

```typescript
// stores/mintStore.ts
interface MintStore {
  walletAddress: string | null;
  isWalletConnected: boolean;
  // ... other properties

  connectWallet: (wallet: any) => Promise<void>;
  // ... other methods
}

const useMintStore = create<MintStore>((set, get) => ({
  walletAddress: null,
  isWalletConnected: false,

  connectWallet: async (wallet) => {
    try {
      // The actual connection logic will be handled by @mysten/dapp-kit hooks
      // This store method can be used for additional state management
      set({ isWalletConnected: true });
    } catch (error) {
      console.error("Wallet connection failed:", error);
      set({ isWalletConnected: false });
    }
  },
}));
```

### 4. Update the Mint Page Component

```typescript
// src/app/mint/page.tsx
import {
  useWallets,
  useConnectWallet,
  useCurrentAccount,
} from "@mysten/dapp-kit";

export default function MintPage() {
  const wallets = useWallets();
  const { mutate: connectWallet, isPending: isConnecting } = useConnectWallet();
  const currentAccount = useCurrentAccount();

  const handleWalletConnect = () => {
    if (currentAccount) {
      // Already connected, handle disconnect
      return;
    }

    // Find Sui Wallet or use the first available wallet
    const suiWallet =
      wallets.find((w) => w.name === "Sui Wallet") || wallets[0];

    if (suiWallet) {
      connectWallet(
        { wallet: suiWallet },
        {
          onSuccess: () => {
            console.log("Wallet connected successfully");
          },
          onError: (error) => {
            console.error("Connection failed:", error);
          },
        }
      );
    }
  };

  const isWalletConnected = !!currentAccount;

  // ... rest of component
}
```

## Key Points to Remember

1. **Always use wallet instances**: Never pass just the wallet name string
2. **Use useWallets() hook**: To get available wallet instances
3. **Use useCurrentAccount()**: To check connection status
4. **Handle loading states**: Use isPending from useConnectWallet
5. **Proper error handling**: Always include onError callbacks

## Testing Steps

1. Verify wallet connection works without TypeScript errors
2. Test with multiple wallet types (Sui Wallet, Suiet, etc.)
3. Ensure proper error handling for failed connections
4. Verify wallet disconnection works properly

Please update the wallet connection implementation following these patterns to resolve the TypeScript error.
