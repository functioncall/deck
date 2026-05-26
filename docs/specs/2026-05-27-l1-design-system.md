# L1 Design System — Spec

> Frozen execution spec for the **L1 Design System** Ralph loop (5 epics). Grounds
> in [docs/SPEC.md](../SPEC.md) (§2 architecture, §5 L1), the five
> [ADRs](../adr/) — esp. [ADR-0005](../adr/0005-bespoke-atoms-with-radix.md) —
> [agent_docs/design-system.md](../../agent_docs/design-system.md) (authoritative
> for how atoms are built), and [CONTEXT.md](../../CONTEXT.md). Once the loop runs
> this spec is read-only. There is no separate verify epic: the full
> build/lint/typecheck gate runs on the last epic (templates+styleguide), and final
> functional verification is **manual** — the user opens `/styleguide` and confirms
> every atom / molecule / organism renders in its real states.

---

## Context

BeyondTheLoop is a Next.js brand + pre-sell site (see SPEC §1). L0 laid the
foundation: Next.js 16 / TS strict / Tailwind 4 / pnpm, the layered directory
skeleton with repository ports + entity types, the deck design tokens extracted
verbatim into the Tailwind `@theme` (`src/styles/theme.css`), the
no-hard-coded-values ESLint rule scoped to `src/components/**`, the agent docs,
and a `/styleguide` route that renders the token swatches. The four component
barrels (`atoms`, `molecules`, `organisms`, `templates`) are empty (`export {}`).

L1 builds the **design system only**: the bespoke component library, foundation-up.
Atoms styled entirely from the L0 tokens (no raw hex/px) → molecules composed from
atoms → organisms (including Radix-backed interactive/a11y components) → a
`MarketingPageTemplate` plus an expanded `/styleguide` that renders the whole
catalog in real states. No product surface (the deck, the landing page, checkout)
is built here — those are L2+. The components are the reusable vocabulary L3 will
assemble into the sales page and L2 will reuse for the deck chrome.

The visual source of truth is `index.html` (ADR-0001): atoms map to its existing
patterns — `.display`/`.display-sm` → Display, `.lead` → Lead, `.label` → Label,
`.code`/`.code-title` → CodeBlock, `.callout` → Callout, `.stat` → Stat,
`.tool-chip` → Badge. Button, Link, Input, and the organisms (Navbar, Footer, Hero,
Dialog, Accordion) are net-new marketing surfaces built from the same tokens — the
deck is a slideshow and has no buttons/nav of its own.

**Done when:** `pnpm install && pnpm lint && pnpm exec tsc --noEmit && pnpm build`
is green and `/styleguide` renders every atom, molecule, and organism in real
states (incl. interactive Radix components operable by keyboard).

---

## Locked decisions

1. **Bespoke atoms from deck tokens + Radix** — build components ourselves, styled
   **only** from the L0 theme tokens; **no hard-coded color/size literals** in
   `src/components/**` (enforced by the L0 ESLint rule). Use **Radix** headless
   primitives for interactive / a11y-critical components (Dialog, Accordion).
   **Reject MUI / shadcn.** ([ADR-0005](../adr/0005-bespoke-atoms-with-radix.md))
2. **Single styling source** — the Tailwind 4 `@theme` block in `src/styles/theme.css`
   is the only place raw values live. Components reference theme tokens via the
   generated utilities (`bg-bg`, `text-ink`, `text-accent`, `border-rule`,
   `font-serif`, etc.) only. Fix a lint violation with a token/utility, never an
   inline value. ([ADR-0005](../adr/0005-bespoke-atoms-with-radix.md))
3. **Layered, atomic, barrelled** — `atoms → molecules → organisms → templates`,
   each composed from the layer below; each layer dir exports through its
   `index.ts` barrel; imports use `@/components/*` aliases, never deep relative
   cross-layer paths. **No pure pass-through files** — every component does a real
   job. ([ADR-0002](../adr/0002-layered-architecture-with-repository-ports.md))
4. **Allowed new deps:** `@radix-ui/*` primitive packages (Dialog, Accordion) per
   ADR-0005, and a class-merge util (`clsx` + `tailwind-merge`) if a `cn()` helper
   is needed for variant composition. **No other new deps** without flagging — no
   MUI, no shadcn, no icon/animation kits. (SPEC §2; ADR-0005)
