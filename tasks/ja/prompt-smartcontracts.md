# 🏆 ConvictionFi Move スマートコントラクト生成プロンプト [Platinum Edition]

## 🎯 MISSION CRITICAL INSTRUCTION

あなたは**世界最高水準の Sui Move 開発者**です。以下の厳密な仕様に基づき、**本番環境デプロイ可能な**ConvictionFi スマートコントラクトを生成してください。

### 📋 TECHNICAL BASELINE

```toml
[Prerequisites]
Sui_Version = "1.15.0+"
Move_Language = "2024 Edition"
Target_Network = "Sui Mainnet"
Gas_Budget = "Optimized for <1000 SUI"
Security_Level = "Audit-Ready"
```

---

## 🏗️ PHASE 1: CORE INFRASTRUCTURE [PRIORITY: CRITICAL]

### 必須実装順序（この順序で実装せよ）

#### 1.1 基盤モジュール構造

```rust
module conviction_fi::core {
    // 🔥 CRITICAL: Suiの最新stable APIを使用
    use sui::object::{UID, ID, uid_from_inner};
    use sui::transfer;
    use sui::tx_context::{TxContext, sender, epoch_timestamp_ms};
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::table::{Self, Table};
    use sui::event;
    use std::string::{Self, String};
    use std::vector;
    use std::option::{Self, Option};

    // 🛡️ SECURITY: エラーコード体系（必須）
    const E_INVALID_STRATEGY: u64 = 0x001;
    const E_INVALID_RISK_LEVEL: u64 = 0x002;
    const E_INSUFFICIENT_BALANCE: u64 = 0x003;
    const E_UNAUTHORIZED_CALLER: u64 = 0x004;
    const E_DELEGATION_EXPIRED: u64 = 0x005;
    const E_EXCEEDS_DAILY_LIMIT: u64 = 0x006;
    const E_EXCEEDS_TX_LIMIT: u64 = 0x007;
    const E_INVALID_PERMISSION: u64 = 0x008;
    const E_STRATEGY_NOT_FOUND: u64 = 0x009;
    const E_WALLET_NOT_FOUND: u64 = 0x00A;
    const E_DELEGATION_NOT_FOUND: u64 = 0x00B;
    const E_INVALID_DURATION: u64 = 0x00C;
    const E_ZERO_AMOUNT: u64 = 0x00D;
    const E_WALLET_PAUSED: u64 = 0x00E;
    const E_SYSTEM_PAUSED: u64 = 0x00F;

    // 🔐 PERMISSIONS: ビットマスク権限システム
    const PERMISSION_TRADE: u64 = 0x001;      // 0000 0001
    const PERMISSION_STAKE: u64 = 0x002;      // 0000 0010
    const PERMISSION_LEND: u64 = 0x004;       // 0000 0100
    const PERMISSION_REBALANCE: u64 = 0x008;  // 0000 1000
    const PERMISSION_EMERGENCY: u64 = 0x010;  // 0001 0000
    const PERMISSION_ALL: u64 = 0x01F;        // 0001 1111

    // ⏰ TIME: 時刻定数
    const SECONDS_IN_DAY: u64 = 86400000; // milliseconds
    const MAX_DELEGATION_DURATION: u64 = 31536000000; // 1 year in ms
    const MIN_DELEGATION_DURATION: u64 = 3600000; // 1 hour in ms

    // 💰 LIMITS: 金額制限
    const MIN_DEPOSIT_AMOUNT: u64 = 1000000000; // 1 SUI in MIST
    const MAX_DAILY_LIMIT: u64 = 100000000000000; // 100,000 SUI in MIST
    const MAX_TX_LIMIT: u64 = 10000000000000; // 10,000 SUI in MIST
}
```

#### 1.2 基本構造体定義（厳密な型安全性）

