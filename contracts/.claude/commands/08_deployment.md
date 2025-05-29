# /project:08_deployment

## 🚀 Instructions

This command prepares the ConvictionFi Move smart contract for **production-grade deployment**, including final validations and deployment configuration.

## 🎯 Requirements

Combine the following **two components** into a single cohesive output:

### 1. Pre-Deployment Checklist

- Are all `import` statements and dependencies correct?
- Are there any duplicate constants or error codes?
- Do all `public` functions include proper security checks?
- Is `event::emit(...)` used appropriately throughout the code?
- Are all core user flows covered in unit and integration tests?
- Are inline comments and documentation provided in both English and Japanese where needed?

### 2. `Move.toml` & CLI Deployment Instructions

- Define dependency paths for the Sui Framework
- Set up the `[addresses]` section appropriately
- Provide the correct sequence of CLI commands:

  - `sui move build`
  - `sui move test`
  - `sui client publish`

- Include proper gas budget settings
- Explain how to switch between `--testnet` and `--mainnet` deployments

## 🛠 Output Expectations for Claude

- Assume this output will be directly integrated into the ConvictionFi Move project
- Carefully verify all Move syntax, framework versions, and network configurations
- All comments must be written clearly in **English**

---

Claude Code should process this command as `/project:08_deployment` and generate a **comprehensive pre-launch validation checklist and deployment setup** to ensure ConvictionFi is ready for secure, production-grade release.
