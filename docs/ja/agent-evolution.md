# 🧠 ConvictionFi | AI エージェント進化仕様書

ConvictionFi における DeFAI Agent（自律型 AI 投資エージェント）は、ミント時点で固定された戦略ロジックを持ちますが、  
ユーザーの信念を保持したまま、将来的に**進化（Evolution）**させることが可能です。

本ドキュメントでは、その進化モデル・条件・記録方法・将来的な拡張構想について説明します。

---

## 🧬 エージェント進化の目的

- **戦略の高度化**：市場の変化や信号精度の向上に対応
- **ユーザー体験の深化**：学習・成長するエージェントとして愛着を高める
- **資産効率の向上**：パフォーマンス最適化やコスト削減
- **信念の持続性**：信念は保持しつつ、行動だけをアップデート

---

## 🔁 進化トリガー（実行条件）

| トリガータイプ     | 説明                                         |
| ------------------ | -------------------------------------------- |
| ユーザーによる要求 | Dashboard から進化をリクエスト（条件付き）   |
| ガバナンス提案通過 | 複数ユーザーによる投票でアップグレード承認   |
| 戦略的期限切れ     | 戦略の有効期限経過による強制アップデート     |
| パフォーマンス低下 | 一定期間の損益が閾値を下回った場合の進化判定 |

---

## 🔒 制約とルール

- **信念（conviction）自体は変更不可**
- **進化ごとにバージョン番号が更新される**
- **過去のバージョンは Walrus 上で永続記録**
- **エージェントウォレットは原則継続利用**（ただし、完全再設計型は除く）
- **進化前後でリスクプロファイルを比較可能に**

---

## 📈 進化方法の種類

### 1. 🔁 バージョンアップ方式

- 戦略ロジックのパラメータのみ調整
- 例：閾値 0.8 → 0.7 に変更、信号頻度を週次 → 日次に変更

### 2. 🔥 バーン＆リミント方式

- NFT を焼却し、同じ信念を保持した新 NFT を発行
- ウォレットや履歴を新バージョンに引き継ぎ

### 3. 🗳 ガバナンスアップグレード方式

- コミュニティ提案 → 投票 → 承認でエージェント進化
- トークン（例：$CVCT）による投票加重あり

### 4. 💎 ステーキング進化方式（将来的に）

- $CVCT 等をロックすることで AI 能力を解放
- 長期保有者ほど進化幅が広がる設計

---

## 🧾 メタデータへの記録

エージェントの進化は、すべて Walrus 上のメタデータに記録されます：

```json
{
  "version": "v1.2.0",
  "previous_versions": ["v1.0.0", "v1.1.0"],
  "evolution_reason": "Underperformed for 14 days. Threshold adjusted.",
  "updated_at": "2025-06-05T09:00:00Z"
}
```

---

## 🧠 バージョン別分析（将来的な機能）

- 各 NFT に「進化履歴ページ」を提供
- バージョンごとの戦略・損益・トリガー理由を可視化
- 「あなたの信念は、過去何度進化してきたか？」を可視化

---

## 🔮 今後の展望

- 進化可能 NFT のマーケットプレイス出品
- 進化条件に応じた報酬（例：進化成功で SBT を発行）
- エージェント間の「血統」可視化（進化の系譜ツリー）

---

ConvictionFi のエージェント進化は、単なる技術的アップデートではありません。
それは「変わらない信念」と「進化する知性」を両立させる、次世代の投資体験です。
