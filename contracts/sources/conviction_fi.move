module conviction_fi::core {
    // =% CRITICAL: Use latest stable Sui API
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

    // =� SECURITY: Error code definitions
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

    // = PERMISSIONS: Bitmask-style permission system
    const PERMISSION_TRADE: u64 = 0x001;      // 0000 0001
    const PERMISSION_STAKE: u64 = 0x002;      // 0000 0010
    const PERMISSION_LEND: u64 = 0x004;       // 0000 0100
    const PERMISSION_REBALANCE: u64 = 0x008;  // 0000 1000
    const PERMISSION_EMERGENCY: u64 = 0x010;  // 0001 0000
    const PERMISSION_ALL: u64 = 0x01F;        // 0001 1111

    // � TIME: Time-related constants
    const SECONDS_IN_DAY: u64 = 86400000; // milliseconds
    const MAX_DELEGATION_DURATION: u64 = 31536000000; // 1 year
    const MIN_DELEGATION_DURATION: u64 = 3600000;     // 1 hour

    // =� LIMITS: Financial constraints
    const MIN_DEPOSIT_AMOUNT: u64 = 1000000000;         // 1 SUI (MIST)
    const MAX_DAILY_LIMIT: u64 = 100000000000000;       // 100,000 SUI (MIST)
    const MAX_TX_LIMIT: u64 = 10000000000000;           // 10,000 SUI (MIST)

    // <� ConvictionNFT: NFT with metadata
    struct ConvictionNFT has key, store {
        id: UID,
        strategy_id: u64,
        risk_level: u8,
        wallet_id: ID,
        created_at: u64,
        last_rebalance: u64,
        total_returns: u64,
        metadata: Table<String, String>,
    }

    // =� ManagedWallet: Wallet managing user funds
    struct ManagedWallet has key {
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

    // > AgentDelegation: Delegation to AI Agent
    struct AgentDelegation has key, store {
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

    // =� Strategy: Investment strategy object
    struct Strategy has store, copy {
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

    // <� StrategyRegistry: Registry for strategies
    struct StrategyRegistry has key {
        id: UID,
        strategies: Table<u64, Strategy>,
        next_strategy_id: u64,
        admin: address,
        total_strategies: u64,
        total_active_strategies: u64,
        is_paused: bool,
    }

    // =Q AdminCap: Administrator capability
    struct AdminCap has key, store {
        id: UID,
        level: u8,
        permissions: u64,
        issued_at: u64,
        expires_at: Option<u64>,
    }

    // <
 GlobalConfig: Global configuration
    struct GlobalConfig has key {
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

    // 🔐 SECURITY VALIDATION FUNCTIONS

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

    // 💼 CORE PUBLIC FUNCTIONS

    // Mint a new ConvictionNFT with associated ManagedWallet
    public fun mint_conviction_nft(
        strategy_id: u64,
        risk_level: u8,
        config: &GlobalConfig,
        ctx: &mut TxContext
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
            delegated_agent: option::none(),
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
        ctx: &TxContext
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
        ctx: &mut TxContext
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
        ctx: &mut TxContext
    ): Coin<SUI> {
        // Allow withdrawal even if system is paused for emergencies
        assert_nft_owner(nft, wallet);
        assert!(sender(ctx) == wallet.controller || sender(ctx) == config.emergency_admin, E_UNAUTHORIZED_CALLER);
        
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
}