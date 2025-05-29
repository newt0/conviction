# /project:05_events

## 📊 指示

このコマンドでは、ConvictionFi のスマートコントラクトにおける**イベント構造体の定義**を実装します。

## 🎯 要件

- `conviction_fi.move` モジュールに含まれるイベント構造体をすべて定義すること
- `has copy, drop` 属性を正しく付与すること
- それぞれのイベントが**どの関数で発火するかを明記した日英併記コメント**を付与すること

## 📦 対象イベント

- `NFTMinted`
- `DepositMade`
- `WithdrawalMade`
- `EmergencyWithdrawal`
- `AgentDelegated`
- `AgentActionExecuted`
- `DelegationRevoked`
- `StrategyAdded`
- `SystemPauseToggled`

## 🛠 Claude への出力期待

- モジュールのイベント定義セクションに追記
- `event::emit(...)` に対応した構造とフィールド名を維持
- 型の整合性（ID, address, u64, bool 等）を厳密にチェック

---

Claude Code はこのコマンドを `/project:05_events` として処理し、すべてのイベント構造体を `conviction_fi.move` に追加してください。
