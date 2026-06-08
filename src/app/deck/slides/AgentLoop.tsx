import { CodeBlock, Heading } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { AgentFlow } from "@/components/diagrams";
import { SlideFooter } from "./SlideFooter";

/**
 * The deck's `.agent-frame` diagram (index.html ~1147): the green agent layer
 * (`--color-layer-agent`, the `↻ WHILE TRUE` loop) wrapping the shared
 * `AgentFlow` primitive (the prominent LLM box with the tool loop hung below).
 * Token-only.
 */
function AgentFrame() {
  return (
    <div className="relative mx-auto w-full max-w-xl rounded-lg border border-layer-agent bg-bg-soft px-8 pb-10 pt-10 max-md:px-4 max-md:pb-8 max-md:pt-8">
      <span className="absolute -top-2 left-6 bg-bg px-2 font-mono text-xs uppercase tracking-widest text-layer-agent">
        Agent · ↻ while true
      </span>
      <AgentFlow />
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
      <SlideFooter
        refs={[
          {
            person: "Mihai Eric",
            href: "https://www.mihaileric.com/The-Emperor-Has-No-Clothes/",
            label: "The Emperor Has No Clothes: Claude Code in 200 Lines",
          },
          {
            person: "Geoffrey Huntley",
            href: "https://www.youtube.com/watch?v=Jr2auYrBDA4",
            label:
              "fundamental skills and knowledge you must have in 2026 for SWE",
          },
        ]}
      />
    </Slide>
  );
}
