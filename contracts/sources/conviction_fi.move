module conviction_fi::core;

use std::option::Option;
use std::string::String;
use sui::balance::{Self, Balance};
use sui::coin::{Self, Coin};
use sui::event;
use sui::object::{UID, ID};
use sui::sui::SUI;
use sui::table::{Self, Table};
use sui::transfer;
use sui::tx_context::{TxContext, sender, epoch_timestamp_ms};

// SECURITY: Error code definitions
const E_INVALID_RISK_LEVEL: u64 = 0x002;
const E_INSUFFICIENT_BALANCE: u64 = 0x003;
const E_UNAUTHORIZED_CALLER: u64 = 0x004;
const E_DELEGATION_EXPIRED: u64 = 0x005;
const E_EXCEEDS_DAILY_LIMIT: u64 = 0x006;
const E_EXCEEDS_TX_LIMIT: u64 = 0x007;
const E_INVALID_PERMISSION: u64 = 0x008;
const E_STRATEGY_NOT_FOUND: u64 = 0x009;
const E_WALLET_NOT_FOUND: u64 = 0x00A;
const E_INVALID_DURATION: u64 = 0x00C;
const E_ZERO_AMOUNT: u64 = 0x00D;
const E_WALLET_PAUSED: u64 = 0x00E;
const E_SYSTEM_PAUSED: u64 = 0x00F;

// PERMISSIONS: Bitmask-style permission system
const PERMISSION_TRADE: u64 = 0x001; // 0000 0001
const PERMISSION_STAKE: u64 = 0x002; // 0000 0010
const PERMISSION_LEND: u64 = 0x004; // 0000 0100
const PERMISSION_REBALANCE: u64 = 0x008; // 0000 1000
const PERMISSION_EMERGENCY: u64 = 0x010; // 0001 0000
const PERMISSION_ALL: u64 = 0x01F; // 0001 1111

// TIME: Time-related constants
const SECONDS_IN_DAY: u64 = 86400000; // milliseconds
const MAX_DELEGATION_DURATION: u64 = 31536000000; // 1 year
const MIN_DELEGATION_DURATION: u64 = 3600000; // 1 hour

// LIMITS: Financial constraints
const MIN_DEPOSIT_AMOUNT: u64 = 1000000000; // 1 SUI (MIST)
const MAX_DAILY_LIMIT: u64 = 100000000000000; // 100,000 SUI (MIST)
const MAX_TX_LIMIT: u64 = 10000000000000; // 10,000 SUI (MIST)

// ConvictionNFT: NFT with metadata
public struct ConvictionNFT has key, store {
    id: UID,
    strategy_id: u64,
    risk_level: u8,
    wallet_id: ID,
    created_at: u64,
    last_rebalance: u64,
    total_returns: u64,
    metadata: Table<String, String>,
}

// ManagedWallet: Wallet managing user funds
public struct ManagedWallet has key {
    id: UID,
    nft_id: ID,
    controller: address,
    balance: Balance<SUI>,
    reserved_balance: Balance<SUI>,
    delegated_agent: Option<address>,
    delegation_expires: u64,
    total_deposited: u64,
    total_withdrawn: u64,
    is_paused: bool,
    nonce: u64,
}

// AgentDelegation: Delegation to AI Agent
public struct AgentDelegation has key, store {
    id: UID,
    wallet_id: ID,
    agent_address: address,
    permissions: u64,
    expires_at: u64,
    max_transaction_amount: u64,
    daily_limit: u64,
    used_today: u64,
    last_reset: u64,
    tx_count: u64,
    is_active: bool,
}

// Strategy: Investment strategy object
public struct Strategy has copy, store {
    id: u64,
    name: String,
    description: String,
    risk_category: u8,
    supported_protocols: vector<String>,
    min_deposit: u64,
    max_deposit: u64,
    performance_fee: u64,
    management_fee: u64,
    is_active: bool,
    created_at: u64,
    updated_at: u64,
    version: u64,
}

// StrategyRegistry: Registry for strategies
public struct StrategyRegistry has key {
    id: UID,
    strategies: Table<u64, Strategy>,
    next_strategy_id: u64,
    admin: address,
    total_strategies: u64,
    total_active_strategies: u64,
    is_paused: bool,
}

// AdminCap: Administrator capability
public struct AdminCap has key, store {
    id: UID,
    level: u8,
    permissions: u64,
    issued_at: u64,
    expires_at: Option<u64>,
}

// GlobalConfig: Global configuration
public struct GlobalConfig has key {
    id: UID,
    is_paused: bool,
    min_deposit_amount: u64,
    max_risk_level: u8,
    default_delegation_duration: u64,
    protocol_fee_rate: u64,
    treasury: address,
    emergency_admin: address,
    version: u64,
}

// SECURITY VALIDATION FUNCTIONS

// Check if the global system is active and not paused
public fun assert_system_active(config: &GlobalConfig) {
    assert!(!config.is_paused, E_SYSTEM_PAUSED);
}

