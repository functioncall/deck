import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
