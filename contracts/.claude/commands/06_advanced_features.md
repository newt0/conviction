# /project:06_advanced_features

## 🏗️ 指示

このコマンドでは、ConvictionFi の Move スマートコントラクトにおける**上級機能**を実装します。

## 🎯 要件

以下の 3 つの領域にまたがる高度な機能をまとめて実装してください：

### 1. 戦略管理機能

- `add_strategy`
- `update_strategy`
- `deactivate_strategy`
- `get_active_strategies`

### 2. 委任解除・期限切れ処理

- `revoke_delegation`
- `cleanup_expired_delegation`

### 3. システム運用管理

- `toggle_system_pause`
- `toggle_wallet_pause`
- `update_global_config`

## 🛠 Claude への出力期待

- すべての関数は `conviction_fi.move` モジュールに追記する形で記述
- アクセス制御は `AdminCap` または `assert_nft_owner` によって保護されること
- `event::emit(...)` による状態ログを忘れずに追加
- `option::is_some()` と `option::extract()` を適切に使用
- コメントは **日本語と英語併記** で明瞭に記述

---

Claude Code はこのコマンドを `/project:06_advanced_features` として処理し、ConvictionFi の上級機能をモジュールに統合してください。
