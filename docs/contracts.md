# ✅ ConvictionFi Smart Contract Function Overview

_(Based on 3-Component Architecture and Pre-Mint Asset Conversion)_

## 🧱 Core Architecture

ConvictionFi is built on the following three components:

1. **Conviction NFT** – A transferable asset that stores the user’s investment conviction and strategy parameters.
2. **Agent Wallet** – A dedicated asset container tied to each NFT, holding and managing actual funds.
3. **AI Agent** – An off-chain entity with signing authority that operates the wallet and executes DeFi strategies.

## 🛠 Smart Contract Functional Overview

### 1. ✅ Conviction NFT Minting

- Users mint a Conviction NFT by specifying a strategy ID, risk level, and an initial SUI deposit amount.
- The mint process includes:

  - Creating the Conviction NFT (owned by the minter)
  - Creating a corresponding Agent Wallet and depositing funds into it
  - Linking the wallet to the NFT (the NFT implicitly designates the wallet’s controller)

> _Note: USDC or other tokens are converted to SUI off-chain before this mint transaction is called._

### 2. ✅ Agent Wallet Fund Management

- Each Conviction NFT is linked to a dedicated Agent Wallet that stores and manages the associated funds.
- Functions include:

  - `deposit()` – Automatically triggered at mint time. Additional deposits are not allowed.
  - `withdraw()` – Only permitted by the current owner of the NFT (`wallet.controller`)
  - `get_balance()` – Returns the current wallet balance in SUI, used for reporting and UI.

### 3. ✅ Strategy Execution via AI Agent

- The smart contract exposes public functions to allow authorized entities to operate the Agent Wallet.

- To execute actions, the AI Agent must:

  - Be a signer matching the `controller` address (i.e., the current NFT owner), or
  - Be delegated authority by the controller

- Sample execution functions:

  - `execute_trade()` – Execute trades via DeFi protocols
  - `rebalance()` – Adjust asset allocations
  - `stake()` / `unstake()` – Engage with staking protocols

### 4. ✅ NFT Transfer & Wallet Control Update

- Conviction NFTs are transferable.
- Upon transfer:

  - The `controller` field in the associated wallet is updated to reflect the new NFT owner’s address
  - This ensures the authority to initiate transactions also shifts accordingly

### 5. ✅ Utility View Functions

- These public read-only functions support frontends and notification agents:

  - `get_strategy_id(nft_id)` – Fetches the strategy ID tied to the NFT
  - `get_wallet_address(nft_id)` – Returns the Agent Wallet address linked to the NFT
  - `get_wallet_balance(wallet_id)` – Returns the wallet’s current SUI balance
  - `get_owner(nft_id)` – Returns the current owner of the NFT

### 6. ✅ Admin & Governance Functions _(Optional)_

- Whitelist management for valid strategy IDs
- Royalty settings for NFT secondary sales
- Optional restriction: one NFT mint per user

## 🔒 Security & Design Constraints

- All operations on the Agent Wallet require a valid signature from its designated `controller` (NFT owner).
- The smart contract **only accepts SUI**; other assets like USDC must be converted externally via UI or middleware before minting.
- Each Conviction NFT is **uniquely paired** with its own wallet. Sharing a wallet across multiple NFTs is not permitted.
