import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConvictionFi - DeFAI Agent as NFT",
  description:
    "Transform your conviction into autonomous AI trading agents. Built on Sui, evolving on Walrus, powered by your beliefs.",
  generator: "DeFAI Mint",
  metadataBase: new URL("https://convictionfi.vercel.app"),
  openGraph: {
    title: "ConvictionFi - DeFAI Agent as NFT",
    description:
      "Transform your conviction into autonomous AI trading agents. Built on Sui, evolving on Walrus, powered by your beliefs.",
    url: "https://convictionfi.vercel.app",
    siteName: "ConvictionFi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ConvictionFi OGP",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ConvictionFi - DeFAI Agent as NFT",
    description:
      "Mint Your Conviction.  DeFAI Agent as NFT. | Built on Sui, evolving on Walrus.",
    creator: "@kyohei_nft",
    images: ["/og-image.png"],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
