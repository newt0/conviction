# /project:02_security

## 🔐 指示

このコマンドでは、ConvictionFi の Move スマートコントラクトにおける**セキュリティ検証関数**および**中核的な Public 関数（Mint・Deposit・Withdraw）**を実装します。

## 🎯 要件

- `conviction_fi.move` モジュールに追記する形式で出力
- `GlobalConfig`, `ManagedWallet`, `ConvictionNFT`, `AgentDelegation` などに対して検証ロジックを明示的に追加
- ガス効率・リプレイ攻撃防止・時間制御・ビットマスクによる権限制御を厳格に適用
- 各関数には**日英併記コメント**を付与すること

## 💡 対象関数

### 1. セキュリティチェック関数

- `assert_system_active`
- `assert_wallet_active`
- `assert_nft_owner`
- `assert_valid_amount`
- `assert_delegation_valid`
- `assert_permission`
- `assert_daily_limit`

### 2. コアロジック関数（最低限必須）

- `mint_conviction_nft`
- `deposit_to_wallet`
- `withdraw_from_wallet`
- `emergency_withdraw`

## 🛠 Claude への出力期待

- モジュール内の `impl conviction_fi::core` の一部として関数を実装
- 各関数に十分なコメントと、エラーコードとの整合性を持たせる
- セキュリティと UX のバランスを意識する

---

Claude Code はこのコマンドを `/project:02_security` として受け取り、上記の全関数を `conviction_fi.move` に安全に追加してください。
