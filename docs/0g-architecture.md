# 0G Architecture Integration

VeriMind is fundamentally powered by the 0G decentralized AI infrastructure, ensuring that every memory stored, and every AI retrieval performed, is trustless, verifiable, and permanent.

## SDKs Used
- **0G Storage TypeScript SDK (`@0gfoundation/0g-storage-ts-sdk`)**
  - **Why**: It is the official library to split, encode, and upload large arbitrary data into the 0G Storage network, calculating the Merkle tree root for absolute verifiable permanence. It handles interactions with the 0G Storage Indexer and EVM RPC directly.
  - **Where**: `services/zeroG/storage.ts` — Used exclusively in server-actions and Next.js API routes when a user uploads files, voice notes, or text memories.
- **`ethers.js` (Peer Dependency)**
  - **Why**: Required by the 0G Storage SDK to sign transactions on the 0G Chain (EVM compatible) to pay for storage and interact with Agentic ID registries.
  - **Where**: `services/zeroG/chain.ts` and `services/zeroG/storage.ts`.
- **0G Compute / Inference APIs**
  - **Why**: For running AI inference (embeddings and retrieval) in a verifiable environment, returning verifiable confidence scores alongside the LLM answers.
  - **Where**: `services/zeroG/compute.ts` — Invoked during the Chat loop.

## Core Flows

### 1. Data Flow
1. **Ingestion**: User drops a file (PDF, Markdown, Image) into the `UploadDropzone`.
2. **Processing**: The frontend parses the document and extracts raw text/metadata.
3. **Delegation**: The data is sent to a Next.js Server Action where the 0G integration layer takes over to ensure it is not just stored in a centralized DB.

### 2. Storage Flow (0G Storage)
1. **Merkle Tree Calculation**: Using `ZgFile` from the TS SDK, the server computes the Merkle Root of the memory object.
2. **Indexer Selection**: The SDK queries the 0G Storage Indexer (e.g., Turbo testnet) to find the best nodes.
3. **Upload**: Data is chunked and uploaded to the storage nodes. The returned `rootHash` is strictly persisted as the universal identifier of that specific memory.

### 3. Compute Flow (0G Compute)
1. **Query**: User asks a question in the Chat UI.
2. **Inference**: A request is routed to a 0G Compute node (serving an open-source model).
3. **Evidence Extraction**: The Compute node queries the 0G Storage using the specific `rootHash` pointers, reading the raw data directly from the storage layer.
4. **Response**: The compute layer returns the answer + reasoning + a confidence score derived from the computation proof.

### 4. Chain Flow (0G Chain)
1. **Payment & Finality**: When `upload()` is called via the TS SDK, a transaction is signed via `ethers.js` on the 0G EVM Chain to lock funds for storage.
2. **Verification**: Any user viewing an answer in VeriMind can cross-reference the storage `rootHash` on the 0G Chain explorer to cryptographically prove the memory was untampered since upload.

### 5. Agentic ID Flow
1. **Initialization**: When the user first creates their account, they mint an Agentic ID on the 0G Chain.
2. **Ownership**: This Agentic ID acts as the "owner" of all memories uploaded.
3. **Persistent Identity**: When querying 0G Compute, the request is signed by the Agentic ID, allowing the AI to "remember" context tied strictly to this cryptographic identity rather than a vulnerable cookie session.
