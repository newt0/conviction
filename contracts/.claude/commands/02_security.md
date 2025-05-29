# /project:02_security

## 🔐 Instructions

This command implements **security validation functions** and **core public functions (Mint, Deposit, Withdraw)** for the `ConvictionFi` Move smart contract.

## 🎯 Requirements

- Output should be appended to the `conviction_fi.move` module
- Explicitly implement validation logic for: `GlobalConfig`, `ManagedWallet`, `ConvictionNFT`, `AgentDelegation`, etc.
- Apply strict constraints for:

  - Gas efficiency
  - Replay attack prevention
  - Time-based control
  - Permission checks via bitmask

- **Add comments** to every function to explain its purpose and behavior

## 💡 Target Functions

### 1. Security Validation Functions

- `assert_system_active`
- `assert_wallet_active`
- `assert_nft_owner`
- `assert_valid_amount`
- `assert_delegation_valid`
- `assert_permission`
- `assert_daily_limit`

### 2. Core Logic Functions (minimum required)

- `mint_conviction_nft`
- `deposit_to_wallet`
- `withdraw_from_wallet`
- `emergency_withdraw`

## 🛠 Output Expectations for Claude

- Implement all functions as part of the `impl conviction_fi::core` block
- Each function must include clear documentation comments and ensure alignment with the defined error codes
- Balance security best practices with optimal user experience

---

Claude Code should treat this command as `/project:02_security`, and safely integrate all of the above functions into the `conviction_fi.move` module.