// Check if a specific wallet is active and not paused
public fun assert_wallet_active(wallet: &ManagedWallet) {
    assert!(!wallet.is_paused, E_WALLET_PAUSED);
}

// Verify that the caller is the owner of the NFT
public fun assert_nft_owner(nft: &ConvictionNFT, wallet: &ManagedWallet) {
    assert!(nft.wallet_id == sui::object::id(wallet), E_UNAUTHORIZED_CALLER);
}

// Validate transaction amount is within acceptable limits
public fun assert_valid_amount(amount: u64) {
    assert!(amount > 0, E_ZERO_AMOUNT);
    assert!(amount <= MAX_TX_LIMIT, E_EXCEEDS_TX_LIMIT);
}

// Check if delegation is valid and not expired
public fun assert_delegation_valid(delegation: &AgentDelegation, ctx: &TxContext) {
    assert!(delegation.is_active, E_DELEGATION_EXPIRED);
    assert!(delegation.expires_at > epoch_timestamp_ms(ctx), E_DELEGATION_EXPIRED);
}

// Verify that the agent has the required permission
public fun assert_permission(delegation: &AgentDelegation, required_permission: u64) {
    assert!(delegation.permissions & required_permission != 0, E_INVALID_PERMISSION);
}

// Check if the transaction amount is within daily limits
public fun assert_daily_limit(delegation: &mut AgentDelegation, amount: u64, ctx: &TxContext) {
    let current_time = epoch_timestamp_ms(ctx);

    // Reset daily usage if a new day has started
    if (current_time - delegation.last_reset >= SECONDS_IN_DAY) {
        delegation.used_today = 0;
        delegation.last_reset = current_time;
    };

    assert!(delegation.used_today + amount <= delegation.daily_limit, E_EXCEEDS_DAILY_LIMIT);
    delegation.used_today = delegation.used_today + amount;
}

// CORE PUBLIC FUNCTIONS

// Mint a new ConvictionNFT with associated ManagedWallet
public fun mint_conviction_nft(
    strategy_id: u64,
    risk_level: u8,
    config: &GlobalConfig,
    ctx: &mut TxContext,
): (ConvictionNFT, ManagedWallet) {
    // Security validations
    assert_system_active(config);
    assert!(risk_level <= config.max_risk_level, E_INVALID_RISK_LEVEL);

    let current_time = epoch_timestamp_ms(ctx);
    let caller = sender(ctx);

    // Create wallet first to get its ID
    let wallet_id = sui::object::new(ctx);
    let wallet_obj_id = sui::object::uid_to_inner(&wallet_id);

    // Create NFT with wallet reference
    let nft = ConvictionNFT {
        id: sui::object::new(ctx),
        strategy_id,
        risk_level,
        wallet_id: wallet_obj_id,
        created_at: current_time,
        last_rebalance: current_time,
        total_returns: 0,
        metadata: table::new(ctx),
    };

    // Create managed wallet
    let wallet = ManagedWallet {
        id: wallet_id,
        nft_id: sui::object::id(&nft),
        controller: caller,
        balance: balance::zero<SUI>(),
        reserved_balance: balance::zero<SUI>(),
        delegated_agent: std::option::none(),
        delegation_expires: 0,
        total_deposited: 0,
        total_withdrawn: 0,
        is_paused: false,
        nonce: 0,
    };

    (nft, wallet)
}

// Deposit SUI tokens to a managed wallet
public fun deposit_to_wallet(
    wallet: &mut ManagedWallet,
    nft: &ConvictionNFT,
    payment: Coin<SUI>,
    config: &GlobalConfig,
    ctx: &TxContext,
) {
    // Security validations
    assert_system_active(config);
    assert_wallet_active(wallet);
    assert_nft_owner(nft, wallet);
    assert!(sender(ctx) == wallet.controller, E_UNAUTHORIZED_CALLER);

    let deposit_amount = coin::value(&payment);
    assert!(deposit_amount >= config.min_deposit_amount, E_INSUFFICIENT_BALANCE);
    assert_valid_amount(deposit_amount);

    // Add to wallet balance
    let deposit_balance = coin::into_balance(payment);
    balance::join(&mut wallet.balance, deposit_balance);

    // Update tracking
    wallet.total_deposited = wallet.total_deposited + deposit_amount;
    wallet.nonce = wallet.nonce + 1;
}

// Withdraw SUI tokens from a managed wallet
public fun withdraw_from_wallet(
    wallet: &mut ManagedWallet,
    nft: &ConvictionNFT,
    amount: u64,
    config: &GlobalConfig,
    ctx: &mut TxContext,
): Coin<SUI> {
    // Security validations
    assert_system_active(config);
    assert_wallet_active(wallet);
    assert_nft_owner(nft, wallet);
    assert!(sender(ctx) == wallet.controller, E_UNAUTHORIZED_CALLER);
    assert_valid_amount(amount);
    assert!(balance::value(&wallet.balance) >= amount, E_INSUFFICIENT_BALANCE);

    // Withdraw from balance
    let withdraw_balance = balance::split(&mut wallet.balance, amount);
    let withdraw_coin = coin::from_balance(withdraw_balance, ctx);

    // Update tracking
    wallet.total_withdrawn = wallet.total_withdrawn + amount;
    wallet.nonce = wallet.nonce + 1;

    withdraw_coin
}

