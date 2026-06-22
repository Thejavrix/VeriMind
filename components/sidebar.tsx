"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BrainCircuit,
  LayoutDashboard,
  Database,
  Upload,
  MessageSquare,
  ShieldCheck,
  Clock,
  Settings,
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Memory Vault", icon: Database, href: "/dashboard/vault" },
  { name: "Upload", icon: Upload, href: "/dashboard/upload" },
  { name: "Chat", icon: MessageSquare, href: "/dashboard/chat" },
  { name: "Evidence", icon: ShieldCheck, href: "/dashboard/evidence" },
  { name: "Timeline", icon: Clock, href: "/dashboard/timeline" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-white/10 bg-background/50 backdrop-blur-xl shrink-0 h-screen sticky top-0 overflow-y-auto">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:border-primary/40 transition-colors">
            <BrainCircuit className="h-4 w-4 text-primary" />
          </div>
          <span className="font-semibold tracking-tight text-foreground">
            VeriMind
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1.5 px-4 py-6">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <link.icon
                className={`h-4.5 w-4.5 ${
                  isActive ? "text-primary" : "text-white/50"
                }`}
              />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* 0G Storage Status Block */}
      <div className="p-4 border-t border-white/10 shrink-0">
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-white/60">0G Storage</span>
            <span className="text-xs font-medium text-white">45%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full bg-blue-500 w-[45%]" />
          </div>
          <p className="mt-3 text-[10px] text-white/40 leading-tight">
            4.5 GB of 10 GB verifiable storage used.
          </p>
        </div>
      </div>
    </aside>
  );
}
