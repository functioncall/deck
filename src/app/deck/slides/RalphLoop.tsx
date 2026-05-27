import { CodeBlock } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { BulletList } from "./BulletList";
import { PanelHeading, Tree, TwoColPanel, type TreeRow } from "./panel";
import { SectionLabel } from "./SectionLabel";
import { SlideFooter } from "./SlideFooter";

/** The tree with scripts/ralph.sh highlighted (index.html 3.7). */
const TREE: TreeRow[] = [
  { text: "~/project/", tone: "root" },
  { text: "├── CLAUDE.md", tone: "dim" },
  { text: "├── .claude/", tone: "dim" },
  { text: "│   └── skills/", tone: "dim" },
  { text: "├── .beads/", tone: "dim" },
  { text: "├── agent_docs/", tone: "dim" },
  { text: "│   └── ...", tone: "dim" },
  { text: "├── scripts/", tone: "active" },
  { text: "│   └── ralph.sh", tone: "active-file" },
  { text: "└── src/", tone: "dim" },
  { text: "    └── ...", tone: "dim" },
];

const POINTS = [
  {
    term: "The window is the budget.",
    desc: "A plan becomes epics, epics become issues. Each session takes whatever fits inside the smart zone, could be one issue, could be five.",
  },
  {
    term: "PROMPT.md is the instruction sheet.",
    desc: "Tells the agent which spec to read, where to find the next task, and the rules of the run. Re-read every iteration. This is where the intelligence lives.",
  },
  {
    term: "Reset every loop.",
    desc: "Fresh window each pass. No compaction. State that matters lives on disk: Beads, specs, CLAUDE.md.",
  },
];

/**
 * s-3-7 — "the Ralph loop" (index.html data-num 3.7): the loop that ties the
 * harness together — a `while` loop feeding PROMPT.md to the agent, resetting the
 * window each pass. The ralph.sh tree beside the loop + how it works. Single
 * state; cites Geoffrey Huntley.
 */
export function RalphLoop() {
  return (
    <Slide anchor="top">
      <SectionLabel num="§ 03">The harness</SectionLabel>
      <PanelHeading>The Ralph loop.</PanelHeading>
      <TwoColPanel tree={<Tree rows={TREE} />}>
        <CodeBlock>
          <CodeBlock.Kw>while</CodeBlock.Kw>
          {" :; "}
          <CodeBlock.Kw>do</CodeBlock.Kw>
          {"\n  cat PROMPT.md | claude  "}
          <CodeBlock.Cmt># Claude Code CLI</CodeBlock.Cmt>
          {"\n"}
          <CodeBlock.Kw>done</CodeBlock.Kw>
        </CodeBlock>
        <div className="mt-6">
          <BulletList items={POINTS} marker />
        </div>
      </TwoColPanel>
      <SlideFooter person="Geoffrey Huntley" href="https://ghuntley.com/ralph/">
        The Ralph Wiggum Loop
      </SlideFooter>
    </Slide>
  );
}
