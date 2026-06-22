"use client";

import { motion } from "framer-motion";
import { BrainCircuit, User, ShieldCheck, Database, Fingerprint, ExternalLink, CheckCircle2 } from "lucide-react";
import { ChatMessage } from "@/types/chat";
import Link from "next/link";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex w-full ${isAssistant ? "justify-start" : "justify-end"} mb-6`}
    >
      <div className={`flex max-w-[85%] gap-4 ${isAssistant ? "flex-row" : "flex-row-reverse"}`}>
        
        {/* Avatar */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          {isAssistant ? (
            <BrainCircuit className="h-5 w-5 text-primary" />
          ) : (
            <User className="h-5 w-5 text-white/70" />
          )}
        </div>

        {/* Message Content */}
        <div className="flex flex-col gap-2">
          {/* Main text box */}
          <div
            className={`rounded-2xl p-4 text-sm leading-relaxed ${
              isAssistant
                ? "bg-white/[0.03] border border-white/10 text-white/90 rounded-tl-none shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                : "bg-primary/20 border border-primary/30 text-white rounded-tr-none"
            }`}
          >
            {message.content}
          </div>

          {/* AI Metadata (Verifiable Evidence) */}
          {isAssistant && (message.confidence || message.evidence) && (
            <div className="mt-2 space-y-4 rounded-xl border border-primary/20 bg-primary/5 p-4 backdrop-blur-sm">
              
              {message.confidence !== undefined && (
                <div className="text-sm font-semibold text-white/90 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Confidence: <span className="text-primary">{message.confidence}%</span>
                </div>
              )}

              {message.evidence && message.evidence.length > 0 && (
                <div className="space-y-3">
                  <div className="text-xs font-medium text-white/50 uppercase tracking-wider">Evidence</div>
                  {message.evidence.map((ev, idx) => (
                    <div key={idx} className="rounded-lg border border-white/10 bg-black/40 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                          📄 {ev.filename}
                        </div>
                        <Link 
                          href={`/dashboard/evidence/${ev.id}`} 
                          className="text-[10px] flex items-center gap-1 text-primary/70 hover:text-primary transition-colors hover:underline"
                        >
                          Verify <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                      
                      <p className="text-xs text-white/60 border-l-2 border-white/10 pl-3 py-1 italic">
                        "{ev.snippet}"
                      </p>

                      {message.rootHash && (
                        <div className="space-y-1 pt-2 border-t border-white/5">
                          <div className="text-[10px] text-white/40 uppercase tracking-wider">Hash</div>
                          <div className="font-mono text-xs text-primary bg-primary/10 px-2.5 py-1.5 rounded-md inline-block break-all">
                            {message.rootHash}
                          </div>
                        </div>
                      )}
                      
                      <div className="text-xs text-green-400 font-medium flex items-center gap-1.5 pt-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Stored on 0G Storage
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
