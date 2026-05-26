import { Label, Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { SectionLabel } from "./SectionLabel";

/**
 * s-1-6 — the §1 takeaway (index.html data-num 1.6): the three-word distillation
 * (`.takeaway-words`) — Loop. Array. Harness. — over the one-line summary.
 */
export function Takeaway() {
  return (
    <Slide anchor="center">
      <SectionLabel num="§ 01">The model</SectionLabel>
      <Label accent className="mb-6">
        the whole stack
      </Label>
      <div className="flex flex-wrap items-baseline justify-center gap-6">
        <em className="font-serif text-5xl font-light leading-none tracking-tight text-ink-soft sm:text-6xl">
          Loop.
        </em>
        <em className="font-serif text-5xl font-light leading-none tracking-tight text-ink-soft sm:text-6xl">
          Array.
        </em>
        <em className="font-serif text-5xl font-light leading-none tracking-tight text-accent sm:text-6xl">
          Harness.
        </em>
      </div>
      <Text variant="lead" className="mt-8">
        An agent is a while-true loop appending to an array. The harness controls
        what&rsquo;s in it.
      </Text>
    </Slide>
  );
}
