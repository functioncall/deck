import { CodeBlock, Heading, Label, Link } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { SectionLabel } from "./SectionLabel";

/**
 * The deck's `.agent-frame` diagram (index.html ~1147): the green agent layer
 * (`--color-layer-agent`, the `↻ WHILE TRUE` loop) wrapping the prominent LLM
 * box with the tool diamond hung below it. Slide-local layout (the standalone
 * agent frame is not one of the four extracted diagrams). Token-only.
 */
function AgentFrame() {
  return (
    <div className="relative mx-auto w-full max-w-xl rounded-lg border border-layer-agent bg-bg-soft px-8 pb-10 pt-10">
      <span className="absolute -top-2 left-6 bg-bg px-2 font-mono text-xs uppercase tracking-widest text-layer-agent">
        Agent · ↻ while true
      </span>
      <div className="flex items-start justify-center gap-4 font-mono">
        <span className="pt-5 text-sm italic text-ink-soft">user input</span>
        <span aria-hidden="true" className="pt-5 text-xl text-ink-soft">
          →
        </span>
        <div className="flex flex-col items-center gap-3">
          <span className="rounded border-2 border-accent bg-bg-card px-6 py-4 text-lg font-medium tracking-wider text-ink">
            LLM
          </span>
          <div
            aria-hidden="true"
            className="flex gap-2 text-lg leading-none text-ink-soft"
          >
            <span>↑</span>
            <span>↓</span>
          </div>
          <div className="flex size-14 rotate-45 items-center justify-center border border-accent-soft bg-bg-soft">
            <span className="-rotate-45 font-mono text-sm tracking-wide text-ink">
              tool
            </span>
          </div>
        </div>
        <span aria-hidden="true" className="pt-5 text-xl text-ink-soft">
          →
        </span>
        <span className="pt-5 text-sm italic text-ink-soft">output</span>
      </div>
    </div>
  );
}

/**
 * s-1-2 — "an agent is a while-true loop that appends to an array" (index.html
 * data-num 1.2): the title over a two-column split — the `agent.py` loop in a
 * `CodeBlock` beside the `AgentFrame` diagram — with the Mihai Eric reference.
 */
export function AgentLoop() {
  return (
    <Slide anchor="center">
      <SectionLabel num="§ 01">The model</SectionLabel>
      <Heading as="h2" size="display-sm" className="mb-6 font-light">
        An agent is a while-true loop
        <br />
        that <em className="text-accent">appends to an array</em>.
      </Heading>
      <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-[4vw] text-left md:grid-cols-2">
        <CodeBlock title="agent.py">
          <CodeBlock.Cmt># What an agent actually is</CodeBlock.Cmt>
          {"\n"}
          <CodeBlock.Kw>while</CodeBlock.Kw>
          {" "}
          <CodeBlock.Kw>True</CodeBlock.Kw>
          {":\n    user_input = get_input()\n    response = llm.complete(user_input)\n    "}
          <CodeBlock.Kw>if</CodeBlock.Kw>
          {" response.wants_tool:\n        result = execute_tool(response.tool_call)\n        response = llm.complete(result)\n    print(response)"}
        </CodeBlock>
        <AgentFrame />
      </div>
      <div className="absolute inset-x-[10vw] bottom-[6vh] text-left font-mono text-sm text-ink-soft">
        <Label className="mb-1 block">Reference</Label>
        <span className="text-ink">Mihai Eric</span> ·{" "}
        <Link
          href="https://www.mihaileric.com/The-Emperor-Has-No-Clothes/"
          target="_blank"
          rel="noopener"
          variant="accent"
        >
          The Emperor Has No Clothes: Claude Code in 200 Lines
        </Link>
      </div>
    </Slide>
  );
}