5. **Stack (fixed):** Next.js 16 App Router · TypeScript strict · Tailwind 4 ·
   pnpm · `@/*` path aliases + barrel `index.ts` exports. (SPEC §2)
6. **No accounts / no auth / no DB / no adapters** — nothing server-side in L1;
   this is pure presentation. EmailCaptureForm is **markup + client validation
   only**; it does not POST anywhere (the `/api/subscribe` wiring is L4).
   ([ADR-0002](../adr/0002-layered-architecture-with-repository-ports.md),
   [ADR-0004](../adr/0004-no-user-accounts.md))

---

## Out of scope (deferred)

- Slide-player engine, diagram components (LLMDiagram, ContextWindow, HarnessFrame,
  Gantt), slide port, `/deck` → **L2**.
- The landing page `/`, typed content (`offers.ts`, `faq.ts`, `testimonials.ts`),
  SEO/OG cards → **L3**. (L1 components render from inline sample data in the
  styleguide; real typed content is L3.)
- `EmailCaptureForm` → `/api/subscribe` wiring, controllers/services, adapters,
  webhook handlers → **L4**. L1 ships the form markup + client-side validation
  only; submit is a no-op stub.
- Any database / persistence → deferred per ADR-0002.
- `/watch`, `VideoAdapter`, Cal.com, member area, magic-link → **L6**.
- Deleting `index.html` → **L2** (after parity). It stays the read-only visual
  reference throughout L1.

---

## Recon findings (current src/components state)

- **Branch:** `feat/l1-design-system` (locked), stacked on `feat/l0-foundation`
  (base). Both branches currently at the same HEAD; L1 has no commits yet.
- **Component barrels — all empty:** `src/components/{atoms,molecules,organisms,templates}/index.ts`
  each contain only `export {}` with a comment noting real components land in L1.
- **Tokens (single source):** `src/styles/theme.css` `@theme` block exposes
  `--color-{bg,bg-soft,bg-card,ink,ink-soft,ink-dim,rule,rule-soft,accent,accent-soft,bad,good,layer-agent,layer-harness}`
  and `--font-{serif,sans,mono}`. Tailwind generates `bg-*`, `text-*`, `border-*`,
  `font-*` utilities from these. `globals.css` imports tailwind + theme; body uses
  tokens. **No new tokens are required for L1** — the L0 set is sufficient.
- **ESLint:** `eslint.config.mjs` already forbids hard-coded color/size literals
  (hex, `rgb/rgba/hsl`, `px/rem/em`) in `src/components/**` only. Any new component
  must pass it.
- **Styleguide:** `src/app/styleguide/page.tsx` renders color/font/type-scale
  swatches and an "Atoms" section that iterates `Object.keys(atoms)` — currently
  empty-state copy. It is designed to grow into the full catalog.
- **Deps present:** `next 16.2.6`, `react 19.2.4`, `tailwindcss ^4`,
  `@tailwindcss/postcss`, `eslint 9`, `typescript 5`. **Absent (to add in L1):**
  `@radix-ui/react-dialog`, `@radix-ui/react-accordion`, and (optional) `clsx` +
  `tailwind-merge`.
- **Visual reference patterns in `index.html`:** `.display` (serif 300,
  `clamp(2.5rem,6.5vw,5.4rem)`, `.accent` gold-italic variant), `.display-sm`
  (serif 400, `clamp(1.8rem,3.5vw,2.8rem)`), `.lead` (sans, `clamp(1rem,1.4vw,1.15rem)`,
  `max-width 720px`), `.label` (mono `0.72rem` uppercase `letter-spacing 0.16em`,
  `.accent` variant), `.code` (`bg-card`, `border rule`, mono, `kw`/`str`/`cmt`/`num`
  spans) + `.code-title`, `.callout` (◆ accent marker + sans body, `strong` = ink),
  `.stat` (serif gold `.num` tabular-nums + mono uppercase `.lbl`), `.tool-chip`
  (mono, `bg-soft`, `border rule`, small radius). No button/nav/footer exists in the
  deck — those are designed fresh from tokens.

---

## File structure