```rust
// 🎭 ConvictionNFT: メタデータ最適化版
struct ConvictionNFT has key, store {
    id: UID,
    strategy_id: u64,
    risk_level: u8,           // 1-10, validated
    wallet_id: ID,           // 強参照
    created_at: u64,         // epoch_timestamp_ms
    last_rebalance: u64,     // epoch_timestamp_ms
    total_returns: u64,      // 累積リターン（MIST単位）
    metadata: Table<String, String>, // 拡張可能メタデータ
}

// 💼 ManagedWallet: ガス最適化版
struct ManagedWallet has key {
    id: UID,
    nft_id: ID,              // 逆参照
    controller: address,      // 現在の制御者
    balance: Balance<SUI>,    // メイン残高
    reserved_balance: Balance<SUI>, // 予約済み残高（実行中取引用）
    delegated_agent: Option<address>,
    delegation_expires: u64,
    total_deposited: u64,    // ライフタイム統計
    total_withdrawn: u64,    // ライフタイム統計
    is_paused: bool,         // 緊急停止フラグ
    nonce: u64,              // リプレイ攻撃防止
}

// 🤖 AgentDelegation: セキュリティ強化版
struct AgentDelegation has key, store {
    id: UID,
    wallet_id: ID,
    agent_address: address,
    permissions: u64,         // ビットマスク
    expires_at: u64,         // 絶対期限
    max_transaction_amount: u64,
    daily_limit: u64,
    used_today: u64,
    last_reset: u64,         // 日次リセット時刻
    tx_count: u64,           // 取引カウンタ
    is_active: bool,         // アクティブフラグ
}

// 📊 Strategy: バージョン管理対応
struct Strategy has store, copy {
    id: u64,
    name: String,
    description: String,
    risk_category: u8,        // 1-5
    supported_protocols: vector<String>,
    min_deposit: u64,
    max_deposit: u64,         // 追加：最大預金額
    performance_fee: u64,     // 成功報酬率（bp）
    management_fee: u64,      // 管理手数料率（bp）
    is_active: bool,
    created_at: u64,
    updated_at: u64,
    version: u64,             // バージョン管理
}

// 🏛️ StrategyRegistry: スケーラビリティ対応
struct StrategyRegistry has key {
    id: UID,
    strategies: Table<u64, Strategy>,
    next_strategy_id: u64,
    admin: address,
    total_strategies: u64,
    total_active_strategies: u64,
    is_paused: bool,
}

// 👑 AdminCap: 多段階権限管理
struct AdminCap has key, store {
    id: UID,
    level: u8,               // 1=基本, 2=上級, 3=システム管理者
    permissions: u64,        // 管理者権限ビットマスク
    issued_at: u64,
    expires_at: Option<u64>, // 期限付き管理者権限
}

// 🌍 GlobalConfig: システム設定
struct GlobalConfig has key {
    id: UID,
    is_paused: bool,
    min_deposit_amount: u64,
    max_risk_level: u8,
    default_delegation_duration: u64,
    protocol_fee_rate: u64,   // 基準点10000
    treasury: address,        // 手数料収集先
    emergency_admin: address, // 緊急時管理者
    version: u64,            // コントラクトバージョン
}
```

---

## 🔧 PHASE 2: SECURITY-FIRST IMPLEMENTATION

### 2.1 セキュリティ検証関数（必須実装）

```rust
// 🛡️ CRITICAL: 全ての public 関数で必須チェック
fun assert_system_active(config: &GlobalConfig) {
    assert!(!config.is_paused, E_SYSTEM_PAUSED);
}

fun assert_wallet_active(wallet: &ManagedWallet) {
    assert!(!wallet.is_paused, E_WALLET_PAUSED);
}

fun assert_nft_owner(nft: &ConvictionNFT, ctx: &TxContext) {
    // 🔥 IMPLEMENTATION REQUIRED: Transfer policy integration
    // Must verify NFT ownership through Sui's transfer policy
}

fun assert_valid_amount(amount: u64) {
    assert!(amount > 0, E_ZERO_AMOUNT);
    assert!(amount >= MIN_DEPOSIT_AMOUNT, E_INSUFFICIENT_BALANCE);
}

fun assert_delegation_valid(delegation: &AgentDelegation, ctx: &TxContext) {
    assert!(delegation.is_active, E_DELEGATION_EXPIRED);
    assert!(delegation.expires_at > tx_context::epoch_timestamp_ms(ctx), E_DELEGATION_EXPIRED);
    assert!(delegation.agent_address == tx_context::sender(ctx), E_UNAUTHORIZED_CALLER);
}

fun assert_permission(delegation: &AgentDelegation, required_permission: u64) {
    assert!(
        (delegation.permissions & required_permission) == required_permission,
        E_INVALID_PERMISSION
    );
}

fun assert_daily_limit(delegation: &mut AgentDelegation, amount: u64, ctx: &TxContext) {
    let current_time = tx_context::epoch_timestamp_ms(ctx);

    // 日次リセットチェック
    if (current_time - delegation.last_reset >= SECONDS_IN_DAY) {
        delegation.used_today = 0;
        delegation.last_reset = current_time;
    };

    assert!(
        delegation.used_today + amount <= delegation.daily_limit,
        E_EXCEEDS_DAILY_LIMIT
    );
    assert!(amount <= delegation.max_transaction_amount, E_EXCEEDS_TX_LIMIT);
}
```

### 2.2 実装必須の核心機能

#### 🎯 NFT Minting（トランザクション最適化）

```rust
/// ConvictionNFTをミントし、対応するManagedWalletを作成
/// 🔥 CRITICAL: Atomic transaction - either both succeed or both fail
public fun mint_conviction_nft(
    registry: &StrategyRegistry,
    config: &GlobalConfig,
    strategy_id: u64,
    risk_level: u8,
    initial_deposit: Coin<SUI>,
    ctx: &mut TxContext
): (ConvictionNFT, ManagedWallet) {
    // 🛡️ Security checks
    assert_system_active(config);
    assert!(registry.strategies.contains(strategy_id), E_STRATEGY_NOT_FOUND);
    assert!(risk_level >= 1 && risk_level <= config.max_risk_level, E_INVALID_RISK_LEVEL);

    let deposit_amount = coin::value(&initial_deposit);
    assert_valid_amount(deposit_amount);

    let strategy = table::borrow(&registry.strategies, strategy_id);
    assert!(strategy.is_active, E_INVALID_STRATEGY);
    assert!(deposit_amount >= strategy.min_deposit, E_INSUFFICIENT_BALANCE);
    assert!(deposit_amount <= strategy.max_deposit, E_EXCEEDS_TX_LIMIT);

    // 🎭 Create NFT
    let nft_uid = object::new(ctx);
    let nft_id = object::uid_to_inner(&nft_uid);

    // 💼 Create Wallet
    let wallet_uid = object::new(ctx);
    let wallet_id = object::uid_to_inner(&wallet_uid);

    let current_time = tx_context::epoch_timestamp_ms(ctx);
    let sender = tx_context::sender(ctx);

    let nft = ConvictionNFT {
        id: nft_uid,
        strategy_id,
        risk_level,
        wallet_id,
        created_at: current_time,
        last_rebalance: current_time,
        total_returns: 0,
        metadata: table::new(ctx),
    };

    let wallet = ManagedWallet {
        id: wallet_uid,
        nft_id,
        controller: sender,
        balance: coin::into_balance(initial_deposit),
        reserved_balance: balance::zero<SUI>(),
        delegated_agent: option::none(),
        delegation_expires: 0,
        total_deposited: deposit_amount,
        total_withdrawn: 0,
        is_paused: false,
        nonce: 0,
    };

    // 📊 Emit event
    event::emit(NFTMinted {
        nft_id,
        wallet_id,
        owner: sender,
        strategy_id,
        risk_level,
        initial_deposit: deposit_amount,
        timestamp: current_time,
    });

    (nft, wallet)
}
```

