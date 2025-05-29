# 🚀 ConvictionFi Smart Contract Function Requirements v2.0

_(Optimized for Sui Move Language & Object Model)_

## 🏗️ アーキテクチャ概要

ConvictionFi は以下の 4 つの主要コンポーネントで構成されます：

1. **Conviction NFT** – 投資戦略とメタデータを保持する譲渡可能な NFT
2. **Managed Wallet** – 各 NFT に紐づく資産管理用共有オブジェクト
3. **Strategy Registry** – 利用可能な投資戦略を管理する全体共有オブジェクト
4. **Delegation System** – AI Agent への権限委任を管理するシステム

## 📋 詳細機能要件

### 1. 🎯 Conviction NFT Management

#### 1.1 NFT 構造

```move
struct ConvictionNFT has key, store {
    id: UID,
    strategy_id: u64,
    risk_level: u8,         // 1-10 (1=保守的, 10=積極的)
    wallet_id: ID,          // 対応するManagedWalletのID
    created_at: u64,        // タイムスタンプ
    last_rebalance: u64,    // 最終リバランス時刻
    metadata: vector<u8>,   // 拡張可能なメタデータ
}
```

#### 1.2 NFT ミント機能

- **関数**: `mint_conviction_nft(strategy_id: u64, risk_level: u8, initial_deposit: Coin<SUI>, ctx: &mut TxContext)`
- **処理フロー**:
  1. 戦略 ID の有効性チェック（Strategy Registry から）
  2. リスクレベルの範囲チェック（1-10）
  3. ConvictionNFT の作成
  4. 対応する ManagedWallet の作成と初期入金
  5. NFT を呼び出し者に転送

#### 1.3 NFT 転送機能

- **自動転送**: Sui 標準の`transfer::public_transfer`を使用
- **転送時処理**: Transfer Policy を利用してウォレット制御権の自動更新
- **制約**: 転送時に未決済の委任がある場合は自動キャンセル

### 2. 💰 Managed Wallet System

#### 2.1 ウォレット構造

```move
struct ManagedWallet has key {
    id: UID,
    nft_id: ID,                    // 対応するNFTのID
    controller: address,           // 現在の制御者（NFT所有者）
    balance: Balance<SUI>,         // SUI残高
    delegated_agent: Option<address>, // 委任されたAI Agent
    delegation_expires: u64,       // 委任期限
    total_deposited: u64,          // 累計入金額（実績追跡用）
    total_withdrawn: u64,          // 累計出金額（実績追跡用）
}
```

#### 2.2 資金管理機能

##### 追加入金

- **関数**: `deposit_to_wallet(wallet: &mut ManagedWallet, nft: &ConvictionNFT, payment: Coin<SUI>, ctx: &TxContext)`
- **制約**: NFT 所有者のみ実行可能
- **処理**: SUI のみ受け入れ、Balance<SUI>に統合

##### 出金

- **関数**: `withdraw_from_wallet(wallet: &mut ManagedWallet, nft: &ConvictionNFT, amount: u64, ctx: &mut TxContext): Coin<SUI>`
- **制約**: NFT 所有者のみ実行可能
- **処理**: 指定金額を Coin<SUI>として返却

##### 緊急出金

- **関数**: `emergency_withdraw(wallet: &mut ManagedWallet, nft: &ConvictionNFT, ctx: &mut TxContext): Coin<SUI>`
- **制約**: NFT 所有者のみ、全額出金、全委任を即座にキャンセル

### 3. 🤖 AI Agent Integration & Delegation

#### 3.1 委任システム

```move
struct AgentDelegation has key {
    id: UID,
    wallet_id: ID,
    agent_address: address,
    permissions: u64,          // ビットマスクで権限管理
    expires_at: u64,          // 委任期限
    max_transaction_amount: u64, // 単回取引の上限額
    daily_limit: u64,         // 日次取引限度額
    used_today: u64,          // 本日の使用額
    last_reset: u64,          // 日次リセット時刻
}
```

#### 3.2 権限管理

```move
// 権限フラグ
const PERMISSION_TRADE: u64 = 1;        // 0001: 取引実行
const PERMISSION_STAKE: u64 = 2;        // 0010: ステーキング
const PERMISSION_LEND: u64 = 4;         // 0100: レンディング
const PERMISSION_REBALANCE: u64 = 8;    // 1000: リバランス
```

#### 3.3 Agent 実行機能

##### 委任設定

- **関数**: `delegate_to_agent(wallet: &mut ManagedWallet, nft: &ConvictionNFT, agent: address, permissions: u64, duration: u64, limits: AgentLimits, ctx: &TxContext)`
- **制約**: NFT 所有者のみ実行可能
- **処理**: 既存委任を上書き、期限と権限を設定

##### Agent 実行関数

- **関数**: `execute_agent_action(wallet: &mut ManagedWallet, delegation: &mut AgentDelegation, action_type: u8, params: vector<u8>, ctx: &TxContext)`
- **制約**:
  - 呼び出し者が委任された Agent
  - 権限チェック（ビットマスク）
  - 金額制限チェック
  - 期限チェック

