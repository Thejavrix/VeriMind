"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";

// Pre-calculated node positions and connections for the memory network
const networkNodes = [
  { id: 1, top: "20%", left: "30%", size: 12, delay: 0 },
  { id: 2, top: "15%", left: "70%", size: 16, delay: 0.2 },
  { id: 3, top: "50%", left: "50%", size: 24, delay: 0.4, isCenter: true },
  { id: 4, top: "75%", left: "25%", size: 14, delay: 0.6 },
  { id: 5, top: "80%", left: "80%", size: 18, delay: 0.8 },
];

const networkLines = [
  { id: "1-3", top: "20%", left: "30%", width: "28%", rotate: "35deg" },
  { id: "2-3", top: "15%", left: "70%", width: "40%", rotate: "120deg" },
  { id: "4-3", top: "75%", left: "25%", width: "35%", rotate: "-45deg" },
  { id: "5-3", top: "80%", left: "80%", width: "42%", rotate: "-135deg" },
];

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10 relative">
        {/* Left Column: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start text-left"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70 backdrop-blur-md mb-8">
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
            0G Storage Network Live
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground mb-6 leading-[1.1]">
            AI That Remembers.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
              AI You Can Trust.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-lg leading-relaxed text-balance">
            Store your memories on 0G.<br />
            Retrieve knowledge instantly.<br />
            Every answer includes evidence and confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button className="h-14 px-8 rounded-full bg-white text-black hover:bg-white/90 font-medium text-base transition-all hover:scale-105 active:scale-95 group">
              Launch Dashboard
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" className="h-14 px-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium text-base transition-all">
              View Architecture
              <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Right Column: Animated Memory Network */}
        <div className="relative w-full aspect-square max-w-[500px] mx-auto lg:ml-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/5 bg-white/[0.01] shadow-[inset_0_0_100px_rgba(255,255,255,0.02)] backdrop-blur-3xl" />
          
          {/* Connecting Lines */}
          {networkLines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
              className="absolute h-[1px] bg-gradient-to-r from-primary/40 to-transparent origin-left"
              style={{
                top: line.top,
                left: line.left,
                width: line.width,
                transform: `rotate(${line.rotate})`,
              }}
            />
          ))}

          {/* Nodes */}
          {networkNodes.map((node) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: node.delay,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="absolute flex items-center justify-center"
              style={{ top: node.top, left: node.left, transform: "translate(-50%, -50%)" }}
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  boxShadow: [
                    "0 0 20px rgba(255,255,255,0.1)",
                    "0 0 40px rgba(255,255,255,0.3)",
                    "0 0 20px rgba(255,255,255,0.1)",
                  ],
                }}
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: node.delay },
                  boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: node.delay },
                }}
                className={`rounded-full bg-white flex items-center justify-center ${
                  node.isCenter ? "shadow-[0_0_40px_rgba(255,255,255,0.4)] z-10" : "shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                }`}
                style={{ width: node.size, height: node.size }}
              >
                {node.isCenter && (
                  <BrainCircuit className="w-10 h-10 text-black p-2" />
                )}
              </motion.div>
            </motion.div>
          ))}
          
          {/* Ambient center pulse */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/20 bg-white/5 pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
