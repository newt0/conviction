# 🚀 ConvictionFi Smart Contract Function Requirements v2.0

_(Optimized for Sui Move Language & Object Model)_

## 🏧 Architecture Overview

ConvictionFi consists of the following four core components:

1. **Conviction NFT** – A transferable NFT that holds investment strategy and metadata.
2. **Managed Wallet** – A shared object tied to each NFT for asset custody.
3. **Strategy Registry** – A global registry managing all valid investment strategies.
4. **Delegation System** – A subsystem managing permissioned delegation to AI Agents.

## 📋 Detailed Functional Requirements

### 1. 🎯 Conviction NFT Management

#### 1.1 NFT Structure

```move
struct ConvictionNFT has key, store {
    id: UID,
    strategy_id: u64,
    risk_level: u8,         // 1-10 (1 = conservative, 10 = aggressive)
    wallet_id: ID,          // ID of the linked ManagedWallet
    created_at: u64,        // Timestamp
    last_rebalance: u64,    // Last rebalance time
    metadata: vector<u8>,   // Extendable metadata
}
```

#### 1.2 NFT Minting Function

- **Function**: `mint_conviction_nft(strategy_id: u64, risk_level: u8, initial_deposit: Coin<SUI>, ctx: &mut TxContext)`
- **Flow**:

  1. Validate strategy ID via Strategy Registry
  2. Check risk level (must be within 1-10)
  3. Create ConvictionNFT
  4. Create corresponding ManagedWallet and deposit funds
  5. Transfer NFT to caller

#### 1.3 NFT Transfer Function

- **Transfer**: Utilizes Sui's standard `transfer::public_transfer`
- **On Transfer**: Uses Transfer Policy to auto-update wallet control
- **Constraint**: Any active delegation is auto-cancelled on transfer

### 2. 💰 Managed Wallet System

#### 2.1 Wallet Structure

```move
struct ManagedWallet has key {
    id: UID,
    nft_id: ID,                    // Linked NFT ID
    controller: address,           // Current controller (NFT owner)
    balance: Balance<SUI>,         // SUI balance
    delegated_agent: Option<address>, // Delegated AI agent
    delegation_expires: u64,       // Expiry of delegation
    total_deposited: u64,          // Tracking lifetime deposits
    total_withdrawn: u64,          // Tracking lifetime withdrawals
}
```

#### 2.2 Fund Management

##### Deposit

- **Function**: `deposit_to_wallet(wallet: &mut ManagedWallet, nft: &ConvictionNFT, payment: Coin<SUI>, ctx: &TxContext)`
- **Constraint**: Only NFT owner can execute
- **Logic**: Accepts only SUI; adds to balance

##### Withdraw

- **Function**: `withdraw_from_wallet(wallet: &mut ManagedWallet, nft: &ConvictionNFT, amount: u64, ctx: &mut TxContext): Coin<SUI>`
- **Constraint**: Only NFT owner can execute
- **Logic**: Returns specified amount as Coin<SUI>

##### Emergency Withdraw

- **Function**: `emergency_withdraw(wallet: &mut ManagedWallet, nft: &ConvictionNFT, ctx: &mut TxContext): Coin<SUI>`
- **Constraint**: Owner only, withdraws all, cancels all delegations

### 3. 🤖 AI Agent Integration & Delegation

#### 3.1 Delegation Structure

```move
struct AgentDelegation has key {
    id: UID,
    wallet_id: ID,
    agent_address: address,
    permissions: u64,          // Bitmask permissions
    expires_at: u64,
    max_transaction_amount: u64,
    daily_limit: u64,
    used_today: u64,
    last_reset: u64,
}
```

#### 3.2 Permission Flags

```move
const PERMISSION_TRADE: u64 = 1;
const PERMISSION_STAKE: u64 = 2;
const PERMISSION_LEND: u64 = 4;
const PERMISSION_REBALANCE: u64 = 8;
```

#### 3.3 Agent Execution

##### Set Delegation

- **Function**: `delegate_to_agent(wallet: &mut ManagedWallet, nft: &ConvictionNFT, agent: address, permissions: u64, duration: u64, limits: AgentLimits, ctx: &TxContext)`
- **Constraint**: Only NFT owner can execute
- **Logic**: Overwrites existing delegation; sets limits and expiration

##### Execute Action

- **Function**: `execute_agent_action(wallet: &mut ManagedWallet, delegation: &mut AgentDelegation, action_type: u8, params: vector<u8>, ctx: &TxContext)`
- **Constraints**:

  - Caller must match delegated agent
  - Permission bitmask must be valid
  - Must not exceed limit
  - Must not be expired

### 4. 📊 Strategy Registry

#### 4.1 Strategy Structure

```move
struct StrategyRegistry has key {
    id: UID,
    strategies: Table<u64, Strategy>,
    next_strategy_id: u64,
    admin: address,
}

struct Strategy has store {
    id: u64,
    name: String,
    description: String,
    risk_category: u8,
    supported_protocols: vector<String>,
    min_deposit: u64,
    is_active: bool,
}
```

#### 4.2 Strategy Management

- **Add**: `add_strategy(registry: &mut StrategyRegistry, strategy: Strategy, ctx: &TxContext)`
- **Update**: `update_strategy(registry: &mut StrategyRegistry, strategy_id: u64, updates: StrategyUpdate, ctx: &TxContext)`
- **Deactivate**: `deactivate_strategy(registry: &mut StrategyRegistry, strategy_id: u64, ctx: &TxContext)`

### 5. 🔍 View & Query Functions

#### 5.1 NFT Queries

- `get_nft_details(...)`
- `get_nft_owner(...)`
- `get_nft_performance(...)`

#### 5.2 Wallet Queries

- `get_wallet_balance(...)`
- `get_wallet_controller(...)`
- `get_delegation_info(...)`

#### 5.3 Strategy Queries

- `get_strategy(...)`
- `get_active_strategies(...)`

### 6. 🛡️ Security & Access Control

#### 6.1 Access Assertions

```move
fun assert_nft_owner(...)
fun assert_agent_authorized(...)
fun assert_within_limits(...)
```

#### 6.2 Emergency Controls

- `emergency_pause(...)`
- `pause_wallet(...)`

### 7. 🔧 Admin & Governance

#### 7.1 Admin Structures

```move
struct AdminCap has key, store {
    id: UID,
}

struct GlobalConfig has key {
    id: UID,
    paused: bool,
    min_deposit_amount: u64,
    max_risk_level: u8,
    default_delegation_duration: u64,
    protocol_fee_rate: u64,
}
```

#### 7.2 Fee Management

- `set_protocol_fee(...)`
- `withdraw_protocol_fees(...)`

### 8. 📈 Events & Monitoring

#### 8.1 Events

```move
struct NFTMinted {...}
struct AgentDelegated {...}
struct AgentActionExecuted {...}
```

## 🔒 Security Design Principles

1. **Least Privilege**
2. **Capital Safety**
3. **Transparency**
4. **Fail-Safe Defaults**

## 🚀 Implementation Phases

- **Phase 1**: Core infrastructure (NFT, Wallet, Registry)
- **Phase 2**: Delegation System
- **Phase 3**: DeFi Integration
- **Phase 4**: Advanced Features