### 4. 📊 Strategy Registry

#### 4.1 戦略管理

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
    risk_category: u8,        // 1-5 (1=低リスク, 5=高リスク)
    supported_protocols: vector<String>, // 対応DeFiプロトコル一覧
    min_deposit: u64,         // 最小入金額
    is_active: bool,
}
```

#### 4.2 戦略管理機能

- **戦略追加**: `add_strategy(registry: &mut StrategyRegistry, strategy: Strategy, ctx: &TxContext)`
- **戦略更新**: `update_strategy(registry: &mut StrategyRegistry, strategy_id: u64, updates: StrategyUpdate, ctx: &TxContext)`
- **戦略無効化**: `deactivate_strategy(registry: &mut StrategyRegistry, strategy_id: u64, ctx: &TxContext)`

### 5. 🔍 View & Query Functions

#### 5.1 NFT 関連クエリ

- `get_nft_details(nft: &ConvictionNFT): (u64, u8, ID, u64)` - 戦略 ID、リスク、ウォレット ID、作成日時
- `get_nft_owner(nft_id: ID): address` - NFT 所有者アドレス
- `get_nft_performance(nft: &ConvictionNFT, wallet: &ManagedWallet): (u64, u64, u64)` - 入金、出金、現在残高

#### 5.2 ウォレット関連クエリ

- `get_wallet_balance(wallet: &ManagedWallet): u64` - SUI 残高
- `get_wallet_controller(wallet: &ManagedWallet): address` - 制御者アドレス
- `get_delegation_info(wallet: &ManagedWallet): (Option<address>, u64, u64)` - Agent、期限、権限

#### 5.3 戦略関連クエリ

- `get_strategy(registry: &StrategyRegistry, strategy_id: u64): &Strategy` - 戦略詳細
- `get_active_strategies(registry: &StrategyRegistry): vector<u64>` - アクティブ戦略一覧

### 6. 🛡️ Security & Access Control

#### 6.1 権限チェック機能

```move
fun assert_nft_owner(nft: &ConvictionNFT, ctx: &TxContext) {
    // NFT所有者確認（Transfer Policyと連携）
}

fun assert_agent_authorized(delegation: &AgentDelegation, action: u8, amount: u64, ctx: &TxContext): bool {
    // Agent権限と制限の確認
}

fun assert_within_limits(delegation: &mut AgentDelegation, amount: u64, ctx: &TxContext) {
    // 日次・取引限度額チェック
}
```

#### 6.2 緊急停止機能

- **全体停止**: `emergency_pause(admin_cap: &AdminCap, ctx: &TxContext)`
- **個別停止**: `pause_wallet(wallet: &mut ManagedWallet, nft: &ConvictionNFT, ctx: &TxContext)`

### 7. 🔧 Admin & Governance

#### 7.1 管理者機能

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
    protocol_fee_rate: u64,  // 基準点 (10000 = 100%)
}
```

#### 7.2 手数料管理

- **プロトコル手数料**: 取引実行時にわずかな手数料を徴収
- **手数料設定**: `set_protocol_fee(config: &mut GlobalConfig, new_rate: u64, admin: &AdminCap)`
- **手数料引き出し**: `withdraw_protocol_fees(treasury: &mut Treasury, admin: &AdminCap): Coin<SUI>`

### 8. 📈 Events & Monitoring

#### 8.1 イベント定義

```move
struct NFTMinted has copy, drop {
    nft_id: ID,
    owner: address,
    strategy_id: u64,
    initial_deposit: u64,
}

struct AgentDelegated has copy, drop {
    wallet_id: ID,
    agent: address,
    permissions: u64,
    expires_at: u64,
}

struct AgentActionExecuted has copy, drop {
    wallet_id: ID,
    agent: address,
    action_type: u8,
    amount: u64,
    success: bool,
}
```

## 🔒 セキュリティ設計原則

### 1. **最小権限の原則**

- Agent 権限は明示的に委任された範囲のみ
- 期限付き委任で自動失効

### 2. **資金安全性**

- 全資金は ManagedWallet 内の Balance<SUI>で管理
- 緊急出金機能で即座に資金回収可能

### 3. **透明性**

- 全操作はイベントとして記録
- クエリ機能で状態の完全な可視性

### 4. **Fail-Safe 設計**

- 緊急停止機能
- 委任期限の自動失効
- 日次取引限度額

## 🚀 実装フェーズ

### Phase 1: Core Infrastructure

- ConvictionNFT & ManagedWallet
- 基本的な入出金機能
- Strategy Registry

### Phase 2: Delegation System

- Agent 委任機能
- 権限管理システム
- 制限・監視機能

### Phase 3: DeFi Integration

- 主要 DeFi プロトコルとの統合
- 戦略実行エンジン
- パフォーマンス追跡

### Phase 4: Advanced Features

- 手数料システム
- ガバナンス機能
- 分析・レポート機能
  \
