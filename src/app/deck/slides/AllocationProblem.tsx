import { Heading, Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { SectionLabel } from "./SectionLabel";
import { ContextFrame, CtxEmpty, CtxMsg, StateRange } from "./ctx";

/**
 * s-2-1 — "the allocation problem" (index.html data-num 2.1, data-states="4"):
 * static fills eat the smart zone before the conversation starts. As the stepper
 * advances, the tool definitions balloon into MCP sprawl (state 1) and CLAUDE.md
 * bloats (state 2); the remaining-budget footer shrinks; the payoff callout lands
 * at state 3. maxState 4.
 */
export function AllocationProblem() {
  return (
    <Slide anchor="center">
      <SectionLabel num="§ 02">Context</SectionLabel>
      <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-[4vw] text-left md:grid-cols-2">
        <div className="self-start">
          <Heading as="h2" size="display-sm" className="text-left font-light">
            The <em className="text-accent">allocation</em> problem.
          </Heading>
          <Text variant="lead" className="mt-5 text-left">
            Static fills eat your usable space{" "}
            <em className="text-accent">before the conversation starts.</em>
          </Text>
          <StateRange min={3}>
            <div className="mt-8 text-left font-mono text-sm text-ink-soft">
              Static fills &rarr;{" "}
              <em className="text-accent">smart zone shrinks.</em>
              <div className="mt-1 text-xs uppercase tracking-widest text-ink-dim">
                before the conversation even starts.
              </div>
            </div>
          </StateRange>
        </div>
        <div className="flex justify-center">
          <ContextFrame>
            <CtxMsg tone="system" size="6.3k">
              system prompt
            </CtxMsg>
            <StateRange max={0}>
              <CtxMsg size="9.5k">tool definitions</CtxMsg>
            </StateRange>
            <StateRange min={1}>
              <CtxMsg tone="bad" size="32k" className="min-h-24">
                tool definitions · MCP × 27
              </CtxMsg>
            </StateRange>
            <StateRange max={1}>
              <CtxMsg size="2.5k">CLAUDE.md</CtxMsg>
            </StateRange>
            <StateRange min={2}>
              <CtxMsg tone="bad" size="6k" className="min-h-12">
                CLAUDE.md · 1500 lines
              </CtxMsg>
            </StateRange>
            <CtxMsg size="0.9k">skills</CtxMsg>
            <StateRange max={0}>
              <CtxEmpty>~180k remaining · ~60k smart available</CtxEmpty>
            </StateRange>
            <StateRange min={1} max={1}>
              <CtxEmpty>~158k remaining · ~38k smart left</CtxEmpty>
            </StateRange>
            <StateRange min={2}>
              <CtxEmpty tone="bad">~155k remaining · only ~35k smart left</CtxEmpty>
            </StateRange>
          </ContextFrame>
        </div>
      </div>
    </Slide>
  );
}
