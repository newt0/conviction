# CLAUDE.md

## 🧭 プロジェクト名

**ConvictionFi** - 信念にもとづく完全自律型の暗号資産運用エージェント

## 🎯 プロジェクトの目的

ConvictionFi は、ユーザーが思想・投資方針に基づく NFT を 1 回ミントするだけで、自律的に資産運用を行う DeFAI（Decentralized Finance + AI）システムです。ユーザーは煩雑な操作を行うことなく、オンチェーン戦略をエージェントに委任し、その成績をウォレット/NFT/Twitter 経由で把握できます。

## 📦 技術スタック（Web3 基盤）

- **ブロックチェーン**: Sui
- **スマートコントラクト言語**: Move（2024 Edition）
- **構成単位**:
  - ConvictionNFT（信念を象徴するトークン）
  - ManagedWallet（エージェント用スマートウォレット）
  - AgentDelegation（権限付き委任）
  - StrategyRegistry（運用戦略の管理）
  - GlobalConfig（全体設定）

## 🧱 機能フェーズ（Claude コマンドとの対応）

- `01_core_infra`: 型定義と定数の基礎構築
- `02_security`: セキュリティチェックとコア関数（Mint/Deposit/Withdraw）
- `03_ai_agent`: 委任と実行の自律化処理
- `04_testing`: 完全なテストスイート（`test_scenario`）
- `05_events`: すべてのイベント構造体（ログ）
- `06_advanced_features`: 戦略追加・委任解除・システム管理
- `07_utilities_init`: Getter 関数群と初期化処理
- `08_deployment`: 検証・Move.toml・ビルド・テスト・デプロイ手順

## 📜 開発前提条件

```toml
Sui Version     = "1.15.0+"
Move Language   = "2024 Edition"
Target Network  = "Sui Mainnet"
Gas Budget      = "Optimized for <1000 SUI"
Security Level  = "Audit-Ready"
```

## 🧠 Claude Code での利用方法

Claude Code でこのプロジェクトを操作する際は、以下のように段階的に各コマンドを読み込ませてください：

```bash
claude > /project:01_core_infra
claude > /project:02_security
claude > /project:03_ai_agent
...
claude > /project:08_deployment
```

各コマンドは `.claude/commands/` に Markdown で格納されており、それぞれが 1 モジュール単位の指示として機能します。

## ✍️ ドキュメント原則

- すべての関数・構造体に**日本語＋英語併記のコメント**を記載
- Claude が正しく文脈を理解できるよう、すべての出力に意図と用途を明示

## 🚨 セキュリティ方針

- 権限はすべてビットマスク方式で制御
- リプレイ攻撃防止のための `nonce` 実装
- 取引金額、日次上限、委任有効期間などのパラメータはすべてバリデーション付き
- すべての `public fun` に `assert_*` 系の事前検証を導入

## 📅 最終目標

- 本番デプロイ可能な `conviction_fi.move` の生成
- すべてのロジックに対するテストの実装
- Claude による全自動コントラクト生成ワークフローの確立
