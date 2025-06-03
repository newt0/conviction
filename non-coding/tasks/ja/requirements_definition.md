## ConvictionFi 要件定義書（エンジニア向け技術仕様）

### 1. プロジェクト概要

ConvictionFi は、ユーザーの確信（Conviction）を NFT としてトークン化し、自律的に暗号資産の投資を実行する DeFAI（分散型金融 AI）エージェントとなるプラットフォームです。ユーザーは NFT を Mint することで、トレードの意思決定を AI に委任し、透明性と安全性を持った完全自律的な投資が実現します。

---

### 2. 技術スタック

- **ブロックチェーン**：Sui
- **スマートコントラクト言語**：Move
- **分散ストレージ**：Walrus（戦略ロジックおよび Agent 設定 JSON を格納）
- **ソーシャルログイン**：Privy（Twitter, Email, Google 対応）
- **クロスチェーン**：Wormhole + Circle CCTP
- **フィアット決済**：Stripe
- **通知基盤**：Twitter Bot + Sui Agent Kit（または Webhook）

---

### 3. コンポーネント別技術要件

#### 3.1 NFT 発行・構造

- NFT は Sui 上で Mint され、各トークンに以下のメタ情報を持つ：

  - strategy_name（例："Trump memecoin sniper"）
  - metadata_url（Walrus JSON の URL）
  - agent_wallet_address

- Mint 処理時に、紐づくウォレット（スマートコントラクトウォレット）を自動生成

#### 3.2 AI エージェント構成

- オフチェーンの Node.js or Python ベースの Bot が Agent として常駐
- Walrus から設定 JSON を取得し、投資判断を行う
- 実行トリガー例：Oracle 価格変動 / Twitter API 監視 / Cron Job
- Sui SDK を通じて TransactionBlock を発行し、Agent Wallet から Tx 実行

#### 3.3 ウォレット構造

- NFT ごとに独立したスマートコントラクトウォレットを持つ
- ユーザーのメインウォレットとは完全に分離
- withdraw 関数には Lock 期間設定 or 無効化スイッチあり

#### 3.4 Walrus メタデータ構造

```json
{
  "theme": "Conservative DeFi Basket",
  "system_prompt": "Act as a low-risk DeFi allocator",
  "monitored_targets": [
    { "type": "oracle", "asset": "ETH", "condition": ">= 3000" },
    {
      "type": "twitter",
      "handle": "@federalreserve",
      "keywords": ["rate", "inflation"]
    }
  ],
  "actions": [{ "type": "swap", "from": "USDC", "to": "ETH", "amount": "50%" }]
}
```

#### 3.5 通知・ダッシュボード

- Agent は毎日 1 回、収支を取得し、@username 形式で Twitter Bot から通知
- ダッシュボードは Next.js + TailwindCSS で構築予定
- 表示項目：

  - NFT 名 / 残高 / 累積損益 / 最終 Tx 内容 / メタデータ概要

#### 3.6 決済インターフェース

- Sui Native（wallet adapter 経由）
- Wormhole 経由の USDC/USDT ブリッジ → Sui に着金 → Mint トリガー
- Stripe は署名付きメッセージ送信でオフチェーントランザクション連携

#### 3.7 セキュリティ要件

- コントラクトのアドミンロール制御、ロールバック不能設計
- Agent が読み書きする領域を制限（署名ベース権限管理）
- デプロイ前に Formal Verification or Audit を検討

---

### 4. 今後の技術拡張候補

- zkLogin による匿名性付与と DeFi 参加
- 戦略テンプレートのバージョニング / Fork & Remix 機能

---

※本書は ConvictionFi の MVP を対象とするエンジニア向け仕様書であり、開発フェーズに応じて随時更新される。
