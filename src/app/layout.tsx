import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

// Deck fonts (index.html): Fraunces (serif), Geist (sans), Geist Mono (mono).
// Each exposes a CSS variable consumed by the --font-* theme tokens in
// src/styles/theme.css.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Site-wide SEO + social cards. The per-route `opengraph-image.tsx` files
// (one for `/`, one for `/deck`) supply the OG/Twitter images automatically;
// `metadataBase` resolves them (and any relative URLs) to absolute links.
const SITE_URL = "https://beontheloop.com";
const SITE_NAME = "Beontheloop";
const SITE_DESCRIPTION =
  "Stop babysitting your AI. The Deck is the free map for building long-running agents; the Harness Starter Kit hands you the founder's real harness so you ship with AI instead of supervising it.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Beontheloop — Stop babysitting your AI",
    template: "%s · Beontheloop",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Beontheloop — Stop babysitting your AI",
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beontheloop — Stop babysitting your AI",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
