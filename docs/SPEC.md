# BeyondTheLoop — Build Spec

> The single source of truth for building beyondtheloop.com. Decisions are fixed in
> [ADRs](./adr/); domain language in [CONTEXT.md](../CONTEXT.md). This spec sequences
> the build into layers, each sized to **one Ralph loop / epic**, foundation-first.

---

## 1. What we're building & why

**BeyondTheLoop** is a brand + Next.js site that gives away an interactive **Deck**
(free, "the map") about building long-running AI agents, and **pre-sells** a paid
**Harness Starter Kit** (the founder's real agentic-coding harness — skills, `CLAUDE.md`,
ralph-loop script, `agent_docs` templates) with a build-along **Screencast** ("the
expedition") included free when it ships.

- **Audience:** developers using/curious about agent harnesses (Claude Code, Cursor, etc.).
- **Founder proof:** practitioner authority (CTO @ Skyhost), concrete metrics
  (270 files / 59 min / exit 0; 95–99% task-fit), early testers/testimonials.
- **Distribution:** the founder shares the Deck / gives the talk; the Deck is the
  distribution piece. (No separate blog/content engine in scope.)

### The offer (fixed)

| | |
|---|---|
| **Free** | The **Deck** — fully open, shareable, the trust engine. |
| **Paid hero** | **Harness Starter Kit** — instant download. Founding **$29 → $49** launch. |
| **Bundled bonus** | **Screencast** — included free, ships "when ready" + lifetime access (no date). |
| **Urgency** | Rising price (not a fake deadline). |
| **Safety net** | 30-day, no-questions refund. |
| **Future offers** | **Consultation** (1:1, Cal.com), more screencasts, member area. |

**Why this shape:** pre-selling validates with real money, but the paid hero (the Kit)
**exists today and downloads instantly** — so the undated Screencast carries no refund
risk. See [ADR-0003](./adr/0003-stripe-as-payment-processor.md),
[ADR-0004](./adr/0004-no-user-accounts.md).

---

## 2. Architecture (fixed)

Full **layered clean architecture** with **ports & adapters**
([ADR-0002](./adr/0002-layered-architecture-with-repository-ports.md)). Guardrail:
**every layer has a real job — no pure pass-through files.**

```
 app/api route ─▶ Controller (Zod validate, shape) ─▶ Service (business rules)
                                                          └─▶ Repository (interface)
                                                                ├─ SaaS adapter (now)
                                                                └─ Postgres adapter (later)
```

- **Entities:** `Subscriber`, `Purchase` (TS types; no DB yet).
- **Repositories:** `SubscriberRepository` → `LoopsAdapter`; `PurchaseRepository` →
  `LemonSqueezyAdapter`. Analytics behind `AnalyticsClient` → `AmplitudeAdapter`.
- **No accounts / no auth** ([ADR-0004](./adr/0004-no-user-accounts.md)) — email-based
  access; magic-link member area deferred to L6.

### Tech stack (fixed)

Next.js 16 (App Router) · TypeScript strict · Tailwind 4 (theme = single token source,
**no hard-coded values**) · pnpm · Vercel · Zod · `@/` aliases + barrel exports (mirrors
`esp32-dashboard`). Components: **bespoke atoms from deck tokens + Radix** primitives
([ADR-0005](./adr/0005-bespoke-atoms-with-radix.md)). Deck: **componentized**, not embedded
([ADR-0001](./adr/0001-componentize-the-deck.md)). Verification: **build + lint + typecheck
gates** (the ralph driver runs them); no test framework/CI.

### Integrations (all behind adapters, swappable)

| Concern | Tool | Adapter |
|---|---|---|
| Payments (Merchant of Record, handles global VAT) | **Lemon Squeezy** | `LemonSqueezyAdapter` |
| Email list + sequences | **Loops** | `LoopsAdapter` |
| Product analytics (funnel events) | **Amplitude** | `AmplitudeAdapter` |
| Video host (L6) | Bunny/Mux | `VideoAdapter` |

### Directory shape

```
src/
├── app/            (marketing)/ · deck/ · watch/ (L6) · api/ (webhooks, subscribe)
├── components/     atoms/ molecules/ organisms/ templates/
├── content/        offers.ts · faq.ts · testimonials.ts · deck/
├── lib/            email/ payments/ analytics/   (adapters)
├── server/         controllers/ services/
├── types/          entities + repository interfaces
└── styles/         tokens (Tailwind theme) + globals
docs/   SPEC.md · CONTEXT.md · adr/ · agent_docs/
```

---

## 3. Site map & information architecture (fixed)

```
  /          HOME = sales page (hero, problem, the shift, deck preview,
             what's in the Kit, proof, pricing, FAQ, final CTA;
             persistent "Get the Kit" CTA in header)
  /deck      the free interactive Deck (the "map") — shareable, open,
             soft email capture at the end + sticky bar, CTAs back to / + buy
  /watch     (L6) signed-link screencast player
  legal:     /terms · /privacy · /refund-policy
```

### Landing page anatomy (L3)

Hero (promise + "270 files / 59 min" metric + dual CTA: read deck / get Kit) →
Problem (babysitting AI) → The Shift (agents = a harness; deck thesis) → Free Deck
preview → What's in the Harness Starter Kit → Proof (authority + metrics + named
testimonials) → Pricing (founding $29→$49, 30-day guarantee) → FAQ → Final CTA.
Voice: **help-don't-sell**, storytelling, map→expedition.

