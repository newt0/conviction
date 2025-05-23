# ConvictionFi における「NFT × AI Agent × 自律投資」構想の実装戦略

## 🧭 コンセプト全体像

> ConvictionFi では、ユーザーが NFT をミントすることで、その NFT が特定テーマの「確信」を表現した投資戦略を実行する AI Agent となり、ユーザーの介入なしに自律的な投資活動を行います。

## 🏗 構成の全体図

```
[User] ---> [Mint NFT]
              │
              ▼
[Conviction NFT (on Sui)]
 - agent_wallet（スマートコントラクトウォレット）
 - walrus_metadata_url（AIメタデータのリンク）

              │
              ▼
[Walrus JSON Metadata]
 - 投資テーマ
 - system_prompt
 - 監視対象（SNS/API）
 - トリガー条件
 - 実行アクション

              │
              ▼
[AI Agent（Sui Agent Kit）]
 - 外部データを解析
 - トリガー条件を判定
 - 自律的にTxを発行（via agent_wallet）
```

## ✅ 技術選定と理由

| 機能                 | 技術                                    | 採用理由                                 |
| -------------------- | --------------------------------------- | ---------------------------------------- |
| NFT 発行・資産管理   | Sui ブロックチェーン（Move）            | 高速・低コスト・オブジェクト指向         |
| 投資戦略の記述・管理 | Walrus 分散ストレージ                   | 柔軟・編集容易・低コストな外部ストレージ |
| 自律エージェント実行 | Sui Agent Kit                           | Sui 特化の AI エージェント実行ツール     |
| Tx の分離実行        | スマートコントラクトウォレット          | ユーザー資産との分離、安全性の確保       |
| 複雑な Tx の処理     | PTBs（Programmable Transaction Blocks） | 複数ステップを一括で Tx 化できる         |

## 🧩 Walrus メタデータ設計（例）

```json
{
  "theme": "DeFi / $TRUMP投資戦略",
  "system_prompt": "あなたは保守的なAIファンドマネージャーです。",
  "monitored_targets": [
    { "type": "twitter", "handle": "@realDonaldTrump" },
    { "type": "oracle", "endpoint": "https://api.coingecko.com/..." }
  ],
  "trigger": {
    "logic": "AND",
    "conditions": [
      { "source": "twitter", "match": "3 tweets/24h" },
      { "source": "oracle", "price_condition": "trumpcoin > 0.25" }
    ]
  },
  "actions": [
    {
      "type": "swap",
      "from": "USDC",
      "to": "TRUMP",
      "dex": "DeepBook",
      "amount": "50%"
    }
  ]
}
```

## 🧠 AI Agent の役割（オフチェーン）

- Walrus メタデータを取得し解釈（LangChain 等と連携可）
- Twitter や価格オラクルなど外部データを監視
- トリガー条件成立時に Tx を自律生成
- Sui Agent Kit を通じて `agent_wallet` から Tx を発行

## 🔒 セキュリティと独立性

- ユーザー資産とは完全分離：ユーザーのウォレットは触れず、NFT 専用の `agent_wallet` が操作
- アクセス制御：Tx 実行は AI Agent に限定（IP や署名で制御）
- 誤作動対策：AI Agent 側に rate limit と fallback 戦略

## 🏁 MVP ステージの構成案

- ✅ ユーザーが思想付き NFT をミント（Sui）
- ✅ NFT には agent_wallet と Walrus メタデータを紐づけ
- ✅ Sui Agent Kit で簡易 AI Agent（cron 形式）を実装
- ✅ 単純なトリガーとスワップ Tx から開始

## 🔜 将来拡張案

- 投資戦略のマーケットプレイス（思想 NFT の二次流通）
- トリガーロジックのカスタマイズ UI
- Agent の行動ログを Walrus/ZK で記録・可視化
- 成績に応じた NFT の進化（例：SBT としてレベルアップ）

## 🎯 結論

> ConvictionFi は「思想 ×AI× 自律金融」の最前線を Sui 上で実現するプロジェクトです。
> MVP 段階では Sui Agent Kit + Walrus 構成で、シンプルかつ強力な自律 NFT の基盤を構築できます。
> 将来的には Metaplex 的「Asset Signer」モデルを Sui 流に昇華し、エージェント NFT の標準規格として拡張可能です。
