以下は、ConvictionFi の基本的なデータ構造を表現した **ER 図（Entity-Relationship Diagram）** を `Mermaid` 記法で記述したものです。これは Web2（Firebase）＋ Web3 構成を念頭に置いています：

```mermaid
erDiagram
  USER ||--o{ NFT : owns
  USER {
    string id
    string privy_id
    string twitter_handle
    string email
  }

  NFT ||--|| AGENT_WALLET : uses
  NFT ||--|| WALRUS_METADATA : references
  NFT {
    string id
    string strategy_name
    string metadata_url
    string agent_wallet_address
    date minted_at
    string status
  }

  AGENT_WALLET {
    string address
    float balance
    float total_profit_loss
    date last_updated
  }

  WALRUS_METADATA {
    string id
    string theme
    string system_prompt
    json monitored_targets
    json actions
    date created_at
  }

  TX_LOG }o--|| NFT : belongs_to
  TX_LOG {
    string id
    string tx_hash
    string nft_id
    string action_type
    float amount
    string token
    date executed_at
  }

  NOTIFICATION_LOG }o--|| NFT : notifies
  NOTIFICATION_LOG {
    string id
    string nft_id
    string message
    string channel
    date sent_at
  }
```

---

## 概要：

- `USER`: Privy ログインに基づくユーザー情報（Firebase で管理）
- `NFT`: ユーザーが Mint した思想ベースの DeFAI トークン
- `AGENT_WALLET`: NFT に紐づくスマートコントラクトウォレット（オンチェーン）
- `WALRUS_METADATA`: Walrus に格納された AI 設定 JSON
- `TX_LOG`: エージェントによる取引履歴（オフチェーンでも保持）
- `NOTIFICATION_LOG`: 通知記録（Twitter Bot または Web Push）
