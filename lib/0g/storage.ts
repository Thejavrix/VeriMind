import { Indexer, ZgFile, getFlowContract } from '@0gfoundation/0g-storage-ts-sdk';
import { ethers } from 'ethers';

/**
 * Core 0G Storage Integration Service
 * Follows the official 0G Storage SDK guidelines for verifying and storing data.
 */
export class ZeroGStorageService {
  private rpcUrl: string;
  private indexerUrl: string;
  private flowContractAddress: string;
  private privateKey: string;

  constructor() {
    this.rpcUrl = process.env.ZG_RPC_URL || "https://evmrpc-testnet.0g.ai";
    this.indexerUrl = process.env.ZG_INDEXER_URL || "https://indexer-storage-testnet-standard.0g.ai";
    this.flowContractAddress = process.env.ZG_FLOW_CONTRACT || "0x0460aA47b41a66694c0a73f667a1b795A5ED3556";
    this.privateKey = process.env.ZG_PRIVATE_KEY || "";
  }

  /**
   * Upload a file to the 0G Storage Network securely via Indexer
   * @param filePath Absolute path to the local file to upload
   * @returns Object containing rootHash (permanent identifier) and transaction details
   */
  async uploadFile(filePath: string) {
    if (!this.privateKey) {
      throw new Error("Configuration Error: ZG_PRIVATE_KEY is missing from environment variables.");
    }

    try {
      // 1. Setup blockchain provider and signer for the 0G EVM chain
      const provider = new ethers.JsonRpcProvider(this.rpcUrl);
      const signer = new ethers.Wallet(this.privateKey, provider);
      
      // 2. Initialize 0G Storage Indexer client
      const indexer = new Indexer(this.indexerUrl);
      
      // 3. Prepare file for 0G format (chunks & padding)
      const file = await ZgFile.fromFilePath(filePath);
      
      // 4. Calculate Merkle Tree Root Hash for absolute verifiability
      const [tree, err] = await file.merkleTree();
      if (err || !tree) {
        throw new Error(`Failed to generate Merkle tree: ${err}`);
      }
      
      const rootHash = tree.rootHash();

      // 5. Execute on-chain payment and upload data chunks to storage nodes via Indexer
      // The SDK's upload method typically handles slicing and transaction tracking.
      const tx = await indexer.upload(file, 0, this.rpcUrl, this.flowContractAddress, signer);
      
      return {
        success: true,
        rootHash,
        txHash: tx || null,
        timestamp: new Date().toISOString()
      };

    } catch (error: any) {
      console.error("[0G Storage Integration] Upload Error:", error);
      throw new Error(`0G Network Upload failed: ${error.message}`);
    }
  }
}

export const zgStorage = new ZeroGStorageService();