// Emergency withdrawal function for critical situations
public fun emergency_withdraw(
    wallet: &mut ManagedWallet,
    nft: &ConvictionNFT,
    config: &GlobalConfig,
    ctx: &mut TxContext,
): Coin<SUI> {
    // Allow withdrawal even if system is paused for emergencies
    assert_nft_owner(nft, wallet);
    assert!(
        sender(ctx) == wallet.controller || sender(ctx) == config.emergency_admin,
        E_UNAUTHORIZED_CALLER,
    );

    let total_balance = balance::value(&wallet.balance);
    assert!(total_balance > 0, E_INSUFFICIENT_BALANCE);

    // Withdraw entire balance
    let emergency_balance = balance::withdraw_all(&mut wallet.balance);
    let emergency_coin = coin::from_balance(emergency_balance, ctx);

    // Update tracking
    wallet.total_withdrawn = wallet.total_withdrawn + total_balance;
    wallet.nonce = wallet.nonce + 1;
    wallet.is_paused = true; // Pause wallet after emergency withdrawal

    emergency_coin
}

// AI AGENT DELEGATION AND EXECUTION

// Delegate control of a wallet to an AI agent with specific permissions and limits
public fun delegate_to_agent(
    wallet: &mut ManagedWallet,
    nft: &ConvictionNFT,
    agent_address: address,
    permissions: u64,
    duration_ms: u64,
    max_transaction_amount: u64,
    daily_limit: u64,
    config: &GlobalConfig,
    ctx: &mut TxContext,
): AgentDelegation {
    // Security validations
    assert_system_active(config);
    assert_wallet_active(wallet);
    assert_nft_owner(nft, wallet);
    assert!(sender(ctx) == wallet.controller, E_UNAUTHORIZED_CALLER);
    assert!(
        duration_ms >= MIN_DELEGATION_DURATION && duration_ms <= MAX_DELEGATION_DURATION,
        E_INVALID_DURATION,
    );
    assert!(permissions > 0 && permissions <= PERMISSION_ALL, E_INVALID_PERMISSION);
    assert_valid_amount(max_transaction_amount);
    assert!(daily_limit <= MAX_DAILY_LIMIT, E_EXCEEDS_DAILY_LIMIT);

    let current_time = epoch_timestamp_ms(ctx);
    let expires_at = current_time + duration_ms;

    // Update wallet delegation info
    wallet.delegated_agent = std::option::some(agent_address);
    wallet.delegation_expires = expires_at;
    wallet.nonce = wallet.nonce + 1;

    // Create delegation object
    let delegation = AgentDelegation {
        id: sui::object::new(ctx),
        wallet_id: sui::object::id(wallet),
        agent_address,
        permissions,
        expires_at,
        max_transaction_amount,
        daily_limit,
        used_today: 0,
        last_reset: current_time,
        tx_count: 0,
        is_active: true,
    };

    delegation
}

// Execute an agent action with validation and permission checks
public fun execute_agent_action(
    delegation: &mut AgentDelegation,
    wallet: &mut ManagedWallet,
    action_type: u8,
    amount: u64,
    target_data: vector<u8>,
    config: &GlobalConfig,
    ctx: &mut TxContext,
): vector<u8> {
    // Security validations
    assert_system_active(config);
    assert_wallet_active(wallet);
    assert!(sender(ctx) == delegation.agent_address, E_UNAUTHORIZED_CALLER);
    assert_delegation_valid(delegation, ctx);
    assert!(delegation.wallet_id == sui::object::id(wallet), E_WALLET_NOT_FOUND);
    assert_valid_amount(amount);
    assert!(amount <= delegation.max_transaction_amount, E_EXCEEDS_TX_LIMIT);

    // Check permission based on action type
    let required_permission = get_required_permission(action_type);
    assert_permission(delegation, required_permission);

    // Check daily limits
    assert_daily_limit(delegation, amount, ctx);

    // Execute the action internally
    let result = execute_action_internal(wallet, action_type, amount, target_data);

    // Update delegation statistics
    delegation.tx_count = delegation.tx_count + 1;
    wallet.nonce = wallet.nonce + 1;

    // Emit agent action event
    event::emit(AgentActionExecuted {
        delegation_id: sui::object::id(delegation),
        wallet_id: sui::object::id(wallet),
        agent_address: delegation.agent_address,
        action_type,
        amount,
        timestamp: epoch_timestamp_ms(ctx),
        tx_count: delegation.tx_count,
    });

    result
}

