# /project:07_utilities_init

## 🧰 Instructions

This command implements **utility getter functions** and the **initialization logic** for the ConvictionFi smart contract.

## 🎯 Requirements

The following components must be added to the `conviction_fi.move` module:

### 1. Getter Functions (Information Retrieval)

- `get_nft_details`
- `get_wallet_balance`
- `get_delegation_info`
- `get_strategy_details`
- `get_system_stats`

### 2. Initialization Function

- `init` — creates and shares `GlobalConfig`, `StrategyRegistry`, and `AdminCap`

## 🛠 Output Expectations for Claude

- Getter functions must extract required data from arguments and return them as tuples
- The `init` function should use `object::new`, `tx_context::sender`, and `transfer::share_object` properly
- All comments must be written in **English** and clearly explain the purpose of each function
- Use gas-efficient and type-safe Move syntax throughout

---

Claude Code should process this command as `/project:07_utilities_init`, and implement all utility getters and initialization logic into the `conviction_fi.move` module accordingly.
