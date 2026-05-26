# Deck Player

> The **Deck** is the free, interactive presentation — **"the map"** — that teaches
> the thesis and is the trust-engine for the paid offers ([CONTEXT.md](../CONTEXT.md)).
> The plan to rebuild it is fixed in
> [ADR-0001](../docs/adr/0001-componentize-the-deck.md). This doc explains that plan.
> The deck itself is built in **L2** — none of it exists in L0.

## Componentize, don't embed

The existing deck is a 1.28 MB self-contained `index.html` (88 slides, bespoke
vanilla HTML/CSS/JS). We **extract its design tokens and diagram/visual components
into the design system and rebuild the deck as a React slide-player that reuses
them** — we do **not** embed the original file as a black-box route/iframe
([ADR-0001](../docs/adr/0001-componentize-the-deck.md)).

**Why:** the deck's diagrams (LLM loop, context window, harness frame, stats,
callouts, code blocks) are also the **best marketing visuals** — they must be
reusable components so the **Deck (L2)** and the **landing page (L3)** share one
source of truth. Embedding would create two diverging design languages, block
visual reuse on the sales page, and carry a 1.28 MB performance hit.

## Reusable diagram components — shared by /deck and landing

The visuals are extracted as **components**, not redrawn per page. Planned in L2,
reused in L3 (names indicative): `LLMDiagram`, `ContextWindow`, `HarnessFrame`,
`Gantt`, plus shared `Stat` / `Callout` / `CodeBlock` atoms. The layer-color tokens
already extracted in L0 (`--color-layer-agent`, `--color-layer-harness`) are for
these diagrams — see [design-system.md](./design-system.md).

## The slide-player engine (L2)

Built in L2 (the heaviest layer, sub-batched): keyboard / click / swipe nav,
progress bar + counter, jump menu, the multi-state **reveal** mechanic, and **SSG**
so the deck is crawlable. Responsive (reuse the deck's 768px breakpoint) + touch.
`/deck` is open and shareable, with an end-of-deck soft email capture + sticky bar
and CTAs back to `/` and to buy. The 88 slides are ported in batches (§0–1, §2–3,
§4–5, §6–7).

## index.html is a read-only migration source

`index.html` stays at the repo root as the **read-only visual source of truth** —
the authority on tokens, diagrams, and layout while the deck is rebuilt.

- **Do not embed it. Do not edit it. Do not delete it in L0.**
- It is **deleted in L2**, only **after** `/deck` parity is confirmed on desktop +
  mobile ([ADR-0001](../docs/adr/0001-componentize-the-deck.md), SPEC §5 L2).

## Pragmatic fallback

If the full slide rebuild proves too costly, the accepted retreat is **hybrid-lite**:
keep the extracted tokens + a few hero diagrams as components and embed the
remainder per-slide. This is a per-slide fallback, not the default
([ADR-0001](../docs/adr/0001-componentize-the-deck.md)).