// Internal function to execute specific action types
fun execute_action_internal(
    wallet: &mut ManagedWallet,
    action_type: u8,
    amount: u64,
    target_data: vector<u8>,
): vector<u8> {
    // Ensure sufficient balance for the operation
    assert!(balance::value(&wallet.balance) >= amount, E_INSUFFICIENT_BALANCE);

    // Move funds from main balance to reserved balance for execution
    let execution_balance = balance::split(&mut wallet.balance, amount);
    balance::join(&mut wallet.reserved_balance, execution_balance);

    // Execute based on action type
    if (action_type == 1) {
        // TRADE: Execute trading operation
        execute_trade_action(target_data)
    } else if (action_type == 2) {
        // STAKE: Execute staking operation
        execute_stake_action(target_data)
    } else if (action_type == 3) {
        // LEND: Execute lending operation
        execute_lend_action(target_data)
    } else if (action_type == 4) {
        // REBALANCE: Execute portfolio rebalancing
        execute_rebalance_action(target_data)
    } else if (action_type == 5) {
        // EMERGENCY: Execute emergency action
        execute_emergency_action(target_data)
    } else {
        // Invalid action type
        abort E_INVALID_PERMISSION
    }
}

// Helper function to get required permission for action type
fun get_required_permission(action_type: u8): u64 {
    if (action_type == 1) {
        PERMISSION_TRADE
    } else if (action_type == 2) {
        PERMISSION_STAKE
    } else if (action_type == 3) {
        PERMISSION_LEND
    } else if (action_type == 4) {
        PERMISSION_REBALANCE
    } else if (action_type == 5) {
        PERMISSION_EMERGENCY
    } else {
        abort E_INVALID_PERMISSION
    }
}

// Trade action implementation (placeholder)
fun execute_trade_action(target_data: vector<u8>): vector<u8> {
    // TODO: Implement actual trading logic with DEX integration
    target_data
}

// Stake action implementation (placeholder)
fun execute_stake_action(target_data: vector<u8>): vector<u8> {
    // TODO: Implement actual staking logic with validator selection
    target_data
}

// Lend action implementation (placeholder)
fun execute_lend_action(target_data: vector<u8>): vector<u8> {
    // TODO: Implement actual lending logic with protocol integration
    target_data
}

// Rebalance action implementation (placeholder)
fun execute_rebalance_action(target_data: vector<u8>): vector<u8> {
    // TODO: Implement actual portfolio rebalancing logic
    target_data
}

// Emergency action implementation (placeholder)
fun execute_emergency_action(target_data: vector<u8>): vector<u8> {
    // TODO: Implement emergency procedures like position closure
    target_data
}

// EVENT DEFINITIONS

// Emitted by mint_conviction_nft function when a new NFT and wallet are created
public struct NFTMinted has copy, drop {
    nft_id: ID,
    wallet_id: ID,
    owner: address,
    strategy_id: u64,
    risk_level: u8,
    timestamp: u64,
}

// Emitted by deposit_to_wallet function when SUI is deposited to a managed wallet
public struct DepositMade has copy, drop {
    wallet_id: ID,
    nft_id: ID,
    depositor: address,
    amount: u64,
    total_deposited: u64,
    timestamp: u64,
    nonce: u64,
}

// Emitted by withdraw_from_wallet function when SUI is withdrawn from a managed wallet
public struct WithdrawalMade has copy, drop {
    wallet_id: ID,
    nft_id: ID,
    withdrawer: address,
    amount: u64,
    total_withdrawn: u64,
    timestamp: u64,
    nonce: u64,
}

// Emitted by emergency_withdraw function when emergency withdrawal is performed
public struct EmergencyWithdrawal has copy, drop {
    wallet_id: ID,
    nft_id: ID,
    withdrawer: address,
    amount: u64,
    admin_initiated: bool,
    timestamp: u64,
    nonce: u64,
}

// Emitted by delegate_to_agent function when control is delegated to an AI agent
public struct AgentDelegated has copy, drop {
    delegation_id: ID,
    wallet_id: ID,
    nft_id: ID,
    owner: address,
    agent_address: address,
    permissions: u64,
    expires_at: u64,
    max_transaction_amount: u64,
    daily_limit: u64,
    timestamp: u64,
}

// Emitted by execute_agent_action function when an agent executes an action
public struct AgentActionExecuted has copy, drop {
    delegation_id: ID,
    wallet_id: ID,
    agent_address: address,
    action_type: u8,
    amount: u64,
    timestamp: u64,
    tx_count: u64,
}

// Emitted when delegation is revoked or expires (placeholder for future implementation)
public struct DelegationRevoked has copy, drop {
    delegation_id: ID,
    wallet_id: ID,
    agent_address: address,
    revoked_by: address,
    reason: u8, // 1=manual_revoke, 2=expired, 3=emergency
    timestamp: u64,
}

// Emitted when a new strategy is added to the registry (placeholder for future implementation)
public struct StrategyAdded has copy, drop {
    strategy_id: u64,
    name: String,
    risk_category: u8,
    admin: address,
    min_deposit: u64,
    max_deposit: u64,
    timestamp: u64,
}

