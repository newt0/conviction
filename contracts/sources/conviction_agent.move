module convictionfi::conviction_fi {
    use sui::object::{Self, ID, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance::{Self, Balance};
    use sui::event;
    use sui::table::{Self, Table};
    use std::option::{Self, Option};

    // ========== Error Codes ==========
    const E_NOT_OWNER: u64 = 1;
    const E_INSUFFICIENT_BALANCE: u64 = 2;
    const E_WALLET_NOT_FOUND: u64 = 3;
    const E_NFT_NOT_FOUND: u64 = 4;
    const E_UNAUTHORIZED: u64 = 5;
    const E_INVALID_RISK_LEVEL: u64 = 6;

    // ========== Structs ==========

    /// The main NFT that represents a user's investment conviction
    /// This NFT is transferable and holds strategy parameters
    struct ConvictionNFT has key, store {
        id: UID,
        strategy_id: u64,
        risk_level: u8, // 1-10 scale
        wallet_id: ID, // Reference to the associated AgentWallet
        created_at: u64,
    }

    /// Individual wallet tied to each NFT, holds user's SUI deposits
    /// Controller field always matches the current NFT owner
    struct AgentWallet has key {
        id: UID,
        controller: address, // Current NFT owner who can control this wallet
        balance: Balance<SUI>,
        nft_id: ID, // Reference back to the NFT
        created_at: u64,
    }

    /// Global registry to track NFT-Wallet relationships and enable lookups
    struct ConvictionRegistry has key {
        id: UID,
        // Maps NFT ID to Wallet ID
        nft_to_wallet: Table<ID, ID>,
        // Maps Wallet ID to NFT ID  
        wallet_to_nft: Table<ID, ID>,
        total_nfts: u64,
    }

    /// One-time witness for module initialization
    struct CONVICTION_FI has drop {}

    // ========== Events ==========

    struct NFTMinted has copy, drop {
        nft_id: ID,
        wallet_id: ID,
        owner: address,
        strategy_id: u64,
        risk_level: u8,
        initial_deposit: u64,
    }

    struct WalletWithdrawal has copy, drop {
        wallet_id: ID,
        controller: address,
        amount: u64,
    }

    struct NFTTransferred has copy, drop {
        nft_id: ID,
        wallet_id: ID,
        old_owner: address,
        new_owner: address,
    }

    struct TradeExecuted has copy, drop {
        nft_id: ID,
        executor: address,
        trade_type: vector<u8>,
    }

    // ========== Initialization ==========

    /// Initialize the module by creating the global registry
    fun init(_witness: CONVICTION_FI, ctx: &mut TxContext) {
        let registry = ConvictionRegistry {
            id: object::new(ctx),
            nft_to_wallet: table::new(ctx),
            wallet_to_nft: table::new(ctx),
            total_nfts: 0,
        };
        transfer::share_object(registry);
    }

    // ========== Core Functions ==========

    /// Mint a new ConvictionNFT with associated AgentWallet
    /// Creates NFT, wallet, deposits initial funds, and links them together
    public entry fun mint_conviction_nft(
        registry: &mut ConvictionRegistry,
        strategy_id: u64,
        risk_level: u8,
        initial_deposit: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        // Validate risk level (1-10 scale)
        assert!(risk_level >= 1 && risk_level <= 10, E_INVALID_RISK_LEVEL);
        
        let sender = tx_context::sender(ctx);
        let deposit_amount = coin::value(&initial_deposit);
        let current_time = tx_context::epoch(ctx);

        // Create the AgentWallet first
        let wallet_uid = object::new(ctx);
        let wallet_id = object::uid_to_inner(&wallet_uid);
        
        // Create the ConvictionNFT
        let nft_uid = object::new(ctx);
        let nft_id = object::uid_to_inner(&nft_uid);

        let wallet = AgentWallet {
            id: wallet_uid,
            controller: sender,
            balance: coin::into_balance(initial_deposit),
            nft_id: nft_id,
            created_at: current_time,
        };

        let nft = ConvictionNFT {
            id: nft_uid,
            strategy_id,
            risk_level,
            wallet_id: wallet_id,
            created_at: current_time,
        };

        // Update registry mappings
        table::add(&mut registry.nft_to_wallet, nft_id, wallet_id);
        table::add(&mut registry.wallet_to_nft, wallet_id, nft_id);
        registry.total_nfts = registry.total_nfts + 1;

        // Emit event
        event::emit(NFTMinted {
            nft_id,
            wallet_id,
            owner: sender,
            strategy_id,
            risk_level,
            initial_deposit: deposit_amount,
        });

        // Transfer NFT to sender and share wallet
        transfer::transfer(nft, sender);
        transfer::share_object(wallet);
    }

    /// Withdraw SUI from AgentWallet - only current NFT owner can call
    public entry fun withdraw_from_wallet(
        wallet: &mut AgentWallet,
        amount: u64,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // Verify sender is the wallet controller
        assert!(wallet.controller == sender, E_NOT_OWNER);
        
        // Check sufficient balance
        let wallet_balance = balance::value(&wallet.balance);
        assert!(wallet_balance >= amount, E_INSUFFICIENT_BALANCE);

        // Withdraw the amount
        let withdrawn = coin::take(&mut wallet.balance, amount, ctx);
        
        // Emit event
        event::emit(WalletWithdrawal {
            wallet_id: object::uid_to_inner(&wallet.id),
            controller: sender,
            amount,
        });

        // Transfer coins to sender
        transfer::public_transfer(withdrawn, sender);
    }

    /// Deposit additional SUI into AgentWallet
    public entry fun deposit_to_wallet(
        wallet: &mut AgentWallet,
        deposit: Coin<SUI>,
        ctx: &TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // Verify sender is the wallet controller
        assert!(wallet.controller == sender, E_NOT_OWNER);
        
        // Add to wallet balance
        coin::put(&mut wallet.balance, deposit);
    }

    /// Update wallet controller when NFT is transferred
    /// This is called automatically during NFT transfer
    public entry fun update_wallet_controller(
        wallet: &mut AgentWallet,
        nft: &ConvictionNFT,
        new_owner: address,
        ctx: &TxContext
    ) {
        // Verify the NFT and wallet are linked
        assert!(nft.wallet_id == object::uid_to_inner(&wallet.id), E_UNAUTHORIZED);
        
        let old_owner = wallet.controller;
        wallet.controller = new_owner;

        // Emit transfer event
        event::emit(NFTTransferred {
            nft_id: object::uid_to_inner(&nft.id),
            wallet_id: object::uid_to_inner(&wallet.id),
            old_owner,
            new_owner,
        });
    }

    // ========== Strategy Execution Functions ==========

    /// Execute a trade - can be called by NFT owner or approved delegate
    public entry fun execute_trade(
        wallet: &mut AgentWallet,
        nft: &ConvictionNFT,
        trade_type: vector<u8>,
        ctx: &TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // Verify caller is authorized (NFT owner controls the wallet)
        assert!(wallet.controller == sender, E_NOT_OWNER);
        assert!(nft.wallet_id == object::uid_to_inner(&wallet.id), E_UNAUTHORIZED);

        // Emit trade execution event
        event::emit(TradeExecuted {
            nft_id: object::uid_to_inner(&nft.id),
            executor: sender,
            trade_type,
        });

        // Trade execution logic would go here
        // This is a placeholder for actual DeFi interactions
    }

    /// Rebalance portfolio based on strategy
    public entry fun rebalance(
        wallet: &mut AgentWallet,
        nft: &ConvictionNFT,
        ctx: &TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // Verify authorization
        assert!(wallet.controller == sender, E_NOT_OWNER);
        assert!(nft.wallet_id == object::uid_to_inner(&wallet.id), E_UNAUTHORIZED);

        // Rebalancing logic would go here
        // This is a placeholder for actual portfolio rebalancing
    }

    /// Stake SUI for rewards
    public entry fun stake(
        wallet: &mut AgentWallet,
        nft: &ConvictionNFT,
        amount: u64,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // Verify authorization
        assert!(wallet.controller == sender, E_NOT_OWNER);
        assert!(nft.wallet_id == object::uid_to_inner(&wallet.id), E_UNAUTHORIZED);
        
        // Check sufficient balance
        let wallet_balance = balance::value(&wallet.balance);
        assert!(wallet_balance >= amount, E_INSUFFICIENT_BALANCE);

        // Staking logic would go here
        // This is a placeholder for actual staking mechanisms
    }

    /// Unstake previously staked SUI
    public entry fun unstake(
        wallet: &mut AgentWallet,
        nft: &ConvictionNFT,
        ctx: &TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // Verify authorization
        assert!(wallet.controller == sender, E_NOT_OWNER);
        assert!(nft.wallet_id == object::uid_to_inner(&wallet.id), E_UNAUTHORIZED);

        // Unstaking logic would go here
        // This is a placeholder for actual unstaking mechanisms
    }

    // ========== View Functions ==========

    /// Get strategy ID from NFT
    public fun get_strategy_id(nft: &ConvictionNFT): u64 {
        nft.strategy_id
    }

    /// Get risk level from NFT  
    public fun get_risk_level(nft: &ConvictionNFT): u8 {
        nft.risk_level
    }

    /// Get wallet ID associated with NFT
    public fun get_wallet_id(nft: &ConvictionNFT): ID {
        nft.wallet_id
    }

    /// Get wallet balance
    public fun get_wallet_balance(wallet: &AgentWallet): u64 {
        balance::value(&wallet.balance)
    }

    /// Get wallet controller (current NFT owner)
    public fun get_wallet_controller(wallet: &AgentWallet): address {
        wallet.controller
    }

    /// Get NFT ID associated with wallet
    public fun get_nft_id(wallet: &AgentWallet): ID {
        wallet.nft_id
    }

    /// Get NFT creation timestamp
    public fun get_nft_created_at(nft: &ConvictionNFT): u64 {
        nft.created_at
    }

    /// Get wallet creation timestamp
    public fun get_wallet_created_at(wallet: &AgentWallet): u64 {
        wallet.created_at
    }

    /// Get total number of minted NFTs
    public fun get_total_nfts(registry: &ConvictionRegistry): u64 {
        registry.total_nfts
    }

    /// Check if NFT and wallet are properly linked
    public fun are_linked(nft: &ConvictionNFT, wallet: &AgentWallet): bool {
        nft.wallet_id == object::uid_to_inner(&wallet.id) && 
        wallet.nft_id == object::uid_to_inner(&nft.id)
    }

    // ========== Registry Query Functions ==========

    /// Get wallet ID from NFT ID using registry
    public fun lookup_wallet_by_nft(registry: &ConvictionRegistry, nft_id: ID): Option<ID> {
        if (table::contains(&registry.nft_to_wallet, nft_id)) {
            option::some(*table::borrow(&registry.nft_to_wallet, nft_id))
        } else {
            option::none()
        }
    }

    /// Get NFT ID from wallet ID using registry
    public fun lookup_nft_by_wallet(registry: &ConvictionRegistry, wallet_id: ID): Option<ID> {
        if (table::contains(&registry.wallet_to_nft, wallet_id)) {
            option::some(*table::borrow(&registry.wallet_to_nft, wallet_id))
        } else {
            option::none()
        }
    }
}