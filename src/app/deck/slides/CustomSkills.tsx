import { Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { PanelHeading, Tree, TwoColPanel, type TreeRow } from "./panel";
import { SlideFooter } from "./SlideFooter";

/** The tree with .claude/skills/ expanded + highlighted (index.html 3.5). */
const TREE: TreeRow[] = [
  { text: "~/project/", tone: "root" },
  { text: "├── CLAUDE.md", tone: "dim" },
  { text: "├── .claude/", tone: "active" },
  { text: "│   └── skills/", tone: "active" },
  { text: "│      ├── grill-me.md", tone: "active-file" },
  { text: "│      ├── to-prd.md", tone: "active-file" },
  { text: "│      ├── session-planner.md", tone: "active-file" },
  { text: "│      └── improve-codebase-architecture.md", tone: "active-file" },
  { text: "├── .beads/", tone: "dim" },
  { text: "├── agent_docs/", tone: "dim" },
  { text: "│   └── ...", tone: "dim" },
  { text: "├── scripts/", tone: "dim" },
  { text: "│   └── ralph.sh", tone: "dim" },
  { text: "└── src/", tone: "dim" },
  { text: "    └── ...", tone: "dim" },
];

const SKILLS = [
  ["/grill-me", "interview before plan"],
  ["/to-prd", "turn idea into a PRD"],
  ["/session-planner", "break PRD into ralph-ready sessions"],
  ["/improve-codebase-architecture", "audit + propose refactors"],
];

/**
 * s-3-5 — "custom skills" (index.html data-num 3.5): each skill wraps a recurring
 * workflow into one verb, loaded only when invoked. The skills folder beside the
 * slash-command stack. Single state; cites Matt Pocock.
 */
export function CustomSkills() {
  return (
    <Slide anchor="top">
      <PanelHeading>some skills</PanelHeading>
      <TwoColPanel tree={<Tree rows={TREE} />}>
        <div className="mb-6 flex flex-col gap-2.5">
          {SKILLS.map(([cmd, desc]) => (
            <div
              key={cmd}
              className="flex items-center justify-between rounded border border-rule bg-bg-card px-4 py-2.5 font-mono text-sm"
            >
              <span className="text-ink">{cmd}</span>
              <span className="ml-3 text-xs text-ink-dim">{desc}</span>
            </div>
          ))}
        </div>
        <Text variant="lead" className="text-left">
          Each skill wraps a recurring workflow into one verb. Loaded only when
          invoked. <em className="text-accent">Stolen from Matt Pocock.</em>
        </Text>
      </TwoColPanel>
      <SlideFooter person="Matt Pocock" href="https://github.com/mattpocock/skills">
        mattpocock/skills
      </SlideFooter>
    </Slide>
  );
}
