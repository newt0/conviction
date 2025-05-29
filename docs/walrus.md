# 🐘 ConvictionFi | Walrus Storage Specification & Usage Guide

ConvictionFi uses [Walrus](https://walrus.ai) to store all critical NFT metadata in an **immutable, permanent, and transparent** way.

This document outlines how ConvictionFi leverages Walrus to guarantee the integrity, auditability, and future-proofing of conviction-based trading agents.

## 📦 What We Store on Walrus

Each Conviction NFT is associated with a Walrus-hosted metadata record containing:

- **Strategy data** (name, logic, parameters, asset targets)
- **Conviction statement** (reasoning behind the strategy)
- **Risk parameters** (limits for position size, drawdown, etc.)
- **Execution policy** (whitelisted / blacklisted contracts and EOAs)
- **Agent version and evolution history**
- **Mint timestamp**
- **Optional trade summary**

All data is stored in **JSON format**, retrievable via the NFT's metadata URI.

## 🛡️ Why We Use Walrus

| Requirement         | Walrus Feature                                       |
| ------------------- | ---------------------------------------------------- |
| Immutability        | Content-addressed storage (CID) ensures integrity    |
| Permanence          | Data cannot be deleted or overwritten                |
| Transparency        | Anyone can inspect metadata via URI                  |
| Audit readiness     | Full history is preserved (append-only architecture) |
| On-chain efficiency | No need to store large metadata directly on-chain    |

## 🗂️ Storage Format (Example)

```json
{
  "strategy": {
    "name": "Trump Bull v1",
    "logic": "buy_on_sentiment",
    "parameters": { "threshold": 0.8 }
  },
  "conviction": "Trump’s influence will drive memecoin rallies",
  "risk_profile": {
    "max_trade_per_day": 3,
    "max_position_pct": 0.25,
    "autostop_on_loss": true
  },
  "execution_policy": {
    "whitelisted_contracts": ["0xuniswap...", "0xwormhole..."],
    "allowed_eoa_targets": ["0xoracle1..."]
  },
  "agent_wallet": "0xabc123...",
  "minted_at": "2025-05-23T11:00:00Z",
  "version": "v1.0.0"
}
```

## 🔁 Update & Versioning Policy

Walrus is **append-only** — meaning no data is ever overwritten.

- Strategy upgrades or evolutions are added as **new versions**, preserving history
- The NFT’s metadata URI always points to the latest version
- Previous versions are still accessible for auditing and verification

This ensures **full traceability** of how an agent evolves over time.

## 🔍 Per-NFT Accessibility

Each NFT includes a **Walrus metadata URI**:

- Automatically generated and attached at mint
- Visible in the dashboard
- Shows real-time strategy, risk profile, execution policies, and version

## 🔐 Security & Verifiability

- All URIs are based on verifiable CIDs (Content Identifiers)
- Agent logic cannot be secretly altered after minting
- Any strategy change requires a new version and potentially governance approval

## 🔮 Future Applications

Walrus may be extended to support:

- Governance proposals and voting history
- AI Agent logs (reasoning, trade justifications)
- Lineage tracking (for agent evolution and NFT merging)

Walrus is not just storage.
In ConvictionFi, it’s the **infrastructure of belief** — securing every NFT’s philosophy, logic, and trust.

It’s how we turn conviction into code. Permanently.
