# CLAUDE.md

## 🧭 Project Name

**ConvictionFi** – A fully autonomous crypto asset management agent powered by belief and conviction.

## 🎯 Project Objective

ConvictionFi is a DeFAI system (Decentralized Finance + AI) that allows users to mint a single NFT representing their investment conviction or ideology, which then autonomously manages their assets. Users can delegate on-chain strategy execution to an agent without manual operations, and track performance via wallet, NFT, or Twitter-based notifications.

## 📦 Tech Stack (Web3 Infrastructure)

- **Blockchain**: Sui
- **Smart Contract Language**: Move (2024 Edition)
- **Core Components**:

  - `ConvictionNFT` – Token representing user belief
  - `ManagedWallet` – Agent-controlled smart wallet
  - `AgentDelegation` – Permissioned delegation for execution
  - `StrategyRegistry` – Registry for supported strategies
  - `GlobalConfig` – Global configuration and system parameters

## 🧱 Feature Phases (Mapped to Claude Commands)

- `01_core_infra`: Foundational types and constant definitions
- `02_security`: Security validations and core functions (Mint / Deposit / Withdraw)
- `03_ai_agent`: Delegation and autonomous agent execution
- `04_testing`: Comprehensive test suite using `test_scenario`
- `05_events`: Event struct definitions (for logging)
- `06_advanced_features`: Strategy management, delegation revocation, system control
- `07_utilities_init`: Getter functions and initialization logic
- `08_deployment`: Final validation, `Move.toml`, build/test/deploy CLI flow

## 📜 Development Prerequisites

```toml
Sui Version     = "1.15.0+"
Move Language   = "2024 Edition"
Target Network  = "Sui Mainnet"
Gas Budget      = "Optimized for <1000 SUI"
Security Level  = "Audit-Ready"
```

## 🧠 Using with Claude Code

To operate this project with Claude Code, sequentially load each command as follows:

```bash
claude > /project:01_core_infra
claude > /project:02_security
claude > /project:03_ai_agent
...
claude > /project:08_deployment
```

Each command is stored as a Markdown file under `.claude/commands/` and acts as a modular instruction unit.

## ✍️ Documentation Principles

- All functions and structs should include **bilingual comments (Japanese + English)**
- Each output must explicitly state its **intent and usage** so Claude can understand context properly

## 🚨 Security Policy

- All permissions are controlled via a bitmask system
- `nonce` is implemented to prevent replay attacks
- Transaction amounts, daily limits, and delegation durations are all strictly validated
- Every `public fun` is guarded with appropriate `assert_*` checks

## 📅 Final Goals

- Generate a production-ready `conviction_fi.move` smart contract
- Implement complete test coverage for all logic
- Establish a fully automated Claude-driven contract generation workflow
