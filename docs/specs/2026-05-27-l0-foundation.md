# L0 Foundation — Spec

> Frozen execution spec for the **L0 Foundation** Ralph loop (4 epics). Grounds
> in [docs/SPEC.md](../SPEC.md) (§2 architecture, §5 L0), the five
> [ADRs](../adr/), and [CONTEXT.md](../../CONTEXT.md). Once the loop runs this
> spec is read-only. There is no separate verify epic: the final
> build/lint/typecheck gate runs on the last epic (styleguide), and final
> functional verification is **manual** — the user tests the running app and the
> `/styleguide` page by hand.

---

## Context

Beontheloop is a Next.js brand + pre-sell site (see SPEC §1). The existing
asset is a single 1.28 MB `index.html` — an 88-slide vanilla HTML/CSS/JS deck
whose design tokens and diagrams are the visual source of truth ([ADR-0001](../adr/0001-componentize-the-deck.md)).

L0 lays the **foundation only**: scaffold Next.js 16 / TS strict / Tailwind 4 /
pnpm, stand up the full layered directory skeleton with repository ports and
entity types (no implementations, no DB), extract the deck's design tokens into
the Tailwind theme as the single token source, write the agent docs, and stand
up the `/styleguide` route that renders those tokens (Vercel-ready). No
product surface (landing, deck, checkout) is built here — those are L1+.
There is no test framework or CI — the ralph driver's build/lint/typecheck gate
is the automated check, and final functional verification is manual (the user
tests the running app + `/styleguide` page by hand).

**Done when:** `pnpm install && pnpm lint && pnpm exec tsc --noEmit && pnpm build`
is green and `/styleguide` renders the extracted tokens.

---

## Locked decisions

1. **Componentize the deck** — rebuild as React reusing extracted tokens/diagrams;
   do NOT embed `index.html`. Keep `index.html` at repo root as a read-only
   migration source (deleted in L2, not here). ([ADR-0001](../adr/0001-componentize-the-deck.md))
2. **Full layered clean architecture** — `controller → service → repository`
   with ports & adapters. **No pure pass-through files**: a layer that would do
   nothing is omitted, not stubbed. Services depend on repository *interfaces*;
   adapters are deferred to L4. Entities are TS types; **no DB in L0**.
   ([ADR-0002](../adr/0002-layered-architecture-with-repository-ports.md))
3. **Lemon Squeezy (MoR)** behind `PurchaseRepository` as `LemonSqueezyAdapter`
   — port only in L0, no adapter code. ([ADR-0003](../adr/0003-stripe-as-payment-processor.md))
4. **No user accounts / no auth** — email-based access; nothing auth-related in
   L0. ([ADR-0004](../adr/0004-no-user-accounts.md))
5. **Bespoke atoms from deck tokens + Radix** primitives; reject MUI/shadcn.
   Tailwind 4 theme is the **single styling source — no hard-coded values**.
   ([ADR-0005](../adr/0005-bespoke-atoms-with-radix.md))
6. **Stack (fixed):** Next.js 16 App Router · TypeScript strict · Tailwind 4
   (`@tailwindcss/postcss`) · pnpm · Vercel · Zod · `@/*` path aliases + barrel
   `index.ts` exports. (SPEC §2)

---

## Out of scope (deferred to L1+)

- Real atoms/molecules/organisms beyond token swatches + stubs → **L1**.
- Slide-player engine, diagram components, slide port, `/deck` → **L2**.
- Landing page `/`, typed content (`offers.ts`, `faq.ts`, `testimonials.ts`),
  SEO/OG → **L3**.
- Adapter implementations (`LoopsAdapter`, `LemonSqueezyAdapter`,
  `AmplitudeAdapter`), controllers/services with real logic, webhook handlers,
  `api/` routes → **L4**.
- Any database / persistence layer (`PostgresAdapter`) → deferred per ADR-0002.
- `/watch`, `VideoAdapter`, Cal.com, member area, magic-link → **L6**.
- Deleting `index.html` → **L2** (after parity).
- Provisioning real Vercel/Loops/Lemon/Amplitude accounts + keys → **L4**.

---

## Recon findings (current repo state)

