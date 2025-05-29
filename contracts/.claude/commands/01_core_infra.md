# /project:01_core_infra

## ⛏ 指示

このコマンドでは、ConvictionFi の Move スマートコントラクトの**基盤構造と型定義**を実装します。

## 🎯 要件

- `conviction_fi.move` モジュールに含める
- `core` セクションのインポートおよび定数定義
- `ConvictionNFT`, `ManagedWallet`, `AgentDelegation` などの構造体をすべて含む
- エラーコードは `E_` で始まる形式で、意味のある名称を付与
- `PERMISSION_` 定数と `TIME`, `LIMITS` に関する定義も含む

## 🛠 実装方法

Move 2024 Edition に準拠し、最適な型安全性を保ちながら記述してください。コメントは**日本語と英語併記**でお願いします。

---

### ✅ 実装内容

```move
module conviction_fi::core {
    // 🔥 CRITICAL: Suiの最新stable APIを使用 / Use latest Sui stable API
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

    // 🛡️ SECURITY: エラーコード定義 / Error code definitions
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

    // 🔐 PERMISSIONS: ビットマスク方式 / Bitmask-style permission system
    const PERMISSION_TRADE: u64 = 0x001;      // 0000 0001
    const PERMISSION_STAKE: u64 = 0x002;      // 0000 0010
    const PERMISSION_LEND: u64 = 0x004;       // 0000 0100
    const PERMISSION_REBALANCE: u64 = 0x008;  // 0000 1000
    const PERMISSION_EMERGENCY: u64 = 0x010;  // 0001 0000
    const PERMISSION_ALL: u64 = 0x01F;        // 0001 1111

    // ⏰ TIME: 時間に関する定数 / Time-related constants
    const SECONDS_IN_DAY: u64 = 86400000; // milliseconds
    const MAX_DELEGATION_DURATION: u64 = 31536000000; // 1 year
    const MIN_DELEGATION_DURATION: u64 = 3600000;     // 1 hour

    // 💰 LIMITS: 金額制限 / Financial constraints
    const MIN_DEPOSIT_AMOUNT: u64 = 1000000000;         // 1 SUI (MIST)
    const MAX_DAILY_LIMIT: u64 = 100000000000000;       // 100,000 SUI (MIST)
    const MAX_TX_LIMIT: u64 = 10000000000000;           // 10,000 SUI (MIST)

    // 🎭 ConvictionNFT: メタデータ付きNFT / NFT with metadata
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

    // 💼 ManagedWallet: ユーザー資産を管理するウォレット / Wallet managing user funds
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

    // 🤖 AgentDelegation: エージェントへの権限委任 / Delegation to AI Agent
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

    // 📊 Strategy: 投資戦略オブジェクト / Investment strategy
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

    // 🏛️ StrategyRegistry: 戦略管理レジストリ / Registry for strategies
    struct StrategyRegistry has key {
        id: UID,
        strategies: Table<u64, Strategy>,
        next_strategy_id: u64,
        admin: address,
        total_strategies: u64,
        total_active_strategies: u64,
        is_paused: bool,
    }

    // 👑 AdminCap: 管理者キャップ / Administrator capability
    struct AdminCap has key, store {
        id: UID,
        level: u8,
        permissions: u64,
        issued_at: u64,
        expires_at: Option<u64>,
    }

    // 🌍 GlobalConfig: グローバル設定 / Global configuration
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
}
```
