import { Heading, Text } from "@/components/atoms";
import { Reveal, Slide } from "@/components/deck-player";
import { HarnessFrame } from "@/components/diagrams";

/**
 * s-1-5 — "the agent harness wraps the loop" (index.html data-num 1.5,
 * data-states="3"): the layered build. State 0 shows only the bare LLM
 * primitive; the green agent loop + tool diamond draw in at state 1; the harness
 * shell + grid wrap around it at state 2 — and only then do the title + subhead
 * land (the slide opens as a near-blank primitive and resolves into the thesis).
 * Drives the progressive `HarnessFrame` via the deck-player reveal state.
 * maxState 3.
 */
export function AgentHarness() {
  return (
    <Slide anchor="top" hasStepper>
      <Reveal frameMin={2} mode="label">
        <Heading as="h2" size="display-sm" className="font-light">
          The agent harness <em className="text-accent">wraps</em> the loop.
        </Heading>
        <Text variant="lead" className="mb-4">
          Everything that isn&rsquo;t the LLM &mdash;{" "}
          <em className="text-accent">
            what tools exist, what context loads, when to stop.
          </em>
        </Text>
      </Reveal>
      <HarnessFrame progressive />
    </Slide>
  );
}
