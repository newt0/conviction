# 🧠 ConvictionFi

## Project Overview

ConvictionFi offers a new paradigm for realizing the vision of DeFi × AI (DeFAI).
With a single NFT mint, users can delegate conviction-based investing to an autonomous AI agent.

- Product Type: DeFAI NFT Protocol
- Tagline: _“Mint Your Conviction. DeFAI Agent as NFT.”_
- Target Audience: Beginner to intermediate DeFi users, ideologically-driven investors, Web3 natives

---

## PROBLEM: DeFAI Is Just a Buzzword

Terms like “DeFAI” and “Vibe Trading” are everywhere—but they lack substance.  
Most so-called DeFAI products suffer from vague use cases, fragmented user experiences, and an overall lack of clarity about what it actually means to "use DeFAI."

---

## SOLUTION: DeFAI Agent as NFT

We built a complete, intuitive experience: the DeFAI Agent as an NFT.

- Users simply mint an NFT
- That NFT becomes a standalone AI agent managing the user’s capital
- No dashboards. No approvals. No ongoing management

---

## USER FLOW: Just Mint NFT

ConvictionFi follows a 5-step lifecycle.  
Only Step 1 requires your input — from Step 2 onward, your agent takes over.

1. **Mint Your Conviction**  
   Choose a belief. Mint the NFT. That’s it.

2. **NFT = AI Agent**  
   The NFT becomes an autonomous, on-chain trader.

3. **Autonomous Execution**  
   The agent trades, stakes, or lends — no input needed.  
   All activity is publicly reported.

4. **Learn & Evolve**  
   The agent adapts based on market signals or strategy upgrades.

5. **Exit or Transfer**  
   Withdraw via protocol rules — or sell the NFT on secondary markets.

---

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

---

## SECURUTY MODEL: Why We Never Touch Your Wallet

Most DeFi apps require direct wallet transactions, creating unnecessary risk and inconvenience.  
ConvictionFi uses a different approach: your minted NFT becomes both entry point and autonomous firewall.

- The minting price becomes your trading budget — no additional deposits or approvals needed
- Each NFT generates its own isolated smart wallet, completely separate from your personal funds
- Only the NFT agent signs transactions and takes action

Your risk is compartmentalized, your conviction tokenized, and your NFT thinks and acts independently — keeping your wallet safe.

---

## TECHINICAL ARCHITECTURE: Walrus x NFT x AI

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

---

## Tech Stack

### ▼ Web3 Layer

- **Layer1**: Sui Network  
  → High-speed, low-cost blockchain. Built on the Move programming language.
- **Smart Contract**: Move Language  
  → Implements core logic for ConvictionNFTs, Agent Wallets, etc.
- **AI Agent Framework**: Sui Agent Kit  
  → On-chain initialization and deployment of AI trading agents.
- **Storage**: Walrus  
  → Stores strategy prompts and metadata (supports both editable and immutable types).
- **Bridge**: Wormhole  
  → Enables cross-chain fund transfers (e.g., ETH/USDC → Sui).
- **Authentication**: Privy  
  → Enables social login and zkLogin for seamless Web2-style onboarding.
- **NFT Marketplace**: Compatible with Sui-based marketplaces (e.g., BlueMove)  
  → Enables secondary trading of ConvictionNFTs.
- **Token Standards**: Sui::NFT, Wallet::Object  
  → Each NFT functions as a wallet and signer with embedded logic.

### ▼ Web2 / Application Layer

- Deployment Platform: Vercel
- Database (temporary): Firebase
- AI Cloud: Alibaba Cloud
- Payment API: Stripe (for fiat-based NFT minting, planned)

### ▼ Developer Tools & Infrastructure

- AI Coding Assistants: ChatGPT, Claude, Cursor, v0.dev
- CI/CD Integration: Claude Code GitHub Actions

## Links

X(Twitter): https://x.com/ConvictionFi
Slide Deck: https://gamma.app/docs/ConvictionFi-yicndaml629ajp0
Demo: https://convictionfi.vercel.app/
Founder: https://www.linkedin.com/in/kyohei-nft/

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lf9nhc0nvdxig4uotd6z.jpg)
