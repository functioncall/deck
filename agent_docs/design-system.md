# Design System

> How styling works in Beontheloop: one token source, bespoke atoms, and the
> rule that keeps it honest. Fixed by
> [ADR-0005](../docs/adr/0005-bespoke-atoms-with-radix.md) (bespoke atoms + Radix)
> and [ADR-0001](../docs/adr/0001-componentize-the-deck.md) (tokens extracted from
> the deck). This doc explains those decisions — it does not change them.

## The single token source

The **Tailwind 4 `@theme` block in `src/styles/theme.css` is the single styling
source.** Tailwind generates utilities from those theme variables; components
reference theme tokens only — **never raw hex/px**
([ADR-0005](../docs/adr/0005-bespoke-atoms-with-radix.md)). `src/styles/globals.css`
imports Tailwind then the theme:

```css
@import "tailwindcss";
@import "./theme.css";
```

The tokens are **extracted verbatim from `index.html`'s `:root`** — the deck is the
visual source of truth ([ADR-0001](../docs/adr/0001-componentize-the-deck.md)). The
site must be visually identical to the deck (Fraunces / gold `#c89e6e` / near-black
`#0b0c10` editorial aesthetic).

## Extracted tokens

### Colors → `--color-*`

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#0b0c10` | page background (near-black) |
| `--color-bg-soft` | `#14161c` | raised surface |
| `--color-bg-card` | `#181a21` | card surface |
| `--color-ink` | `#ece9e0` | primary text |
| `--color-ink-soft` | `#a4a39c` | secondary text |
| `--color-ink-dim` | `#5c5c58` | muted text |
| `--color-rule` | `#1f2229` | divider / border |
| `--color-rule-soft` | `#16181e` | subtle divider |
| `--color-accent` | `#c89e6e` | gold accent (brand) |
| `--color-accent-soft` | `rgba(200,158,110,0.14)` | accent wash |
| `--color-bad` | `#b06b5a` | negative / "before" |
| `--color-good` | `#8fa982` | positive / "after" |
| `--color-layer-agent` | `#8fa982` | diagram: agent layer |
| `--color-layer-harness` | `#7a96b0` | diagram: harness layer |

Tailwind exposes these as utilities (e.g. `bg-bg`, `text-ink`, `text-accent`,
`border-rule`).

### Fonts → `--font-*`

Wired with `next/font` in `src/app/layout.tsx`; each font exposes a CSS variable
that the theme token consumes, with the deck's fallback chains preserved verbatim:

| Token | Stack |
|---|---|
| `--font-serif` | `var(--font-fraunces), 'Georgia', serif` |
| `--font-sans` | `var(--font-geist), -apple-system, BlinkMacSystemFont, sans-serif` |
| `--font-mono` | `var(--font-geist-mono), 'SF Mono', Menlo, monospace` |

So: **Fraunces** (serif display), **Geist** (sans body), **Geist Mono** (mono
labels/code).

### Type scale (deck source values)

The deck's type scale, to be formalized as atoms in L1 (recorded here so the
values are not lost — these come from the deck's `.display`/`.lead`/`.label`):

- **Display** — serif, weight 300, `clamp(2.5rem, 6.5vw, 5.4rem)`.
- **Display-sm** — serif, `clamp(1.8rem, 3.5vw, 2.8rem)`.
- **Lead** — `clamp(1rem, 1.4vw, 1.15rem)`.
- **Label** — mono, `0.72rem`, uppercase, `letter-spacing: 0.16em`.

## Components: bespoke atoms + Radix

We build atoms ourselves, styled entirely from the extracted tokens, and use
**Radix** headless primitives for interactive / a11y-critical components (Dialog,
Accordion, Popover). **MUI and shadcn/ui were rejected** — a pre-built kit's baked-in
look fights the deck and (MUI) collides with Tailwind-as-single-source
([ADR-0005](../docs/adr/0005-bespoke-atoms-with-radix.md)).

Atoms live in `src/components/atoms/`, then `molecules/`, `organisms/`,
`templates/`. Real components land in **L1** (planned: Button, Link, Display/Heading,
Lead/Text, Label, Badge, CodeBlock, Callout, Stat, Input → FieldRow, PricingTier,
FAQItem, TestimonialCard, EmailCaptureForm → Navbar, Footer). In L0 the barrels are
empty (`export {}`).

## The no-hard-coded-values rule

An ESLint rule (`eslint.config.mjs`) forbids hard-coded color/size literals in
`src/components/**` only — theme, config, and style files may use raw values
(that is where the tokens are *defined*). It rejects, in both string literals and
template strings:

- hex colors (`#0b0c10`, `#fff`),
- color functions (`rgb(...)`, `rgba(...)`, `hsl(...)`, `hsla(...)`),
- size literals with `px` / `rem` / `em`.

Fix a violation by adding/using a **theme token** or a Tailwind utility — never by
inlining the value. The rule is scoped to components so it does not flag the
legitimate raw values in `theme.css`.

## /styleguide — the living catalog

`/styleguide` (`src/app/styleguide/page.tsx`, built in L0's last epic) renders the
token swatches (and, as the system grows, every atom in real states). It uses theme
tokens only — no raw hex/px. It is the visual proof that the extracted tokens
render, and the manual-verification surface for L0. L1 expands it to the full
component catalog.
