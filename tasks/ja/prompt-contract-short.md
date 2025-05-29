## 📦 Prompt for Claude: Write a Move Smart Contract for ConvictionFi

You are an expert Move smart contract developer for the **Sui blockchain**.
Please implement a single Move module for a product called **ConvictionFi**.

This product turns a user’s investment conviction into an autonomous trading agent, represented as an NFT.
The architecture consists of three actors:

### 🧱 System Architecture

1. `ConvictionNFT`

   - A transferable NFT that holds strategy parameters and risk level.

2. `AgentWallet`

   - A unique wallet created and tied to each NFT, holding user-deposited SUI.
   - Controlled by the current NFT owner.

3. `AI Agent` (off-chain)

   - Issues signed transactions to execute strategies on behalf of the NFT owner.

## ✅ Requirements for the Move Module

### 1. Mint Function

- Accept user input:

  - `strategy_id: u64`
  - `risk_level: u8`
  - `initial_deposit: u64` (in SUI)

- On mint:

  - Create a `ConvictionNFT` and assign it to the caller.
  - Create a new `AgentWallet`, and deposit the initial funds.
  - Tie the wallet to the NFT and assign the wallet controller = current NFT owner.

> 🔒 Note: Only SUI is accepted. USDC or other tokens are converted off-chain.

### 2. AgentWallet Functions

- `withdraw(): only the current NFT owner (controller) can call.`
- `get_balance(): public view function.`
- `controller` field must always match the NFT owner address.

### 3. Strategy Execution Interface

- Provide entry functions like:

  - `execute_trade()`
  - `rebalance()`
  - `stake()` / `unstake()`

- Access control:

  - Caller must be the NFT owner, or a delegate approved by the owner (custom logic optional).

### 4. NFT Transfer Hook

- Ensure that when the `ConvictionNFT` is transferred:

  - The linked `AgentWallet.controller` is updated to the new NFT owner.
  - This guarantees the wallet’s authority follows the NFT.

### 5. View Functions

Please implement:

- `get_strategy_id(nft_id)`
- `get_wallet_address(nft_id)`
- `get_wallet_balance(wallet_id)`
- `get_owner(nft_id)`

## 🔒 Constraints & Security

- Wallet must not be shared across NFTs. One NFT = One wallet.
- All wallet operations require a valid controller signature.
- Do not support token types other than SUI in this contract.
- The module must be upgradeable in the future.

## ✅ Output Format

- One clean, well-structured Move module.
- Use clear naming: `ConvictionNFT`, `AgentWallet`, etc.
- Write inline comments for each struct and function.
- Do not include tests or external tooling.
- No CLI interface needed.
