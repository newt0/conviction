# 🧬 ConvictionFi | NFT Design Document

At ConvictionFi, NFTs are not just collectibles.  
They are **autonomous AI agents**, encoded with conviction and equipped to act on your behalf.  
This document defines the structure, logic, and governance of Conviction NFTs.

## 🏗️ Core Structure

Each Conviction NFT is a programmable asset that includes:

- **Strategy Metadata**: AI trading logic (rules, triggers, asset targets)
- **Conviction Statement**: The belief that justifies the strategy (e.g., “AI will drive U.S. tech stocks”)
- **Risk Parameters**: Constraints for safe execution (drawdown, frequency, allocation)
- **Dedicated Agent Wallet**: Isolated wallet where funds are held and managed
- **Execution Policy**: Whitelisted or blacklisted smart contracts and EOA targets
- **Metadata Storage**: Stored immutably on [Walrus](https://walrus.ai)
- **Mint Timestamp**: Identifies the birth and tracking of the agent

## 🧠 Agent Behavior

- Each NFT is linked to a unique **DeFAI Agent**
- The agent observes external signals (prices, tweets, indicators)
- It makes decisions based on pre-encoded strategy logic
- It executes trades autonomously, without user input
- All actions are reportable via a dashboard and public Twitter notifications

## 🔐 Risk Parameters (Example)

Conviction NFTs can define custom risk settings:

```json
"risk_profile": {
  "max_trade_per_day": 3,
  "max_position_pct": 0.3,
  "max_drawdown_pct": 0.2,
  "autostop_on_loss": true
}
```

- **max_trade_per_day**: Maximum trades per day
- **max_position_pct**: Max % of funds per asset
- **max_drawdown_pct**: Cumulative loss threshold for halt
- **autostop_on_loss**: Whether to automatically stop on a major loss

## 🧾 Execution Policy (Allowlist / Blocklist)

To ensure security and transparency, each NFT defines which protocols or accounts can be accessed:

```json
"execution_policy": {
  "whitelisted_contracts": [
    "0xuniswap...",
    "0xcurve..."
  ],
  "blacklisted_contracts": [
    "0xscamdex..."
  ],
  "allowed_eoa_targets": [
    "0xoracle1...",
    "0xbotwallet..."
  ]
}
```

- **Smart Contracts**: Only explicitly approved protocols are callable
- **EOA Targets**: Specific oracles or automation agents
- **Blocklist priority**: Overrides whitelist for safety

## 🪙 Mint-to-Execution Flow

1. User selects or customizes a conviction strategy
2. Signs a transaction to mint the NFT and spawn the agent
3. Deposits funds into the dedicated NFT wallet
4. Agent begins autonomous operation
5. Daily updates are delivered via dashboard and Twitter mentions

## 🔄 Future Evolution Model

- **Staking Evolution**: Locking \$CVCT tokens to unlock advanced agent features
- **Governance Upgrades**: Community voting on agent logic upgrades
- **Burn-and-Remint**: Reset with conviction carried forward
- **Versioning**: Agent versions are recorded on Walrus and linked to wallet history

## 📁 Example Metadata (JSON)

```json
{
  "name": "Trump Bull v1",
  "strategy": "buy_on_sentiment",
  "conviction": "Trump’s social influence will drive memecoin rallies",
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
  "minted_at": "2025-05-23T11:00:00Z"
}
```

## 🧱 Standards & Compatibility

| Element          | Description                                             |
| ---------------- | ------------------------------------------------------- |
| NFT Standard     | Sui Move Object (ERC-721-equivalent in structure)       |
| Storage          | Walrus (append-only, verifiable, censorship-resistant)  |
| Marketplace      | ConvictionFi native UI (in-house trading only)          |
| Update Frequency | Daily agent transaction reports                         |
| Transferability  | Controlled via metadata (lock periods, resale policies) |

ConvictionFi NFTs embody a new paradigm:
**Investment not based on speculation, but conviction.**
In a world of volatility, automation, and noise,
Conviction NFTs offer clarity, constraint, and composability — by design.
