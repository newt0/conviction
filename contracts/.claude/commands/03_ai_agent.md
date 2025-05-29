# /project:03_ai_agent

## 🤖 指示

このコマンドでは、ConvictionFi における**AI エージェントとの統合ロジック**を実装します。特に**Agent への委任機能**と**エージェントによる自律実行機能**が対象です。

## 🎯 要件

- `conviction_fi.move` モジュールに追記する形で実装すること
- `ManagedWallet` と `AgentDelegation` の連携を厳密に検証
- 実行前に `assert_permission` や `assert_daily_limit` を確実に適用
- アクションタイプ（Trade, Stake, Lend, Rebalance, Emergency）ごとの分岐処理を記述
- 各関数には **日英併記のコメント** を追加すること

## 💡 対象関数

### 1. 委任ロジック

- `delegate_to_agent`

### 2. エージェント実行ロジック

- `execute_agent_action`
- `execute_action_internal`

## 🔢 権限マトリクス

| Action Type | Permission Constant    |
| ----------- | ---------------------- |
| 1           | `PERMISSION_TRADE`     |
| 2           | `PERMISSION_STAKE`     |
| 3           | `PERMISSION_LEND`      |
| 4           | `PERMISSION_REBALANCE` |
| 5           | `PERMISSION_EMERGENCY` |

## 🛠 Claude への出力期待

- `wallet.balance` から `reserved_balance` への資金移動を安全に処理
- `delegation` の統計（`used_today`, `tx_count`）を更新
- `event::emit(...)` を用いたロギングを行う
- `execute_action_internal` は簡易的な戻り値でもよい（`vector<u8>`）

---

Claude Code はこのコマンドを `/project:03_ai_agent` として処理し、AI Agent の委任・実行機構を `conviction_fi.move` に統合してください。
