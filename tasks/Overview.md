# ConvictionFi Project Proposal

## 1. Project Overview

**ConvictionFi** offers a new paradigm for realizing the vision of DeFi × AI (DeFAI). With a single NFT mint, users can delegate conviction-based investing to an autonomous AI agent.

- **Product Type**: DeFAI NFT Protocol
- **Tagline**: _“Mint Your Conviction. DeFAI Agent as NFT.”_
- **Target Audience**: Beginner to intermediate DeFi users, ideologically-driven investors, Web3 natives

---

## 2. Background & Problem Statement (The Gap)

While buzzwords like “DeFAI” and “Vibe Trading” have become common, the reality is:

- Use cases remain vague
- UX is fractured
- The actual experience of "using DeFAI" is unclear

**ConvictionFi** solves this.

> By delivering DeFAI Agents as NFTs, we redesign the experience from the UX level up.

---

## 3. Solution: Conviction-Driven Automation

ConvictionFi enables **automated investing rooted in personal belief**.

- Users simply mint an NFT
- That NFT becomes a standalone AI agent managing the user’s capital
- No dashboards. No approvals. No ongoing management

> Your conviction comes alive — encoded in an autonomous financial vessel.

---

## 4. Product Architecture & Flow (How It Works)

ConvictionFi follows a 5-step lifecycle:

### Step 1: Choose & Mint Conviction

- Select your thesis (e.g., \$SUI staking, \$BTC HODLing)
- Mint price = investment capital
- **No further setup. No dashboards.**

> Your conviction is now on-chain.
> **From here, it acts — not you.**

---

### Step 2: Initialize & Deploy

- NFT generates a dedicated smart wallet
- Mint capital is transferred to this wallet
- Strategy logic & system prompts are loaded from **Walrus**
- The agent is instantiated via **Sui Agent Kit**

---

### Step 3: Trade & Report

- Agent performs autonomous trading, staking, or lending
- Regular performance updates are published **via Twitter replies**, visible to the user and their network:

  - Wallet balance
  - Trade logs
  - Strategy status
  - PnL versus initial capital

Each reply becomes a **growth node** in your social graph — generating visibility and engagement.

A private dashboard is also available.

> Transparency builds trust.
> Social feedback fuels growth.

---

### Step 4: Learn & Evolve

- Strategy logic is **upgradable** via versioned Walrus metadata
- Agents evolve with market conditions
- But conviction — the belief minted into the NFT — remains immutable

> The mind may evolve.
> But the soul stays the same.

---

### Step 5: Exit or Transfer

- Most agents exit automatically via thresholds or lockup expiries
- Users can also:

  - **Sell the NFT**
  - **Opt-in for a refund** (if the strategy allows)

> Exit is belief-guided —
> but your agency is preserved.

---

## 5. Security Layer: NFT = Autonomous Firewall

Typical DeFi apps ask users to sign from their primary wallet — exposing them to risk.

> _“Don’t put all your eggs in one basket.”_

ConvictionFi solves this with:

- A **dedicated smart wallet per NFT**
- **No user approvals** post-mint
- Even if the agent fails, **your main wallet remains untouched**

NFTs act as **autonomous firewalls**,
not collectibles — but secure intermediaries between you and DeFi risk.

---

## 6. Tech Stack

| Component           | Technology                 |
| ------------------- | -------------------------- |
| Blockchain          | Sui                        |
| Agent Execution     | Sui Agent Kit              |
| Storage Layer       | Walrus (versioned prompts) |
| Social Notification | Twitter API (reply-based)  |
| UI Framework        | Next.js + shadcn/ui        |
| Wallet Abstraction  | Privy                      |
| Cross-Chain Infra   | Wormhole (planned)         |

---

## 7. Demo Flow (Pitch Video Content)

- **Mint**: e.g., “SUI_MAXIMIZER”
- **Smart wallet creation** and capital confirmation
- **Agent logs** → execution tick → Twitter reply notification
- **UI walkthrough**: login → mint → monitor

---

## 8. Final Message

ConvictionFi eliminates the friction of active asset management:

- Let AI trade — so you can live
- Let NFTs hold your belief — and move capital

> ConvictionFi —
> Where **belief becomes automation**
> Where **conviction becomes capital**
