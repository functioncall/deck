"use client";

import { useState } from "react";
import { Text } from "@/components/atoms";
import { CheckoutButton } from "@/components/molecules";

/**
 * StickyCaptureBar — the persistent end-of-deck conversion bar pinned to the
 * bottom of `/deck`. It is the always-present nudge toward the paid hero (the
 * Harness Starter Kit) that accompanies the soft email capture on the final
 * slide (`EndCard`). The actual email capture (the L1 `EmailCaptureForm`) lives
 * on the EndCard — keeping it single-instance avoids a duplicate field id — so
 * this bar carries the CTA only. Dismissible so it never blocks the deck.
 *
 * The buy CTA opens the Lemon Squeezy checkout (the shared `CheckoutButton`).
 * Token-only styling (ADR-0005).
 */

export function StickyCaptureBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-3 max-md:px-4 sm:flex-row sm:justify-between">
        <Text variant="soft" className="text-sm">
          The Deck is the map. The{" "}
          <span className="text-ink">Harness Starter Kit</span> is the toolkit —
          founders lock the Founding price.
        </Text>
        <div className="flex items-center gap-5">
          <CheckoutButton className="px-5 py-2 text-sm">Get the Kit</CheckoutButton>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="font-sans text-sm text-ink-dim transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
