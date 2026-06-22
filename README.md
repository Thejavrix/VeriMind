# VeriMind 🧠 - AI That Remembers. AI You Can Trust.

![VeriMind Demo Workflow](demo.gif)
> **Note to Judges:** The above GIF demonstrates the complete 0G Verification Workflow (Upload → Store on 0G → Root Hash Generated → AI Query → Evidence Cited with Root Hash).

VeriMind is a premium SaaS platform that gives your AI permanent, verifiable memory powered by the **0G Storage Network**. Every memory stored and every answer generated is cryptographically secured, providing absolute trust and transparency.

## 🏆 The Vision (0G Hackathon)

Current AI models suffer from amnesia or rely on centralized, tamper-prone databases for context. VeriMind solves this by integrating **0G's decentralized storage** to create an immutable "Memory Vault" for AI agents. 

When you upload a document or provide context, VeriMind stores it on the 0G Network, generating a verifiable Merkle Root Hash. When the AI answers a question, it cites the exact 0G Root Hash of the evidence it used, ensuring **Zero Hallucination with Mathematical Proof**.

## ❓ Why 0G?

*   **Why not S3?** AWS S3 is centralized. Data can be modified silently by admins or compromised. 0G is immutable and cryptographically verifiable.
*   **Why not Firebase?** Firebase lacks on-chain proof. 0G ensures every byte of memory is verifiable on the blockchain.
*   **Why decentralized memory?** If AI is going to make critical decisions (legal, financial, medical), its memory MUST be tamper-proof. Decentralization prevents historical manipulation.
*   **Why verifiable AI?** Without verifiability, AI hallucinates. By citing exactly which 0G Root Hash the AI used to generate an answer, we guarantee 100% truthful, evidence-backed responses.

## ✨ Features

- **Permanent Memory Vault**: Upload files to the 0G Network. Never lose context again.
- **Evidence Mode**: AI responses include Confidence Scores and cryptographic 0G Root Hashes.
- **Agentic Identity**: (Coming soon) AI agents with verifiable on-chain identities.
- **Premium UI/UX**: Dark-theme, glassmorphic design inspired by Apple and Linear. Built with Next.js 16, Tailwind CSS, and Framer Motion.

## 🏗️ Architecture & 0G Integration

VeriMind leverages the official `@0gfoundation/0g-storage-ts-sdk` for a robust decentralized architecture:

1. **Upload Phase**: Files are processed using `ZgFile` and uploaded via `Indexer`.
2. **Merkle Verification**: A Merkle Tree is generated locally to ensure data integrity before upload.
3. **On-Chain Settlement**: Storage fees are managed via the 0G Flow Contract.
4. **Retrieval**: The AI agent queries verified context directly, citing the `rootHash` in its chat interface.

*(For detailed architectural flows, see [docs/0g-architecture.md](./docs/0g-architecture.md))*

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A 0G Testnet Wallet with funds (for the `ZG_PRIVATE_KEY`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Thejavrix/VeriMind.git
   cd VeriMind
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   # 0G Network Configuration
   ZG_RPC_URL="https://evmrpc-testnet.0g.ai"
   ZG_INDEXER_URL="https://indexer-storage-testnet-standard.0g.ai"
   ZG_FLOW_CONTRACT="0x0460aA47b41a66694c0a73f667a1b795A5ED3556"
   
   # Your Wallet Private Key (Without 0x prefix)
   ZG_PRIVATE_KEY="your_private_key_here"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS, shadcn/ui
- **Animations**: Framer Motion
- **Decentralized Storage**: 0G Storage SDK (`@0gfoundation/0g-storage-ts-sdk`)
- **Blockchain**: ethers.js v6

## 📜 License

MIT License. See `LICENSE` for details.
