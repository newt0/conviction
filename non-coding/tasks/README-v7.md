# ConvictionFi - Mint your Conviction. DeFAI Agent as NFT

ConvictionFi offers an ideal DeFAI UX through NFTs.
With a single NFT mint, users can delegate conviction-based investing to an autonomous AI agent.

|              |                                                                                                                                                                                                                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Entry        | Sui Overflow 2025 Project                                                                                                                                                                                                                                                                                                                  |
| Track        | AI                                                                                                                                                                                                                                                                                                                                         |
| Product Type | DeFAI NFT Protocol                                                                                                                                                                                                                                                                                                                         |
| Tagline      | “Vibe Trading on Conviction. DeFAI Agent as NFT.”                                                                                                                                                                                                                                                                                          |
| Founder      | @kyohei_nft                                                                                                                                                                                                                                                                                                                                |
| Status       | Prototype Phase \| Raising Pre-Seed                                                                                                                                                                                                                                                                                                        |
| Using        | [Walrus](https://www.walrus.xyz/), [AlibabaCloud](https://www.alibabacloud.com), [Privy](https://www.privy.io/), [Wormhole](https://wormhole.com/), [Pyth](https://www.pyth.network/), [UNI](https://unicoinsui.com/), [HIPPO](https://www.hippocto.meme/), [Scallop](https://scallop.io/), [Navi Protocol](https://naviprotocol.io/) etc. |

## [PROBLEM] DeFAI Is Just a Buzzword

Terms like “DeFAI” and “Vibe Trading” are everywhere—but they lack substance.  
Most so-called DeFAI products suffer from vague use cases, fragmented user experiences, and an overall lack of clarity about what it actually means to "use DeFAI."

## [SOLUTION] Vibe Trading on Conviction. DeFAI Agent as NFT

We propose two core ideas that define its ideal UX:

- **Vibe Trading on Conviction**
- **DeFAI Agent as NFT**

Users mint an NFT that reflects their conviction — like `$SUI_MAXI`, `$BTC_HODLER`, or `$TRUMP_SUPPORTER`.
Each NFT becomes an autonomous AI agent with its own wallet and trading logic.
**Mint it, and let the AI take over.**

## [USER-FLOW] Just Mint NFT

ConvictionFi has five steps, but users only make one decision: minting.
From Step 2 onward, your AI agent takes over.

1. **Mint** — Pick your NFT and mint it.
2. **NFT = AI Agent** — Each NFT runs its own wallet and trades autonomously using the mint price as its budget.
3. **Trade & Report** — The agent trades, stakes, or lends. All actions are transparently posted via Twitter replies, turning each NFT into a viral marketing engine.
4. **Evolve** — Strategies evolve based on data and user feedback.
5. **Exit** — AI exits based on time or profit triggers, sending earnings to your wallet. Alternatively, just sell the NFT.

## [FEATURES]

### New Security Model: Safety Layer as NFT

Most DeFi apps require direct wallet transactions, creating unnecessary risk and inconvenience.  
ConvictionFi uses a different approach: your minted NFT becomes both entry point and autonomous firewall.

- The minting price becomes your trading budget — no additional deposits or approvals needed
- Each NFT generates its own isolated smart wallet, completely separate from your personal funds
- Only the NFT agent signs transactions and takes action

Your risk is compartmentalized, your conviction tokenized, and your NFT thinks and acts independently — keeping your wallet safe.

### Walrus Integration: AI Works on Walrus

ConvictionFi leverages Walrus decentralized storage to ensure immutable and transparent NFT metadata for conviction-based trading agents.  
Each Conviction NFT stores comprehensive data on Walrus including:

- Strategy parameters and logic
- Conviction statements and reasoning
- Risk limits and execution policies
- Agent version history and mint timestamps

The system utilizes Walrus's key features:

- Content-addressed storage with verifiable CIDs for data integrity
- Permanent append-only architecture preventing deletions or secret alterations
- Full transparency allowing anyone to inspect metadata via URI

This approach ensures complete audit trails as trading agents evolve through versioned updates.  
Each NFT contains a Walrus metadata URI that points to the latest version while preserving access to historical versions for verification.  
The JSON-formatted data includes strategy details, risk profiles, whitelisted contracts, and execution policies.  
Since Walrus is append-only, strategy upgrades create new versions rather than overwriting existing data, ensuring full traceability of agent evolution over time.

This storage solution guarantees transparency, auditability, and future-proofing without requiring large metadata storage directly on-chain, while ensuring all strategy changes remain traceable and potentially subject to governance approval.

## [REVENUE] Sustainable Revenue, Seamless UX

ConvictionFi offers a seamless UX and sustainable revenue.

We monetize through three streams: mint fees, trading royalties, and success bonuses.

First, fixed fees at mint ($5-7).
Since this isn't percentage-based, users are incentivized to mint larger amounts at once.

Second, royalties from NFT secondary trading (5%).
Since ConvictionFi encourages secondary trading as an exit method, NFT liquidity becomes active.
This leverages NFT characteristics for revenue generation.

Finally, performance-based success fees.
However, these only activate for exceptional returns.
When an NFT wallet balance reaches 10x the mint amount, we collect 7% of profits as a one-time success fee.

Achievers receive the prestigious **"The 10x Club" SBT, directly connecting to future $CONVICTION token allocation**.

For fiat and cross-chain mints, we charge only minimal fees to avoid disadvantaging non-crypto users.
Rather than "hidden charges," we pursue mint volume and total assets under management as KPIs.

## Sample Strategy

1. **SUI_MAXIMIZER**

   - Aggressive accumulation of SUI and ecosystem tokens during market dips
   - Ideological Thesis: "Sui represents the future of blockchain scalability. Every dip is an opportunity to accumulate before mass adoption."

2. **BTC_HODLER**

   - Long-term Bitcoin accumulation with DCA and volatility exploitation
   - Ideological Thesis: "Bitcoin is digital gold and the ultimate store of value. Time in market beats timing the market."

3. **STABLE_OPTIMIZER**
   - Conservative yield optimization across stable pools and lending protocols
   - "Consistent yield generation with capital preservation. Compound interest is the eighth wonder of the world."

## [TECHSTACK] Inside ConvictionFi

### Web3 Layer

| Component          | Tool / Protocol                     | Description                                                                        |
| ------------------ | ----------------------------------- | ---------------------------------------------------------------------------------- |
| Layer1             | Sui Network                         | High-speed, low-cost blockchain. Built on the Move programming language.           |
| Smart Contract     | Move Language                       | Implements core logic for ConvictionNFTs, Agent Wallets, etc.                      |
| AI Agent Framework | Sui Agent Kit                       | On-chain initialization and deployment of AI trading agents.                       |
| Storage            | Walrus                              | Stores strategy prompts and metadata (supports both editable and immutable types). |
| Bridge             | Wormhole                            | Enables cross-chain fund transfers (e.g., ETH/USDC → Sui).                         |
| Authentication     | Privy                               | Enables social login and zkLogin for seamless Web2-style onboarding.               |
| NFT Marketplace    | BlueMove (and other Sui-compatible) | Enables secondary trading of ConvictionNFTs.                                       |
| Token Standards    | Sui::NFT, Wallet::Object            | Each NFT functions as a wallet and signer with embedded logic.                     |

### Web2 / Application Layer

| Component       | Tool / Platform  | Description                                |
| --------------- | ---------------- | ------------------------------------------ |
| Deployment      | Vercel           | Hosting platform for frontend application. |
| Database (temp) | Firebase         | Temporary backend database.                |
| AI Cloud        | Alibaba Cloud    | Infrastructure for running AI logic.       |
| Payment API     | Stripe (planned) | Enables fiat-based NFT minting.            |

### Developer Tools & Infrastructure

| Component            | Tool                            | Description                                        |
| -------------------- | ------------------------------- | -------------------------------------------------- |
| AI Coding Assistants | ChatGPT, Claude, Cursor, v0.dev | Used for AI-driven development and prototyping.    |
| CI/CD Integration    | Claude Code GitHub Actions      | Automates testing and deployment of Move codebase. |

## Links

X(Twitter): https://x.com/ConvictionFi
Slide Deck: https://gamma.app/docs/ConvictionFi-yicndaml629ajp0
Demo: https://convictionfi.vercel.app/
Founder: https://www.linkedin.com/in/kyohei-nft/

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lf9nhc0nvdxig4uotd6z.jpg)
