# /project:07_utilities_init

## 🧰 指示

このコマンドでは、ConvictionFi における**補助的な Getter 関数群**および**初期化ロジック**を実装します。

## 🎯 要件

以下の内容を `conviction_fi.move` モジュールに追加してください：

### 1. Getter 関数（情報取得）

- `get_nft_details`
- `get_wallet_balance`
- `get_delegation_info`
- `get_strategy_details`
- `get_system_stats`

### 2. 初期化関数（Init）

- `init`（`GlobalConfig`, `StrategyRegistry`, `AdminCap` を作成して共有）

## 🛠 Claude への出力期待

- Getter 関数では引数から必要な情報を抽出して tuple で返却
- `init` 関数では `object::new`, `tx_context::sender`, `transfer::share_object` を使用
- コメントはすべて **日本語＋英語併記** とし、使用目的が明確であること
- ガス効率と型安全性を意識した Move 構文を用いること

---

Claude Code はこのコマンドを `/project:07_utilities_init` として実行し、ConvictionFi の補助関数と初期化ロジックを構築してください。
