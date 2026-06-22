"use client";

import Link from "next/link";
import { BrainCircuit, BookOpen, Shield } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-background/50 backdrop-blur-md">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 group-hover:border-primary/40 transition-colors">
                <BrainCircuit className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold text-lg tracking-tight text-foreground">
                VeriMind
              </span>
            </Link>
            <p className="text-sm text-white/40">
              &copy; {currentYear} VeriMind. Powered by 0G.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <Link
              href="https://docs.0g.ai"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors"
            >
              <BookOpen className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              Documentation
            </Link>

            <Link
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors"
            >
              <GitHubLogoIcon className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              GitHub
            </Link>

            <Link
              href="/privacy"
              className="group flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors"
            >
              <Shield className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