// Emitted when system or wallet pause status is toggled (placeholder for future implementation)
public struct SystemPauseToggled has copy, drop {
    target_type: u8, // 1=global_system, 2=wallet, 3=strategy_registry
    target_id: Option<ID>,
    is_paused: bool,
    admin: address,
    timestamp: u64,
}

// ADVANCED FEATURES

// 1. STRATEGY MANAGEMENT FUNCTIONS

// Add a new strategy to the registry with proper access control
public fun add_strategy(
    registry: &mut StrategyRegistry,
    admin_cap: &AdminCap,
    name: String,
    description: String,
    risk_category: u8,
    supported_protocols: vector<String>,
    min_deposit: u64,
    max_deposit: u64,
    performance_fee: u64,
    management_fee: u64,
    ctx: &TxContext,
): u64 {
    // Access control: only admin can add strategies
    assert!(admin_cap.level >= 1, E_UNAUTHORIZED_CALLER);
    assert!(!registry.is_paused, E_SYSTEM_PAUSED);

    let current_time = epoch_timestamp_ms(ctx);
    let strategy_id = registry.next_strategy_id;

    // Create new strategy
    let strategy = Strategy {
        id: strategy_id,
        name,
        description,
        risk_category,
        supported_protocols,
        min_deposit,
        max_deposit,
        performance_fee,
        management_fee,
        is_active: true,
        created_at: current_time,
        updated_at: current_time,
        version: 1,
    };

    // Add to registry
    table::add(&mut registry.strategies, strategy_id, strategy);
    registry.next_strategy_id = strategy_id + 1;
    registry.total_strategies = registry.total_strategies + 1;
    registry.total_active_strategies = registry.total_active_strategies + 1;

    // Emit strategy added event
    event::emit(StrategyAdded {
        strategy_id,
        name: strategy.name,
        risk_category,
        admin: sender(ctx),
        min_deposit,
        max_deposit,
        timestamp: current_time,
    });

    strategy_id
}

// Update an existing strategy with proper versioning
public fun update_strategy(
    registry: &mut StrategyRegistry,
    admin_cap: &AdminCap,
    strategy_id: u64,
    name: Option<String>,
    description: Option<String>,
    min_deposit: Option<u64>,
    max_deposit: Option<u64>,
    performance_fee: Option<u64>,
    management_fee: Option<u64>,
    ctx: &TxContext,
) {
    // Access control: only admin can update strategies
    assert!(admin_cap.level >= 1, E_UNAUTHORIZED_CALLER);
    assert!(!registry.is_paused, E_SYSTEM_PAUSED);
    assert!(table::contains(&registry.strategies, strategy_id), E_STRATEGY_NOT_FOUND);

    let strategy = table::borrow_mut(&mut registry.strategies, strategy_id);
    let current_time = epoch_timestamp_ms(ctx);

    // Update fields if provided
    if (std::option::is_some(&name)) {
        strategy.name = std::option::extract(&mut name);
    };
    if (std::option::is_some(&description)) {
        strategy.description = std::option::extract(&mut description);
    };
    if (std::option::is_some(&min_deposit)) {
        strategy.min_deposit = std::option::extract(&mut min_deposit);
    };
    if (std::option::is_some(&max_deposit)) {
        strategy.max_deposit = std::option::extract(&mut max_deposit);
    };
    if (std::option::is_some(&performance_fee)) {
        strategy.performance_fee = std::option::extract(&mut performance_fee);
    };
    if (std::option::is_some(&management_fee)) {
        strategy.management_fee = std::option::extract(&mut management_fee);
    };

    // Update metadata
    strategy.updated_at = current_time;
    strategy.version = strategy.version + 1;
}

// Deactivate a strategy to prevent new investments
public fun deactivate_strategy(
    registry: &mut StrategyRegistry,
    admin_cap: &AdminCap,
    strategy_id: u64,
    ctx: &TxContext,
) {
    // Access control: only admin can deactivate strategies
    assert!(admin_cap.level >= 1, E_UNAUTHORIZED_CALLER);
    assert!(table::contains(&registry.strategies, strategy_id), E_STRATEGY_NOT_FOUND);

    let strategy = table::borrow_mut(&mut registry.strategies, strategy_id);

    if (strategy.is_active) {
        strategy.is_active = false;
        strategy.updated_at = epoch_timestamp_ms(ctx);
        registry.total_active_strategies = registry.total_active_strategies - 1;
    };
}

// Get list of all active strategies
public fun get_active_strategies(registry: &StrategyRegistry): vector<u64> {
    let active_strategies = std::vector::empty<u64>();
    let strategy_id = 1;

    while (strategy_id < registry.next_strategy_id) {
        if (table::contains(&registry.strategies, strategy_id)) {
            let strategy = table::borrow(&registry.strategies, strategy_id);
            if (strategy.is_active) {
                std::vector::push_back(&mut active_strategies, strategy_id);
            };
        };
        strategy_id = strategy_id + 1;
    };

    active_strategies
}

// 2. DELEGATION REVOCATION & EXPIRY HANDLING

