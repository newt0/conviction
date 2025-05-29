# /project:06_advanced_features

## 🏗️ Instructions

This command implements **advanced features** within the ConvictionFi Move smart contract.

## 🎯 Requirements

Implement the following advanced features across **three functional domains**:

### 1. Strategy Management

- `add_strategy`
- `update_strategy`
- `deactivate_strategy`
- `get_active_strategies`

### 2. Delegation Revocation & Expiry Handling

- `revoke_delegation`
- `cleanup_expired_delegation`

### 3. System Operations & Configuration

- `toggle_system_pause`
- `toggle_wallet_pause`
- `update_global_config`

## 🛠 Output Expectations for Claude

- All functions must be appended to the `conviction_fi.move` module
- Enforce **access control** using `AdminCap` or `assert_nft_owner` as appropriate
- Emit state changes using `event::emit(...)`
- Use `option::is_some()` and `option::extract()` properly for Option values
- All comments must be clearly written **in English**

---

Claude Code should treat this command as `/project:06_advanced_features`, and integrate all advanced features into the `conviction_fi.move` module accordingly.
