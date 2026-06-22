"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  gradient: string;
}

export function FeatureCard({ title, description, icon, gradient }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-2xl backdrop-blur-xl"
    >
      {/* Background Hover Gradient */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10 bg-gradient-to-br ${gradient}`}
      />
      
      {/* Subtle Inner Border Glow */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 group-hover:ring-white/10 transition-colors duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full items-start">
        <div
          className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}
        >
          <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[11px] bg-background/90 backdrop-blur-sm">
            {icon}
          </div>
        </div>

        <h3 className="mb-3 text-xl font-semibold tracking-tight text-foreground group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
