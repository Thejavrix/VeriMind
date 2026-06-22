/**
 * Types and interfaces for 0G Storage Integration
 */

export type StorageStatus = "pending" | "uploading" | "verified" | "failed";

export interface MemoryMetadata {
  id: string;              // Local unique identifier
  filename: string;        // Original file name
  fileType: string;        // MIME type
  sizeBytes: number;       // File size in bytes
  rootHash: string;        // 0G Merkle Root Hash (absolute verifiable identifier)
  txHash: string;          // 0G EVM transaction hash
  uploadTime: string;      // ISO string timestamp
  storageStatus: StorageStatus;
  evidenceMode?: boolean;  // Whether it's strictly verified as evidence
}

export interface UploadResponse {
  success: boolean;
  rootHash: string;
  txHash: string;
  timestamp: string;
  error?: string;
}
