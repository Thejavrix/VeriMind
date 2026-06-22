"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { UploadCloud, FileText, CheckCircle2, ShieldCheck, Database, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";

export default function VaultPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { memories, addMemory, addActivity, walletAddress } = useAppStore();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!walletAddress) {
      alert("Please connect your wallet first to upload memories to 0G Storage.");
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(10); // Initial progress

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Simulated progress for UI feel while server processes
      const interval = setInterval(() => {
        setUploadProgress((prev) => (prev >= 90 ? 90 : prev + 10));
      }, 500);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);
      setUploadProgress(100);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }

      // Format sizes
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` 
        : `${(file.size / 1024).toFixed(2)} KB`;

      // Update global state
      addMemory({
        id: result.rootHash,
        name: file.name,
        sizeBytes: file.size,
        rootHash: result.rootHash,
        txHash: result.txHash,
        uploadTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Verified on 0G Storage'
      });

      addActivity({
        id: Math.random().toString(36).substring(7),
        type: "Memory Stored",
        title: file.name,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        statusText: "Verified on 0G Storage",
        isSuccess: true,
      });

    } catch (error: any) {
      console.error("Upload error:", error);
      alert(`Upload Failed: ${error.message}`);
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);
    }
  }, [walletAddress, addMemory, addActivity]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

  return (
    <div className="flex-1 flex flex-col h-full bg-background selection:bg-white/20 text-foreground p-4 md:p-8 overflow-auto">
      <div className="mx-auto max-w-6xl space-y-8 w-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Memory Vault</h1>
          <p className="text-white/60">Upload and verify documents permanently on the 0G Storage Network.</p>
        </div>

        {/* Upload Zone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] shadow-sm overflow-hidden"
        >
          <div 
            {...getRootProps()} 
            className={`p-12 border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center min-h-[300px] ${
              isDragActive ? "border-primary bg-primary/5" : "border-white/10 hover:border-white/20 hover:bg-white/5"
            }`}
          >
            <input {...getInputProps()} />
            
            {isUploading ? (
              <div className="flex flex-col items-center w-full max-w-md">
                <Loader2 className="h-10 w-10 text-primary animate-spin mb-6" />
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    className="h-full bg-primary"
                  />
                </div>
                <p className="text-sm font-medium text-white">Encrypting and uploading to 0G...</p>
                <p className="text-xs text-white/50 mt-1">Generating Merkle Root Hash</p>
              </div>
            ) : (
              <>
                <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <UploadCloud className="h-8 w-8 text-white/60" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {isDragActive ? "Drop your memory here" : "Drag & Drop to Vault"}
                </h3>
                <p className="text-sm text-white/40 max-w-sm text-center mb-6">
                  Supports PDF, TXT, MD, CSV, PNG, JPG up to 10MB. Files are verified via local Merkle trees before sending to 0G nodes.
                </p>
                <Button className="bg-white text-black hover:bg-white/90 rounded-full px-8">
                  Browse Files
                </Button>
              </>
            )}
          </div>
        </motion.div>

        {/* Uploaded Memories List */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Database className="h-5 w-5 text-white/60" />
            Verified Memories ({memories.length})
          </h2>
          
          {memories.length === 0 ? (
            <div className="rounded-xl border border-white/5 bg-white/[0.01] p-12 flex flex-col items-center justify-center text-center">
              <ShieldCheck className="h-12 w-12 text-white/20 mb-4" />
              <h3 className="text-white/60 font-medium">Vault is Empty</h3>
              <p className="text-white/40 text-sm mt-1">Upload a file to create your first verified memory.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {memories.map((memory) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={memory.id} 
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex items-center justify-between hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                      <FileText className="h-5 w-5 text-white/80" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-white/90">{memory.name}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-white/40">
                          {(memory.sizeBytes / 1024).toFixed(2)} KB
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-xs text-white/40">{memory.uploadTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex flex-col items-end">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-1 mb-1">
                      <CheckCircle2 className="h-3 w-3 text-green-400" />
                      <span className="text-[10px] font-medium text-green-400">{memory.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-white/30 truncate w-32 xl:w-48 text-right" title={memory.rootHash}>
                        {memory.rootHash.substring(0, 8)}...{memory.rootHash.substring(memory.rootHash.length - 8)}
                      </span>
                      {memory.txHash && (
                        <a 
                          href={`https://scan-testnet.0g.ai/tx/${memory.txHash}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
                          title="View on 0G Explorer"
                        >
                          <ExternalLink className="h-3 w-3 text-primary" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