// Revoke an active delegation manually
public fun revoke_delegation(
    delegation: &mut AgentDelegation,
    wallet: &mut ManagedWallet,
    nft: &ConvictionNFT,
    ctx: &TxContext,
) {
    // Access control: only wallet owner can revoke delegation
    assert_nft_owner(nft, wallet);
    assert!(sender(ctx) == wallet.controller, E_UNAUTHORIZED_CALLER);
    assert!(delegation.wallet_id == sui::object::id(wallet), E_WALLET_NOT_FOUND);
    assert!(delegation.is_active, E_DELEGATION_EXPIRED);

    // Deactivate delegation
    delegation.is_active = false;

    // Clear wallet delegation info
    wallet.delegated_agent = std::option::none();
    wallet.delegation_expires = 0;
    wallet.nonce = wallet.nonce + 1;

    // Emit delegation revoked event
    event::emit(DelegationRevoked {
        delegation_id: sui::object::id(delegation),
        wallet_id: sui::object::id(wallet),
        agent_address: delegation.agent_address,
        revoked_by: sender(ctx),
        reason: 1, // manual_revoke
        timestamp: epoch_timestamp_ms(ctx),
    });
}

// Clean up expired delegation
public fun cleanup_expired_delegation(
    delegation: &mut AgentDelegation,
    wallet: &mut ManagedWallet,
    ctx: &TxContext,
) {
    // Check if delegation has expired
    let current_time = epoch_timestamp_ms(ctx);
    assert!(delegation.expires_at <= current_time, E_DELEGATION_EXPIRED);
    assert!(delegation.wallet_id == sui::object::id(wallet), E_WALLET_NOT_FOUND);

    if (delegation.is_active) {
        // Deactivate expired delegation
        delegation.is_active = false;

        // Clear wallet delegation info
        wallet.delegated_agent = std::option::none();
        wallet.delegation_expires = 0;
        wallet.nonce = wallet.nonce + 1;

        // Emit delegation revoked event
        event::emit(DelegationRevoked {
            delegation_id: sui::object::id(delegation),
            wallet_id: sui::object::id(wallet),
            agent_address: delegation.agent_address,
            revoked_by: sender(ctx),
            reason: 2, // expired
            timestamp: current_time,
        });
    };
}

// 3. SYSTEM OPERATIONS & CONFIGURATION

// Toggle global system pause status
public fun toggle_system_pause(config: &mut GlobalConfig, admin_cap: &AdminCap, ctx: &TxContext) {
    // Access control: only high-level admin can pause system
    assert!(admin_cap.level >= 2, E_UNAUTHORIZED_CALLER);

    config.is_paused = !config.is_paused;

    // Emit system pause toggled event
    event::emit(SystemPauseToggled {
        target_type: 1, // global_system
        target_id: std::option::none(),
        is_paused: config.is_paused,
        admin: sender(ctx),
        timestamp: epoch_timestamp_ms(ctx),
    });
}

// Toggle individual wallet pause status
public fun toggle_wallet_pause(
    wallet: &mut ManagedWallet,
    nft: &ConvictionNFT,
    admin_cap: &AdminCap,
    ctx: &TxContext,
) {
    // Access control: admin or wallet owner can pause wallet
    let caller = sender(ctx);
    let is_admin = admin_cap.level >= 1;
    let is_owner = caller == wallet.controller;
    assert!(is_admin || is_owner, E_UNAUTHORIZED_CALLER);

    if (is_owner) {
        assert_nft_owner(nft, wallet);
    };

    wallet.is_paused = !wallet.is_paused;
    wallet.nonce = wallet.nonce + 1;

    // Emit wallet pause toggled event
    event::emit(SystemPauseToggled {
        target_type: 2, // wallet
        target_id: std::option::some(sui::object::id(wallet)),
        is_paused: wallet.is_paused,
        admin: caller,
        timestamp: epoch_timestamp_ms(ctx),
    });
}

// Update global configuration parameters
public fun update_global_config(
    config: &mut GlobalConfig,
    admin_cap: &AdminCap,
    min_deposit_amount: Option<u64>,
    max_risk_level: Option<u8>,
    default_delegation_duration: Option<u64>,
    protocol_fee_rate: Option<u64>,
    treasury: Option<address>,
    emergency_admin: Option<address>,
    _ctx: &TxContext,
) {
    // Access control: only high-level admin can update global config
    assert!(admin_cap.level >= 2, E_UNAUTHORIZED_CALLER);

    // Update fields if provided
    if (std::option::is_some(&min_deposit_amount)) {
        config.min_deposit_amount = std::option::extract(&mut min_deposit_amount);
    };
    if (std::option::is_some(&max_risk_level)) {
        config.max_risk_level = std::option::extract(&mut max_risk_level);
    };
    if (std::option::is_some(&default_delegation_duration)) {
        let duration = std::option::extract(&mut default_delegation_duration);
        assert!(
            duration >= MIN_DELEGATION_DURATION && duration <= MAX_DELEGATION_DURATION,
            E_INVALID_DURATION,
        );
        config.default_delegation_duration = duration;
    };
    if (std::option::is_some(&protocol_fee_rate)) {
        let fee_rate = std::option::extract(&mut protocol_fee_rate);
        assert!(fee_rate <= 10000, E_INVALID_PERMISSION); // Max 100% (10000 basis points)
        config.protocol_fee_rate = fee_rate;
    };
    if (std::option::is_some(&treasury)) {
        config.treasury = std::option::extract(&mut treasury);
    };
    if (std::option::is_some(&emergency_admin)) {
        config.emergency_admin = std::option::extract(&mut emergency_admin);
    };

    config.version = config.version + 1;
}

