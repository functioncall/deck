import type { ReactNode } from "react";
import { CodeBlock, Heading } from "@/components/atoms";
import { Reveal, Slide } from "@/components/deck-player";
import { CodeStep } from "./CodeStep";

/**
 * The console log line (index.html `.console-line`): an accent `→`, the event,
 * and an optional dimmed indent detail. Revealed at `frameMin` via the reveal
 * primitive (the port of index.html's `data-state-min`).
 */
function LogLine({
  frameMin,
  arrow = true,
  detail,
  children,
}: {
  frameMin: number;
  arrow?: boolean;
  detail?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Reveal frameMin={frameMin} mode="label" className="font-mono text-sm">
      <div className="text-ink-soft">
        {arrow ? (
          <span className="mr-2 font-semibold text-accent">→</span>
        ) : null}
        {children}
        {detail ? (
          <span className="mt-1 block pl-6 text-xs text-ink-dim">{detail}</span>
        ) : null}
      </div>
    </Reveal>
  );
}

/** Per-role context message tints (the deck's `.ctx-msg.*`, tokenised). */
const CTX_TONES = {
  system: "border-layer-harness text-layer-harness",
  context: "border-rule text-ink-soft",
  user: "border-good text-good",
  assistant: "border-accent text-accent",
  tool: "border-bad text-bad",
} as const;

function CtxMsg({
  tone,
  size,
  children,
}: {
  tone: keyof typeof CTX_TONES;
  size: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex flex-shrink-0 items-center justify-between rounded-sm border bg-bg-soft px-3 py-1.5 font-mono text-xs ${CTX_TONES[tone]}`}
    >
      <span>{children}</span>
      <span className="text-ink-dim">{size}</span>
    </div>
  );
}

/**
 * s-1-4 — "the loop, in action" (index.html data-num 1.4, data-states="6"): the
 * `agent.py` loop beside its console log and the filling context window. Each
 * reveal state appends the next turn — the user message, the tool_call, the
 * tool_result, the answer, then the loop iterates — so the array visibly grows.
 * maxState 6 (states 0–5).
 */
export function LoopInAction() {
  return (
    <Slide anchor="top" hasStepper>
      <div className="grid w-full max-w-6xl grid-cols-1 items-start gap-[4vw] text-left md:grid-cols-2">
        {/* LEFT: title + code + console */}
        <div className="flex flex-col gap-8">
          <Heading as="h2" size="display-sm" className="text-left font-light">
            The loop, <em className="text-accent">in action</em>.
          </Heading>
          {/* Per-state line highlighting (index.html data-state-lines
              "0:|1:3|2:4|3:5,6|4:7|5:8,2") — the active code line tracks the
              console log as the stepper advances. */}
          <CodeBlock title="agent.py">
            <CodeStep>
              <CodeBlock.Cmt># this iteration takes the tool branch</CodeBlock.Cmt>
            </CodeStep>
            <CodeStep on={[5]}>
              <CodeBlock.Kw>while</CodeBlock.Kw>{" "}
              <CodeBlock.Kw>True</CodeBlock.Kw>:
            </CodeStep>
            <CodeStep on={[1]}>{"    user_input = get_input()"}</CodeStep>
            <CodeStep on={[2]}>
              {"    response = llm.complete(user_input)"}
            </CodeStep>
            <CodeStep on={[3]}>
              {"    "}
              <CodeBlock.Kw>if</CodeBlock.Kw>
              {" response.wants_tool:"}
            </CodeStep>
            <CodeStep on={[3]}>
              {"        result = execute_tool(response.tool_call)"}
            </CodeStep>
            <CodeStep on={[4]}>
              {"        response = llm.complete(result)"}
            </CodeStep>
            <CodeStep on={[5]}>{"    print(response)"}</CodeStep>
          </CodeBlock>
          <div className="relative min-h-56 rounded-md border border-rule bg-bg-card px-6 pb-4 pt-6">
            <span className="absolute -top-2 left-5 bg-bg px-2 font-mono text-xs uppercase tracking-widest text-ink-dim">
              Agent · log
            </span>
            <div className="flex flex-col gap-2.5">
              <LogLine frameMin={0} arrow={false}>
                <span className="italic text-ink-dim">
                  {"// agent ready · waiting for input"}
                </span>
              </LogLine>
              <LogLine
                frameMin={1}
                detail={<>&ldquo;find all TODO comments in src/&rdquo;</>}
              >
                user_input received
              </LogLine>
              <LogLine
                frameMin={2}
                detail={<>tool_call: bash(&ldquo;grep -rn TODO src/&rdquo;)</>}
              >
                LLM responds: <span className="text-accent">wants_tool</span>=true
              </LogLine>
              <LogLine frameMin={3} detail="3 matches in auth.ts, api.ts, db.ts">
                executing tool · bash
              </LogLine>
              <LogLine
                frameMin={4}
                detail={<>&ldquo;Found 3 TODOs across the codebase&rdquo;</>}
              >
                LLM responds with answer
              </LogLine>
              <LogLine frameMin={5}>print(response) · loop iterates ↻</LogLine>
            </div>
          </div>
        </div>

        {/* RIGHT: the filling context window */}
        <div className="flex justify-center">
          <div className="relative flex min-h-[70vh] w-full max-w-sm flex-col gap-1.5 rounded-md border border-rule bg-bg-card p-2 max-md:min-h-[55vh]">
            <span className="absolute -top-2 left-3 bg-bg px-2 font-mono text-xs uppercase tracking-widest text-ink-dim">
              Context window · 200K
            </span>
            <CtxMsg tone="system" size="6.3k">
              system prompt
            </CtxMsg>
            <CtxMsg tone="context" size="9.5k">
              tool definitions
            </CtxMsg>
            <CtxMsg tone="context" size="2.5k">
              CLAUDE.md
            </CtxMsg>
            <CtxMsg tone="context" size="0.9k">
              skills
            </CtxMsg>
            <Reveal frameMin={1} mode="label">
              <CtxMsg tone="user" size="0.3k">
                user
              </CtxMsg>
            </Reveal>
            <Reveal frameMin={2} mode="label">
              <CtxMsg tone="assistant" size="0.5k">
                assistant · tool_call
              </CtxMsg>
            </Reveal>
            <Reveal frameMin={3} mode="label">
              <CtxMsg tone="tool" size="0.6k">
                tool_result
              </CtxMsg>
            </Reveal>
            <Reveal frameMin={4} mode="label">
              <CtxMsg tone="assistant" size="0.4k">
                assistant
              </CtxMsg>
            </Reveal>
            <div className="flex flex-1 items-end justify-center rounded-sm border border-dashed border-rule pb-4 font-mono text-xs uppercase tracking-widest text-ink-dim">
              ~179k remaining · empty
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
