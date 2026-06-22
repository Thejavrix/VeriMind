"use client";

import { motion } from "framer-motion";
import { Database, ShieldCheck, Fingerprint, Zap } from "lucide-react";
import { FeatureCard } from "@/components/feature-card";

const features = [
  {
    title: "Persistent Memory",
    description:
      "Every document, thought, and interaction is securely stored on 0G's decentralized network forever.",
    icon: <Database className="h-6 w-6 text-blue-400" />,
    gradient: "from-blue-500/20 to-blue-500/0",
  },
  {
    title: "Evidence Mode",
    description:
      "AI answers are never hallucinations. Each response includes cryptographic proofs and exact source citations.",
    icon: <ShieldCheck className="h-6 w-6 text-purple-400" />,
    gradient: "from-purple-500/20 to-purple-500/0",
  },
  {
    title: "Agentic Identity",
    description:
      "Your personal AI retains context over time, tied to a permanent, unalterable on-chain identity.",
    icon: <Fingerprint className="h-6 w-6 text-green-400" />,
    gradient: "from-green-500/20 to-green-500/0",
  },
  {
    title: "Powered by 0G",
    description:
      "Built on the first Data Availability layer with built-in decentralized storage and verifiable compute.",
    icon: <Zap className="h-6 w-6 text-orange-400" />,
    gradient: "from-orange-500/20 to-orange-500/0",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 }
  },
};

export function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32 lg:py-40">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <h2 className="mb-6 text-3xl font-semibold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
              Built for Truth
            </h2>
            <p className="mx-auto max-w-2xl text-base md:text-lg lg:text-xl leading-relaxed text-white/60 text-balance">
              Experience the next evolution of AI where memory is permanent, ownership is absolute, and trust is cryptographic.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants} className="h-full">
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                gradient={feature.gradient}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
