import { Heading, Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { ContextFrame, CtxEmpty, CtxMsg, StateRange } from "./ctx";

/**
 * s-2-2 — "the context rot problem" (index.html data-num 2.2, data-states="5"):
 * the same window, same model, but it just fills up. Nothing fails — every tool
 * call succeeds. A healthy turn (state 0) accumulates more good iterations
 * (state 1) until the conversation spills past the smart/dumb zone line into the
 * dumb zone where attention frays (state 2); a lossy compaction then replaces the
 * conversation and the spec is lost (state 3); the "same window" callout lands at
 * state 4. Rot from volume + lossy compaction, not from errors. maxState 5.
 */
export function ContextRot() {
  return (
    <Slide anchor="center">
      <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-10 text-left md:grid-cols-2 md:gap-[4vw]">
        <div className="self-start">
          <Heading as="h2" size="display-sm" className="text-left font-light">
            The <em className="text-accent">context rot</em> problem.
          </Heading>
          <Text variant="lead" className="mt-5 text-left">
            Nothing fails. Every call succeeds.{" "}
            <em className="text-accent">It just fills up.</em>
          </Text>
          <div className="mt-8 text-left font-mono text-sm text-ink-soft">
            Same window, same model &rarr;{" "}
            <em className="text-accent">it rots.</em>
            <div className="mt-1 text-xs uppercase tracking-widest text-ink-dim">
              no errors. just volume.
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <ContextFrame>
            <CtxMsg tone="system" size="6.3k">
              system prompt
            </CtxMsg>
            <CtxMsg size="9.5k">tool definitions</CtxMsg>
            <CtxMsg size="2.5k">CLAUDE.md</CtxMsg>
            <CtxMsg size="0.9k">skills</CtxMsg>

            {/* a healthy, growing conversation (states 0–2) — every call ok */}
            <StateRange max={2}>
              <CtxMsg tone="user" size="0.3k">
                user · &ldquo;implement feature X&rdquo;
              </CtxMsg>
              <CtxMsg tone="assistant" size="0.5k">
                assistant · read files
              </CtxMsg>
              <CtxMsg size="0.6k">tool_result · 4 files</CtxMsg>
            </StateRange>

            {/* more good iterations (states 1–2) */}
            <StateRange min={1} max={2}>
              <CtxMsg tone="assistant" size="0.5k">
                assistant · run tests
              </CtxMsg>
              <CtxMsg size="0.4k">tool_result · 12 passed</CtxMsg>
              <CtxMsg tone="assistant" size="0.5k">
                assistant · edit module
              </CtxMsg>
              <CtxMsg size="0.4k">tool_result · ok</CtxMsg>
            </StateRange>

            {/* it spills into the dumb zone (state 2) — still all successful */}
            <StateRange min={2} max={2}>
              <CtxMsg tone="assistant" size="0.5k">
                assistant · grep usages
              </CtxMsg>
              <CtxMsg size="0.7k">tool_result · 38 matches</CtxMsg>
              <CtxMsg tone="assistant" size="0.6k">
                assistant · refactor callsites
              </CtxMsg>
              <CtxMsg size="0.5k">tool_result · ok</CtxMsg>
              <CtxMsg tone="assistant" size="0.5k">
                assistant · run build
              </CtxMsg>
              <CtxMsg size="0.6k">tool_result · ok</CtxMsg>
            </StateRange>

            {/* compaction event replaces the conversation (states 3–4) */}
            <StateRange min={3}>
              <CtxMsg tone="bad" size="??" className="min-h-16">
                half-compacted summary · spec lost
              </CtxMsg>
            </StateRange>

            <StateRange max={0}>
              <CtxEmpty>~178k remaining · smart zone</CtxEmpty>
            </StateRange>
            <StateRange min={1} max={1}>
              <CtxEmpty>~172k remaining · filling up</CtxEmpty>
            </StateRange>
            <StateRange min={2} max={2}>
              <CtxEmpty>past the line · attention fraying</CtxEmpty>
            </StateRange>
            <StateRange min={3}>
              <CtxEmpty tone="bad">array corrupted · agent will drift</CtxEmpty>
            </StateRange>
          </ContextFrame>
        </div>
      </div>
    </Slide>
  );
}
