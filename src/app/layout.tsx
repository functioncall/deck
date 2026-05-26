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

export const metadata: Metadata = {
  title: "BeyondTheLoop",
  description: "BeyondTheLoop — brand & pre-sell site.",
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