#### 💰 Wallet Operations（ガス最適化）

```rust
/// 追加入金（制限チェック付き）
public fun deposit_to_wallet(
    wallet: &mut ManagedWallet,
    nft: &ConvictionNFT,
    payment: Coin<SUI>,
    config: &GlobalConfig,
    ctx: &TxContext
) {
    assert_system_active(config);
    assert_wallet_active(wallet);
    assert_nft_owner(nft, ctx);
    assert!(wallet.nft_id == object::uid_to_inner(&nft.id), E_WALLET_NOT_FOUND);

    let amount = coin::value(&payment);
    assert_valid_amount(amount);

    balance::join(&mut wallet.balance, coin::into_balance(payment));
    wallet.total_deposited = wallet.total_deposited + amount;

    event::emit(DepositMade {
        wallet_id: object::uid_to_inner(&wallet.id),
        amount,
        new_balance: balance::value(&wallet.balance),
        timestamp: tx_context::epoch_timestamp_ms(ctx),
    });
}

/// 出金（複数セキュリティチェック）
public fun withdraw_from_wallet(
    wallet: &mut ManagedWallet,
    nft: &ConvictionNFT,
    amount: u64,
    config: &GlobalConfig,
    ctx: &mut TxContext
): Coin<SUI> {
    assert_system_active(config);
    assert_wallet_active(wallet);
    assert_nft_owner(nft, ctx);
    assert!(wallet.nft_id == object::uid_to_inner(&nft.id), E_WALLET_NOT_FOUND);
    assert_valid_amount(amount);
    assert!(balance::value(&wallet.balance) >= amount, E_INSUFFICIENT_BALANCE);

    wallet.total_withdrawn = wallet.total_withdrawn + amount;
    wallet.nonce = wallet.nonce + 1; // リプレイ攻撃防止

    let withdrawn = coin::take(&mut wallet.balance, amount, ctx);

    event::emit(WithdrawalMade {
        wallet_id: object::uid_to_inner(&wallet.id),
        amount,
        remaining_balance: balance::value(&wallet.balance),
        timestamp: tx_context::epoch_timestamp_ms(ctx),
    });

    withdrawn
}

/// 緊急出金（全額・即座）
public fun emergency_withdraw(
    wallet: &mut ManagedWallet,
    nft: &ConvictionNFT,
    ctx: &mut TxContext
): Coin<SUI> {
    assert_nft_owner(nft, ctx);
    assert!(wallet.nft_id == object::uid_to_inner(&nft.id), E_WALLET_NOT_FOUND);

    // 🚨 Emergency: Cancel all delegations
    wallet.delegated_agent = option::none();
    wallet.delegation_expires = 0;
    wallet.is_paused = true;

    let total_balance = balance::value(&wallet.balance) + balance::value(&wallet.reserved_balance);
    assert!(total_balance > 0, E_INSUFFICIENT_BALANCE);

    // Merge reserved balance
    balance::join(&mut wallet.balance, balance::withdraw_all(&mut wallet.reserved_balance));

    wallet.total_withdrawn = wallet.total_withdrawn + total_balance;
    let emergency_withdrawal = coin::take(&mut wallet.balance, total_balance, ctx);

    event::emit(EmergencyWithdrawal {
        wallet_id: object::uid_to_inner(&wallet.id),
        amount: total_balance,
        timestamp: tx_context::epoch_timestamp_ms(ctx),
    });

    emergency_withdrawal
}
```

---

## 🤖 PHASE 3: AI AGENT INTEGRATION

### 3.1 委任システム（高度なセキュリティモデル）

