"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Database, Shield } from "lucide-react";

export type UploadStep = "idle" | "hashing" | "uploading" | "verifying" | "complete";

export interface UploadProgressProps {
  step: UploadStep;
  overallProgress: number;
}

export function UploadProgress({ step, overallProgress }: UploadProgressProps) {
  const steps = [
    { id: "hashing", label: "Generating Merkle Root", icon: Shield },
    { id: "uploading", label: "Distributing to 0G Nodes", icon: Database },
    { id: "verifying", label: "Verifying On-Chain", icon: CheckCircle2 },
  ];

  const getStepStatus = (stepId: string) => {
    const currentIndex = steps.findIndex((s) => s.id === step);
    const targetIndex = steps.findIndex((s) => s.id === stepId);

    if (step === "complete" || currentIndex > targetIndex) return "complete";
    if (currentIndex === targetIndex) return "current";
    return "pending";
  };

  if (step === "idle") return null;

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-2xl backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight text-white">0G Verification Process</h3>
        <span className="text-sm font-medium text-primary tabular-nums">
          {Math.round(overallProgress)}%
        </span>
      </div>

      <div className="relative mb-8 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="absolute inset-y-0 left-0 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${overallProgress}%` }}
          transition={{ ease: "easeOut" }}
        />
      </div>

      <div className="space-y-4">
        {steps.map((s, idx) => {
          const status = getStepStatus(s.id);
          const Icon = s.icon;

          return (
            <div key={s.id} className="relative flex items-center gap-4">
              {/* Vertical line connecting steps */}
              {idx !== steps.length - 1 && (
                <div className="absolute left-[11px] top-8 h-full w-px bg-white/10" />
              )}

              <div
                className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                  status === "complete"
                    ? "border-green-500 bg-green-500/20 text-green-400"
                    : status === "current"
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-white/20 bg-white/5 text-white/40"
                }`}
              >
                {status === "complete" ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : status === "current" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Icon className="h-3.5 w-3.5" />
                )}
              </div>

              <div className="flex flex-col">
                <span
                  className={`text-sm font-medium transition-colors duration-500 ${
                    status === "pending" ? "text-white/40" : "text-white/90"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
