# 🔄 ConvictionFi | NFT Secondary Market Design & Specification

In ConvictionFi, NFTs are not mere collectibles —  
they are **autonomous financial agents encoded with conviction and capital**.

This document outlines how such NFTs can be safely and meaningfully traded on the secondary market.

## 🧩 Why a Custom Model is Required

Unlike traditional NFTs:

- Conviction NFTs are **linked to live wallets holding capital**
- Transferring the NFT **transfers control over an operating strategy**
- The strategy and conviction are immutable, but transparently recorded

## 📦 Core Principles

| Element            | Specification                                                         |
| ------------------ | --------------------------------------------------------------------- |
| Secondary Trading  | ✅ Allowed (with optional lock or delay)                              |
| Marketplace Design | In-house, native ConvictionFi marketplace (integrated UX)             |
| External Support   | ❌ Not supported (e.g., OpenSea) due to metadata/UI complexity        |
| Pricing            | Open pricing or optional reserve prices                               |
| Asset Transfer     | Transferring the NFT also transfers wallet control and active capital |

## 🔐 Security & Conditions

### ✅ Listing Requirements

- NFTs must be **actively operating** and status shown
- Display current wallet balance + 7-day performance
- Can only be listed **after a lock period** (e.g., 30 days post-mint)

### ✅ Post-Transfer Behavior

- Upon transfer, **agent wallet control passes to the new owner**
- Agent continues operating uninterrupted
- Conviction remains immutable — the thesis stays

## 📊 Displayed Marketplace Data (per NFT)

- NFT name / strategy name
- Conviction statement
- Current wallet balance
- 7-day performance chart
- Version & evolution history
- Remaining lock time (if applicable)

## 💸 Revenue Model (Optional)

- ConvictionFi may take a marketplace fee (e.g., 2.5%)
- Royalties can be configured to reward SBT holders or DAO pools
- Future: protocol-level royalties based on conviction age or history

## 💡 Future Expansions

- Strategy-based filtering (e.g., “Only Conservative Agents”)
- Price recommendation engine based on wallet snapshots
- “One-time Evolution Token” included with NFT purchases
- Leaderboards: most evolved agents, longest-held convictions, etc.

## 🧠 Philosophical Position

ConvictionFi NFTs enable the world’s first **marketplace for belief**.

You're not buying a picture —  
you're acquiring a **thesis, a strategy, and a transparent operational history.**

This is not just asset trading.  
This is **Conviction Transfer** —  
a protocol layer that monetizes ideas through autonomous execution.

ConvictionFi’s secondary market is where **finance meets ideology**,  
and where beliefs can be passed on — with proof.
