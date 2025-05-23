## ConvictionFi Technical Specification Document (for Engineers)

### 1. Project Overview

ConvictionFi is a platform that tokenizes users' convictions as NFTs, which act as autonomous DeFAI (Decentralized Financial AI) agents executing crypto investments. By minting an NFT, users delegate trading decisions to the AI agent, enabling transparent, secure, and fully automated investing.

---

### 2. Tech Stack

- **Blockchain**: Sui
- **Smart Contract Language**: Move
- **Decentralized Storage**: Walrus (for storing strategy logic and agent config JSON)
- **Social Login**: Privy (Twitter, Email, Google)
- **Cross-Chain Bridge**: Wormhole + Circle CCTP
- **Fiat Payment**: Stripe / Transak
- **Notification Infra**: Twitter Bot + Sui Agent Kit (or Webhook)

---

### 3. Component-Based Technical Requirements

#### 3.1 NFT Issuance & Structure

- NFTs are minted on Sui and contain the following metadata:

  - strategy_name (e.g., "Trump memecoin sniper")
  - metadata_url (link to Walrus-hosted JSON)
  - agent_wallet_address

- Upon minting, a corresponding smart contract wallet is auto-generated

#### 3.2 AI Agent Architecture

- An off-chain bot (Node.js or Python) acts as the AI agent
- Agent retrieves config JSON from Walrus and performs investment logic
- Example triggers: Oracle price changes / Twitter API monitoring / Cron Jobs
- Agent executes on-chain via Sui SDK by issuing TransactionBlocks from the agent wallet

#### 3.3 Wallet Structure

- Each NFT has an isolated smart contract wallet
- Completely separated from the user’s main wallet
- Withdraw function supports lock period or can be disabled (floor-price model)

#### 3.4 Walrus Metadata Structure

```json
{
  "theme": "Conservative DeFi Basket",
  "system_prompt": "Act as a low-risk DeFi allocator",
  "monitored_targets": [
    { "type": "oracle", "asset": "ETH", "condition": ">= 3000" },
    {
      "type": "twitter",
      "handle": "@federalreserve",
      "keywords": ["rate", "inflation"]
    }
  ],
  "actions": [{ "type": "swap", "from": "USDC", "to": "ETH", "amount": "50%" }]
}
```

#### 3.5 Notifications & Dashboard

- The agent retrieves daily PnL data and sends it via Twitter Bot @replies
- Dashboard will be built using Next.js + TailwindCSS
- Displayed fields:

  - NFT Name / Balance / Cumulative PnL / Last Tx Info / Metadata Summary

#### 3.6 Payment Interfaces

- Native Sui payments via Wallet Adapter
- Cross-chain bridge payments (e.g., USDC/USDT via Wormhole → triggers Mint on Sui)
- Stripe/Transak payments handled off-chain with signed message relay

#### 3.7 Security Requirements

- Admin role control for contracts; rollback-disabled design
- Signature-based permission control for agent read/write operations
- Formal verification or audit recommended before mainnet deployment

---

### 4. Future Technical Extensions

- Agent evaluation leaderboard for meta-optimization
- zkLogin integration for anonymous DeFi access
- Versioning / Fork & Remix functionality for strategy templates
- L2 compatibility (e.g., ZK Rollup-based extension)

---

_This document defines the MVP-level technical requirements for ConvictionFi and will be updated as development progresses._
