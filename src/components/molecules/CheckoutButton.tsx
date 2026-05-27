"use client";

import { useState } from "react";
import type { ReactNode } from "react";

/**
 * CheckoutButton — the buy CTA for the Harness Starter Kit (the paid hero). On
 * click it POSTs to `/api/checkout` (which creates a Lemon-hosted checkout at the
 * Founding price and fires `checkout_started`), then redirects the buyer to the
 * returned hosted-checkout URL. It replaces the L2/L3 placeholder anchor that
 * pointed at the in-page Kit section — a purchase is an action, so it is a real
 * `<button>`. `className` tunes size per call site; the accent-button base is
 * token-only (ADR-0005). Client component: it owns the click + redirect.
 */
type CheckoutButtonProps = {
  children: ReactNode;
  className?: string;
};

const BASE =
  "inline-flex items-center justify-center rounded bg-accent font-sans font-medium tracking-wide text-bg transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-70";

export function CheckoutButton({ children, className }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  async function startCheckout() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = (await res.json().catch(() => null)) as
        | { url?: string }
        | null;
      if (res.ok && data?.url) {
        // Keep the disabled/loading state through the redirect to Lemon.
        window.location.href = data.url;
        return;
      }
    } catch {
      // fall through to re-enable so the buyer can retry
    }
    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={startCheckout}
      disabled={loading}
      aria-busy={loading}
      className={`${BASE}${className ? ` ${className}` : ""}`}
    >
      {loading ? "Starting checkout…" : children}
    </button>
  );
}