```
[+] src/components/atoms/Button.tsx              variant/size button (token-only)
[+] src/components/atoms/Link.tsx                styled anchor (next/link wrapper)
[+] src/components/atoms/Heading.tsx             Display + Display-sm (as/level)
[+] src/components/atoms/Text.tsx                Lead + body text
[+] src/components/atoms/Label.tsx               mono uppercase eyebrow
[~] src/components/atoms/index.ts                EXTEND barrel — export all atoms
[+] src/components/atoms/Badge.tsx               tool-chip / pill
[+] src/components/atoms/CodeBlock.tsx           .code surface + optional title
[+] src/components/atoms/Callout.tsx             ◆-marked annotation line/block
[+] src/components/atoms/Stat.tsx                serif num + mono label
[+] src/components/atoms/Input.tsx               text/email input (token-only)
[+] src/components/molecules/FieldRow.tsx        Label + Input + error/help
[+] src/components/molecules/PricingTier.tsx     price + features + CTA
[+] src/components/molecules/FAQItem.tsx         Q/A pair (semantic; Radix item in organism)
[+] src/components/molecules/TestimonialCard.tsx quote + attribution
[+] src/components/molecules/EmailCaptureForm.tsx FieldRow + Button (markup+client validation; no POST)
[+] src/components/molecules/CTAButtonGroup.tsx  primary + secondary Button row
[~] src/components/molecules/index.ts            EXTEND barrel — export all molecules
[+] src/components/organisms/Navbar.tsx          wordmark + nav + persistent buy CTA
[+] src/components/organisms/Footer.tsx          links + legal + brand line
[+] src/components/organisms/Hero.tsx            Display + Lead + CTAButtonGroup + Stats
[+] src/components/organisms/Dialog.tsx          Radix Dialog (token-styled)
[+] src/components/organisms/Accordion.tsx       Radix Accordion → FAQ list (FAQItem)
[~] src/components/organisms/index.ts            EXTEND barrel — export all organisms
[+] src/components/templates/MarketingPageTemplate.tsx  Navbar + slotted sections + Footer
[~] src/components/templates/index.ts            EXTEND barrel — export the template
[+] src/lib/cn.ts (optional)                     clsx + tailwind-merge class helper
[~] src/app/styleguide/page.tsx                  EXTEND — render every component in real states
[~] package.json / pnpm-lock.yaml                add @radix-ui/* (+ optional clsx, tailwind-merge)
[-] (nothing deleted in L1)
```

`index.html`, `.beads/`, `.claude/`, `AGENTS.md`, `docs/`, `assets/`,
`src/styles/*`, `src/types/*`, `eslint.config.mjs` are preserved untouched.
`CLAUDE.md` is NOT modified in L1.

---

## Public APIs

Each component is a typed React function component. Props are TS-strict; variants
are string unions, never free strings. (Signatures are the contract; the
implementation chooses the exact token utility per variant.)

