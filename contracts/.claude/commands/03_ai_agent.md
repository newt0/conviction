# /project:03_ai_agent

## 🤖 Instructions

This command implements the **integration logic with the AI Agent** for ConvictionFi — specifically focusing on **agent delegation** and **autonomous agent execution**.

## 🎯 Requirements

- Implement all logic by appending to the `conviction_fi.move` module
- Ensure strict validation and linkage between `ManagedWallet` and `AgentDelegation`
- Apply `assert_permission` and `assert_daily_limit` **before any execution**
- Include conditional branching based on action types: Trade, Stake, Lend, Rebalance, Emergency
- **Add inline comments** to all functions for clarity in English

## 💡 Target Functions

### 1. Delegation Logic

- `delegate_to_agent`

### 2. Agent Execution Logic

- `execute_agent_action`
- `execute_action_internal`

## 🔢 Permission Matrix

| Action Type | Permission Constant    |
| ----------- | ---------------------- |
| 1           | `PERMISSION_TRADE`     |
| 2           | `PERMISSION_STAKE`     |
| 3           | `PERMISSION_LEND`      |
| 4           | `PERMISSION_REBALANCE` |
| 5           | `PERMISSION_EMERGENCY` |

## 🛠 Output Expectations for Claude

- Securely handle fund transfers from `wallet.balance` to `wallet.reserved_balance`
- Update delegation usage statistics such as `used_today` and `tx_count`
- Use `event::emit(...)` to log agent actions
- `execute_action_internal` may return a simplified output (e.g., `vector<u8>` is acceptable)

---

Claude Code should process this command as `/project:03_ai_agent`, and integrate the AI Agent delegation and execution logic directly into the `conviction_fi.move` module.
