"use client";

import { useSyncExternalStore } from "react";
import { Button, Link, Text } from "@/components/atoms";
import {
  CONSENT_CHANGED_EVENT,
  type ConsentChoice,
  getConsent,
  setConsent,
} from "@/lib/analytics/consent";

/**
 * ConsentBanner — minimal dismissible EU/EEA-style consent gate for browser
 * analytics (SPEC Locked decision §5 + epic-4). Defaults to OFF: until the
 * visitor explicitly accepts, `trackClient` short-circuits and no
 * `deck_slide_viewed`/`deck_completed` events leave the browser. The site
 * works exactly the same with consent declined — we just stop measuring.
 *
 * The persisted choice is an external store (localStorage), so we read it via
 * `useSyncExternalStore`: the server snapshot is `null` (unknown) to match the
 * first client paint and avoid a hydration mismatch, then the client snapshot
 * reads storage. Subscribing to the `storage` (cross-tab) and
 * `CONSENT_CHANGED_EVENT` (in-page) events keeps it in sync — no setState in an
 * effect. Renders nothing once a choice is on file. Token-only (ADR-0005).
 */
function subscribe(onChange: () => void): () => void {
  window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function ConsentBanner() {
  const choice = useSyncExternalStore<ConsentChoice | null>(
    subscribe,
    getConsent,
    () => null,
  );

  if (choice !== null) return null;

  return (
    <div
      role="region"
      aria-label="Cookie and analytics consent"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-lg border border-rule bg-bg-card px-6 py-5 shadow-lg md:flex-row md:items-center md:justify-between md:gap-6">
        <Text variant="soft" className="text-sm">
          We use anonymous product analytics (Amplitude) to see how the Deck and
          the waitlist are working. Nothing loads until you accept, and the site
          works either way. See the{" "}
          <Link href="/privacy" variant="accent" className="text-sm">
            Privacy Policy
          </Link>
          .
        </Text>
        <div className="flex flex-shrink-0 gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setConsent("declined")}
            aria-label="Decline analytics"
          >
            Decline
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setConsent("granted")}
            aria-label="Accept analytics"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
