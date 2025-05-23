以下は、ConvictionFi の技術仕様・ER 図をもとに構成した **Firebase Firestore 用スキーマ設計**です。各ドキュメント構造とデータの流れを明確にし、Web2 アプリ（Next.js + Firebase）での高速表示や通知処理に最適化しています。

---

## 🔧 Firestore スキーマ設計（コレクション & ドキュメント）

### 🟦 users（コレクション）

| フィールド       | 型        | 説明                       |
| ---------------- | --------- | -------------------------- |
| `id`             | string    | Privy ID（UID）            |
| `twitter_handle` | string    | ソーシャル連携アカウント   |
| `email`          | string    | 登録メールアドレス（任意） |
| `created_at`     | timestamp | 登録日時                   |
| `last_login_at`  | timestamp | 最終ログイン時刻           |

---

### 🟩 nfts（コレクション）※サブコレクションでも OK

| フィールド             | 型        | 説明                                   |
| ---------------------- | --------- | -------------------------------------- |
| `id`                   | string    | NFT トークン ID                        |
| `owner_id`             | string    | users.id（リレーション）               |
| `strategy_name`        | string    | 表示用戦略名                           |
| `metadata_url`         | string    | Walrus 上の JSON リンク                |
| `agent_wallet_address` | string    | Sui 上の SC ウォレット                 |
| `minted_at`            | timestamp | ミント時刻                             |
| `status`               | string    | `active` / `paused` / `withdrawn` など |

---

### 🟨 wallets（コレクション or サブコレ）

| フィールド       | 型        | 説明                 |
| ---------------- | --------- | -------------------- |
| `wallet_address` | string    | Sui のアドレス       |
| `nft_id`         | string    | 対象 NFT の ID       |
| `balance`        | number    | USDC などの現在残高  |
| `pnl_total`      | number    | 累積損益（ドル換算） |
| `last_updated`   | timestamp | 最終取得時刻         |

---

### 🟥 tx_logs（サブコレクション：`nfts/{nftId}/tx_logs`）

| フィールド    | 型        | 説明                           |
| ------------- | --------- | ------------------------------ |
| `tx_hash`     | string    | Sui 上の Tx Hash               |
| `action_type` | string    | `swap`, `stake`, `withdraw` 等 |
| `amount`      | number    | 実行された量                   |
| `token`       | string    | 対象トークン（例：USDC）       |
| `executed_at` | timestamp | 実行日時                       |

---

### 🟧 notification_logs（サブコレ：`nfts/{nftId}/notifications`）

| フィールド | 型        | 説明                           |
| ---------- | --------- | ------------------------------ |
| `channel`  | string    | `twitter`, `email`, `web` など |
| `message`  | string    | 通知内容                       |
| `sent_at`  | timestamp | 送信時刻                       |

---

## 🧠 その他の補助構造（必要に応じて）

| 構造名                       | 説明                                                 |
| ---------------------------- | ---------------------------------------------------- |
| `strategies`（コレクション） | 利用可能な戦略テンプレートのマスターデータ           |
| `agent_logs`                 | Bot エージェントのエラー・成功ログ記録（分析用）     |
| `event_logs`                 | ユーザーの UI 操作ログ（ボタン押下、ページ遷移など） |

---

## ✅ スキーマ設計ポリシー

- 読み込み最適化：`nfts/{nftId}/tx_logs` のようにサブコレで時系列データを整理
- 分離設計：資産管理（wallet）と投資ロジック（metadata）は責務を分離
- 書き込み権限制御：Cloud Functions 経由で Agent のみが書ける構造に
- ユーザー＝ Privy の ID に統一（Sui ウォレットと分離）
