# DeFAI Agent Mint Feature Implementation Prompt

## Overview

Implement actual NFT mint functionality on the Sui blockchain based on the mock UI in `src/app/mint/page.tsx`.

## Technology Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Blockchain**: Sui Network
- **Sui SDK**: @mysten/dapp-kit, @mysten/sui
- **UI**: shadcn/ui components

## Implementation Requirements

### 1. Sui Wallet Connection Feature

- Configure SuiClientProvider and WalletProvider from @mysten/dapp-kit
- Support multiple Sui wallets (Sui Wallet, Suiet, Ethos, etc.)
- Manage wallet connection state with Zustand
- Display connected address in shortened format

### 2. Smart Contract Integration

Call Move function to mint DeFAI Agent NFT with the following parameters:

- `strategy`: Selected strategy type
- `mint_price`: USDC amount (convert to SUI/USDC)
- `recipient`: Connected wallet address

### 3. State Management (Zustand Store)

```typescript
interface MintStore {
  // Wallet related
  walletAddress: string | null;
  isWalletConnected: boolean;

  // Mint related
  mintingState: "idle" | "minting" | "success" | "error";
  mintedNftId: string | null;
  transactionHash: string | null;

  // Configuration
  selectedStrategy: string;
  mintPrice: string;

  // Actions
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  mintAgent: () => Promise<void>;
  updateConfig: (config: Partial<AgentConfig>) => void;
}
```

### 4. Transaction Processing

- Fetch SUI/USDC price (CoinGecko API, etc.)
- Estimate and display gas fees
- Loading states during transaction execution
- Proper error handling for success/failure cases
- Store transaction hash

### 5. UI Improvements

- Update UI based on actual wallet connection status
- Real-time gas fee display
- Transaction confirmation modal
- Display actual NFT ID on success screen
- Link to Sui Explorer

### 6. Error Handling

- Wallet not connected error
- Insufficient balance error
- Network errors
- Retry functionality for failed transactions

## Recommended Approach

### Option 1: MystenLabs Official Sample Base

```bash
# Create simple NFT contract based on official sample
git clone https://github.com/MystenLabs/sui.git
# Reference examples/move/nft/sources/testnet_nft.move
```

### Option 2: Mock Smart Contract

If no actual contract exists, implement with mock contract information:

```typescript
// Mock contract information (for implementation)
const MOCK_CONTRACT = {
  packageId: "0x1234567890abcdef...", // Mock package ID
  moduleName: "defai_agent",
  functionName: "mint_agent",
  // Parameters: strategy, mint_price, recipient
};
```

### Option 3: Origin-Byte NFT Protocol

For more sophisticated implementation, use Origin-Byte protocol

### 3. Smart Contract Integration

Implement using one of the following methods:

**Method A: MystenLabs Official Sample Base**

```typescript
// Implementation based on official testnet_nft.move
const mintTransaction = new Transaction();
mintTransaction.moveCall({
  target: `${PACKAGE_ID}::testnet_nft::mint`,
  arguments: [
    tx.pure.string(agentName), // NFT name
    tx.pure.string(description), // Description
    tx.pure.string(imageUrl), // Image URL
  ],
});
```

**Method B: Custom DeFAI Agent Contract (Mock)**

```typescript
// Implementation for custom contract
const mintTransaction = new Transaction();
mintTransaction.moveCall({
  target: `${PACKAGE_ID}::defai_agent::mint_agent`,
  arguments: [
    tx.pure.string(strategy), // Strategy type
    tx.pure.u64(mintPrice), // Mint price
    tx.pure.address(recipient), // Recipient
  ],
});
```

**Method C: Simple Implementation for Development/Testing**
Implement transaction simulation instead of actual contract deployment

## File Structure

```
src/
├── app/
│   ├── mint/
│   │   └── page.tsx (existing mock - update)
│   └── layout.tsx (add SuiProviders)
├── components/
│   └── providers/
│       └── SuiProviders.tsx (create new)
├── stores/
│   └── mintStore.ts (create new)
├── utils/
│   ├── sui.ts (Sui-related utilities)
│   └── constants.ts (Contract address, etc.)
└── types/
    └── mint.ts (type definitions)
```

## Phased Implementation Approach

### Phase 1: Basic Functionality (Recommended Starting Point)

1. **Sui Wallet Connection and UI Integration**
2. **Mock Transaction Implementation**
   - Implement transaction flow without actual contract
   - Return success response after 2 seconds
3. **Basic State Management and Error Handling**

### Phase 2: Actual Contract Integration

1. **Use MystenLabs Official Sample**
   - Simple NFT mint based on `testnet_nft.move`
2. **Execute Actual Transactions**
3. **Integration with Sui Explorer**

### Phase 3: Advanced Features

1. **Custom DeFAI Agent Contract Implementation**
2. **Strategy Parameter Storage**
3. **Royalty and Marketplace Features**

## Recommended Starting Method

Start with Phase 1 to perfect wallet connection and UI integration, then proceed to actual contract integration.

## Implementation Order

1. SuiProviders setup and wallet connection
2. Create Zustand store
3. Connect existing mock UI with actual state
4. Implement smart contract calls
5. Error handling and UI polish

## Important Notes

- Manage Sui Mainnet/Testnet configuration with environment variables
- Never hardcode private keys or sensitive information
- Maintain responsive design
- Ensure accessibility compliance

Please implement actual blockchain functionality while preserving the existing mock UI design and UX.