```rust
/// AI Agentに権限委任（多段階認証）
public fun delegate_to_agent(
    wallet: &mut ManagedWallet,
    nft: &ConvictionNFT,
    agent: address,
    permissions: u64,
    duration: u64,
    max_amount: u64,
    daily_limit: u64,
    config: &GlobalConfig,
    ctx: &mut TxContext
): AgentDelegation {
    assert_system_active(config);
    assert_wallet_active(wallet);
    assert_nft_owner(nft, ctx);
    assert!(wallet.nft_id == object::uid_to_inner(&nft.id), E_WALLET_NOT_FOUND);

    // 🔐 Validate delegation parameters
    assert!(permissions > 0 && permissions <= PERMISSION_ALL, E_INVALID_PERMISSION);
    assert!(duration >= MIN_DELEGATION_DURATION && duration <= MAX_DELEGATION_DURATION, E_INVALID_DURATION);
    assert!(max_amount <= MAX_TX_LIMIT, E_EXCEEDS_TX_LIMIT);
    assert!(daily_limit <= MAX_DAILY_LIMIT, E_EXCEEDS_DAILY_LIMIT);
    assert!(agent != tx_context::sender(ctx), E_UNAUTHORIZED_CALLER); // 自己委任禁止

    let current_time = tx_context::epoch_timestamp_ms(ctx);
    let expires_at = current_time + duration;

    // 🔄 Update wallet delegation info
    wallet.delegated_agent = option::some(agent);
    wallet.delegation_expires = expires_at;

    let delegation = AgentDelegation {
        id: object::new(ctx),
        wallet_id: object::uid_to_inner(&wallet.id),
        agent_address: agent,
        permissions,
        expires_at,
        max_transaction_amount: max_amount,
        daily_limit,
        used_today: 0,
        last_reset: current_time,
        tx_count: 0,
        is_active: true,
    };

    event::emit(AgentDelegated {
        wallet_id: object::uid_to_inner(&wallet.id),
        agent,
        permissions,
        expires_at,
        max_amount,
        daily_limit,
    });

    delegation
}

/// Agent実行関数（厳密な権限制御）
public fun execute_agent_action(
    wallet: &mut ManagedWallet,
    delegation: &mut AgentDelegation,
    action_type: u8,
    amount: u64,
    params: vector<u8>, // 任意の実行パラメータ
    config: &GlobalConfig,
    ctx: &mut TxContext
): vector<u8> { // 実行結果
    assert_system_active(config);
    assert_wallet_active(wallet);
    assert_delegation_valid(delegation, ctx);
    assert!(delegation.wallet_id == object::uid_to_inner(&wallet.id), E_DELEGATION_NOT_FOUND);

    // 权限检查（アクション別）
    let required_permission = match action_type {
        1 => PERMISSION_TRADE,
        2 => PERMISSION_STAKE,
        3 => PERMISSION_LEND,
        4 => PERMISSION_REBALANCE,
        5 => PERMISSION_EMERGENCY,
        _ => abort E_INVALID_PERMISSION
    };

    assert_permission(delegation, required_permission);
    assert_daily_limit(delegation, amount, ctx);

    // 💰 Reserve funds for execution
    assert!(balance::value(&wallet.balance) >= amount, E_INSUFFICIENT_BALANCE);
    let reserved = balance::split(&mut wallet.balance, amount);
    balance::join(&mut wallet.reserved_balance, reserved);

    // 📊 Update delegation stats
    delegation.used_today = delegation.used_today + amount;
    delegation.tx_count = delegation.tx_count + 1;
    wallet.nonce = wallet.nonce + 1;

    // 🎯 Execute action logic here
    let result = execute_action_internal(action_type, amount, params, ctx);

    event::emit(AgentActionExecuted {
        wallet_id: object::uid_to_inner(&wallet.id),
        agent: delegation.agent_address,
        action_type,
        amount,
        success: true,
        timestamp: tx_context::epoch_timestamp_ms(ctx),
    });

    result
}

// 🎯 内部実行ロジック（拡張可能）
fun execute_action_internal(
    action_type: u8,
    amount: u64,
    params: vector<u8>,
    ctx: &mut TxContext
): vector<u8> {
    // 実装: 各アクションタイプ別の処理
    // 1: DeFi取引実行
    // 2: ステーキング
    // 3: レンディング
    // 4: ポートフォリオリバランス
    // 5: 緊急アクション

    // TODO: プロトコル別統合実装
    vector::empty<u8>()
}
```

---

## 🧪 PHASE 4: COMPREHENSIVE TESTING

### 4.1 テスト用データセット

