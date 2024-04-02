import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CrispProvider } from "@/components/ui/crisp-provider";
import Chatbot from "@/components/chatbase";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Remix Ai",
  description: "An ai powered web framework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* <CrispProvider /> */}
        <Chatbot />
        {/* This is for chatbot */}
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
