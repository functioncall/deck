import { Heading } from "@/components/atoms";
import { Slide } from "@/components/deck-player";

/**
 * s-1-7 — the §1 → §2 transition (index.html data-num 1.7): a single serif line
 * that turns the array insight into the rest of the talk.
 */
export function ArrayIsEverything() {
  return (
    <Slide anchor="center">
      <Heading as="h2" size="display-sm" className="max-w-4xl font-light">
        If the context window is just an array,
        <br />
        <em className="text-accent">
          what goes in the array is everything.
        </em>
      </Heading>
    </Slide>
  );
}
