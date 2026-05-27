import { Heading, Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";

/**
 * s-2-8 — the §2 transition (index.html data-num 2.8): the full-bleed line that
 * hands off from context to the harness. No section label, no stepper. Single
 * state.
 */
export function ContextTransition() {
  return (
    <Slide anchor="center">
      <Heading as="h2" size="display-sm" className="max-w-5xl font-light">
        Every session starts from zero.{" "}
        <em className="text-accent">Context doesn&rsquo;t engineer itself.</em>
      </Heading>
      <Text variant="lead" className="mt-8 max-w-3xl">
        Allocation, rot, compaction, recovery. Someone has to handle them.
      </Text>
    </Slide>
  );
}
