import { Heading } from "@/components/atoms";
import { Slide } from "@/components/deck-player";

/**
 * s-0-1 — the cold-open title slide (index.html `.slide.title`, data-num 0.1):
 * the serif display title over an italic serif subtitle. Anonymous — no byline
 * (the deck sells the ideas, not a named author).
 */
export function Title() {
  return (
    <Slide anchor="center">
      <Heading as="h1" size="display">
        From Inference Loops
        <br />
        to Long-Running Agents
      </Heading>
      <p className="font-serif text-xl font-light italic text-ink-soft sm:text-2xl">
        Fundamentals, Workflow, and What Actually Fits
      </p>
      {/* Onboarding: the canvas is split — tapping the left half goes back, the
          right half goes forward (see SlidePlayer.handleClick). This hint teaches
          the two zones on the very first slide. */}
      <div className="mt-12 grid w-full max-w-sm grid-cols-2 overflow-hidden rounded-lg border border-rule font-mono text-xs text-ink-dim">
        <div className="border-r border-rule bg-bg-soft/50 px-4 py-3">
          &larr; tap to go back
        </div>
        <div className="bg-bg-soft/50 px-4 py-3">tap for next &rarr;</div>
      </div>
    </Slide>
  );
}
