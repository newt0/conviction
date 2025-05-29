# /project:05_events

## 📊 Instructions

This command defines the **event structs** used in the ConvictionFi smart contract.

## 🎯 Requirements

- Define all event structs **within** the `conviction_fi.move` module
- Each event struct must include the `has copy, drop` ability
- Each struct must include a comment specifying **which function emits it** in English

## 📦 Target Event Structs

- `NFTMinted`
- `DepositMade`
- `WithdrawalMade`
- `EmergencyWithdrawal`
- `AgentDelegated`
- `AgentActionExecuted`
- `DelegationRevoked`
- `StrategyAdded`
- `SystemPauseToggled`

## 🛠 Output Expectations for Claude

- Append all event definitions to the **event section** of the module
- Ensure each struct is compatible with `event::emit(...)`
- Strictly validate type correctness for all fields (e.g., `ID`, `address`, `u64`, `bool`)

---

Claude Code should treat this command as `/project:05_events` and append **all required event struct definitions** to the `conviction_fi.move` module.
