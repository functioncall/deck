import { Slide } from "@/components/deck-player";
import { BulletList } from "./BulletList";
import { PanelHeading, Tree, TwoColPanel, type TreeRow } from "./panel";
import { SlideFooter } from "./SlideFooter";

/** The tree with .beads/ highlighted (index.html 3.6). */
const TREE: TreeRow[] = [
  { text: "~/project/", tone: "root" },
  { text: "├── CLAUDE.md", tone: "dim" },
  { text: "├── .claude/", tone: "dim" },
  { text: "│   └── skills/", tone: "dim" },
  { text: "├── .beads/", tone: "active" },
  { text: "├── agent_docs/", tone: "dim" },
  { text: "│   └── ...", tone: "dim" },
  { text: "├── scripts/", tone: "dim" },
  { text: "│   └── ralph.sh", tone: "dim" },
  { text: "└── src/", tone: "dim" },
  { text: "    └── ...", tone: "dim" },
];

const POINTS = [
  {
    term: "Tasks survive sessions.",
    desc: "Not in the context window — on disk, in a graph.",
  },
  {
    term: "Dependency graph.",
    desc: "Beads knows what's blocked, what's ready, what's done.",
  },
  {
    term: (
      <>
        <span className="font-mono text-accent">bd ready</span> — the next thing
        to work on.
      </>
    ),
    desc: "One command. Top-priority issue with no open blockers.",
  },
  {
    term: "Linked to specs.",
    desc: "One spec breaks into many issues. Same vocabulary across plan and execution.",
  },
  {
    term: "Feeds the loop.",
    desc: "Ralph asks Beads what's next, runs it, loops.",
  },
];

/**
 * s-3-6 — "issue tracker (Beads)" (index.html data-num 3.6): tasks survive
 * sessions on disk in a dependency graph. The .beads/ folder beside why Beads.
 * Single state; cites Steve Yegge.
 */
export function IssueTracker() {
  return (
    <Slide anchor="top">
      <PanelHeading>issue tracker (Beads)</PanelHeading>
      <TwoColPanel tree={<Tree rows={TREE} />}>
        <BulletList items={POINTS} />
      </TwoColPanel>
      <SlideFooter
        person="Steve Yegge"
        href="https://steve-yegge.medium.com/introducing-beads-a-coding-agent-memory-system-637d7d92514a"
      >
        Introducing Beads — A Coding-Agent Memory System
      </SlideFooter>
    </Slide>
  );
}
