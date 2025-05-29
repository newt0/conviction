// ConvictionFi
// Module: convictionfi::conviction_agent

module convictionfi::conviction_agent {
    use std::string::{Self, String};
    use sui::object::{Self, ID, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance::{Self, Balance};
    use sui::event;
    use sui::display;
    use sui::package;

    // ========== エラーコード ==========
    const E_NOT_AUTHORIZED: u64 = 1;
    const E_INSUFFICIENT_FUNDS: u64 = 2;
    const E_INVALID_STRATEGY: u64 = 3;
    const E_INVALID_RISK_LEVEL: u64 = 4;

    // ========== 構造体定義 ==========

    /// ConvictionFi NFT - ユーザーの投資信念を表すNFT
    struct ConvictionNFT has key, store {
        id: UID,
        strategy_id: u64,      // 戦略ID（1: Conservative, 2: Balanced, 3: Aggressive）
        risk_level: u8,        // リスクレベル（1-10）
        owner: address,        // NFT所有者
        wallet_id: ID,         // 紐づくスマートウォレットのID
        created_at: u64,       // 作成時刻（エポック秒）
        name: String,          // NFT名
        description: String,   // NFT説明
        image_url: String,     // NFT画像URL
    }

    /// スマートウォレット - NFTに紐づく独立した資金管理ウォレット
    struct SmartWallet has key {
        id: UID,
        nft_id: ID,                    // 紐づくNFTのID
        owner: address,                // ウォレット所有者（NFT所有者と同一）
        balance: Balance<SUI>,         // 保有資金
        strategy_id: u64,              // 実行中の戦略ID
        risk_level: u8,                // リスク許容度
        total_deposited: u64,          // 累計入金額
        last_strategy_execution: u64,  // 最後の戦略実行時刻
    }

    /// プロジェクト管理用のキャップ（管理者権限）
    struct AdminCap has key {
        id: UID,
    }

    /// NFTコレクション情報
    struct ConvictionCollection has key {
        id: UID,
        total_minted: u64,        // 総ミント数
        strategy_count: u64,      // 利用可能戦略数
    }

    // ========== イベント定義 ==========

    /// NFTミント時のイベント
    struct NFTMinted has copy, drop {
        nft_id: ID,
        wallet_id: ID,
        owner: address,
        strategy_id: u64,
        risk_level: u8,
        deposit_amount: u64,
    }

    /// 資金入金時のイベント
    struct FundsDeposited has copy, drop {
        wallet_id: ID,
        owner: address,
        amount: u64,
        new_balance: u64,
    }

    /// NFT譲渡時のイベント
    struct OwnershipTransferred has copy, drop {
        nft_id: ID,
        wallet_id: ID,
        from: address,
        to: address,
    }

    /// 戦略実行時のイベント（ダミー）
    struct StrategyExecuted has copy, drop {
        wallet_id: ID,
        strategy_id: u64,
        timestamp: u64,
    }

    // ========== 初期化関数 ==========

    /// モジュール初期化時に実行される関数
    fun init(ctx: &mut TxContext) {
        // 管理者キャップを作成してデプロイアドレスに送信
        let admin_cap = AdminCap {
            id: object::new(ctx),
        };
        transfer::transfer(admin_cap, tx_context::sender(ctx));

        // コレクション情報を初期化
        let collection = ConvictionCollection {
            id: object::new(ctx),
            total_minted: 0,
            strategy_count: 3, // Conservative, Balanced, Aggressive
        };
        transfer::share_object(collection);
    }

    // ========== 公開関数 ==========

    /// NFTミント機能 - 投資信念をNFTとして刻み、同時にスマートウォレットを作成
    public entry fun mint_nft(
        collection: &mut ConvictionCollection,
        strategy_id: u64,
        risk_level: u8,
        deposit: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        // バリデーション
        assert!(strategy_id >= 1 && strategy_id <= 3, E_INVALID_STRATEGY);
        assert!(risk_level >= 1 && risk_level <= 10, E_INVALID_RISK_LEVEL);
        
        let deposit_amount = coin::value(&deposit);
        assert!(deposit_amount > 0, E_INSUFFICIENT_FUNDS);

        let sender = tx_context::sender(ctx);
        let current_time = tx_context::epoch(ctx);

        // NFTの作成
        let nft_uid = object::new(ctx);
        let nft_id = object::uid_to_inner(&nft_uid);

        // スマートウォレットの作成
        let wallet_uid = object::new(ctx);
        let wallet_id = object::uid_to_inner(&wallet_uid);

        // NFTメタデータの設定
        let (name, description, image_url) = get_nft_metadata(strategy_id, risk_level);

        let nft = ConvictionNFT {
            id: nft_uid,
            strategy_id,
            risk_level,
            owner: sender,
            wallet_id,
            created_at: current_time,
            name,
            description,
            image_url,
        };

        // スマートウォレットの作成と資金入金
        let wallet = SmartWallet {
            id: wallet_uid,
            nft_id,
            owner: sender,
            balance: coin::into_balance(deposit),
            strategy_id,
            risk_level,
            total_deposited: deposit_amount,
            last_strategy_execution: current_time,
        };

        // コレクション情報の更新
        collection.total_minted = collection.total_minted + 1;

        // イベント発行
        event::emit(NFTMinted {
            nft_id,
            wallet_id,
            owner: sender,
            strategy_id,
            risk_level,
            deposit_amount,
        });

        // オブジェクトの送信
        transfer::transfer(nft, sender);
        transfer::share_object(wallet); // 他の関数からアクセス可能にするため共有
    }

    /// 追加資金の入金機能
    public entry fun deposit_funds(
        wallet: &mut SmartWallet,
        nft: &ConvictionNFT,
        deposit: Coin<SUI>,
        ctx: &TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // 認証：NFT所有者のみが入金可能
        assert!(nft.owner == sender, E_NOT_AUTHORIZED);
        assert!(nft.wallet_id == object::uid_to_inner(&wallet.id), E_NOT_AUTHORIZED);

        let deposit_amount = coin::value(&deposit);
        assert!(deposit_amount > 0, E_INSUFFICIENT_FUNDS);

        // 資金を追加
        balance::join(&mut wallet.balance, coin::into_balance(deposit));
        wallet.total_deposited = wallet.total_deposited + deposit_amount;

        let new_balance = balance::value(&wallet.balance);

        // イベント発行
        event::emit(FundsDeposited {
            wallet_id: object::uid_to_inner(&wallet.id),
            owner: sender,
            amount: deposit_amount,
            new_balance,
        });
    }

    /// NFT譲渡時の所有権移転処理
    public entry fun transfer_ownership(
        wallet: &mut SmartWallet,
        nft: &mut ConvictionNFT,
        new_owner: address,
        ctx: &TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // 認証：現在のNFT所有者のみが譲渡可能
        assert!(nft.owner == sender, E_NOT_AUTHORIZED);
        assert!(wallet.owner == sender, E_NOT_AUTHORIZED);
        assert!(nft.wallet_id == object::uid_to_inner(&wallet.id), E_NOT_AUTHORIZED);

        let old_owner = nft.owner;

        // 所有権の更新
        nft.owner = new_owner;
        wallet.owner = new_owner;

        // イベント発行
        event::emit(OwnershipTransferred {
            nft_id: object::uid_to_inner(&nft.id),
            wallet_id: object::uid_to_inner(&wallet.id),
            from: old_owner,
            to: new_owner,
        });
    }

    /// 戦略実行機能（ダミー実装）
    public entry fun execute_strategy(
        wallet: &mut SmartWallet,
        nft: &ConvictionNFT,
        _admin: &AdminCap, // 管理者のみ実行可能
        ctx: &TxContext
    ) {
        // 認証
        assert!(nft.wallet_id == object::uid_to_inner(&wallet.id), E_NOT_AUTHORIZED);

        let current_time = tx_context::epoch(ctx);
        
        // TODO: 実際の戦略実行ロジックをここに実装
        // 例：
        // - strategy_id == 1: Conservative Strategy (ステーキング中心)
        // - strategy_id == 2: Balanced Strategy (ステーキング + 一部レンディング)
        // - strategy_id == 3: Aggressive Strategy (レンディング + トレード)

        // ダミー処理：最後の実行時刻を更新
        wallet.last_strategy_execution = current_time;

        // イベント発行
        event::emit(StrategyExecuted {
            wallet_id: object::uid_to_inner(&wallet.id),
            strategy_id: wallet.strategy_id,
            timestamp: current_time,
        });
    }

    /// 緊急時の資金引き出し機能
    public entry fun emergency_withdraw(
        wallet: &mut SmartWallet,
        nft: &ConvictionNFT,
        amount: u64,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // 認証：NFT所有者のみが引き出し可能
        assert!(nft.owner == sender, E_NOT_AUTHORIZED);
        assert!(nft.wallet_id == object::uid_to_inner(&wallet.id), E_NOT_AUTHORIZED);

        let current_balance = balance::value(&wallet.balance);
        assert!(current_balance >= amount, E_INSUFFICIENT_FUNDS);

        // 資金を引き出し
        let withdraw_balance = balance::split(&mut wallet.balance, amount);
        let withdraw_coin = coin::from_balance(withdraw_balance, ctx);
        
        transfer::public_transfer(withdraw_coin, sender);
    }

    // ========== ビュー関数 ==========

    /// NFT情報の取得
    public fun get_nft_info(nft: &ConvictionNFT): (u64, u8, address, ID, u64) {
        (nft.strategy_id, nft.risk_level, nft.owner, nft.wallet_id, nft.created_at)
    }

    /// ウォレット残高の取得
    public fun get_wallet_balance(wallet: &SmartWallet): u64 {
        balance::value(&wallet.balance)
    }

    /// ウォレット情報の取得
    public fun get_wallet_info(wallet: &SmartWallet): (ID, address, u64, u64, u64, u64) {
        (
            wallet.nft_id,
            wallet.owner,
            balance::value(&wallet.balance),
            wallet.strategy_id,
            wallet.total_deposited,
            wallet.last_strategy_execution
        )
    }

    // ========== 内部関数 ==========

    /// NFTメタデータの生成
    fun get_nft_metadata(strategy_id: u64, risk_level: u8): (String, String, String) {
        let base_url = string::utf8(b"https://convictionfi.com/nft/");
        
        let (strategy_name, description) = if (strategy_id == 1) {
            (string::utf8(b"Conservative Conviction"), 
             string::utf8(b"安定重視の保守的な投資戦略を実行するAIエージェント"))
        } else if (strategy_id == 2) {
            (string::utf8(b"Balanced Conviction"), 
             string::utf8(b"リスクとリターンのバランスを重視する投資戦略を実行するAIエージェント"))
        } else {
            (string::utf8(b"Aggressive Conviction"), 
             string::utf8(b"高リターンを狙う積極的な投資戦略を実行するAIエージェント"))
        };

        let image_filename = if (strategy_id == 1) {
            string::utf8(b"conservative.png")
        } else if (strategy_id == 2) {
            string::utf8(b"balanced.png")
        } else {
            string::utf8(b"aggressive.png")
        };

        string::append(&mut base_url, image_filename);

        (strategy_name, description, base_url)
    }

    // ========== テスト用関数 ==========
    
    #[test_only]
    public fun init_for_testing(ctx: &mut TxContext) {
        init(ctx);
    }
}