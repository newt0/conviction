# ✅ ConvictionFi – Onboarding Flow (Final v1)

### 🌱 Purpose:

> **思想をミントするだけで、自律型エージェントが代わりにクリプト投資をしてくれる。**
> ConvictionFi は「DeFi を考えなくてよい Web3」を届けるプロダクトです。

---

## ① Welcome – “Mint Your Conviction”

**構成：**

- Hero 画像 or アニメーション（思想 →NFT→AI）
- Tagline 表示：
  **Mint Your Conviction. DeFAI Agent as NFT.**
- 簡潔な説明：

  > Your belief, encoded as an autonomous AI agent NFT.
  > Let it invest on your behalf — transparently, safely, and freely.

**CTA：** `Next`

---

## ② How It Works – “What Happens After You Mint?”

**構成：**

- 左側：Mint → Agent Wallet → AI Action の図解
- 右側：3 ステップ

```text
① Choose your belief.
   Pick an NFT that represents a strategy or theme.

② Mint it.
   It becomes a DeFAI Agent with its own wallet.

③ Let go.
   It monitors markets, executes trades, and reports back — without you.
```

**CTA：** `Sounds good – how do I start?`

---

## ③ Why It’s Safe – “NFT as Your Guardian”

**構成：**

- アイコン：🛡️ / 🔐 / 👁️
- トーンは落ち着いたグレー背景

```text
The NFT isn’t just a token.
It’s your Guardian — standing between you and DeFi & Crypto Investing.
A Safety Layer, encoded with conviction.

- Your funds are isolated in an agent wallet
- The strategy is stored on Walrus — 100% transparent
- No hidden logic. No rug risk.
```

**CTA：** `Got it – let's mint one`

---

## ④ How to Pay – “No \$SUI? No Problem.”

**構成：**

- 複数決済対応の選択 UI：
  \[ Connect Wallet (Sui) ] \[ Pay with USDC ] \[ Pay with Credit Card ]

```text
You don’t need $SUI to get started.

Choose your conviction.
Pay with USDC, USDT, ETH — even with your credit card.
Your conviction doesn’t care what chain you came from.
```

**CTA：** `Connect & Continue`

---

## ⑤ Mint – “This is Your Conviction.”

**構成：**

- 選択肢：NFT 一覧（投資戦略ごとにカード表示）
- 各カードには：

  - タイトル（例：**Trump Memecoin Sniper**）
  - 説明（短く）
  - 成績指標（リアルタイムで更新されるなら ◎）
  - 価格（例：10 USDC）

**CTA：**

- NFT 選択 → `Mint Now`

---

## ✅ Mint 後の完了画面（Step ⑥）

> 🎉 **Your conviction is now live.**
> Your AI agent has started investing.
> You can check its performance anytime on your dashboard.
> Or do nothing at all — it will notify you on Twitter.

- `View Dashboard`
- `Follow Twitter Notification Bot`
- `Mint Another One`

---

## 🧠 実装要素まとめ（対応 SDK）

| 機能               | 実装候補                                        |
| ------------------ | ----------------------------------------------- |
| ソーシャルログイン | **Privy**（Twitter/Email 対応）                 |
| NFT メタデータ保存 | **Walrus**（透明性担保）                        |
| クロスチェーン決済 | **Wormhole + Circle CCTP or LayerZero**         |
| フィアット決済     | **Transak / Ramp / Stripe with Custody Bridge** |
