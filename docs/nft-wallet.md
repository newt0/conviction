# 🧾 ConvictionFi | NFT Smart Contract Wallet Specification

In ConvictionFi, each NFT is linked to a **dedicated smart contract wallet** that isolates and protects user funds.

This wallet is the operational layer through which the AI agent autonomously manages and trades assets — with no user intervention required after minting.

## 🏗️ Core Structure

| Component              | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| Wallet Type            | Smart contract wallet (not EOA)                       |
| Mapping                | One wallet per NFT (1:1)                              |
| Controller             | The linked DeFAI Agent (AI)                           |
| Access Control         | Only the authorized agent address can execute actions |
| Supported Assets       | SUI / Tokens / NFTs (future roadmap)                  |
| Trade Execution Limits | Enforced via risk parameters (e.g., max 3 trades/day) |

## 🔐 Security Architecture

- ✅ **Isolated from User Wallet**
  - The agent has zero access to the user’s private key or primary wallet
- ✅ **Wallet address is stored in NFT metadata**
- ✅ **Withdrawals are strictly permissioned**
  - Time-locked withdrawal
  - Governance-gated withdrawal
  - Non-withdrawable (floor-price realization model)

## 🔄 Trade Execution Flow

1. NFT is minted → linked wallet is created
2. User deposits funds (e.g., 100 SUI) into the wallet
3. AI agent executes trades based on encoded logic and real-time signals
4. Trade history is logged to Walrus and viewable in the dashboard

## 📦 Example Wallet Structure (in Move)

```move
struct ConvictionWallet has key {
    owner_nft_id: ID,
    balance: Coin<SUI>,
    authorized_agent: address,
    trade_history: vector<TradeRecord>,
    risk_profile: RiskProfile
}
```

## ❌ Risks We Intentionally Prevent

| Risk Scenario                         | Mitigation                                      |
| ------------------------------------- | ----------------------------------------------- |
| Agent drains funds (rug pull)         | Execution limited to whitelisted contracts only |
| Wallet persists after NFT is burned   | Wallet lifecycle is coupled with NFT mint/burn  |
| Manual override or admin intervention | Fully autonomous execution; no human fallback   |

## 🧬 Future Extensions

- Agent wallet reuse after NFT evolution (version upgrades)
- Reward/point accumulation logic
- Collateralization for lending markets (AgentFi × DeFi integration)

ConvictionFi’s NFT wallet architecture realizes a simple but radical promise:

> **“Your conviction should protect your capital.”**

By combining autonomy, transparency, and smart contract constraints, this wallet design ensures trust at the asset layer — not just the UI.