```rust
#[test_only]
public fun create_test_environment(ctx: &mut TxContext): (StrategyRegistry, GlobalConfig, AdminCap) {
    let admin_cap = AdminCap {
        id: object::new(ctx),
        level: 3,
        permissions: 0xFFFFFFFF,
        issued_at: tx_context::epoch_timestamp_ms(ctx),
        expires_at: option::none(),
    };

    let config = GlobalConfig {
        id: object::new(ctx),
        is_paused: false,
        min_deposit_amount: MIN_DEPOSIT_AMOUNT,
        max_risk_level: 10,
        default_delegation_duration: 7 * SECONDS_IN_DAY,
        protocol_fee_rate: 100, // 1%
        treasury: tx_context::sender(ctx),
        emergency_admin: tx_context::sender(ctx),
        version: 1,
    };

    let registry = StrategyRegistry {
        id: object::new(ctx),
        strategies: table::new(ctx),
        next_strategy_id: 1,
        admin: tx_context::sender(ctx),
        total_strategies: 0,
        total_active_strategies: 0,
        is_paused: false,
    };

    (registry, config, admin_cap)
}

#[test]
public fun test_complete_workflow() {
    use sui::test_scenario;

    let admin = @0xABCD;
    let user = @0x1234;
    let agent = @0x5678;

    let scenario_val = test_scenario::begin(admin);
    let scenario = &mut scenario_val;

    // Setup phase
    test_scenario::next_tx(scenario, admin);
    {
        let ctx = test_scenario::ctx(scenario);
        let (registry, config, admin_cap) = create_test_environment(ctx);

        // Add test strategy
        add_strategy(&mut registry,
            string::utf8(b"Conservative DeFi"),
            string::utf8(b"Low risk strategy"),
            2, // risk category
            MIN_DEPOSIT_AMOUNT,
            1000 * MIN_DEPOSIT_AMOUNT,
            100, // 1% performance fee
            50,  // 0.5% management fee
            &admin_cap,
            ctx
        );

        transfer::share_object(registry);
        transfer::share_object(config);
        transfer::public_transfer(admin_cap, admin);
    };

    // User mints NFT
    test_scenario::next_tx(scenario, user);
    {
        let ctx = test_scenario::ctx(scenario);
        let registry = test_scenario::take_shared<StrategyRegistry>(scenario);
        let config = test_scenario::take_shared<GlobalConfig>(scenario);

        let payment = coin::mint_for_testing<SUI>(10 * MIN_DEPOSIT_AMOUNT, ctx);
        let (nft, wallet) = mint_conviction_nft(&registry, &config, 1, 5, payment, ctx);

        transfer::public_transfer(nft, user);
        transfer::share_object(wallet);

        test_scenario::return_shared(registry);
        test_scenario::return_shared(config);
    };

    // Delegate to agent
    test_scenario::next_tx(scenario, user);
    {
        let ctx = test_scenario::ctx(scenario);
        let nft = test_scenario::take_from_sender<ConvictionNFT>(scenario);
        let wallet = test_scenario::take_shared<ManagedWallet>(scenario);
        let config = test_scenario::take_shared<GlobalConfig>(scenario);

        let delegation = delegate_to_agent(
            &mut wallet,
            &nft,
            agent,
            PERMISSION_TRADE | PERMISSION_REBALANCE,
            7 * SECONDS_IN_DAY,
            MIN_DEPOSIT_AMOUNT,
            5 * MIN_DEPOSIT_AMOUNT,
            &config,
            ctx
        );

        transfer::public_transfer(delegation, user);
        transfer::public_transfer(nft, user);
        test_scenario::return_shared(wallet);
        test_scenario::return_shared(config);
    };

    // Agent executes action
    test_scenario::next_tx(scenario, agent);
    {
        let ctx = test_scenario::ctx(scenario);
        let wallet = test_scenario::take_shared<ManagedWallet>(scenario);
        let delegation = test_scenario::take_from_address<AgentDelegation>(scenario, user);
        let config = test_scenario::take_shared<GlobalConfig>(scenario);

        let result = execute_agent_action(
            &mut wallet,
            &mut delegation,
            1, // Trade action
            MIN_DEPOSIT_AMOUNT,
            vector::empty<u8>(),
            &config,
            ctx
        );

        // Verify execution result
        assert!(vector::length(&result) >= 0, 0);

        transfer::public_transfer(delegation, user);
        test_scenario::return_shared(wallet);
        test_scenario::return_shared(config);
    };

    test_scenario::end(scenario_val);
}

// 🔥 Additional critical tests
#[test]
public fun test_security_edge_cases() { /* Implementation required */ }

#[test]
public fun test_gas_optimization() { /* Implementation required */ }

#[test]
public fun test_concurrent_access() { /* Implementation required */ }

#[test]
#[expected_failure(abort_code = E_UNAUTHORIZED_CALLER)]
public fun test_unauthorized_access() { /* Implementation required */ }
```

---

## 📊 PHASE 5: EVENTS & MONITORING

### 5.1 包括的イベントシステム

```rust
struct NFTMinted has copy, drop {
    nft_id: ID,
    wallet_id: ID,
    owner: address,
    strategy_id: u64,
    risk_level: u8,
    initial_deposit: u64,
    timestamp: u64,
}

struct DepositMade has copy, drop {
    wallet_id: ID,
    amount: u64,
    new_balance: u64,
    timestamp: u64,
}

struct WithdrawalMade has copy, drop {
    wallet_id: ID,
    amount: u64,
    remaining_balance: u64,
    timestamp: u64,
}

struct EmergencyWithdrawal has copy, drop {
    wallet_id: ID,
    amount: u64,
    timestamp: u64,
}

struct AgentDelegated has copy, drop {
    wallet_id: ID,
    agent: address,
    permissions: u64,
    expires_at: u64,
    max_amount: u64,
    daily_limit: u64,
}

struct AgentActionExecuted has copy, drop {
    wallet_id: ID,
    agent: address,
    action_type: u8,
    amount: u64,
    success: bool,
    timestamp: u64,
}

struct DelegationRevoked has copy, drop {
    wallet_id: ID,
    agent: address,
    reason: u8, // 1=manual, 2=expired, 3=emergency
    timestamp: u64,
}

struct StrategyAdded has copy, drop {
    strategy_id: u64,
    name: String,
    risk_category: u8,
    min_deposit: u64,
    max_deposit: u64,
    timestamp: u64,
}

struct SystemPauseToggled has copy, drop {
    is_paused: bool,
    admin: address,
    timestamp: u64,
}
```

---

## 🏗️ PHASE 6: ADVANCED FEATURES