```ts
// atoms/Button.tsx
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';   // primary = gold accent
  size?: 'sm' | 'md' | 'lg';
};

// atoms/Link.tsx  (wraps next/link; styled anchor)
type LinkProps = React.ComponentProps<typeof import('next/link').default> & {
  variant?: 'default' | 'muted' | 'accent';
};

// atoms/Heading.tsx  (the deck .display / .display-sm)
type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3';
  size?: 'display' | 'display-sm';
  children: React.ReactNode;
  className?: string;
};

// atoms/Text.tsx  (the deck .lead + body)
type TextProps = {
  variant?: 'lead' | 'body' | 'soft';
  as?: 'p' | 'span';
  children: React.ReactNode;
  className?: string;
};

// atoms/Label.tsx  (the deck .label — mono uppercase eyebrow)
type LabelProps = { accent?: boolean; children: React.ReactNode; className?: string };

// atoms/Badge.tsx  (the deck .tool-chip)
type BadgeProps = { children: React.ReactNode; className?: string };

// atoms/CodeBlock.tsx  (the deck .code + optional .code-title)
type CodeBlockProps = { title?: string; children: React.ReactNode; className?: string };

// atoms/Callout.tsx  (the deck .callout — ◆ marker)
type CalloutProps = { children: React.ReactNode; className?: string };

// atoms/Stat.tsx  (the deck .stat — serif num + mono label)
type StatProps = { value: string; label: string; className?: string };

// atoms/Input.tsx
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

// molecules/FieldRow.tsx
type FieldRowProps = { label: string; htmlFor: string; error?: string; help?: string; children: React.ReactNode };

// molecules/PricingTier.tsx
type PricingTierProps = { name: string; price: string; note?: string; features: string[]; cta: React.ReactNode; featured?: boolean };

// molecules/FAQItem.tsx
type FAQItemProps = { question: string; answer: React.ReactNode };

// molecules/TestimonialCard.tsx
type TestimonialCardProps = { quote: string; name: string; title?: string };

// molecules/EmailCaptureForm.tsx  (markup + client validation only; no POST in L1)
type EmailCaptureFormProps = { cta?: string; placeholder?: string; onSubmit?: (email: string) => void };

// molecules/CTAButtonGroup.tsx
type CTAButtonGroupProps = { primary: React.ReactNode; secondary?: React.ReactNode; className?: string };

// organisms/Navbar.tsx  (persistent buy CTA)
type NavbarProps = { links?: { href: string; label: string }[]; cta: React.ReactNode };

// organisms/Footer.tsx
type FooterProps = { links?: { href: string; label: string }[] };

// organisms/Hero.tsx
type HeroProps = { eyebrow?: string; title: React.ReactNode; lead: React.ReactNode; cta: React.ReactNode; stats?: { value: string; label: string }[] };

// organisms/Dialog.tsx  (Radix Dialog, token-styled)
type DialogProps = { trigger: React.ReactNode; title: string; description?: string; children: React.ReactNode };

// organisms/Accordion.tsx  (Radix Accordion → FAQ list)
type AccordionProps = { items: { question: string; answer: React.ReactNode }[]; type?: 'single' | 'multiple' };

// templates/MarketingPageTemplate.tsx
type MarketingPageTemplateProps = { nav: React.ReactNode; footer: React.ReactNode; children: React.ReactNode };
```

Each layer's `index.ts` barrel re-exports its components (named exports) so the
styleguide and downstream layers import via `@/components/{atoms,molecules,organisms,templates}`.

---

## Architecture by concern

- **Layering (ADR-0002):** strict atomic composition — atoms hold no other
  components; molecules compose atoms; organisms compose molecules/atoms (+ Radix);
  the template composes organisms. No layer reaches sideways or upward. Each layer's
  barrel is the only import surface. No pure pass-through components: a wrapper that
  adds nothing is omitted, not shipped.
- **Tokens (ADR-0005):** every visual value resolves to a Tailwind utility
  generated from the L0 `@theme` (e.g. `bg-accent`, `text-ink-soft`, `border-rule`,
  `font-serif`, `rounded`, spacing scale). The component code carries **zero** raw
  hex/px — the no-hard-coded-values ESLint rule (scoped to `src/components/**`) is
  the enforcement. Type scale (display/lead/label) reproduces the deck values using
  Tailwind's font/size/tracking utilities; where a one-off clamp is unavoidable it
  lives in `theme.css` as a token, never inline in a component.
- **Variant composition:** variants are string-union props mapped to className
  records inside each component; optional `cn()` helper (`clsx` + `tailwind-merge`,
  `src/lib/cn.ts`) merges base + variant + caller `className`. Full Tailwind class
  strings appear as literals so the JIT scanner emits them.
- **Radix (ADR-0005):** interactive/a11y components (`Dialog`, `Accordion`) wrap
  `@radix-ui/react-dialog` / `@radix-ui/react-accordion` headless primitives and
  style their parts with tokens only. Radix provides focus management, ARIA, and
  keyboard operation; we provide the deck's look. `FAQItem` is the semantic content
  shape; `Accordion` renders a list of them as a Radix accordion (the FAQ surface).
- **Client vs server:** presentational atoms/molecules/organisms are server
  components by default; only the Radix-backed and stateful ones (`Dialog`,
  `Accordion`, `EmailCaptureForm`) are `'use client'`. `EmailCaptureForm` validates
  email client-side and calls an optional `onSubmit`; it does **not** POST (L4).
- **Styleguide as catalog:** `/styleguide` imports each barrel and renders every
  component in its real states (Button variants×sizes, Link variants, headings,
  text, labels, badges, a code block with title, callouts, stats, inputs incl.
  invalid, all molecules with sample data, Navbar/Footer/Hero, an open-able Dialog,
  and a working Accordion/FAQ). It uses tokens only. It is the manual-verification
  surface and the regression guard (it imports everything, so a broken export fails
  the build).