- **Branch:** `feat/l0-foundation` (locked). Base: `main`.
- **`index.html`** (1.28 MB) at repo root — the deck migration source. Design
  tokens live in its `:root` block (verbatim, lines ~14–32):
  - Colors: `--bg #0b0c10`, `--bg-soft #14161c`, `--bg-card #181a21`,
    `--ink #ece9e0`, `--ink-soft #a4a39c`, `--ink-dim #5c5c58`,
    `--rule #1f2229`, `--rule-soft #16181e`, `--accent #c89e6e`,
    `--accent-soft rgba(200,158,110,0.14)`, `--bad #b06b5a`, `--good #8fa982`,
    `--layer-agent #8fa982`, `--layer-harness #7a96b0`.
  - Fonts: `--serif 'Fraunces', 'Georgia', serif`,
    `--sans 'Geist', -apple-system, BlinkMacSystemFont, sans-serif`,
    `--mono 'Geist Mono', 'SF Mono', Menlo, monospace`.
  - Type scale (from `.display`/`.lead`/`.label`): serif display
    `clamp(2.5rem,6.5vw,5.4rem)` weight 300 / display-sm
    `clamp(1.8rem,3.5vw,2.8rem)` / lead `clamp(1rem,1.4vw,1.15rem)` /
    label mono `0.72rem` uppercase `letter-spacing 0.16em`.
- **bd (beads):** initialized (Dolt), `.beads/` present, `bd ready` empty. bd
  authored `CLAUDE.md` (with a BEADS INTEGRATION block — must NOT be clobbered)
  and `AGENTS.md`.
- **No app yet:** no `package.json`, `tsconfig`, `src/`, lockfile, or
  `node_modules`. `.gitignore` only ignores Dolt/db files.
- **Already present:** `docs/SPEC.md`, `docs/adr/0001–0005`, `CONTEXT.md`,
  `scripts/ralph.sh` (the driver), `assets/`, `README.md`.

---

## File structure

```
[~] .gitignore                         add node_modules/ .next/ .DS_Store .env*
[~] CLAUDE.md                          EXTEND (epic-2) — keep BEADS block intact
[+] package.json                       pnpm; scripts dev/build/lint/typecheck
[+] pnpm-lock.yaml                      from pnpm install
[+] tsconfig.json                      strict; paths "@/*": ["src/*"]
[+] next.config.ts
[+] postcss.config.mjs                 @tailwindcss/postcss
[+] eslint.config.mjs                  next + no-hard-coded-values rule
[+] vercel.json                        (epic-3, minimal/optional)
[+] src/app/layout.tsx                 root layout (fonts, globals)
[+] src/app/page.tsx                   placeholder home
[+] src/app/styleguide/page.tsx        (epic-3) token swatches + atom stubs
[+] src/styles/theme.css               (epic-1) @theme — deck tokens
[+] src/styles/globals.css             (epic-1) @import tailwind + theme
[+] src/components/atoms/index.ts      barrel (+ molecules/organisms/templates)
[+] src/components/molecules/index.ts
[+] src/components/organisms/index.ts
[+] src/components/templates/index.ts
[+] src/content/index.ts               barrel
[+] src/lib/email/index.ts             barrel (ports later)
[+] src/lib/payments/index.ts          barrel
[+] src/lib/analytics/index.ts         barrel
[+] src/server/controllers/index.ts    barrel
[+] src/server/services/index.ts       barrel
[+] src/types/entities.ts              Subscriber, Purchase, Offer
[+] src/types/repositories.ts          SubscriberRepository, PurchaseRepository
[+] src/types/index.ts                 barrel re-export
[+] agent_docs/architecture.md         (epic-2)
[+] agent_docs/design-system.md        (epic-2)
[+] agent_docs/content-model.md        (epic-2)
[+] agent_docs/integrations.md         (epic-2)
[+] agent_docs/deck-player.md          (epic-2)
[-] (nothing deleted in L0)
```

`index.html`, `.beads/`, `.claude/`, `AGENTS.md`, `docs/`, `assets/` are
preserved untouched (CLAUDE.md is extended, never clobbered).

---

## Public APIs

Entity types (`src/types/entities.ts`) — TS types only, no DB:

