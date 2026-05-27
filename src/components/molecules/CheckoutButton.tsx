"use client";

import NextLink from "next/link";
import type { MouseEvent, ReactNode } from "react";

/**
 * CheckoutButton — the primary "Get early access" CTA for the Harness Starter Kit.
 *
 * Launch #1 is a free preview + waitlist (Deck-n87): there is NO live checkout
 * yet, so this CTA routes to the early-access email capture (`/#join`, the
 * FinalCTA form on the home page) instead of opening a Lemon Squeezy checkout.
 * When the Kit ships, point this back at a real checkout.
 *
 * The `href` handles cross-page jumps (from /deck, /privacy, …). On the home
 * page the URL hash is already `#join` after the first click, so a plain anchor
 * would no-op on the second click — we intercept and `scrollIntoView` the target
 * every time so the CTA always returns the visitor to the form. Accent-button
 * base is token-only (ADR-0005); `className` tunes size per call site.
 */
type CheckoutButtonProps = {
  children: ReactNode;
  className?: string;
};

const BASE =
  "inline-flex items-center justify-center rounded bg-accent font-sans font-medium tracking-wide text-bg transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function CheckoutButton({ children, className }: CheckoutButtonProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // If the #join target is on this page, scroll to it directly so a repeat
    // click re-scrolls even when the URL hash is already #join. If it isn't here
    // (e.g. on /deck), let the link navigate to the home-page anchor instead.
    const target = document.getElementById("join");
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <NextLink
      href="/#join"
      onClick={handleClick}
      className={`${BASE}${className ? ` ${className}` : ""}`}
    >
      {children}
    </NextLink>
  );
}