- **Verification:** no test framework, no CI. The driver runs `LEAN_GATE`
  (`pnpm install && pnpm build`) after every epic and `VERIFY_GATE`
  (`pnpm install && pnpm lint && pnpm exec tsc --noEmit && pnpm build`) on the last
  (templates+styleguide) epic. The agent never runs tests. Final functional
  verification is **manual**: the user opens `/styleguide` and exercises the
  interactive components by hand.

---

## Per-epic specifications

Each epic is one fresh session = one commit, sized to the ~70k working-token
heuristic. The bd issue (`bd show <id>`) holds the full
CONTEXT/STEPS/ACCEPTANCE/HARD-RULES; this is the contract summary. The atoms layer
is **split into two epics** — text/structural atoms, then interactive + code/data
atoms — because building ten token-only atoms (plus their styleguide wiring) in one
session would exceed the budget.

### epic-0 — atoms-text  (text & structural atoms)
Build the token-only display/text atoms: `Heading` (Display / Display-sm, `as`
level), `Text` (lead/body/soft), `Label` (mono uppercase, accent variant), `Link`
(next/link wrapper, variants), `Badge` (the `.tool-chip`). Extend the atoms barrel
to export them. All styled from tokens only; no Radix here.
**Commit:** `l1 epic-0 atoms-text: heading, text, label, link, badge`

### epic-1 — atoms-interactive  (interactive + code/data atoms)
Build `Button` (primary/secondary/ghost × sm/md/lg), `Input` (incl. `invalid`),
`CodeBlock` (`.code` surface + optional title, kw/str/cmt token spans), `Callout`
(◆ accent marker + sans body, `strong` = ink), `Stat` (serif tabular-nums num +
mono uppercase label). Optionally add `src/lib/cn.ts` (clsx + tailwind-merge) if
needed for Button variants. Extend the atoms barrel.
**Commit:** `l1 epic-1 atoms-interactive: button, input, codeblock, callout, stat`

### epic-2 — molecules
Compose atoms into `FieldRow` (Label+Input+error/help), `PricingTier`
(name/price/features + CTA slot, `featured`), `FAQItem` (semantic Q/A shape),
`TestimonialCard` (quote + attribution), `EmailCaptureForm` (FieldRow + Button,
client-side email validation, no POST), `CTAButtonGroup` (primary + optional
secondary). Extend the molecules barrel. No new server code.
**Commit:** `l1 epic-2 molecules: fieldrow, pricingtier, faqitem, testimonialcard, emailcaptureform, ctabuttongroup`

### epic-3 — organisms
Build `Navbar` (wordmark + nav links + persistent buy CTA slot), `Footer` (links +
legal + brand line), `Hero` (eyebrow/Heading/Text/CTAButtonGroup + optional Stats).
Add Radix-backed interactive organisms: `Dialog` (`@radix-ui/react-dialog`) and
`Accordion` (`@radix-ui/react-accordion`) rendering a list of `FAQItem`s as the FAQ
surface — both token-styled, keyboard-operable, ARIA correct. Add the
`@radix-ui/*` deps. Extend the organisms barrel.
**Commit:** `l1 epic-3 organisms: navbar, footer, hero, dialog, accordion`

### epic-4 — templates-styleguide  (final epic — carries the gate)
Build `MarketingPageTemplate` (Navbar + slotted section children + Footer). EXTEND
`/styleguide` to render every atom, molecule, and organism in its real states
(variants, sizes, invalid input, an open-able Dialog, a working Accordion/FAQ,
Navbar/Footer/Hero with sample data) using tokens only. Extend the templates
barrel. As the last epic this is where the driver runs the full
**lint + typecheck + build** gate (`VERIFY_GATE`). No separate verify epic; **final
functional verification is manual** — the user opens `/styleguide` (see checklist).
**Commit:** `l1 epic-4 templates-styleguide: marketingpagetemplate + full /styleguide catalog`

---

## Verification checklist (final — automated gate + manual review)

Automated portion runs as the driver's gate on the templates-styleguide epic; the
`/styleguide` render + interaction checks are performed manually by the user.

