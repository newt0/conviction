import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
// import { Navigation } from "@/components/layout/navigation";
import { SITE_METADATA } from "@/constants/site-metadata";
import { SuiProviders } from "@/components/providers/SuiProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata = SITE_METADATA;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SuiProviders>
          {/* <Navigation /> */}
          {children}
        </SuiProviders>
      </body>
    </html>
  );
}
