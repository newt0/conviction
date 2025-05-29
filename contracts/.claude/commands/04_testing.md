# /project:04_testing

## 🧪 指示

このコマンドでは、ConvictionFi スマートコントラクトの**包括的なユニットテストと統合テスト**を実装します。

## 🎯 要件

- `#[test]` および `#[test_only]` 属性を用いた Move のテスト構文を使用
- `test_scenario::begin` から `test_scenario::end` までの一連のフローをカバー
- デプロイ → ミント → 入金 → 委任 → エージェント実行までの一連の流れを検証
- ガス上限、リプレイ保護、アクセス制御に関するエッジケースも網羅
- 日本語＋英語でコメントを記述すること

## 📦 対象関数群

### 1. テストセットアップ関数

- `create_test_environment`

### 2. メインワークフローテスト

- `test_complete_workflow`

### 3. 追加テストスイート（最低限以下のスケルトンを含む）

- `test_security_edge_cases`
- `test_gas_optimization`
- `test_concurrent_access`
- `test_unauthorized_access`（`#[expected_failure]`）

## 🛠 Claude への出力期待

- `conviction_fi.move` モジュール内の最下部にテストコードを含めて出力すること
- オブジェクトの mint/share/transfer フローのトランザクションを明示
- `assert!` による検証や `tx_context::epoch_timestamp_ms` を適切に使用

---

Claude Code はこのコマンドを `/project:04_testing` として処理し、ConvictionFi の Move スマートコントラクトにおける**完全なテストスイート**を出力してください。