---

## 4. Visitor flows (sequence diagrams)

### 4.1 Browser → email (not ready to buy)

```
Visitor        /deck or /           EmailForm        api/subscribe        Loops
  │ reads deck (open)                  │                  │                 │
  │───────────────────────────────────│                  │                 │
  │ "follow along" — enters email      │                  │                 │
  │───────────────────────────────────▶ POST ───────────▶│                 │
  │                          SubscribeController (Zod)     │                 │
  │                          SubscribeService (dedupe,     │                 │
  │                            tag "lead", analytics evt)  │                 │
  │                          SubscriberRepository ────────▶ LoopsAdapter ───▶│
  │ ◀── "you're on the list" ──────────────────────────────────────────────│
```

### 4.2 Buyer → checkout → access (the money path)

```
Visitor      "Get the Kit"     Lemon Checkout      api/webhook (Lemon)     Loops
  │ clicks CTA                     │                     │                   │
  │───────────────▶ open checkout ─▶                     │                   │
  │ email + card, pays ───────────▶│                     │                   │
  │                                │ payment_success ───▶│                   │
  │                                │   verify signature  │                   │
  │                                │   PurchaseController │                   │
  │                                │   PurchaseService    │                   │
  │                                │   PurchaseRepository (LemonSqueezyAdapter)
  │                                │   SubscriberRepository ─ tag "founding" ─▶│
  │                                │   AnalyticsClient ─ purchase_completed    │
  │ ◀ thank-you + INSTANT download: Harness Starter Kit ─│                   │
```

### 4.3 Screencast ships (weeks later)

```
Founder        Loops (broadcast)        Founding buyers        /watch
  │ "screencast is live!" ─────────────▶ email w/ signed link    │
  │                                       click ─────────────────▶ plays stream
  │                                       (link keyed to Purchase, expiring)
```

---

## 5. Layer plan — each layer = one Ralph loop / epic

Build order is **strict foundation-up**. First public, money-collecting launch is at the
end of **L4**.

```
 L0 FOUNDATION ─▶ L1 DESIGN SYSTEM ─▶ L2 DECK ─▶ L3 LANDING ─▶ L4 PRE-SELL ─▶ 🚀 LAUNCH
                                                                                  │
                                                                 L5 LAUNCH OPS ───┤
                                                                 L6 FUTURE OFFERS ┘ (post-validation)
```

### L0 — Foundation  *(Epic 1 — 4 ralph epics: scaffold → architecture-tokens → agent-docs → styleguide)*
- Scaffold Next.js 16 App Router + TS strict + Tailwind 4 + pnpm; `@/` aliases, barrel
  exports, Zod (mirror `esp32-dashboard`).
