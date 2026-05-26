# Componentize the deck instead of embedding index.html

**Status:** accepted

The existing deck is a 1.28 MB self-contained `index.html` (88 slides, bespoke vanilla HTML/CSS/JS). We chose to **extract its design tokens and diagram/visual components into the Next.js design system and rebuild the deck as a React slide-player that reuses them**, rather than embedding the original file as a black-box route/iframe.

**Why:** the deck's diagrams (LLM loop, context window, harness frame, stats, callouts, code blocks) are also the best marketing visuals — they must be reusable components so the deck (L2) and landing page (L3) share one source of truth. Embedding would create two diverging design languages, block visual reuse on the sales page, and carry a 1.28 MB performance hit.

**Considered and rejected:**
- *Embed index.html as-is* — fastest, but no component reuse, design drift, perf hit, deck stays opaque to agents.
- *Hybrid-lite (tokens + 2–3 hero diagrams only, embed the rest)* — viable pragmatic fallback if the full slide rebuild proves too costly; we may retreat to this per-slide.

**Consequence:** L2 (deck migration) is the heaviest layer; it will be batched into sub-phases (slide engine first, then slides in groups) within the Ralph loop plan.
