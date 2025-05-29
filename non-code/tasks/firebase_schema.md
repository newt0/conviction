This is the **Firestore schema design** for **ConvictionFi**, structured based on its technical specifications and ER diagram. It clearly defines the document structure and data flows, optimized for high-performance rendering and notification handling in a Web2 application (Next.js + Firebase).

---

## 🔧 Firestore Schema Design (Collections & Documents)

### 🟦 `users` (collection)

| Field            | Type      | Description                         |
| ---------------- | --------- | ----------------------------------- |
| `id`             | string    | Privy ID (UID)                      |
| `twitter_handle` | string    | Linked social account               |
| `email`          | string    | Registered email address (optional) |
| `created_at`     | timestamp | Timestamp of registration           |
| `last_login_at`  | timestamp | Last login time                     |

---

### 🟩 `nfts` (collection or subcollection)

| Field                  | Type      | Description                                 |
| ---------------------- | --------- | ------------------------------------------- |
| `id`                   | string    | NFT token ID                                |
| `owner_id`             | string    | Relation to `users.id`                      |
| `strategy_name`        | string    | Display name for the strategy               |
| `metadata_url`         | string    | Link to JSON stored on Walrus               |
| `agent_wallet_address` | string    | Smart contract wallet address on Sui        |
| `minted_at`            | timestamp | Mint timestamp                              |
| `status`               | string    | e.g., `active`, `paused`, `withdrawn`, etc. |

---

### 🟨 `wallets` (collection or subcollection)

| Field            | Type      | Description                   |
| ---------------- | --------- | ----------------------------- |
| `wallet_address` | string    | Sui wallet address            |
| `nft_id`         | string    | Associated NFT ID             |
| `balance`        | number    | Current balance (e.g., USDC)  |
| `pnl_total`      | number    | Total profit/loss (in USD)    |
| `last_updated`   | timestamp | Last balance update timestamp |

---

### 🟥 `tx_logs` (subcollection under `nfts/{nftId}/tx_logs`)

| Field         | Type      | Description                       |
| ------------- | --------- | --------------------------------- |
| `tx_hash`     | string    | Transaction hash on Sui           |
| `action_type` | string    | e.g., `swap`, `stake`, `withdraw` |
| `amount`      | number    | Executed amount                   |
| `token`       | string    | Token involved (e.g., USDC)       |
| `executed_at` | timestamp | Timestamp of execution            |

---

### 🟧 `notification_logs` (subcollection under `nfts/{nftId}/notifications`)

| Field     | Type      | Description                     |
| --------- | --------- | ------------------------------- |
| `channel` | string    | e.g., `twitter`, `email`, `web` |
| `message` | string    | Notification message content    |
| `sent_at` | timestamp | Timestamp of when it was sent   |

---

## 🧠 Additional Auxiliary Structures (as needed)

| Structure                 | Description                                        |
| ------------------------- | -------------------------------------------------- |
| `strategies` (collection) | Master data for available strategy templates       |
| `agent_logs`              | Logs of bot agent successes/errors (for analytics) |
| `event_logs`              | User interaction logs (button clicks, page views)  |

---

## ✅ Schema Design Policies

- **Read Optimization**: Time-series data organized as subcollections (e.g., `nfts/{nftId}/tx_logs`)
- **Separation of Concerns**: Separate asset management (`wallets`) from AI logic (`metadata`)
- **Write Access Control**: Only agents can write via Cloud Functions
- **User Identity**: Unified under Privy ID, decoupled from Sui wallet

---

Next, I can also help you design the **Cloud Functions (API layer)** or **Role-Based RLS policies (if migrating to Supabase)**. Let me know which one you'd like to proceed with.
Here is the English translation of your Firestore schema design document for **ConvictionFi**, crafted for clarity and optimized for developer communication:

---

This is the **Firestore schema design** for **ConvictionFi**, structured based on its technical specifications and ER diagram. It clearly defines the document structure and data flows, optimized for high-performance rendering and notification handling in a Web2 application (Next.js + Firebase).

---

## 🔧 Firestore Schema Design (Collections & Documents)

### 🟦 `users` (collection)

| Field            | Type      | Description                         |
| ---------------- | --------- | ----------------------------------- |
| `id`             | string    | Privy ID (UID)                      |
| `twitter_handle` | string    | Linked social account               |
| `email`          | string    | Registered email address (optional) |
| `created_at`     | timestamp | Timestamp of registration           |
| `last_login_at`  | timestamp | Last login time                     |

---

### 🟩 `nfts` (collection or subcollection)

| Field                  | Type      | Description                                 |
| ---------------------- | --------- | ------------------------------------------- |
| `id`                   | string    | NFT token ID                                |
| `owner_id`             | string    | Relation to `users.id`                      |
| `strategy_name`        | string    | Display name for the strategy               |
| `metadata_url`         | string    | Link to JSON stored on Walrus               |
| `agent_wallet_address` | string    | Smart contract wallet address on Sui        |
| `minted_at`            | timestamp | Mint timestamp                              |
| `status`               | string    | e.g., `active`, `paused`, `withdrawn`, etc. |

---

### 🟨 `wallets` (collection or subcollection)

| Field            | Type      | Description                   |
| ---------------- | --------- | ----------------------------- |
| `wallet_address` | string    | Sui wallet address            |
| `nft_id`         | string    | Associated NFT ID             |
| `balance`        | number    | Current balance (e.g., USDC)  |
| `pnl_total`      | number    | Total profit/loss (in USD)    |
| `last_updated`   | timestamp | Last balance update timestamp |

---

### 🟥 `tx_logs` (subcollection under `nfts/{nftId}/tx_logs`)

| Field         | Type      | Description                       |
| ------------- | --------- | --------------------------------- |
| `tx_hash`     | string    | Transaction hash on Sui           |
| `action_type` | string    | e.g., `swap`, `stake`, `withdraw` |
| `amount`      | number    | Executed amount                   |
| `token`       | string    | Token involved (e.g., USDC)       |
| `executed_at` | timestamp | Timestamp of execution            |

---

### 🟧 `notification_logs` (subcollection under `nfts/{nftId}/notifications`)

| Field     | Type      | Description                     |
| --------- | --------- | ------------------------------- |
| `channel` | string    | e.g., `twitter`, `email`, `web` |
| `message` | string    | Notification message content    |
| `sent_at` | timestamp | Timestamp of when it was sent   |

---

## 🧠 Additional Auxiliary Structures (as needed)

| Structure                 | Description                                        |
| ------------------------- | -------------------------------------------------- |
| `strategies` (collection) | Master data for available strategy templates       |
| `agent_logs`              | Logs of bot agent successes/errors (for analytics) |
| `event_logs`              | User interaction logs (button clicks, page views)  |

---

## ✅ Schema Design Policies

- **Read Optimization**: Time-series data organized as subcollections (e.g., `nfts/{nftId}/tx_logs`)
- **Separation of Concerns**: Separate asset management (`wallets`) from AI logic (`metadata`)
- **Write Access Control**: Only agents can write via Cloud Functions
- **User Identity**: Unified under Privy ID, decoupled from Sui wallet

---

Next, I can also help you design the **Cloud Functions (API layer)** or **Role-Based RLS policies (if migrating to Supabase)**. Let me know which one you'd like to proceed with.