- App lives in this repo; keep `index.html` as **read-only migration source** (delete after L2).
- Lay the layered skeleton (dirs above) + repository interfaces (empty but typed).
- Extract deck tokens → Tailwind theme; add a **no-hard-coded-values** lint rule.
- Agent docs: `CLAUDE.md` + `agent_docs/{architecture,design-system,content-model,integrations,deck-player}.md`.
- `/styleguide` route stub rendering tokens (the last epic; no test framework, no CI —
  the automated check is the ralph driver's build/lint/typecheck gate, run on this epic).
- Vercel project + env handling.
- **Done when:** builds, deploys to Vercel, lint+typecheck+build green, `/styleguide` shows
  tokens. No separate verify epic — final functional verification is **manual** (the user
  runs the app + checks `/styleguide` by hand).
- **Depends on:** — (domain is a soft dependency).

### L1 — Design system  *(Epic 2)*
- Finalize tokens (colors, Fraunces/Geist/Geist Mono, spacing, radii).
- Atoms (Button, Link, Display/Heading, Lead/Text, Label, Badge, CodeBlock, Callout, Stat,
  Input) → Molecules (FieldRow, PricingTier, FAQItem, TestimonialCard, EmailCaptureForm) →
  Organisms (Navbar w/ persistent buy CTA, Footer).
- Radix for interactive a11y (Dialog, Accordion).
- `/styleguide` renders every token + component in real states.
- **Done when:** styleguide complete, atoms/molecules/organisms reusable, a11y on interactive bits.
- **Depends on:** L0.

### L2 — The Deck  *(Epic 3 — heaviest; sub-batched)*
- Slide-player engine: keyboard/click/swipe nav, progress bar, counter, jump menu,
  multi-state reveal mechanic, SSG (crawlable).
- Extract reusable diagram components (LLMDiagram, ContextWindow, HarnessFrame, Gantt, etc.)
  — these are reused on the landing page.
- Port 88 slides in batches: §0–1 · §2–3 · §4–5 · §6–7 (sub-epics).
- Responsive (reuse 768px breakpoint) + touch; `/deck` open; end CTA + sticky capture; OG image.
- Delete `index.html` once parity confirmed.
- **Done when:** `/deck` matches the original on desktop + mobile, captures email, links to buy.
- **Depends on:** L1.

### L3 — Landing / sales page  *(Epic 4)*
- `/` with the anatomy in §3; typed content (`offers.ts`, `faq.ts`, `testimonials.ts`).
- Persistent header buy CTA; reuse deck diagram components as marketing visuals.
- SEO + per-page OG cards; help-don't-sell copy.
- **Done when:** full sales page renders from typed content, CTAs route to checkout, SEO/OG set.
- **Depends on:** L1 (+ L2 shared visuals).

### L4 — Pre-sell engine  *(Epic 5)* — **first public launch after this**
- Entities + repos: `Subscriber`/`Purchase`, `SubscriberRepository`(`LoopsAdapter`),
  `PurchaseRepository`(`LemonSqueezyAdapter`), `AnalyticsClient`(`AmplitudeAdapter`).
- Server: `SubscribeController/Service`; Lemon checkout creation; webhook handler
  (verify signature → record Purchase → tag founding in Loops → analytics).
- Email capture wired (lead tag) + Loops founding sequence; Lemon checkout at founding
  price; **instant Harness Starter Kit delivery**; thank-you page.
- Legal pages (terms/privacy/refund); EU consent note for Amplitude.
- Verification: build + lint + typecheck gates green (the signup and
  checkout→webhook→access paths verified by hand; no test framework/CI).
- **Done when:** a real founding purchase → Kit downloadable → buyer in Loops, end-to-end.
- **Depends on:** L3.

### L5 — Launch ops  *(Epic 6)*
- Build-log entries (lightweight in-app MDX; the build-in-public founding buyers get).
- Loops launch sequence ("it's live" / founding emails); Amplitude funnel review.
- Perf pass (Lighthouse) + a11y pass + polish.
- **Depends on:** L4.

### L6 — Future offers  *(Epic 7+; gated on validation)*
- Screencast delivery: `VideoAdapter` (Bunny/Mux), `/watch` signed-link player, Loops broadcast.
- Consultation: Cal.com booking + "work with me" offer page + pricing.
- Member area / magic-link auth (when multiple paid offers) — behind existing repo seam.
- Two-tier/bundle pricing.
- **Depends on:** L4/L5.

**Cross-cutting (every layer):** accessibility · responsive · performance · verification (build/lint/typecheck gates) · SEO/OG.

---

## 6. Dependencies, assumptions & open items

- **Domain:** confirm ownership of `beyondtheloop.com` (soft-blocks deploy/branding).
- **Asset:** the **Harness Starter Kit** contents must be packaged from the founder's real
  skills/templates — itemize before L4.
- **Accounts:** Lemon Squeezy, Loops, Amplitude, Vercel accounts/keys provisioned by L4.
- **Pricing numbers** ($29/$49) are tunable until L4 ships.
- **Tax:** Lemon Squeezy (MoR) handles foreign VAT; founder files only Japan income tax.

---

## 7. Decision index

- [ADR-0001](./adr/0001-componentize-the-deck.md) — componentize the deck (not embed)
- [ADR-0002](./adr/0002-layered-architecture-with-repository-ports.md) — layered architecture + ports/adapters
- [ADR-0003](./adr/0003-stripe-as-payment-processor.md) — Lemon Squeezy (MoR) for payments
- [ADR-0004](./adr/0004-no-user-accounts.md) — no accounts; email-based access
- [ADR-0005](./adr/0005-bespoke-atoms-with-radix.md) — bespoke atoms + Radix (not MUI/shadcn)
- [CONTEXT.md](../CONTEXT.md) — domain glossary

---

## 8. Next step

Hand this spec to **`/pre-ralph`** to break each layer (L0–L4 for launch) into bd epics
sized to a per-session token budget, wire dependencies, and write the ralph script — then
go/no-go before execution.
