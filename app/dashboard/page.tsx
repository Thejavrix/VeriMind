"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  LayoutDashboard,
  Database,
  MessageSquare,
  Settings,
  Search,
  Bell,
  Menu,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Activity,
  Cpu,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WalletConnect } from "@/components/wallet-connect";
import { useAppStore } from "@/store/useAppStore";



const sidebarLinks = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard", active: true },
  { name: "Vault", icon: Database, href: "/dashboard/vault", active: false },
  { name: "Agents", icon: Cpu, href: "/dashboard/agents", active: false },
  { name: "Chat", icon: MessageSquare, href: "/dashboard/chat", active: false },
  { name: "Settings", icon: Settings, href: "/dashboard/settings", active: false },
];

export default function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { memories, activities } = useAppStore();

  const totalStorage = memories.reduce((acc, m) => acc + m.sizeBytes, 0);
  const formattedStorage = totalStorage > 1024 * 1024 * 1024 
    ? `${(totalStorage / (1024 * 1024 * 1024)).toFixed(2)} GB` 
    : `${(totalStorage / (1024 * 1024)).toFixed(2)} MB`;

  const topStats = [
    { label: "Memories Stored", value: memories.length.toString(), change: "Local App State", icon: Database, color: "text-blue-400" },
    { label: "Verified Memories", value: memories.filter(m => m.status.includes('Verified')).length.toString(), change: "Cryptographic Proof", icon: ShieldCheck, color: "text-purple-400" },
    { label: "Storage Used", value: formattedStorage, change: "On 0G Network", icon: Activity, color: "text-green-400" },
    { label: "0G Transactions", value: activities.length.toString(), change: "On-Chain Settlements", icon: BrainCircuit, color: "text-orange-400" },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background selection:bg-white/20 text-foreground">
      {/* Left Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-white/10 bg-background/50 backdrop-blur-xl">
        <div className="flex h-16 items-center px-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <BrainCircuit className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold tracking-tight">VeriMind</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6">
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                link.active
                  ? "bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <link.icon className={`h-4 w-4 ${link.active ? "text-primary" : "text-white/50"}`} />
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-background/80 px-4 md:px-8 backdrop-blur-md shadow-sm shadow-black/20">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white/60"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold hidden sm:block tracking-tight">Overview</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-white/40" />
              <input
                type="text"
                placeholder="Search memories..."
                className="h-9 w-64 rounded-full border border-white/10 bg-white/5 pl-9 pr-4 text-sm text-white placeholder:text-white/40 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative text-white/60 hover:text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-primary" />
            </Button>
            <WalletConnect />
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="mx-auto max-w-6xl space-y-8">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {topStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 shadow-sm backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-white/60">{stat.label}</span>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-semibold tracking-tight text-white mb-1">{stat.value}</span>
                    <span className="text-xs text-white/40">{stat.change}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Recent Memories List */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col shadow-sm overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-white/10 p-5">
                  <h2 className="text-base font-semibold">Recent Memories</h2>
                  <Button variant="ghost" className="h-8 text-xs text-white/60 hover:text-white px-2">
                    View All Vault <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                <div className="flex-1 p-0">
                  <ul className="divide-y divide-white/5">
                    {memories.slice(0, 5).map((memory) => (
                      <li key={memory.id} className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 group-hover:bg-white/10 transition-colors">
                            <FileText className="h-4 w-4 text-white/60" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-white/90">{memory.name}</span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-white/40">{(memory.sizeBytes / 1024).toFixed(2)} KB</span>
                              <span className="w-1 h-1 rounded-full bg-white/20" />
                              <span className="text-xs font-mono text-white/30 truncate w-24 sm:w-32">{memory.rootHash}</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-white/40 whitespace-nowrap hidden sm:block">{memory.uploadTime}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col shadow-sm"
              >
                <div className="border-b border-white/10 p-5">
                  <h2 className="text-base font-semibold">0G Network Activity</h2>
                </div>
                <div className="flex-1 p-5">
                  <div className="relative border-l border-white/10 ml-3 space-y-8 pb-4">
                    {activities.slice(0, 10).map((activity, index) => (
                      <div key={activity.id} className="relative pl-6">
                        <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-background bg-primary" />
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-white/90">{activity.type}</span>
                            <span className="text-xs text-white/40">{activity.timestamp}</span>
                          </div>
                          <span className="text-sm text-white/60">{activity.title}</span>
                          <div className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 w-fit ${activity.isSuccess ? 'border-green-500/20 bg-green-500/10' : 'border-red-500/20 bg-red-500/10'}`}>
                            <CheckCircle2 className={`h-3 w-3 ${activity.isSuccess ? 'text-green-400' : 'text-red-400'}`} />
                            <span className={`text-[10px] font-medium ${activity.isSuccess ? 'text-green-400' : 'text-red-400'}`}>{activity.statusText}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
