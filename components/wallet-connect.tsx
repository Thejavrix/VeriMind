"use client";

import { useEffect } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import { Wallet, LogOut } from "lucide-react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function WalletConnect() {
  const { walletAddress, chainId, isConnecting, setWallet, setIsConnecting, addActivity } = useAppStore();

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    try {
      setIsConnecting(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const network = await provider.getNetwork();

      if (accounts.length > 0) {
        setWallet(accounts[0], Number(network.chainId));
        addActivity({
          id: Math.random().toString(36).substring(7),
          type: "Wallet Connected",
          title: "MetaMask Connected",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          statusText: "Connected to Network",
          isSuccess: true,
        });
      }
    } catch (error) {
      console.error("Wallet connection failed", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWallet(null, null);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setWallet(accounts[0], chainId);
        } else {
          setWallet(null, null);
        }
      });

      window.ethereum.on("chainChanged", (chainIdHex: string) => {
        setWallet(walletAddress, parseInt(chainIdHex, 16));
      });
    }

    return () => {
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged");
        window.ethereum.removeAllListeners("chainChanged");
      }
    };
  }, [walletAddress, chainId, setWallet]);

  if (walletAddress) {
    return (
      <Button
        variant="outline"
        onClick={disconnectWallet}
        className="h-9 gap-2 border-white/10 bg-white/5 hover:bg-white/10 text-white font-mono text-xs rounded-full"
      >
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
        <LogOut className="h-3 w-3 ml-1 opacity-70" />
      </Button>
    );
  }

  return (
    <Button
      onClick={connectWallet}
      disabled={isConnecting}
      className="h-9 gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:opacity-90 rounded-full text-sm font-medium"
    >
      <Wallet className="h-4 w-4" />
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}