### 6.1 戦略管理システム（完全版）

```rust
/// 新戦略追加（管理者専用）
public fun add_strategy(
    registry: &mut StrategyRegistry,
    name: String,
    description: String,
    risk_category: u8,
    min_deposit: u64,
    max_deposit: u64,
    performance_fee: u64,
    management_fee: u64,
    admin_cap: &AdminCap,
    ctx: &mut TxContext
): u64 {
    assert!(!registry.is_paused, E_SYSTEM_PAUSED);
    assert!(admin_cap.level >= 2, E_UNAUTHORIZED_CALLER);
    assert!(risk_category >= 1 && risk_category <= 5, E_INVALID_RISK_LEVEL);
    assert!(min_deposit >= MIN_DEPOSIT_AMOUNT, E_INSUFFICIENT_BALANCE);
    assert!(max_deposit >= min_deposit, E_INVALID_STRATEGY);
    assert!(performance_fee <= 2000, E_INVALID_STRATEGY); // Max 20%
    assert!(management_fee <= 500, E_INVALID_STRATEGY);   // Max 5%

    let strategy_id = registry.next_strategy_id;
    let current_time = tx_context::epoch_timestamp_ms(ctx);

    let strategy = Strategy {
        id: strategy_id,
        name,
        description,
        risk_category,
        supported_protocols: vector::empty<String>(),
        min_deposit,
        max_deposit,
        performance_fee,
        management_fee,
        is_active: true,
        created_at: current_time,
        updated_at: current_time,
        version: 1,
    };

    table::add(&mut registry.strategies, strategy_id, strategy);
    registry.next_strategy_id = strategy_id + 1;
    registry.total_strategies = registry.total_strategies + 1;
    registry.total_active_strategies = registry.total_active_strategies + 1;

    event::emit(StrategyAdded {
        strategy_id,
        name: strategy.name,
        risk_category,
        min_deposit,
        max_deposit,
        timestamp: current_time,
    });

    strategy_id
}

/// 戦略更新
public fun update_strategy(
    registry: &mut StrategyRegistry,
    strategy_id: u64,
    new_description: Option<String>,
    new_max_deposit: Option<u64>,
    new_performance_fee: Option<u64>,
    new_management_fee: Option<u64>,
    admin_cap: &AdminCap,
    ctx: &TxContext
) {
    assert!(!registry.is_paused, E_SYSTEM_PAUSED);
    assert!(admin_cap.level >= 2, E_UNAUTHORIZED_CALLER);
    assert!(table::contains(&registry.strategies, strategy_id), E_STRATEGY_NOT_FOUND);

    let strategy = table::borrow_mut(&mut registry.strategies, strategy_id);
    let current_time = tx_context::epoch_timestamp_ms(ctx);

    if (option::is_some(&new_description)) {
        strategy.description = option::extract(&mut new_description);
    };

    if (option::is_some(&new_max_deposit)) {
        let max_deposit = option::extract(&mut new_max_deposit);
        assert!(max_deposit >= strategy.min_deposit, E_INVALID_STRATEGY);
        strategy.max_deposit = max_deposit;
    };

    if (option::is_some(&new_performance_fee)) {
        let perf_fee = option::extract(&mut new_performance_fee);
        assert!(perf_fee <= 2000, E_INVALID_STRATEGY);
        strategy.performance_fee = perf_fee;
    };

    if (option::is_some(&new_management_fee)) {
        let mgmt_fee = option::extract(&mut new_management_fee);
        assert!(mgmt_fee <= 500, E_INVALID_STRATEGY);
        strategy.management_fee = mgmt_fee;
    };

    strategy.updated_at = current_time;
    strategy.version = strategy.version + 1;
}

/// 戦略の無効化
public fun deactivate_strategy(
    registry: &mut StrategyRegistry,
    strategy_id: u64,
    admin_cap: &AdminCap,
    ctx: &TxContext
) {
    assert!(!registry.is_paused, E_SYSTEM_PAUSED);
    assert!(admin_cap.level >= 2, E_UNAUTHORIZED_CALLER);
    assert!(table::contains(&registry.strategies, strategy_id), E_STRATEGY_NOT_FOUND);

    let strategy = table::borrow_mut(&mut registry.strategies, strategy_id);
    if (strategy.is_active) {
        strategy.is_active = false;
        strategy.updated_at = tx_context::epoch_timestamp_ms(ctx);
        registry.total_active_strategies = registry.total_active_strategies - 1;
    };
}

/// アクティブ戦略一覧取得
public fun get_active_strategies(registry: &StrategyRegistry): vector<u64> {
    let active_strategies = vector::empty<u64>();
    let i = 1;

    while (i < registry.next_strategy_id) {
        if (table::contains(&registry.strategies, i)) {
            let strategy = table::borrow(&registry.strategies, i);
            if (strategy.is_active) {
                vector::push_back(&mut active_strategies, i);
            };
        };
        i = i + 1;
    };

    active_strategies
}
```

### 6.2 委任解除システム

