// Typed offer catalog (offer-oriented IA — see agent_docs/content-model.md).
// A new offer is a new `Offer` entry, not a new page type. Prices are in cents
// and are tunable here until L4 wires the real Lemon Squeezy checkout.
import type { Offer } from '@/types';

// The Pre-sell's founding ($29) → launch ($49) prices, in cents. The rising
// price — not a deadline — is the urgency lever (CONTEXT.md: Founding price).
export const FOUNDING_PRICE_CENTS = 2900;
export const LAUNCH_PRICE_CENTS = 4900;

// The free Deck ("the map") — the trust engine and lead-in to the paid offers.
export const deck: Offer = {
  id: 'deck',
  name: 'The Deck',
  kind: 'free',
  priceCents: null,
};

// The paid hero of the Pre-sell — the founder's real agentic-coding harness as
// reusable templates, downloaded the instant a buyer pays. Sells at the Founding
// price today; the bundled Screencast ships free for buyers "when it's ready".
export const harnessStarterKit: Offer = {
  id: 'harness-starter-kit',
  name: 'Harness Starter Kit',
  kind: 'paid',
  priceCents: FOUNDING_PRICE_CENTS,
};

// The offer catalog, in IA order: free map first, then the paid hero.
export const offers: Offer[] = [deck, harnessStarterKit];
