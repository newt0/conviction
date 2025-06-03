## ConvictionFi Requirements Document

### 1. Project Overview

ConvictionFi is a product that tokenizes a user's conviction into an NFT, which acts as an autonomous AI agent to execute DeFi investments. The platform connects belief with financial behavior—users simply mint an NFT representing a strategy, and the agent handles trading and periodically reports results.

---

### 2. User Requirements

- Intuitive UX for Web3 beginners
- Ability to mint NFTs without holding \$SUI (alternative payment options)
- Ability to choose NFTs that reflect personal beliefs or strategies
- Fully automated post-mint investment behavior
- Clear and accessible reporting of investment performance
- Assurance that user funds are securely isolated
- Options for exiting positions: either through resale or floor-price-based liquidation

---

### 3. Functional Requirements

#### 3.1 NFT-Related

- [ ] Display of NFT strategy (belief/theme) list
- [ ] On-chain NFT minting functionality
- [ ] Auto-generation of Agent Wallet per NFT
- [ ] Strategy logic stored as JSON metadata on Walrus

#### 3.2 Agent Execution

- [ ] DeFi strategy execution by AI agents
- [ ] Off-chain AI makes investment decisions; on-chain transactions reflect them
- [ ] Logging and tracking of trade history and P\&L per NFT owner

#### 3.3 Notifications and Visualization

- [ ] Regular updates via Twitter @reply from notification bot
- [ ] Dashboard UI to monitor NFT status and performance
- [ ] Display of balance, revenue, and transaction logs per NFT

#### 3.4 Payments and Funding

- [ ] Mint payment via Sui Wallet
- [ ] Cross-chain payments via Wormhole or similar
- [ ] Credit card payments via Stripe or similar providers

#### 3.5 Withdrawal and Liquidity

- [ ] Support for NFT secondary market trading
- [ ] Withdrawal function from NFT wallet (with lock period)
- [ ] Optional no-withdrawal model with floor price liquidation logic

---

### 4. Non-Functional Requirements

- UI design: minimalistic, using black, white, and gray color scheme
- Tech stack: Sui / Walrus / Privy / Wormhole / Stripe
- Optimized for minimal L1 transaction costs
- Security: wallet isolation, smart contract audit assumed

---

### 5. Future Enhancements

- Learning agents that adjust based on historical performance
- Social sharing and public portfolio options
- Marketplace for NFT strategy templates
- Mobile-responsive UI support

---

_This requirements document outlines the MVP-level scope and will be iteratively refined post-PoC._