// UTILITY FUNCTIONS AND INITIALIZATION

// 1. GETTER FUNCTIONS (Information Retrieval)

// Get comprehensive NFT details including metadata and associated wallet info
public fun get_nft_details(nft: &ConvictionNFT): (u64, u8, ID, u64, u64, u64) {
    (
        nft.strategy_id,
        nft.risk_level,
        nft.wallet_id,
        nft.created_at,
        nft.last_rebalance,
        nft.total_returns,
    )
}

// Get wallet balance information and status
public fun get_wallet_balance(wallet: &ManagedWallet): (u64, u64, u64, u64, u64, bool, u64) {
    (
        balance::value(&wallet.balance),
        balance::value(&wallet.reserved_balance),
        wallet.total_deposited,
        wallet.total_withdrawn,
        wallet.delegation_expires,
        wallet.is_paused,
        wallet.nonce,
    )
}

// Get delegation information and current status
public fun get_delegation_info(
    delegation: &AgentDelegation,
): (ID, address, u64, u64, u64, u64, u64, u64, u64, bool) {
    (
        delegation.wallet_id,
        delegation.agent_address,
        delegation.permissions,
        delegation.expires_at,
        delegation.max_transaction_amount,
        delegation.daily_limit,
        delegation.used_today,
        delegation.last_reset,
        delegation.tx_count,
        delegation.is_active,
    )
}

// Get strategy details from registry
public fun get_strategy_details(
    registry: &StrategyRegistry,
    strategy_id: u64,
): (String, String, u8, u64, u64, u64, u64, bool, u64, u64, u64) {
    assert!(table::contains(&registry.strategies, strategy_id), E_STRATEGY_NOT_FOUND);
    let strategy = table::borrow(&registry.strategies, strategy_id);

    (
        strategy.name,
        strategy.description,
        strategy.risk_category,
        strategy.min_deposit,
        strategy.max_deposit,
        strategy.performance_fee,
        strategy.management_fee,
        strategy.is_active,
        strategy.created_at,
        strategy.updated_at,
        strategy.version,
    )
}

// Get comprehensive system statistics
public fun get_system_stats(
    config: &GlobalConfig,
    registry: &StrategyRegistry,
): (bool, u64, u8, u64, u64, u64, u64, u64, bool) {
    (
        config.is_paused,
        config.min_deposit_amount,
        config.max_risk_level,
        config.default_delegation_duration,
        config.protocol_fee_rate,
        config.version,
        registry.total_strategies,
        registry.total_active_strategies,
        registry.is_paused,
    )
}

// 2. INITIALIZATION FUNCTION

// Initialize the ConvictionFi system with global configuration and strategy registry
fun init(ctx: &mut TxContext) {
    let deployer = sender(ctx);
    let current_time = epoch_timestamp_ms(ctx);

    // Create global configuration
    let global_config = GlobalConfig {
        id: sui::object::new(ctx),
        is_paused: false,
        min_deposit_amount: MIN_DEPOSIT_AMOUNT,
        max_risk_level: 5,
        default_delegation_duration: 3600000, // 1 hour default
        protocol_fee_rate: 250, // 2.5% (250 basis points)
        treasury: deployer,
        emergency_admin: deployer,
        version: 1,
    };

    // Create strategy registry
    let strategy_registry = StrategyRegistry {
        id: sui::object::new(ctx),
        strategies: table::new(ctx),
        next_strategy_id: 1,
        admin: deployer,
        total_strategies: 0,
        total_active_strategies: 0,
        is_paused: false,
    };

    // Create admin capability for deployer
    let admin_cap = AdminCap {
        id: sui::object::new(ctx),
        level: 3, // Highest admin level
        permissions: PERMISSION_ALL,
        issued_at: current_time,
        expires_at: std::option::none(), // Never expires for deployer
    };

    // Share global objects for public access
    transfer::share_object(global_config);
    transfer::share_object(strategy_registry);

    // Transfer admin capability to deployer
    transfer::public_transfer(admin_cap, deployer);
}

// COMPREHENSIVE TEST SUITE

#[test_only]
use sui::test_scenario::{Self, Scenario};