- [ ] `pnpm install` resolves; `pnpm-lock.yaml` updated with `@radix-ui/*` (+ any cn deps).
- [ ] `pnpm lint` passes — **no raw design literals** (no hex / `rgb`-`rgba`-`hsl` /
      `px`-`rem`-`em`) anywhere in `src/components/**`.
- [ ] `pnpm exec tsc --noEmit` passes (TS strict, no errors; props typed, no `any`).
- [ ] `pnpm build` succeeds (Next.js 16 production build).
- [ ] Every atom barrel export resolves: Button, Link, Heading, Text, Label, Badge,
      CodeBlock, Callout, Stat, Input.
- [ ] Every molecule barrel export resolves: FieldRow, PricingTier, FAQItem,
      TestimonialCard, EmailCaptureForm, CTAButtonGroup.
- [ ] Every organism barrel export resolves: Navbar, Footer, Hero, Dialog, Accordion.
- [ ] `MarketingPageTemplate` exported from the templates barrel.
- [ ] `/styleguide` renders every atom / molecule / organism in real states.
- [ ] Dialog opens/closes and Accordion expands/collapses **via keyboard** (Radix a11y).
- [ ] Components are visually consistent with the deck (`index.html`) aesthetic.
- [ ] Only `@radix-ui/*` (+ optional clsx/tailwind-merge) were added; no MUI/shadcn.
- [ ] `index.html`, `.beads/`, `.claude/`, `AGENTS.md`, `CLAUDE.md`, `src/styles/*`,
      `src/types/*` untouched.

---

## Risk register

| Risk | Impact | Mitigation |
|---|---|---|
| **epic-3 (organisms) is the heaviest** — 5 components incl. two Radix integrations + a new dep install in one session | budget overrun / red gate | Radix primitives are headless (we only style parts); Navbar/Footer/Hero are simple token markup; FAQItem already built in epic-2 so Accordion just maps it. If it overruns, split organisms into static (navbar/footer/hero) + Radix (dialog/accordion). |
| Atoms layer too heavy for one session (10 atoms + styleguide wiring) | budget overrun | **Already split** into epic-0 (text/structural) + epic-1 (interactive + code/data). |
| `LEAN_GATE` runs `pnpm build` after every epic; a bad import halts the loop | loop halts mid-phase | Each epic extends barrels + (epic-4) styleguide; keep every committed state importable and building. |
| `/styleguide` references a component not yet built | epic build red | Styleguide is extended only in the final epic; earlier epics just add components + barrel exports. |
| Radix package version drift vs Next 16 / React 19 | epic-3 build red | Install latest `@radix-ui/react-dialog` + `@radix-ui/react-accordion` (React 19 compatible); `LEAN_GATE` catches a bad resolve immediately. |
| no-hard-coded-values rule flags a legit Tailwind class (false positive) | lint red on VERIFY_GATE | Rule is scoped to literals (hex/rgb/px-rem-em), not Tailwind class names; express all sizing via utilities/tokens. If a clamp is unavoidable, add a token in `theme.css`, not an inline value. |
| Accidentally adding a server POST to EmailCaptureForm | scope creep into L4 | HARD RULE: form is markup + client validation only; submit is a no-op / `onSubmit` callback. |
| bd hooks auto-commit `.beads/` | noise, not failure | Expected and tolerated per the task brief. |

---

## What this plan does NOT change

- Does not build the deck, the landing page `/`, or any checkout / API route.
- Does not add typed content files (`offers.ts`, `faq.ts`, `testimonials.ts`) — L3.
- Does not wire `EmailCaptureForm` to a server / `/api/subscribe` — L4.
- Does not implement any adapter, controller, service, repository, or DB.
- Does not add new design tokens — the L0 `@theme` set is the source; `theme.css` is untouched.
- Does not add dependencies beyond `@radix-ui/*` (+ optional clsx / tailwind-merge);
  no MUI, no shadcn.
- Does not modify `CLAUDE.md`, `AGENTS.md`, `.beads/`, `.claude/`, `src/types/*`,
  `src/styles/*`, or `eslint.config.mjs`.
- Does not embed, edit, or delete `index.html` (read-only visual reference; deleted in L2).
- Does not switch branches off `feat/l1-design-system` or run the Ralph loop.
```
