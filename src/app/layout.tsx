import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getSiteConfig, getSocials } from "@/lib/content";
import "katex/dist/katex.min.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteConfig = getSiteConfig();
const siteSocials = getSocials();

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang={siteConfig.lang ?? "en"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100`}
      >
        <SiteHeader config={siteConfig} socials={siteSocials} />
        <main className="flex-1">
          {children}
        </main>
        <SiteFooter config={siteConfig} />
      </body>
    </html>
  );
}
