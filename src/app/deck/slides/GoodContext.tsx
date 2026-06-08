import { Heading } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { BulletList } from "./BulletList";
import { ContextFrame, CtxEmpty, CtxMsg } from "./ctx";

/** The §2 payoff practices (index.html 2.3 bullets). */
const PRACTICES = [
  {
    term: "Fresh session per task",
    desc: "start clean, don't reuse a tired window",
  },
  {
    term: "Only what this task needs",
    desc: "drop the MCPs and notes that aren't useful here",
  },
  {
    term: "Offload to disk",
    desc: "save big stuff as files, keep short summaries in the window",
  },
  {
    term: "Send sub-agents for side quests",
    desc: "let them explore, return one paragraph",
  },
  {
    term: "Leave room below the line",
    desc: "finalizing work (tests, commits, lint) still has space",
  },
  {
    term: "Split big work across sessions",
    desc: "when it won't fit one window, plan it, write the spec to disk, let multiple agents pick it up",
  },
];

/**
 * s-2-3 — "good context stays in the smart zone" (index.html data-num 2.3): the
 * payoff slide. A clean, lean window (everything above the line) beside the six
 * context-hygiene practices. Single state.
 */
export function GoodContext() {
  return (
    <Slide anchor="center">
      <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-10 text-left md:grid-cols-2 md:gap-[4vw]">
        <div className="self-start">
          <Heading as="h2" size="display-sm" className="mb-6 text-left font-light">
            Good context{" "}
            <em className="text-accent">stays in the smart zone</em>.
          </Heading>
          <BulletList items={PRACTICES} />
        </div>
        <div className="flex justify-center">
          <ContextFrame>
            <CtxMsg tone="system" size="1.2k">
              system prompt · lean
            </CtxMsg>
            <CtxMsg size="2k">tool definitions · 4 tools</CtxMsg>
            <CtxMsg size="3k">spec.md · one task</CtxMsg>
            <CtxMsg size="0.9k">skills</CtxMsg>
            <CtxMsg tone="user" size="0.3k">
              user · one clear goal
            </CtxMsg>
            <CtxMsg tone="assistant" size="0.5k">
              assistant · tool_call
            </CtxMsg>
            <CtxMsg size="1.5k">tool_result</CtxMsg>
            <CtxMsg tone="assistant" size="0.5k">
              assistant · tool_call
            </CtxMsg>
            <CtxMsg size="2k">tool_result</CtxMsg>
            <CtxMsg tone="assistant" size="0.4k">
              assistant · &ldquo;done&rdquo;
            </CtxMsg>
            <CtxEmpty>~188k remaining · all above the line</CtxEmpty>
          </ContextFrame>
        </div>
      </div>
    </Slide>
  );
}
