import { Slide } from "@/components/deck-player";
import { BulletList } from "./BulletList";
import { PanelHeading, Tree, TwoColPanel, type TreeRow } from "./panel";
import { SectionLabel } from "./SectionLabel";

/** The tree with agent_docs/ expanded + highlighted (index.html 3.4). */
const TREE: TreeRow[] = [
  { text: "~/project/", tone: "root" },
  { text: "├── CLAUDE.md", tone: "dim" },
  { text: "├── .claude/", tone: "dim" },
  { text: "│   └── skills/", tone: "dim" },
  { text: "├── .beads/", tone: "dim" },
  { text: "├── agent_docs/", tone: "active" },
  { text: "│   ├── adding-a-feature.md", tone: "active-file" },
  { text: "│   ├── anti-patterns.md", tone: "active-file" },
  { text: "│   ├── architecture.md", tone: "active-file" },
  { text: "│   ├── components.md", tone: "active-file" },
  { text: "│   ├── server.md", tone: "active-file" },
  { text: "│   ├── tech-debt.md", tone: "active-file" },
  { text: "│   ├── workflow.md", tone: "active-file" },
  { text: "│   └── specs/" },
  { text: "├── scripts/", tone: "dim" },
  { text: "│   └── ralph.sh", tone: "dim" },
  { text: "└── src/", tone: "dim" },
  { text: "    └── ...", tone: "dim" },
];

const POINTS = [
  {
    term: "One concern per file.",
    desc: "architecture, conventions, anti-patterns, workflow.",
  },
  {
    term: "Linked from CLAUDE.md, not loaded by it.",
    desc: "“Before adding a feature, read adding-a-feature.md.”",
  },
  {
    term: "On-demand context.",
    desc: "Agent reads docs only when relevant — nothing wasted up front.",
  },
  {
    term: "Specs split big work into phases.",
    desc: "Dated, on disk, diffable. One phase per session.",
  },
  {
    term: "Surviveable.",
    desc: "Specs outlive context windows. Reset and continue.",
  },
];

/**
 * s-3-4 — "agent_docs/" (index.html data-num 3.4): on-demand context. The
 * expanded docs folder beside the rules for one-concern-per-file docs linked
 * (not loaded) from CLAUDE.md. Single state.
 */
export function AgentDocs() {
  return (
    <Slide anchor="top">
      <SectionLabel num="§ 03">The harness</SectionLabel>
      <PanelHeading>agent_docs/</PanelHeading>
      <TwoColPanel tree={<Tree rows={TREE} />}>
        <BulletList items={POINTS} />
      </TwoColPanel>
    </Slide>
  );
}