```ts
// Anyone who gave an email: to follow along (free) or as part of a Pre-sell.
export type Subscriber = {
  email: string;
  tags: SubscriberTag[];          // e.g. "lead" | "founding"
  createdAt: string;              // ISO 8601
};
export type SubscriberTag = 'lead' | 'founding';

// A completed Pre-sell transaction (recorded by Lemon Squeezy today).
export type Purchase = {
  id: string;                     // provider purchase/order id
  email: string;
  offerId: Offer['id'];
  amountCents: number;            // locked founding price at purchase time
  currency: string;              // ISO 4217, e.g. "USD"
  createdAt: string;              // ISO 8601
};

// Umbrella for anything Beontheloop sells or gives away.
export type Offer = {
  id: string;                     // stable slug, e.g. "harness-starter-kit"
  name: string;
  kind: 'free' | 'paid';
  priceCents: number | null;      // null for free offers
};
```

Repository ports (`src/types/repositories.ts`) — interfaces only, no
implementations in L0 (adapters land in L4):

```ts
import type { Subscriber, Purchase } from '@/types/entities';

export interface SubscriberRepository {
  findByEmail(email: string): Promise<Subscriber | null>;
  upsert(subscriber: Subscriber): Promise<Subscriber>;
  addTag(email: string, tag: Subscriber['tags'][number]): Promise<void>;
}

export interface PurchaseRepository {
  findById(id: string): Promise<Purchase | null>;
  record(purchase: Purchase): Promise<Purchase>;
}
```

Barrel `src/types/index.ts` re-exports both. (No-pass-through guardrail: these
are interface/type files — legitimate work — not stubbed pass-through layers.)

---

## Architecture by concern

- **Layering (ADR-0002):** `app/api route → Controller (Zod) → Service
  (business rules) → Repository (interface) → Adapter`. In L0 only the *shapes*
  exist: `src/server/{controllers,services}` barrels and `src/types` ports.
  Real controllers/services/adapters are L4. The no-pass-through rule means L0
  ships only files with real content (types, ports, barrels, config, tokens) —
  no empty stub classes.
- **Design tokens (ADR-0005):** the single source is the Tailwind 4 `@theme`
  block in `src/styles/theme.css`, populated verbatim from `index.html`'s
  `:root` (colors → `--color-*`, fonts → `--font-*`, mapped to Tailwind 4
  theme-variable conventions). `globals.css` imports Tailwind + the theme.
  Components reference theme tokens only — **never raw hex/px**. An ESLint rule
  forbids hard-coded color/size literals in `src/components/**`.
- **Fonts:** Fraunces / Geist / Geist Mono, wired via `next/font` (or
  equivalent) in `src/app/layout.tsx`, exposed as the `--font-*` theme vars.
- **Aliases + barrels:** `@/*` → `src/*` in `tsconfig`; each layer dir has an
  `index.ts` barrel so imports stay `@/components/atoms` etc.
- **Verification:** no test framework and no CI. The automated check is the
  ralph driver's gate — `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build`
  — run on the last epic (styleguide). The agent never runs tests. Final
  functional verification is **manual**: the user runs the app and confirms
  `/styleguide` renders the extracted tokens by hand.
- **Deploy:** Vercel-ready via framework defaults (minimal `vercel.json` only if
  needed).

---

## Per-epic specifications

Each epic is one fresh session = one commit. The bd issue (`bd show <id>`) holds
the full CONTEXT/STEPS/ACCEPTANCE/HARD-RULES; this is the contract summary.

### epic-0 — scaffold
pnpm Next.js 16 App Router + TS strict (`tsconfig` paths `@/*`) + Tailwind 4
(`@tailwindcss/postcss`) + `package.json` scripts (`dev`/`build`/`lint`/
`typecheck`) + `src/app` (root layout + placeholder page) + extend
`.gitignore` (node_modules, .next, .DS_Store, .env*). Run `pnpm install` so a
lockfile + node_modules exist. Preserve `index.html`.
**Commit:** `l0 epic-0 scaffold: next.js 16 + ts strict + tailwind 4 + pnpm`

### epic-1 — architecture-tokens
Layered dir skeleton (`src/components/{atoms,molecules,organisms,templates}`,
`src/content`, `src/lib/{email,payments,analytics}`, `src/server/{controllers,
services}`, `src/types`, `src/styles`) with barrel `index.ts`s; repository
interfaces (`SubscriberRepository`, `PurchaseRepository`) + entity types
(`Subscriber`, `Purchase`, `Offer`) in `src/types`; extract deck tokens from
`index.html` into the Tailwind theme (`src/styles`, `@theme`) + globals; add an
ESLint rule/config forbidding hard-coded color/size literals in components.
**Commit:** `l0 epic-1 architecture-tokens: layered skeleton + repo ports + deck tokens`

