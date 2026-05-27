// Client-side funnel tracker for the L2 deck player (browser). The deck runs in
// the browser but the `AnalyticsClient` port / `AmplitudeAdapter` is server-side
// (it reads the Amplitude key via lazy `getEnv()` and uses `node:crypto`), so the
// player can't call the port directly without pulling server code + a key into
// the client bundle. Instead it POSTs the event to `/api/track`, which funnels it
// through the same `AnalyticsClient` port server-side. Net effect: every funnel
// event still goes through the one port (no raw SDK in components), and NO key is
// ever referenced in client code — the no-keys-at-build guarantee holds.
//
// Type-only import of `AnalyticsEvent` (erased at build) so this stays free of any
// server module / Amplitude key.
import type { AnalyticsEvent } from './events';

const DEVICE_ID_KEY = 'btl_device_id';

/**
 * A per-session device id so the deck funnel events from one visit share an
 * Amplitude `device_id` (no accounts/auth — ADR-0004). Persisted in
 * sessionStorage; falls back to a fresh id if storage is unavailable.
 */
function deviceId(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const existing = window.sessionStorage.getItem(DEVICE_ID_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    window.sessionStorage.setItem(DEVICE_ID_KEY, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

/**
 * Fire a deck funnel event from the browser. Fire-and-forget + best-effort:
 * analytics must never block or break the deck UX, so failures are swallowed.
 */
export function trackClient(
  event: AnalyticsEvent,
  props?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined') return;
  void fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, props: { device_id: deviceId(), ...props } }),
    keepalive: true,
  }).catch(() => undefined);
}
