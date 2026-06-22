import { create } from 'zustand';

export interface Memory {
  id: string;
  name: string;
  sizeBytes: number;
  rootHash: string;
  txHash?: string;
  uploadTime: string;
  status: 'Verified on 0G Storage' | 'Pending';
}

export interface Activity {
  id: string;
  type: 'Memory Stored' | 'Wallet Connected' | 'AI Inference';
  title: string;
  timestamp: string;
  statusText: string;
  isSuccess: boolean;
}

interface AppState {
  // Wallet State
  walletAddress: string | null;
  chainId: number | null;
  isConnecting: boolean;
  
  // Data State
  memories: Memory[];
  activities: Activity[];

  // Actions
  setWallet: (address: string | null, chainId: number | null) => void;
  setIsConnecting: (isConnecting: boolean) => void;
  addMemory: (memory: Memory) => void;
  addActivity: (activity: Activity) => void;
}

export const useAppStore = create<AppState>((set) => ({
  walletAddress: null,
  chainId: null,
  isConnecting: false,
  memories: [],
  activities: [],

  setWallet: (address, chainId) => set({ walletAddress: address, chainId }),
  setIsConnecting: (isConnecting) => set({ isConnecting }),
  addMemory: (memory) => set((state) => ({ memories: [memory, ...state.memories] })),
  addActivity: (activity) => set((state) => ({ activities: [activity, ...state.activities] })),
}));
