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
        Fundamentals, Workflow, and a Real Example
      </p>
    </Slide>
  );
}
