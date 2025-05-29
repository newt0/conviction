# 🚀 ConvictionFi Move スマートコントラクト生成プロンプト

## 基本指示

あなたは Sui Move 言語の専門家です。以下の要件に基づいて、ConvictionFi のスマートコントラクトを生成してください。

### 🎯 生成対象

- **メインモジュール**: `conviction_fi.move`
- **完全に動作する**Sui Move コード
- **テスト用の関数**も含む
- **適切なコメント**

### 📋 技術仕様

#### 必須要件

1. **Sui Move 2024 標準**に準拠
2. **型安全性**を最大限活用
3. **ガス効率**を考慮した実装
4. **セキュリティベストプラクティス**の遵守
5. **エラーハンドリング**の徹底

#### アーキテクチャ要件

以下の 4 つの主要コンポーネントを実装：

```rust
// 1. ConvictionNFT - 投資戦略NFT
struct ConvictionNFT has key, store {
    id: UID,
    strategy_id: u64,
    risk_level: u8,         // 1-10
    wallet_id: ID,          // 対応するManagedWalletのID
    created_at: u64,
    last_rebalance: u64,
    metadata: vector<u8>,
}

// 2. ManagedWallet - 資産管理ウォレット
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

// 3. StrategyRegistry - 戦略管理
struct StrategyRegistry has key {
    id: UID,
    strategies: Table<u64, Strategy>,
    next_strategy_id: u64,
    admin: address,
}

// 4. AgentDelegation - AI Agent権限管理
struct AgentDelegation has key {
    id: UID,
    wallet_id: ID,
    agent_address: address,
    permissions: u64,          // ビットマスク
    expires_at: u64,
    max_transaction_amount: u64,
    daily_limit: u64,
    used_today: u64,
    last_reset: u64,
}
```

### 🔧 実装必須機能

#### 1. NFT 管理機能

```rust
// NFTミント（初期入金込み）
public fun mint_conviction_nft(
    registry: &StrategyRegistry,
    strategy_id: u64,
    risk_level: u8,
    initial_deposit: Coin<SUI>,
    ctx: &mut TxContext
): ConvictionNFT

// NFT詳細取得
public fun get_nft_details(nft: &ConvictionNFT): (u64, u8, ID, u64)
```

#### 2. ウォレット管理機能

```rust
// 追加入金
public fun deposit_to_wallet(
    wallet: &mut ManagedWallet,
    nft: &ConvictionNFT,
    payment: Coin<SUI>,
    ctx: &TxContext
)

// 出金
public fun withdraw_from_wallet(
    wallet: &mut ManagedWallet,
    nft: &ConvictionNFT,
    amount: u64,
    ctx: &mut TxContext
): Coin<SUI>

// 緊急出金（全額）
public fun emergency_withdraw(
    wallet: &mut ManagedWallet,
    nft: &ConvictionNFT,
    ctx: &mut TxContext
): Coin<SUI>

// 残高確認
public fun get_wallet_balance(wallet: &ManagedWallet): u64
```

#### 3. AI Agent 委任システム

```rust
// Agent委任設定
public fun delegate_to_agent(
    wallet: &mut ManagedWallet,
    nft: &ConvictionNFT,
    agent: address,
    permissions: u64,
    duration: u64,
    max_amount: u64,
    daily_limit: u64,
    ctx: &TxContext
): AgentDelegation

// Agent実行関数
public fun execute_agent_action(
    wallet: &mut ManagedWallet,
    delegation: &mut AgentDelegation,
    action_type: u8,
    amount: u64,
    ctx: &TxContext
)

// 委任キャンセル
public fun revoke_delegation(
    wallet: &mut ManagedWallet,
    nft: &ConvictionNFT,
    delegation: AgentDelegation,
    ctx: &TxContext
)
```

#### 4. 戦略管理システム

```rust
// 戦略追加（管理者のみ）
public fun add_strategy(
    registry: &mut StrategyRegistry,
    name: String,
    description: String,
    risk_category: u8,
    min_deposit: u64,
    admin_cap: &AdminCap,
    ctx: &TxContext
): u64

// 戦略取得
public fun get_strategy(
    registry: &StrategyRegistry,
    strategy_id: u64
): &Strategy

// アクティブ戦略一覧
public fun get_active_strategies(
    registry: &StrategyRegistry
): vector<u64>
```

