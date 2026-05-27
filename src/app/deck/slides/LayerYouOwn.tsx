import { Heading, Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { SectionLabel } from "./SectionLabel";

/**
 * s-3-1 — "your harness is the layer you own" (index.html data-num 3.1): the
 * leverage framing — files, skills, loops, and rules the agent reads every
 * session are what make long-running runs possible. Single state.
 */
export function LayerYouOwn() {
  return (
    <Slide anchor="center">
      <SectionLabel num="§ 03">The harness</SectionLabel>
      <Heading as="h2" size="display-sm" className="mb-7 max-w-5xl font-light">
        Your harness is <em className="text-accent">the layer you own</em>.
      </Heading>
      <Text variant="lead" className="max-w-3xl">
        Files, skills, loops, and rules the agent reads every session.{" "}
        <em className="text-accent">
          That&rsquo;s what makes long-running runs possible.
        </em>
      </Text>
    </Slide>
  );
}
