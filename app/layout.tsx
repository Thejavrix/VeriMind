import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VeriMind | AI That Remembers. AI You Can Trust.",
  description: "A Personal AI Memory Operating System powered by 0G. Store your memories forever, retrieve knowledge instantly with verifiable evidence.",
  keywords: ["AI", "0G", "Memory", "Agentic ID", "Web3", "Hackathon"],
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 selection:text-primary-foreground">
        {children}
        <Toaster richColors theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
