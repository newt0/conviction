# 🚀 ConvictionFi Move Smart Contract Generation Prompt

## Core Instructions

You are an expert in the Sui Move language. Based on the following requirements, please generate the smart contract for **ConvictionFi**.

### 🎯 Target Output

- **Main module**: `conviction_fi.move`
- Fully functional **Sui Move code**
- Include **test functions**
- Include **bilingual comments**

### 📋 Technical Specifications

#### Required Standards

1. Conform to **Sui Move 2024 standards**
2. Emphasize **type safety**
3. Optimize for **gas efficiency**
4. Follow **security best practices**
5. Implement **comprehensive error handling**

#### Architecture Requirements

Implement the following four core components:

```rust
// 1. ConvictionNFT - Investment Strategy NFT
struct ConvictionNFT has key, store {
    id: UID,
    strategy_id: u64,
    risk_level: u8,         // 1-10
    wallet_id: ID,
    created_at: u64,
    last_rebalance: u64,
    metadata: vector<u8>,
}

// 2. ManagedWallet - Asset Management Wallet
struct ManagedWallet has key {
    id: UID,
    nft_id: ID,
    controller: address,
    balance: Balance<SUI>,
    delegated_agent: Option<address>,
    delegation_expires: u64,
    total_deposited: u64,
    total_withdrawn: u64,
}

// 3. StrategyRegistry - Strategy Management
struct StrategyRegistry has key {
    id: UID,
    strategies: Table<u64, Strategy>,
    next_strategy_id: u64,
    admin: address,
}

// 4. AgentDelegation - AI Agent Permission Control
struct AgentDelegation has key {
    id: UID,
    wallet_id: ID,
    agent_address: address,
    permissions: u64,
    expires_at: u64,
    max_transaction_amount: u64,
    daily_limit: u64,
    used_today: u64,
    last_reset: u64,
}
```

### 🔧 Required Functionality

#### 1. NFT Management

```rust
public fun mint_conviction_nft(...)
public fun get_nft_details(...)
```

#### 2. Wallet Management

```rust
public fun deposit_to_wallet(...)
public fun withdraw_from_wallet(...)
public fun emergency_withdraw(...)
public fun get_wallet_balance(...)
```

#### 3. AI Agent Delegation

```rust
public fun delegate_to_agent(...)
public fun execute_agent_action(...)
public fun revoke_delegation(...)
```

#### 4. Strategy Registry

```rust
public fun add_strategy(...)
public fun get_strategy(...)
public fun get_active_strategies(...)
```

### 🛡️ Security Requirements

#### Access Control Functions

```rust
fun assert_nft_owner(...)
fun assert_agent_authorized(...)
fun assert_within_limits(...)
```

#### Error Code Definitions

```rust
const EInvalidStrategy: u64 = 1;
const EInvalidRiskLevel: u64 = 2;
// ...
```

### 📊 Required Event Definitions

```rust
struct NFTMinted {...}
struct AgentDelegated {...}
// etc.
```

### 🧪 Test Function Requirements

Include the following test cases:

1. **Success cases**

   - Minting NFT + deposit
   - Deposit / withdrawal
   - Delegation & execution
   - Strategy management

2. **Failure cases**

   - Unauthorized access
   - Limit breaches
   - Expired delegation
   - Invalid input

### 📝 Code Quality Guidelines

#### 1. Commenting Standard

```rust
/// # Arguments
/// * `param1` - description
/// # Returns
/// explanation
/// # Panics
/// conditions
```

#### 2. Naming Convention

- **Structs**: PascalCase
- **Functions**: snake_case
- **Constants**: SCREAMING_SNAKE_CASE
- **Variables**: snake_case

#### 3. Module Structure

```rust
module conviction_fi::conviction_fi {
    use sui::...;

    const E_...: u64 = ...;

    const PERMISSION_...: u64 = ...;

    struct ... { ... }

    fun init(ctx: &mut TxContext) { ... }

    public fun ... { ... }

    fun ... { ... }

    #[test_only]
    public fun test_... { ... }
}
```

### ⚡ Performance Optimization Guidelines

1. **Gas Efficiency**

   - Avoid unnecessary object creation
   - Use batch operations where possible

2. **Parallel Execution**

   - Proper use of shared objects
   - Minimize lock contention

3. **Storage Optimization**

   - Store only essential data
   - Use efficient serialization

### 🔍 Key Implementation Notes

1. **Transfer Policy Integration**

   - Auto-update wallet control on NFT transfer
   - Enable royalty settings

2. **Timestamp Management**

   - Use `sui::clock::Clock`
   - Enforce time-based limits

3. **Numeric Handling**

   - Avoid overflows
   - Maintain precision

4. **Dynamic Fields**

   - For extensible metadata
   - Efficient data access

### 📚 Reference Patterns

Utilize these Sui Move standards as needed:

- Display Standard (NFT metadata)
- Transfer Policy
- Publisher authentication
- Coin/Balance management
- Table/Bag (for dynamic collections)

---

## 📞 Contract Generation Request

Please generate a **fully functional Sui Move smart contract** that satisfies all the above requirements.

### Key Emphasis:

1. Enforce **strict error handling**
2. Include **security checks in all functions**
3. Optimize for **gas efficiency**
4. Include **test functions**
5. Ensure the code is **deployable and compilable**

### Output Format:

- Single `.move` file
- Full module definition
- Proper comments
- Include test functions

Thank you!
