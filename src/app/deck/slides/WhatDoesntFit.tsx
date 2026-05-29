import { Slide } from "@/components/deck-player";
import { FitList } from "./FitList";

/** The work that doesn't fit the loop (index.html 6.3 `.fit-list`). */
const UNFITS = [
  {
    heading: "High-taste UI work",
    why: "Motion, interaction feel, visual identity. Generators give you good. Taste gives you great.",
  },
  {
    heading: "Architecture choices",
    why: "Service boundaries, data models, scaling tradeoffs. Wrong here is expensive.",
  },
  {
    heading: "Open-ended improvement",
    why: (
      <>
        &ldquo;Make this better.&rdquo; &ldquo;Modernize the product.&rdquo; If
        you can&rsquo;t measure success, the loop has no compass.
      </>
    ),
  },
];

/**
 * s-6-3 — "what doesn't fit" (index.html data-num 6.3): the three task shapes to
 * keep off the loop, as a numbered fit-list under a bad-tone label. Single state.
 */
export function WhatDoesntFit() {
  return (
    <Slide anchor="center">
      <FitList label="What doesn't fit" tone="bad" items={UNFITS} />
    </Slide>
  );
}
