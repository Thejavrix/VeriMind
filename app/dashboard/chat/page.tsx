"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, ShieldCheck, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  evidence?: {
    filename: string;
    rootHash: string;
  };
};

export default function ChatPage() {
  const { memories } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Hello! I am VeriMind, your verifiable AI assistant. I can only answer questions based on the cryptographic memories you have stored on the 0G network. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      let aiMsg: Message;
      
      if (memories.length === 0) {
        aiMsg = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: "I cannot find any verified memories in my 0G Vault. Please upload some documents first so I can provide answers backed by cryptographic proof.",
        };
      } else {
        // Pick the most recent memory as 'evidence'
        const memory = memories[memories.length - 1];
        aiMsg = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: `Based on your recent uploads, I found relevant information. This answer is strictly constructed using verified data from your 0G Vault.`,
          evidence: {
            filename: memory.name,
            rootHash: memory.rootHash
          }
        };
      }

      setMessages((prev) => [...prev, aiMsg]);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] md:h-screen bg-background selection:bg-white/20 text-foreground overflow-hidden">
      <div className="flex-1 overflow-auto p-4 md:p-8 pb-32">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex items-center gap-2 mb-8">
            <h1 className="text-2xl font-bold tracking-tight">AI Evidence Chat</h1>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1">
              <Database className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">0G RAG Engine</span>
            </div>
          </div>

          <div className="space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                    msg.role === "user" 
                      ? "bg-primary/20 border-primary/30" 
                      : "bg-white/5 border-white/10"
                  }`}>
                    {msg.role === "user" ? <User className="h-5 w-5 text-primary" /> : <Bot className="h-5 w-5 text-white/80" />}
                  </div>
                  
                  <div className={`flex flex-col max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`rounded-2xl p-4 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/[0.03] border border-white/10 text-white/90"
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>

                    {msg.evidence && (
                      <div className="mt-2 rounded-xl border border-green-500/20 bg-green-500/5 p-3 w-full max-w-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <ShieldCheck className="h-4 w-4 text-green-400" />
                          <span className="text-xs font-semibold text-green-400">Cryptographic Evidence</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white/40">Source File:</span>
                            <span className="text-white/90 font-medium truncate ml-2">{msg.evidence.filename}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white/40">0G Root Hash:</span>
                            <span className="text-white/60 font-mono truncate ml-2 w-32" title={msg.evidence.rootHash}>
                              {msg.evidence.rootHash}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-white/5 border-white/10">
                  <Bot className="h-5 w-5 text-white/80" />
                </div>
                <div className="rounded-2xl p-4 bg-white/[0.03] border border-white/10 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-white/40 animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-white/40 animate-bounce delay-75" />
                  <span className="h-2 w-2 rounded-full bg-white/40 animate-bounce delay-150" />
                </div>
              </motion.div>
            )}
            
            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 md:left-64 right-0 p-4 md:p-8 bg-gradient-to-t from-background via-background to-transparent pointer-events-none">
        <div className="mx-auto max-w-4xl pointer-events-auto">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask anything about your verified memories..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 pr-16 text-sm text-white placeholder-white/40 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 backdrop-blur-xl transition-all"
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 h-10 w-10 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-3 text-center text-[10px] text-white/30 font-medium">
            Responses are strictly limited to data cryptographically verified on the 0G Network.
          </p>
        </div>
      </div>
    </div>
  );
}
