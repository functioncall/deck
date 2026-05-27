import { Heading, Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { SectionLabel } from "./SectionLabel";

/**
 * s-6-1 — the §6 opener (index.html data-num 6.1): when the task fits, the
 * result lands at 95–99% of what was wanted — so task selection is the work.
 * Single state.
 */
export function TaskSelection() {
  return (
    <Slide anchor="center">
      <SectionLabel num="§ 06">Task selection</SectionLabel>
      <Heading as="h1" size="display-sm" className="max-w-5xl font-light">
        When the task fits, the result lands at{" "}
        <em className="italic text-accent">95–99%</em> of what I wanted.
      </Heading>
      <Text variant="lead" className="mt-7 text-base">
        Task selection is the work.
      </Text>
    </Slide>
  );
}
