// Domain entities for Beontheloop (see CONTEXT.md glossary).
// TS types only — no DB in L0 (ADR-0002). Adapters/persistence land in L4.

// Anyone who gave an email: to follow along (free) or as part of a Pre-sell.
export type Subscriber = {
  email: string;
  tags: SubscriberTag[]; // e.g. "lead" | "founding"
  createdAt: string; // ISO 8601
};
export type SubscriberTag = 'lead' | 'founding';

// A completed Pre-sell transaction (recorded by Lemon Squeezy today).
export type Purchase = {
  id: string; // provider purchase/order id
  email: string;
  offerId: Offer['id'];
  amountCents: number; // locked founding price at purchase time
  currency: string; // ISO 4217, e.g. "USD"
  createdAt: string; // ISO 8601
};

// Umbrella for anything Beontheloop sells or gives away.
export type Offer = {
  id: string; // stable slug, e.g. "harness-starter-kit"
  name: string;
  kind: 'free' | 'paid';
  priceCents: number | null; // null for free offers
};
