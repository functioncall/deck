import NextLink from "next/link";
import type { ReactNode } from "react";

/**
 * CheckoutButton — the primary "Get early access" CTA for the Harness Starter Kit.
 *
 * Launch #1 is a free preview + waitlist (Deck-n87): there is NO live checkout
 * yet (the Kit is still being packaged), so this CTA does not open a Lemon
 * Squeezy checkout — it routes to the early-access email capture (`/#join`, the
 * FinalCTA form on the home page). When the Kit ships, point this back at a real
 * checkout. A plain styled link (navigation, not an action) — no client JS. The
 * accent-button base is token-only (ADR-0005); `className` tunes size per call.
 */
type CheckoutButtonProps = {
  children: ReactNode;
  className?: string;
};

const BASE =
  "inline-flex items-center justify-center rounded bg-accent font-sans font-medium tracking-wide text-bg transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function CheckoutButton({ children, className }: CheckoutButtonProps) {
  return (
    <NextLink href="/#join" className={`${BASE}${className ? ` ${className}` : ""}`}>
      {children}
    </NextLink>
  );
}
