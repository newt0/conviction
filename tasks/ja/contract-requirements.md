## ✅ ConvictionFi スマートコントラクト機能一覧（3 者構造＋プレミント方針に基づく）

---

### 🧱 基本構成

ConvictionFi は以下の 3 者を前提に構築される：

1. **Conviction NFT**：信念・戦略パラメータの記録媒体。譲渡可能。
2. **Agent Wallet**：NFT に紐づいた専用の資金管理オブジェクト。実際の資金を保持。
3. **AI Agent**：ウォレットを操作し、DeFi 戦略を実行する署名主体（オフチェーンで動作）。

---

## 🛠 スマートコントラクトの機能一覧

---

### 1. ✅ Conviction NFT のミント機能

- ユーザーは、戦略 ID、リスクレベル、初期 SUI デポジット額を指定して Conviction NFT をミントする。
- ミント処理に含まれる動作：

  - Conviction NFT の生成（所有者＝ミンター）
  - 対応する Agent Wallet の生成（資金も同時にデポジット）
  - Wallet と NFT の紐付け（NFT がウォレットの controller を担保する）

> ※ USDC や他のトークンはオフチェーンで SUI に変換されたうえで、このミント Tx が呼ばれる。

---

### 2. ✅ Agent Wallet の資金管理機能

- Conviction NFT に紐づくスマートウォレットであり、資金はこのウォレットに保管される。
- 機能概要：

  - `deposit()`：ミント時に自動呼び出し。追加デポジットは原則不可。
  - `withdraw()`：NFT の現在の所有者（＝ wallet.controller）のみが可能。
  - `get_balance()`：NFT の成績表示用などで、ウォレットの SUI 残高を取得。

---

### 3. ✅ 戦略実行のための AI Agent 連携機能

- スマートコントラクト側には、**Agent Wallet を操作するための公開関数**が用意される。
- AI Agent は以下の条件を満たす必要がある：

  - `controller` アドレス（＝ NFT 所有者）と一致する署名者
  - または、`controller` から権限を委任されたエージェントとして Tx を発行する

- 実行例：

  - `execute_trade()`：DeFi プロトコルとの連携 Tx を発行
  - `rebalance()`：ポートフォリオ再構成
  - `stake()` / `unstake()` などの操作

---

### 4. ✅ NFT のトランスファーとウォレット制御権更新機能

- Conviction NFT は譲渡可能。
- 譲渡が行われた場合：

  - ウォレットの `controller` フィールドを**新たな NFT 保有者のアドレスに更新**。
  - この更新により、エージェントの執行主体も変わる（Tx 発行者を制限できる）。

---

### 5. ✅ 読み出し用ユーティリティ関数

- フロントエンドや通知エージェントのための公開関数群：

  - `get_strategy_id(nft_id)`：NFT に紐づく戦略 ID を取得
  - `get_wallet_address(nft_id)`：NFT に対応する Agent Wallet のアドレス取得
  - `get_wallet_balance(wallet_id)`：資金状況を取得
  - `get_owner(nft_id)`：NFT の現在の所有者を取得

---

### 6. ✅ 運営／ガバナンス用機能（Optional）

- ミント可能な戦略 ID のホワイトリスト管理
- ロイヤリティ設定（NFT 二次流通対応）
- 1 ユーザー 1 ミント制限（option）

---

## 🔒 セキュリティと制約の前提

- Agent Wallet に対するすべての操作は、`controller`（NFT 保有者）からの署名によってのみ許可。
- スマートコントラクトは SUI 以外の資産を扱わない。USDC などは**UI や middleware で変換してから渡す**。
- 各 NFT とウォレットは 1 対 1 対応。複数 NFT から同じウォレットを共有することは不可。