### epic-2 — agent-docs
Create `agent_docs/{architecture,design-system,content-model,integrations,
deck-player}.md`; EXTEND `CLAUDE.md` with project conventions (layered-arch
rules + no-pass-through guardrail, no-hard-coded-values rule, where each thing
lives, the "don'ts") WITHOUT removing bd's existing BEADS INTEGRATION block.
**Commit:** `l0 epic-2 agent-docs: CLAUDE.md conventions + agent_docs deep-dives`

### epic-3 — styleguide (final epic — carries the gate)
`/styleguide` route rendering token swatches + any atoms present (stub fine),
using theme tokens only (no raw hex/px); ensure `pnpm build` stays green.
Vercel-ready (defaults or minimal `vercel.json`). No tests, no CI. As the last
epic this is where the driver runs the full **build + lint + typecheck** gate
(`VERIFY_GATE`). There is no separate verify epic; **final functional
verification is manual** — the user runs the app and confirms `/styleguide`
renders the extracted tokens by hand (see checklist below).
**Commit:** `l0 epic-3 styleguide: /styleguide route renders tokens`

---

## Verification checklist (final — automated gate + manual review)

Automated portion runs as the driver's gate on the styleguide epic; the
`/styleguide` render check is performed manually by the user against the
running app.

- [ ] `pnpm install` resolves; `pnpm-lock.yaml` committed.
- [ ] `pnpm lint` passes (incl. the no-hard-coded-values rule).
- [ ] `pnpm exec tsc --noEmit` passes (TS strict, no errors).
- [ ] `pnpm build` succeeds (Next.js 16 production build).
- [ ] `/styleguide` renders the extracted deck tokens (colors, fonts).
- [ ] `src/types/{entities,repositories}.ts` export the documented types/ports.
- [ ] Tailwind `@theme` carries the verbatim deck token values; no raw hex/px in
      `src/components/**`.
- [ ] `index.html`, `.beads/`, `.claude/`, `AGENTS.md` untouched; `CLAUDE.md`
      retains its BEADS INTEGRATION block AND has the new conventions section.

---

## Risk register

| Risk | Impact | Mitigation |
|---|---|---|
| Next.js 16 / Tailwind 4 init flags drift from create defaults | epic-0 build red | Pin via `create-next-app` then adjust; `LEAN_GATE` (`pnpm install && pnpm build`) catches it immediately after epic-0. |
| `LEAN_GATE` runs `pnpm build` after every epic — a broken token import would fail build | loop halts mid-phase | Keep token CSS valid Tailwind 4 `@theme`; epic-1 must leave build green. |
| `/styleguide` references a token/atom that does not yet exist | epic-3 build red | Render only tokens that exist in `theme.css`; stub atoms are fine. The `VERIFY_GATE` (lint + `tsc --noEmit` + `pnpm build`) catches it. |
| ESLint "no hard-coded values" rule too aggressive (flags legit literals outside components) | lint red | Scope the rule to `src/components/**` only; allow theme/config files. |
| `pnpm build` could fail before epic-3 if `/styleguide` referenced too early | premature halt | `/styleguide` lands in epic-3; epics 0–2 keep only placeholder `page.tsx`. |
| bd hooks auto-commit `.beads/` | noise, not failure | Expected and tolerated per the task brief. |

---

## What this plan does NOT change

- Does not embed or delete `index.html` (kept as migration source; deleted in L2).
- Does not implement any adapter, controller, service, or `api/` route.
- Does not add a database or any persistence.
- Does not build real atoms/molecules/organisms, the deck, or the landing page.
- Does not provision real third-party accounts or read any `.env` secrets.
- Does not clobber bd's `CLAUDE.md` BEADS block, `AGENTS.md`, `.beads/`, or `.claude/`.
- Does not switch branches off `feat/l0-foundation` or run the Ralph loop.
- Does not add dependencies beyond the fixed stack (+ Radix, Zod).
```
