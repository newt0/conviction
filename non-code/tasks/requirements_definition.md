## ConvictionFi Technical Requirements Document (For Engineers)

### 1. Overview

ConvictionFi is a decentralized finance platform that enables users to mint their beliefs as NFTs. These NFTs act as autonomous DeFAI (Decentralized Financial AI) agents, executing crypto investment strategies on the user's behalf. The system integrates on-chain execution, off-chain AI agents, and transparent metadata management.

---

### 2. Tech Stack

#### Web3 Components

- **Blockchain**: Sui
- **Smart Contract Language**: Move
- **AI Metadata Storage**: Walrus (off-chain JSON)
- **Agent Execution**: Sui Agent Kit
- **User Authentication**: Privy (Twitter, Email, Google)
- **Cross-Chain Bridge**: Wormhole

#### Web2 Application

- **Language**: TypeScript
- **Framework**: Next.js
- **Styling**: TailwindCSS + shadcn/ui
- **Backend**: Firebase (Realtime DB + Functions)
- **Hosting**: Vercel
- **Payments**: Stripe

---

### 3. System Components

#### 3.1 NFT Minting & Metadata

- NFTs minted on Sui include:

  - `strategy_name`
  - `metadata_url` (Walrus JSON link)
  - `agent_wallet_address`

- On mint, generate a smart contract wallet (agent wallet) and bind it to the NFT

#### 3.2 AI Agent (Off-Chain)

- Implemented in Node.js or Python
- Periodically fetches metadata from Walrus
- Executes investment logic based on triggers (oracle price, Twitter API, cron)
- Sends TransactionBlock via Sui SDK

#### 3.3 Wallet Isolation

- Each NFT is linked to an isolated smart contract wallet
- Main wallet remains untouched
- Withdraw function is lockable or optionally disabled

#### 3.4 Walrus Metadata Schema

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

#### 3.5 Dashboard & Notifications

- Daily @reply PnL updates from a Twitter bot
- Dashboard (Next.js) shows:

  - NFT name, balance, PnL, last action, metadata summary

#### 3.6 Payment Integrations

- Native Sui wallet via adapter
- USDC/USDT via Wormhole → Sui → trigger mint
- Stripe payments trigger Firebase cloud functions and signed message relay

---

### 4. Security Requirements

- Smart contract admin role enforcement
- Signature-based agent permissions
- Pre-deploy audit or formal verification required

---

### 5. Future Enhancements

- Agent Leaderboard (performance ranking)
- zkLogin-based anonymous DeFi access
- Strategy versioning, fork/remix tools
- L2 support via ZK Rollups or parallel chains

---

_This document defines the MVP technical blueprint for ConvictionFi and will evolve based on testing and deployment phases._
