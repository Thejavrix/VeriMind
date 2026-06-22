/**
 * Types and interfaces for VeriMind AI Chat
 */

export interface ChatEvidence {
  id: string;
  filename: string;
  rootHash: string;
  snippet: string; // The exact quote or section from the memory
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  
  // Assistant response specific fields
  confidence?: number;         // 0 to 100
  evidence?: ChatEvidence[];   // Must use uploaded memories only
  memorySource?: string;       // The high-level source description
  rootHash?: string;           // Verifiable 0G Merkle Root of the generated response (if applicable)
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: string;
}
