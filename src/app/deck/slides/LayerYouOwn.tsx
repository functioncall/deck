import { Heading, Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";

/**
 * s-3-1 — "your harness is the layer you own" (index.html data-num 3.1): the
 * leverage framing — files, skills, loops, and rules the agent reads every
 * session are what make long-running runs possible. Single state.
 */
export function LayerYouOwn() {
  return (
    <Slide anchor="center">
      <Heading as="h2" size="display-sm" className="mb-7 max-w-5xl font-light">
        The <em className="text-accent">layer you own</em>.
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
