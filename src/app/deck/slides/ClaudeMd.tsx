import { Slide } from "@/components/deck-player";
import { BulletList } from "./BulletList";
import { PanelHeading, Tree, TwoColPanel, type TreeRow } from "./panel";
import { SectionLabel } from "./SectionLabel";
import { SlideFooter } from "./SlideFooter";

/** The tree with the multi-level CLAUDE.md files highlighted (index.html 3.3). */
const TREE: TreeRow[] = [
  { text: "~/project/", tone: "root" },
  { text: "├── CLAUDE.md", tone: "active" },
  { text: "├── .claude/", tone: "dim" },
  { text: "│   └── skills/", tone: "dim" },
  { text: "├── .beads/", tone: "dim" },
  { text: "├── agent_docs/", tone: "dim" },
  { text: "│   └── ...", tone: "dim" },
  { text: "├── scripts/", tone: "dim" },
  { text: "│   └── ralph.sh", tone: "dim" },
  { text: "└── src/" },
  { text: "    ├── app/" },
  { text: "    │   └── CLAUDE.md", tone: "active-file" },
  { text: "    ├── modules/" },
  { text: "    │   └── CLAUDE.md", tone: "active-file" },
  { text: "    ├── components/" },
  { text: "    │   └── CLAUDE.md", tone: "active-file" },
  { text: "    └── server/" },
  { text: "        └── CLAUDE.md", tone: "active-file" },
];

const POINTS = [
  {
    term: "A map, not a brain dump.",
    desc: "Points at docs, doesn't contain them.",
  },
  {
    term: "Lists standards, never-rules, skill names.",
    desc: "One section each.",
  },
  {
    term: "Multi-level.",
    desc: "Sub-CLAUDE.mds in each module — app, modules, components, server.",
  },
  {
    term: "Progressive disclosure.",
    desc: "Root loads at session start. Sub-files load only when the agent enters that directory.",
  },
  {
    term: "Same context budget, more steering.",
    desc: "Right rules show up at the right moment.",
  },
];

/**
 * s-3-3 — "CLAUDE.md" (index.html data-num 3.3): the project map. The tree with
 * every CLAUDE.md highlighted beside the rules for writing a good one. Single
 * state; cites Dex Horthy.
 */
export function ClaudeMd() {
  return (
    <Slide anchor="top">
      <SectionLabel num="§ 03">The harness</SectionLabel>
      <PanelHeading>CLAUDE.md.</PanelHeading>
      <TwoColPanel tree={<Tree rows={TREE} />}>
        <BulletList items={POINTS} />
      </TwoColPanel>
      <SlideFooter
        person="Dex Horthy"
        href="https://www.humanlayer.dev/blog/writing-a-good-claude-md"
      >
        Writing a Good CLAUDE.md
      </SlideFooter>
    </Slide>
  );
}
