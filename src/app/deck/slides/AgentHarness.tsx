import { Heading, Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { HarnessFrame } from "@/components/diagrams";
import { SectionLabel } from "./SectionLabel";

/**
 * s-1-5 — "the agent harness wraps the loop" (index.html data-num 1.5,
 * data-states="3"): the layered build — the LLM/agent core (state 1) wrapped by
 * the harness shell + its component grid (state 2). Drives the progressive
 * `HarnessFrame` diagram via the deck-player reveal state. maxState 3.
 */
export function AgentHarness() {
  return (
    <Slide anchor="top" hasStepper>
      <SectionLabel num="§ 01">The model</SectionLabel>
      <Heading as="h2" size="display-sm" className="font-light">
        The agent harness <em className="text-accent">wraps</em> the loop.
      </Heading>
      <Text variant="lead" className="mb-4">
        Everything that isn&rsquo;t the LLM &mdash;{" "}
        <em className="text-accent">
          what tools exist, what context loads, when to stop.
        </em>
      </Text>
      <HarnessFrame progressive />
    </Slide>
  );
}
