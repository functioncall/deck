# Content Model

> The domain entities and how typed content is organized. Terms are grounded in
> [CONTEXT.md](../CONTEXT.md) (the domain glossary — the authority on language).
> Entity shapes are defined in `src/types/entities.ts`; this doc explains them.

## The entities

TypeScript types only — **no DB in L0**
([ADR-0002](../docs/adr/0002-layered-architecture-with-repository-ports.md)). Defined
in `src/types/entities.ts`, re-exported via `@/types`.

### Offer

The umbrella term for **anything BeyondTheLoop sells or gives away** — currently
the free **Deck**, the paid **Harness Starter Kit** (the pre-sell hero), and the
future **Consultation**. The information architecture is **offer-oriented** so new
offers slot in without a rebuild.

```ts
export type Offer = {
  id: string;                // stable slug, e.g. "harness-starter-kit"
  name: string;
  kind: 'free' | 'paid';
  priceCents: number | null; // null for free offers
};
```

### Subscriber

Someone who has **given their email** — to follow along (free) or as part of a
**Pre-sell** purchase. The entity behind `SubscriberRepository`; stored in the
email tool (Loops) today.

```ts
export type Subscriber = {
  email: string;
  tags: SubscriberTag[];   // e.g. "lead" | "founding"
  createdAt: string;       // ISO 8601
};
export type SubscriberTag = 'lead' | 'founding';
```

- `lead` — gave their email to follow along (free).
- `founding` — bought during the **Pre-sell** at the **Founding price**.

### Purchase

A completed **Pre-sell** transaction; recorded by Lemon Squeezy today
([ADR-0003](../docs/adr/0003-stripe-as-payment-processor.md)). Carries the locked
**Founding price** at purchase time. The entity behind `PurchaseRepository`.

```ts
export type Purchase = {
  id: string;            // provider purchase/order id
  email: string;
  offerId: Offer['id'];
  amountCents: number;   // locked founding price at purchase time
  currency: string;      // ISO 4217, e.g. "USD"
  createdAt: string;     // ISO 8601
};
```

## How the entities relate

- **BeyondTheLoop** hosts multiple **Offers**. The free **Deck** ("the map") is the
  trust-engine and lead-in to the paid offers.
- Giving an email creates/updates a **Subscriber** (tag `lead`).
- Buying creates a **Purchase** and tags the Subscriber `founding`. A purchase locks
  a **Founding price** and entitles the buyer to the deliverable.
- `Purchase.offerId` points at an `Offer.id` — the link between what was bought and
  the offer catalog.

See the repository ports that fetch/persist these in
[architecture.md](./architecture.md), and the flows in
[docs/SPEC.md](../docs/SPEC.md) §4.

## Where typed content lives

Editorial/catalog content is **typed data in `src/content/`** (not hard-coded in
components), so copy changes never touch component code. Planned (built in **L3**):

| File | Holds |
|---|---|
| `src/content/offers.ts` | the `Offer[]` catalog (Deck, Harness Starter Kit, …) |
| `src/content/faq.ts` | FAQ entries for the landing page |
| `src/content/testimonials.ts` | named tester/testimonial entries |
| `src/content/deck/` | deck slide content (L2) |

In L0 `src/content/index.ts` is an empty barrel (`export {}`); the typed content
modules arrive in L3 (and deck content in L2). Keep content **offer-oriented** — a
new offer should be a new `Offer` entry, not a new bespoke page type.

## Language discipline

Use the glossary terms exactly ([CONTEXT.md](../CONTEXT.md)): **Deck** (not
"slides"/"presentation"), **Pre-sell** (not "waitlist"), **Harness Starter Kit**
(the paid hero, not "freebie"), **Founding price** (not "discount"/"coupon"),
**Screencast** (the bundled bonus, not "video"/"course"). The Kit is the paid hero;
the Screencast is bundled free and undated.
