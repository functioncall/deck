# Bespoke atoms from deck tokens + Radix primitives, not a component kit

**Status:** accepted

We build the design-system atoms ourselves, styled entirely from design tokens **extracted from the existing deck**, and use **Radix** headless primitives for interactive/accessibility-critical components (dialog, accordion, popover). We rejected Material UI and shadcn/ui.

**Why:** the site must be visually identical to the deck (Fraunces / gold `#c89e6e` / near-black `#0b0c10` editorial aesthetic), use **Tailwind 4 as the single styling source with no hard-coded values**, and stay lightweight for marketing-page performance/conversion. A pre-built kit's baked-in look fights the deck; this approach makes the deck's language the system's language.

**Considered and rejected:**
- *Material UI (MUI)* — mature and fast, but imposes Google's Material look (fights the deck), uses Emotion/CSS-in-JS (collides with Tailwind + the single-source-of-truth goal), heavier bundle, and is built for app dashboards rather than editorial marketing pages.
- *shadcn/ui* — Tailwind-native and viable, but its visual defaults (radii, spacing, shadows) need heavy re-theming to match the deck, and it brings components we won't use.

**Consequence:** more upfront component work — mitigated because the deck's CSS already defines the tokens and many reusable visual patterns (LLM diagram, context window, callouts, code blocks) to port. Switching strategy later means rewriting components, so it is deliberately fixed now.
