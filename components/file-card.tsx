"use client";

import { motion } from "framer-motion";
import { File, FileText, Image as ImageIcon, X, CheckCircle2 } from "lucide-react";

export interface FileCardProps {
  name: string;
  size: number;
  type: string;
  progress: number;
  onRemove: () => void;
}

export function FileCard({ name, size, type, progress, onRemove }: FileCardProps) {
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
