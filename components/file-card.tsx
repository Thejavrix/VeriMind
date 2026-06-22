"use client";

import { motion } from "framer-motion";
import { File, FileText, Image as ImageIcon, X, CheckCircle2 } from "lucide-react";

export interface FileCardProps {
  name: string;
  size: number;
  type: string;
  progress: number;
  rootHash?: string;
  timestamp?: string;
  onRemove: () => void;
}

export function FileCard({ name, size, type, progress, rootHash, timestamp, onRemove }: FileCardProps) {
  // Determine icon based on file type
  const getIcon = () => {
    if (type.startsWith("image/")) return <ImageIcon className="h-6 w-6 text-blue-400" />;
    if (type === "application/pdf") return <FileText className="h-6 w-6 text-red-400" />;
    return <File className="h-6 w-6 text-white/60" />;
  };

  // Format size to KB/MB
  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isComplete = progress === 100;

  if (isComplete && rootHash) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="group relative flex flex-col gap-4 rounded-xl border border-primary/30 bg-primary/5 p-5 shadow-lg backdrop-blur-md overflow-hidden"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Memory Stored</h4>
              <p className="text-xs text-white/60">Status: <span className="text-green-400">Verified</span></p>
            </div>
          </div>
          <button onClick={onRemove} className="text-white/40 hover:text-white transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-4 rounded-lg border border-white/5 bg-black/20 p-4 text-xs">
          <div>
            <span className="block text-white/40 mb-1">File</span>
            <span className="font-medium text-white/90 truncate block">{name}</span>
          </div>
          <div>
            <span className="block text-white/40 mb-1">Network</span>
            <span className="font-medium text-white/90">0G Storage</span>
          </div>
          <div className="col-span-2">
            <span className="block text-white/40 mb-1">Root Hash</span>
            <span className="font-mono text-primary truncate block">{rootHash}</span>
          </div>
          <div className="col-span-2 flex items-center justify-between mt-1 pt-3 border-t border-white/5">
            <span className="text-white/40">{timestamp || new Date().toLocaleString()}</span>
            <button className="text-primary hover:text-primary/80 transition-colors font-medium">
              View Details →
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 shadow-sm backdrop-blur-md overflow-hidden"
    >
      {/* Background Progress Fill */}
      <div 
        className="absolute inset-y-0 left-0 bg-primary/10 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />

      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 shadow-inner">
        {getIcon()}
      </div>

      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="truncate text-sm font-medium text-white/90 pr-4">
            {name}
          </span>
          {isComplete ? (
            <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
          ) : (
            <span className="text-xs font-medium text-white/60 tabular-nums shrink-0">
              {progress}%
            </span>
          )}
        </div>
        
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-white/40">{formatSize(size)}</span>
          {isComplete && (
            <>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span className="text-[10px] text-green-400/80 font-mono">0G Verified</span>
            </>
          )}
        </div>
      </div>

      <button
        onClick={onRemove}
        className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/40 opacity-0 transition-all hover:bg-white/10 hover:text-white group-hover:opacity-100"
        aria-label="Remove file"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
