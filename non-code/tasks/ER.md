Here is the **Entity-Relationship Diagram (ERD)** for **ConvictionFi**, expressed in `Mermaid` syntax. This structure assumes a hybrid architecture using both Web2 (Firebase) and Web3 components:

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

## Overview:

- `USER`: User information managed via Firebase, authenticated through Privy login
- `NFT`: Ideology-driven DeFAI token minted by the user
- `AGENT_WALLET`: Smart contract wallet associated with each NFT (on-chain)
- `WALRUS_METADATA`: AI configuration JSON stored in Walrus decentralized storage
- `TX_LOG`: Trade execution log by the agent (also persisted off-chain)
- `NOTIFICATION_LOG`: Notification records (via Twitter bot or Web Push)

---

This ER diagram also serves as a foundation for backend DB schema design tailored to Firebase. If needed, it can be converted into a diagram format compatible with tools like dbdiagram.io. Would you like to proceed with that?