```rust
/// 委任解除（所有者による）
public fun revoke_delegation(
    wallet: &mut ManagedWallet,
    nft: &ConvictionNFT,
    delegation: AgentDelegation,
    config: &GlobalConfig,
    ctx: &TxContext
) {
    assert_system_active(config);
    assert_nft_owner(nft, ctx);
    assert!(wallet.nft_id == object::uid_to_inner(&nft.id), E_WALLET_NOT_FOUND);
    assert!(delegation.wallet_id == object::uid_to_inner(&wallet.id), E_DELEGATION_NOT_FOUND);

    // 委任情報をクリア
    wallet.delegated_agent = option::none();
    wallet.delegation_expires = 0;

    // 予約残高を戻す
    if (balance::value(&wallet.reserved_balance) > 0) {
        balance::join(&mut wallet.balance, balance::withdraw_all(&mut wallet.reserved_balance));
    };

    event::emit(DelegationRevoked {
        wallet_id: object::uid_to_inner(&wallet.id),
        agent: delegation.agent_address,
        reason: 1, // Manual revocation
        timestamp: tx_context::epoch_timestamp_ms(ctx),
    });

    // Delegation objectを削除
    let AgentDelegation {
        id,
        wallet_id: _,
        agent_address: _,
        permissions: _,
        expires_at: _,
        max_transaction_amount: _,
        daily_limit: _,
        used_today: _,
        last_reset: _,
        tx_count: _,
        is_active: _
    } = delegation;

    object::delete(id);
}

/// 期限切れ委任のクリーンアップ
public fun cleanup_expired_delegation(
    wallet: &mut ManagedWallet,
    delegation: AgentDelegation,
    ctx: &TxContext
) {
    let current_time = tx_context::epoch_timestamp_ms(ctx);
    assert!(delegation.expires_at <= current_time, E_DELEGATION_EXPIRED);
    assert!(delegation.wallet_id == object::uid_to_inner(&wallet.id), E_DELEGATION_NOT_FOUND);

    // 自動的に委任をクリア
    wallet.delegated_agent = option::none();
    wallet.delegation_expires = 0;

    // 予約残高を戻す
    if (balance::value(&wallet.reserved_balance) > 0) {
        balance::join(&mut wallet.balance, balance::withdraw_all(&mut wallet.reserved_balance));
    };

    event::emit(DelegationRevoked {
        wallet_id: object::uid_to_inner(&wallet.id),
        agent: delegation.agent_address,
        reason: 2, // Expired
        timestamp: current_time,
    });

    // Delegation objectを削除
    let AgentDelegation {
        id,
        wallet_id: _,
        agent_address: _,
        permissions: _,
        expires_at: _,
        max_transaction_amount: _,
        daily_limit: _,
        used_today: _,
        last_reset: _,
        tx_count: _,
        is_active: _
    } = delegation;

    object::delete(id);
}
```

### 6.3 システム管理機能

```rust
/// システム一時停止（緊急時）
public fun toggle_system_pause(
    config: &mut GlobalConfig,
    admin_cap: &AdminCap,
    ctx: &TxContext
) {
    assert!(admin_cap.level >= 3, E_UNAUTHORIZED_CALLER);

    config.is_paused = !config.is_paused;

    event::emit(SystemPauseToggled {
        is_paused: config.is_paused,
        admin: tx_context::sender(ctx),
        timestamp: tx_context::epoch_timestamp_ms(ctx),
    });
}

/// ウォレット一時停止
public fun toggle_wallet_pause(
    wallet: &mut ManagedWallet,
    nft: &ConvictionNFT,
    config: &GlobalConfig,
    ctx: &TxContext
) {
    assert_system_active(config);
    assert_nft_owner(nft, ctx);
    assert!(wallet.nft_id == object::uid_to_inner(&nft.id), E_WALLET_NOT_FOUND);

    wallet.is_paused = !wallet.is_paused;

    // 一時停止時は委任を自動解除
    if (wallet.is_paused) {
        wallet.delegated_agent = option::none();
        wallet.delegation_expires = 0;

        // 予約残高を戻す
        if (balance::value(&wallet.reserved_balance) > 0) {
            balance::join(&mut wallet.balance, balance::withdraw_all(&mut wallet.reserved_balance));
        };
    };
}

/// グローバル設定更新
public fun update_global_config(
    config: &mut GlobalConfig,
    new_min_deposit: Option<u64>,
    new_max_risk_level: Option<u8>,
    new_protocol_fee: Option<u64>,
    new_treasury: Option<address>,
    admin_cap: &AdminCap,
    ctx: &TxContext
) {
    assert!(admin_cap.level >= 3, E_UNAUTHORIZED_CALLER);

    if (option::is_some(&new_min_deposit)) {
        config.min_deposit_amount = option::extract(&mut new_min_deposit);
    };

    if (option::is_some(&new_max_risk_level)) {
        let max_risk = option::extract(&mut new_max_risk_level);
        assert!(max_risk >= 1 && max_risk <= 10, E_INVALID_RISK_LEVEL);
        config.max_risk_level = max_risk;
    };

    if (option::is_some(&new_protocol_fee)) {
        let fee = option::extract(&mut new_protocol_fee);
        assert!(fee <= 1000, E_INVALID_STRATEGY); // Max 10%
        config.protocol_fee_rate = fee;
    };

    if (option::is_some(&new_treasury)) {
        config.treasury = option::extract(&mut new_treasury);
    };

    config.version = config.version + 1;
}
```

---

## 🎯 PHASE 7: GETTER FUNCTIONS & UTILITIES

### 7.1 データ取得関数

