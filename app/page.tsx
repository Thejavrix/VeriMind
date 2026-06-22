"use client";

import { motion } from "framer-motion";
import { ArrowDown, Database, Cpu, Shield, BrainCircuit, ArrowRight } from "lucide-react";

// Existing components imported as requested
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";

const flowSteps = [
  {
    id: "user",
    icon: <BrainCircuit className="w-5 h-5 md:w-6 md:h-6 text-primary" aria-hidden="true" />,
    label: "User Request",
    desc: "Query or Upload Memory",
  },
  {
    id: "storage",
    icon: <Database className="w-5 h-5 md:w-6 md:h-6 text-blue-400" aria-hidden="true" />,
    label: "0G Storage",
    desc: "Verifiable, permanent storage layer",
  },
  {
    id: "compute",
    icon: <Cpu className="w-5 h-5 md:w-6 md:h-6 text-purple-400" aria-hidden="true" />,
    label: "0G Compute",
    desc: "Trustless AI inference",
  },
  {
    id: "agent",
    icon: <Shield className="w-5 h-5 md:w-6 md:h-6 text-green-400" aria-hidden="true" />,
    label: "Agentic ID",
    desc: "Cryptographic identity & context",
  },
];

// Reusable spring configuration for ultra-smooth "Apple-like" feel
const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1,
};

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col selection:bg-white/20 selection:text-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center w-full overflow-x-hidden">
        <Hero />
        <Features />

        {/* Architecture Preview Section */}
        <section
          aria-labelledby="architecture-title"
          className="relative flex w-full flex-col items-center overflow-hidden py-24 md:py-32 lg:py-40"
        >
          {/* Ambient Background Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"
          />

          <div className="container relative z-10 mx-auto px-6 md:px-12 max-w-5xl">
            <motion.header
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={springTransition}
              className="mb-16 md:mb-24 text-center"
            >
              <h2
                id="architecture-title"
                className="mb-6 text-3xl font-semibold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-foreground"
              >
                Verifiable Architecture
              </h2>
              <p className="mx-auto max-w-2xl text-base md:text-lg lg:text-xl leading-relaxed text-white/60 text-balance">
                Every memory and decision flows through the 0G decentralized stack, ensuring absolute permanence and cryptographic trust.
              </p>
            </motion.header>

            <div
              className="relative mx-auto flex w-full max-w-2xl flex-col items-center"
              role="list"
              aria-label="Architecture flow steps"
            >
              {flowSteps.map((step, index) => (
                <div key={step.id} className="flex w-full flex-col items-center" role="listitem">
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ ...springTransition, delay: index * 0.1 }}
                    className="group relative flex w-full items-center gap-5 md:gap-6 rounded-[2rem] border border-white/5 bg-white/[0.02] p-5 md:p-6 transition-colors hover:bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-2xl"
                  >
                    <div className="flex h-14 w-14 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                      {step.icon}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="mb-1 text-lg md:text-xl font-medium tracking-tight text-white/90">
                        {step.label}
                      </h3>
                      <p className="text-sm md:text-base text-white/50 leading-snug">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>

                  {/* Connecting Line & Arrow */}
                  {index < flowSteps.length - 1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      whileInView={{ height: 48, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2, ease: "easeOut" }}
                      className="relative my-2 flex items-end justify-center w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent md:my-3 md:height-[60px]"
                      aria-hidden="true"
                    >
                      <motion.div
                        animate={{ y: [0, 6, 0], opacity: [0.3, 0.8, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="absolute -bottom-5"
                      >
                        <ArrowDown className="h-4 w-4 text-white/40" />
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          aria-labelledby="cta-title"
          className="relative flex w-full flex-col items-center py-24 md:py-32 lg:py-40"
        >
          <div className="container relative z-10 mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springTransition}
              className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/40 p-10 md:p-16 lg:p-24 shadow-2xl shadow-black/50 backdrop-blur-3xl"
            >
              {/* Subtle inner top highlight */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
              
              <h2
                id="cta-title"
                className="mb-8 text-3xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 sm:text-4xl md:text-5xl lg:text-7xl"
              >
                Ready to build trusted AI?
              </h2>
              
              <button
                type="button"
                className="group relative inline-flex h-12 md:h-14 items-center justify-center overflow-hidden rounded-full bg-white px-8 md:px-10 text-sm md:text-base font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Launch Dashboard"
              >
                <span className="mr-2">Launch Dashboard</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