### 🛡️ セキュリティ要件

#### 権限チェック関数（必須実装）

```rust
// NFT所有者確認
fun assert_nft_owner(nft: &ConvictionNFT, ctx: &TxContext)

// Agent権限確認
fun assert_agent_authorized(
    delegation: &AgentDelegation,
    action: u8,
    amount: u64,
    ctx: &TxContext
): bool

// 制限チェック
fun assert_within_limits(
    delegation: &mut AgentDelegation,
    amount: u64,
    ctx: &TxContext
)
```

#### エラーコード定義

```rust
const EInvalidStrategy: u64 = 1;
const EInvalidRiskLevel: u64 = 2;
const EInsufficientBalance: u64 = 3;
const EUnauthorized: u64 = 4;
const EDelegationExpired: u64 = 5;
const EExceedsLimit: u64 = 6;
const EInvalidPermission: u64 = 7;
// ... 他必要なエラーコード
```

### 📊 必要なイベント定義

```rust
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

// ... 他必要なイベント
```

### 🧪 テスト関数要件

以下のテストケースを含むテスト関数を実装：

1. **正常系テスト**

   - NFT ミントと初期入金
   - 追加入金・出金
   - Agent 委任と実行
   - 戦略管理

2. **異常系テスト**
   - 不正な権限でのアクセス
   - 制限超過の取引
   - 期限切れ委任での実行
   - 不正なパラメータ

### 📝 コード品質要件

#### 1. コメント規約

```rust
/// 英語での関数説明
/// # Arguments
/// * `param1` - パラメータ説明
/// # Returns
/// 戻り値の説明
/// # Panics
/// パニック条件
///
public fun example_function() {
    // 処理の詳細コメント
}
```

#### 2. 命名規約

- **構造体**: PascalCase (`ConvictionNFT`)
- **関数**: snake_case (`mint_conviction_nft`)
- **定数**: SCREAMING_SNAKE_CASE (`E_INVALID_STRATEGY`)
- **変数**: snake_case (`strategy_id`)

#### 3. モジュール構成

```rust
module conviction_fi::conviction_fi {
    // imports
    use sui::...;

    // エラーコード定義
    const E_...: u64 = ...;

    // 権限フラグ定義
    const PERMISSION_...: u64 = ...;

    // 構造体定義
    struct ... { ... }

    // 初期化関数
    fun init(ctx: &mut TxContext) { ... }

    // パブリック関数
    public fun ... { ... }

    // 内部関数
    fun ... { ... }

    // テスト関数
    #[test_only]
    public fun test_... { ... }
}
```

### ⚡ パフォーマンス最適化要件

1. **ガス効率化**

   - 不要なオブジェクト作成を避ける
   - バッチ処理の活用
   - 効率的なデータ構造の使用

2. **並列処理対応**

   - 共有オブジェクトの適切な使用
   - ロック競合の最小化

3. **ストレージ最適化**
   - 必要最小限のデータ保存
   - 効率的なシリアライゼーション

### 🔍 重要な実装ポイント

1. **Transfer Policy 連携**

   - NFT 転送時の自動ウォレット制御権更新
   - ロイヤリティ設定

2. **時刻管理**

   - `sui::clock::Clock`の適切な使用
   - タイムスタンプベースの制限管理

3. **数値計算**

   - オーバーフロー対策
   - 精度の管理

4. **Dynamic Field 活用**
   - 拡張可能なメタデータ管理
   - 効率的なデータアクセス

### 📚 参考実装パターン

必要に応じて以下の Sui Move 標準パターンを活用：

- Display Standard（NFT メタデータ表示）
- Transfer Policy（転送制御）
- Publisher（パブリッシャー認証）
- Coin/Balance 管理
- Table/Bag（動的コレクション）

---

## 📞 生成依頼

上記の全要件を満たす、**完全に動作する Sui Move スマートコントラクト**を生成してください。

### 特に重要な点：

1. **エラーハンドリング**を徹底してください
2. **セキュリティチェック**を全ての関数に実装してください
3. **ガス効率**を考慮した実装にしてください
4. **テスト関数**も含めてください
5. **実際にコンパイル・デプロイ可能**なコードにしてください

### 出力形式：

- 単一の`.move`ファイル
- 完全なモジュール定義
- 適切なコメント付き
- テスト関数込み

よろしくお願いします！
