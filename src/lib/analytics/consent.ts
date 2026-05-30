// EU/EEA-style consent gate for browser analytics (SPEC Locked decision §5 +
// epic-4). Pure, dependency-free, client-only state:
//   - default-deny (no choice → analytics OFF) so we never send a `deck_*` event
//     before the visitor has accepted;
//   - persisted in localStorage so the choice survives reloads and tabs;
//   - withdrawable by the privacy copy ("you can withdraw consent at any time")
//     via `setConsent('declined')`.
//
// No new dependency, no consent-management platform — this is the entire gate.
// The server adapter (`AmplitudeAdapter`) is unaffected: it already no-ops with
// no key, and the events it does process from `/api/track` only arrive when
// `trackClient` has cleared this gate in the browser.

export type ConsentChoice = 'granted' | 'declined';

export const CONSENT_STORAGE_KEY = 'btl_consent';

// Fires when `setConsent` runs in this tab so an in-page listener (the banner)
// can react synchronously; the native `storage` event covers cross-tab sync.
export const CONSENT_CHANGED_EVENT = 'btl:consent-changed';

function isChoice(value: string | null): value is ConsentChoice {
  return value === 'granted' || value === 'declined';
}

/**
 * Read the persisted consent choice, or `null` when the visitor has not yet
 * decided. SSR-safe (returns `null` on the server) and storage-failure-safe.
 */
export function getConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return isChoice(raw) ? raw : null;
  } catch {
    return null;
  }
}

/**
 * Persist the visitor's choice and notify in-page listeners. Best-effort: a
 * storage failure (private mode, quota) is swallowed — consent simply stays
 * default-deny for the session, which is the safe direction.
 */
export function setConsent(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Persistence failed; the in-page event still lets the banner dismiss.
  }
  try {
    window.dispatchEvent(
      new CustomEvent<ConsentChoice>(CONSENT_CHANGED_EVENT, { detail: choice }),
    );
  } catch {
    // Swallow — analytics must never break the UI.
  }
}

/**
 * Pure decision used by `trackClient`: only `granted` permits analytics. Any
 * other state — undecided, declined, SSR — is a hard NO. Default-deny.
 */
export function analyticsAllowed(): boolean {
  return getConsent() === 'granted';
}