// Test setup function to create a complete test environment
#[test_only]
public fun create_test_environment(
    admin: address,
    _user: address,
    _agent: address,
): (GlobalConfig, StrategyRegistry) {
    // Create global configuration for testing
    let config = GlobalConfig {
        id: sui::object::new(&mut sui::tx_context::dummy()),
        is_paused: false,
        min_deposit_amount: MIN_DEPOSIT_AMOUNT,
        max_risk_level: 5,
        default_delegation_duration: 3600000, // 1 hour
        protocol_fee_rate: 100, // 1%
        treasury: admin,
        emergency_admin: admin,
        version: 1,
    };

    // Create strategy registry for testing
    let registry = StrategyRegistry {
        id: sui::object::new(&mut sui::tx_context::dummy()),
        strategies: table::new(&mut sui::tx_context::dummy()),
        next_strategy_id: 1,
        admin,
        total_strategies: 0,
        total_active_strategies: 0,
        is_paused: false,
    };

    (config, registry)
}

// Test the complete workflow from mint to agent execution
#[test]
public fun test_complete_workflow() {
    let admin = @0xA;
    let user = @0xB;
    let agent = @0xC;

    let mut scenario = test_scenario::begin(admin);

    // Setup test environment
    let (config, registry) = create_test_environment(admin, user, agent);

    // Test Step 1: Mint ConvictionNFT and ManagedWallet
    test_scenario::next_tx(&mut scenario, user);
    {
        let ctx = test_scenario::ctx(&mut scenario);
        let (nft, wallet) = mint_conviction_nft(1, 3, &config, ctx);

        // Verify NFT properties
        assert!(nft.strategy_id == 1, 0);
        assert!(nft.risk_level == 3, 1);
        assert!(wallet.controller == user, 2);
        assert!(balance::value(&wallet.balance) == 0, 3);

        transfer::public_transfer(nft, user);
        transfer::share_object(wallet);
    };

    // Test Step 2: Deposit SUI to wallet
    test_scenario::next_tx(&mut scenario, user);
    {
        let mut wallet = test_scenario::take_shared<ManagedWallet>(&scenario);
        let nft = test_scenario::take_from_sender<ConvictionNFT>(&scenario);
        let ctx = test_scenario::ctx(&mut scenario);

        // Create test coin for deposit
        let deposit_coin = coin::mint_for_testing<SUI>(5000000000, ctx); // 5 SUI

        deposit_to_wallet(&mut wallet, &nft, deposit_coin, &config, ctx);

        // Verify deposit
        assert!(balance::value(&wallet.balance) == 5000000000, 4);
        assert!(wallet.total_deposited == 5000000000, 5);

        test_scenario::return_shared(wallet);
        test_scenario::return_to_sender(&scenario, nft);
    };

    // Test Step 3: Delegate to AI agent
    test_scenario::next_tx(&mut scenario, user);
    {
        let mut wallet = test_scenario::take_shared<ManagedWallet>(&scenario);
        let nft = test_scenario::take_from_sender<ConvictionNFT>(&scenario);
        let ctx = test_scenario::ctx(&mut scenario);

        let delegation = delegate_to_agent(
            &mut wallet,
            &nft,
            agent,
            PERMISSION_TRADE | PERMISSION_STAKE, // Allow trade and stake
            3600000, // 1 hour
            1000000000, // 1 SUI max per tx
            2000000000, // 2 SUI daily limit
            &config,
            ctx,
        );

        // Verify delegation
        assert!(delegation.agent_address == agent, 6);
        assert!(delegation.permissions == (PERMISSION_TRADE | PERMISSION_STAKE), 7);
        assert!(delegation.is_active == true, 8);
        assert!(std::option::is_some(&wallet.delegated_agent), 9);

        transfer::public_transfer(delegation, agent);
        test_scenario::return_shared(wallet);
        test_scenario::return_to_sender(&scenario, nft);
    };

    // Test Step 4: Agent executes action
    test_scenario::next_tx(&mut scenario, agent);
    {
        let mut wallet = test_scenario::take_shared<ManagedWallet>(&scenario);
        let mut delegation = test_scenario::take_from_sender<AgentDelegation>(&scenario);
        let ctx = test_scenario::ctx(&mut scenario);

        let target_data = std::vector::empty<u8>();
        std::vector::push_back(&mut target_data, 42); // Test data

        let result = execute_agent_action(
            &mut delegation,
            &mut wallet,
            1, // TRADE action
            500000000, // 0.5 SUI
            target_data,
            &config,
            ctx,
        );

        // Verify execution
        assert!(delegation.tx_count == 1, 10);
        assert!(delegation.used_today == 500000000, 11);
        assert!(balance::value(&wallet.reserved_balance) == 500000000, 12);
        assert!(balance::value(&wallet.balance) == 4500000000, 13);
        assert!(std::vector::length(&result) > 0, 14);

        test_scenario::return_shared(wallet);
        test_scenario::return_to_sender(&scenario, delegation);
    };

    test_scenario::end(scenario);

    // Clean up test objects
    let GlobalConfig { id: config_id, .. } = config;
    sui::object::delete(config_id);
    let StrategyRegistry { id: registry_id, strategies, .. } = registry;
    table::destroy_empty(strategies);
    sui::object::delete(registry_id);
}
