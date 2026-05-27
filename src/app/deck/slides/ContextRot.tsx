import { Heading, Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { SectionLabel } from "./SectionLabel";
import { ContextFrame, CtxEmpty, CtxMsg, StateRange } from "./ctx";

/**
 * s-2-2 — "the context rot problem" (index.html data-num 2.2, data-states="5"):
 * the same window, same model, but the contents go wrong. A healthy turn (state
 * 0) accumulates failed tool calls and errors (states 1–2), then a lossy
 * compaction replaces the conversation and the spec is lost (state 3); the
 * "wrong contents" callout lands at state 4. maxState 5.
 */
export function ContextRot() {
  return (
    <Slide anchor="center">
      <SectionLabel num="§ 02">Context</SectionLabel>
      <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-[4vw] text-left md:grid-cols-2">
        <div className="self-start">
          <Heading as="h2" size="display-sm" className="text-left font-light">
            The <em className="text-accent">context rot</em> problem.
          </Heading>
          <Text variant="lead" className="mt-5 text-left">
            What&rsquo;s in there is wrong.{" "}
            <em className="text-accent">Errors propagate. Compaction is lossy.</em>
          </Text>
          <StateRange min={4}>
            <div className="mt-8 text-left font-mono text-sm text-ink-soft">
              Same window. Same model.
              <div className="mt-1 italic text-accent">Wrong contents.</div>
            </div>
          </StateRange>
        </div>
        <div className="flex justify-center">
          <ContextFrame>
            <CtxMsg tone="system" size="6.3k">
              system prompt
            </CtxMsg>
            <CtxMsg size="9.5k">tool definitions</CtxMsg>
            <CtxMsg size="2.5k">CLAUDE.md</CtxMsg>
            <CtxMsg size="0.9k">skills</CtxMsg>

            {/* healthy conversation (states 0–2) */}
            <StateRange max={2}>
              <CtxMsg tone="user" size="0.3k">
                user · &ldquo;implement feature X&rdquo;
              </CtxMsg>
              <CtxMsg tone="assistant" size="0.5k">
                assistant · tool_call
              </CtxMsg>
              <CtxMsg size="0.6k">tool_result · ok</CtxMsg>
            </StateRange>

            {/* error #1 */}
            <StateRange min={1} max={2}>
              <CtxMsg tone="assistant" size="0.5k">
                tool_call (failed)
              </CtxMsg>
              <CtxMsg tone="bad" size="0.4k">
                tool_result · ERROR
              </CtxMsg>
              <CtxMsg tone="user" size="0.3k">
                user · &ldquo;no, try X differently&rdquo;
              </CtxMsg>
            </StateRange>

            {/* error #2 */}
            <StateRange min={2} max={2}>
              <CtxMsg tone="assistant" size="0.5k">
                tool_call (failed again)
              </CtxMsg>
              <CtxMsg tone="bad" size="0.4k">
                tool_result · ERROR
              </CtxMsg>
              <CtxMsg tone="user" size="0.3k">
                user · &ldquo;stop, try Y&rdquo;
              </CtxMsg>
            </StateRange>

            {/* compaction event replaces the conversation */}
            <StateRange min={3}>
              <CtxMsg tone="bad" size="??" className="min-h-16">
                half-compacted summary · spec lost
              </CtxMsg>
            </StateRange>

            <StateRange max={0}>
              <CtxEmpty>~179k remaining · clean context</CtxEmpty>
            </StateRange>
            <StateRange min={1} max={1}>
              <CtxEmpty>~177k remaining · errors accumulating</CtxEmpty>
            </StateRange>
            <StateRange min={2} max={2}>
              <CtxEmpty>~175k remaining · errors accumulating</CtxEmpty>
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