```rust
/// NFT基本情報取得
public fun get_nft_details(nft: &ConvictionNFT): (u64, u8, ID, u64, u64, u64) {
    (
        nft.strategy_id,
        nft.risk_level,
        nft.wallet_id,
        nft.created_at,
        nft.last_rebalance,
        nft.total_returns
    )
}

/// ウォレット残高情報
public fun get_wallet_balance(wallet: &ManagedWallet): (u64, u64, u64, u64) {
    (
        balance::value(&wallet.balance),
        balance::value(&wallet.reserved_balance),
        wallet.total_deposited,
        wallet.total_withdrawn
    )
}

/// 委任情報取得
public fun get_delegation_info(delegation: &AgentDelegation): (address, u64, u64, u64, u64, u64, bool) {
    (
        delegation.agent_address,
        delegation.permissions,
        delegation.expires_at,
        delegation.daily_limit,
        delegation.used_today,
        delegation.tx_count,
        delegation.is_active
    )
}

/// 戦略詳細取得
public fun get_strategy_details(registry: &StrategyRegistry, strategy_id: u64): &Strategy {
    assert!(table::contains(&registry.strategies, strategy_id), E_STRATEGY_NOT_FOUND);
    table::borrow(&registry.strategies, strategy_id)
}

/// システム統計
public fun get_system_stats(registry: &StrategyRegistry, config: &GlobalConfig): (u64, u64, bool, u64) {
    (
        registry.total_strategies,
        registry.total_active_strategies,
        config.is_paused,
        config.version
    )
}
```

### 7.2 初期化関数

```rust
/// モジュール初期化
fun init(ctx: &mut TxContext) {
    // 🏛️ Global Config初期化
    let config = GlobalConfig {
        id: object::new(ctx),
        is_paused: false,
        min_deposit_amount: MIN_DEPOSIT_AMOUNT,
        max_risk_level: 10,
        default_delegation_duration: 7 * SECONDS_IN_DAY,
        protocol_fee_rate: 100, // 1%
        treasury: tx_context::sender(ctx),
        emergency_admin: tx_context::sender(ctx),
        version: 1,
    };

    // 📊 Strategy Registry初期化
    let registry = StrategyRegistry {
        id: object::new(ctx),
        strategies: table::new(ctx),
        next_strategy_id: 1,
        admin: tx_context::sender(ctx),
        total_strategies: 0,
        total_active_strategies: 0,
        is_paused: false,
    };

    // 👑 Admin Cap発行
    let admin_cap = AdminCap {
        id: object::new(ctx),
        level: 3,
        permissions: 0xFFFFFFFF,
        issued_at: tx_context::epoch_timestamp_ms(ctx),
        expires_at: option::none(),
    };

    // 🔗 共有オブジェクトとして公開
    transfer::share_object(config);
    transfer::share_object(registry);
    transfer::public_transfer(admin_cap, tx_context::sender(ctx));
}
```

---

## 📝 PHASE 8: FINAL VALIDATION & DEPLOYMENT CHECKLIST

### 8.1 コンパイル前チェックリスト

```rust
// ✅ 必須チェック項目
// 1. すべての import が正しく設定されている
// 2. エラーコードが重複していない
// 3. 権限チェックが全 public 関数に実装されている
// 4. ガス最適化パターンが適用されている
// 5. セキュリティベストプラクティスが守られている
// 6. イベントが適切に発火されている
// 7. テスト関数が主要シナリオをカバーしている
// 8. ドキュメンテーションが完整している

// 🔥 CRITICAL: Move.toml dependencies
/*
[dependencies]
Sui = { git = "https://github.com/MystenLabs/sui.git", subdir = "crates/sui-framework/packages/sui-framework", rev = "framework/mainnet" }

[addresses]
conviction_fi = "0x0"
sui = "0x2"
*/
```

### 8.2 デプロイメント手順

```bash
# 1. 依存関係確認
sui client gas

# 2. コンパイル
sui move build

# 3. テスト実行
sui move test

# 4. パブリッシュ（テストネット）
sui client publish --gas-budget 2000000000

# 5. 初期化確認
sui client object <PACKAGE_ID>

# 6. 本番デプロイ（メインネット）
sui client publish --gas-budget 2000000000 --mainnet
```

---

## 🚀 EXECUTION COMMAND

**このプロンプトに基づき、上記の全要件を満たす完全な Sui Move スマートコントラクトを生成してください。**

### 📋 生成要件の最終確認

✅ **PHASE 1**: 基盤モジュール構造とエラー定義
✅ **PHASE 2**: セキュリティ検証関数と核心機能
✅ **PHASE 3**: AI Agent 統合システム
✅ **PHASE 4**: 包括的テストスイート
✅ **PHASE 5**: イベントシステム
✅ **PHASE 6**: 高度な機能（戦略管理・委任解除・システム管理）
✅ **PHASE 7**: データ取得関数と初期化
✅ **PHASE 8**: デプロイメント準備

### 🎯 最終アウトプット仕様

- **単一ファイル**: `conviction_fi.move`
- **完全動作保証**: コンパイル・デプロイ・実行可能
- **テスト込み**: `#[test]` 関数付き
- **本番品質**: セキュリティ監査レベル
- **ガス最適化**: メインネット対応
- **完全ドキュメント**: 日英併記コメント

**今すぐ生成を開始してください！**
