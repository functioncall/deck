"use client";

import { useState } from "react";
import { Text } from "@/components/atoms";
import { CheckoutButton } from "@/components/molecules";

/**
 * StickyCaptureBar — the persistent end-of-deck conversion bar pinned to the
 * bottom of `/deck`. It is the always-present nudge toward the waitlist for
 * the paid hero (the Harness Starter Kit) that accompanies the email capture
 * on the final slide (`EndCard`). The actual email capture (the L1
 * `EmailCaptureForm`) lives on the EndCard — keeping it single-instance avoids
 * a duplicate field id — so this bar carries the CTA only. Dismissible so it
 * never blocks the deck.
 *
 * The CTA routes to the waitlist capture (`CheckoutButton` → `/#join`), not a
 * live checkout yet (Deck-n87). The single waitlist verb is used everywhere
 * (Locked decision 3). Token-only styling (ADR-0005).
 */

export function StickyCaptureBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      {/* One compact row on every width. The descriptive line is hidden under
          the sm breakpoint so the bar stays a single line on phones (it used to
          stack into a tall block that ate the slide) — the CTA + dismiss span
          the width there instead. Its height is kept under --deck-chrome-bottom
          so slide content always clears it. */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-2 max-md:px-4">
        <Text variant="soft" className="text-sm max-sm:hidden">
          The Deck is the map. The{" "}
          <span className="text-ink">Harness Starter Kit</span> is the toolkit —
          waitlist members lock the Founding price.
        </Text>
        <div className="flex items-center gap-5 max-sm:w-full max-sm:justify-between">
          <CheckoutButton className="px-5 py-2 text-sm">Join the waitlist</CheckoutButton>
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
