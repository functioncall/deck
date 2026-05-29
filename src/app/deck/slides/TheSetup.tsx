import { Fragment } from "react";
import { Slide } from "@/components/deck-player";
import { PanelHeading, Tree, TwoColPanel, type TreeRow } from "./panel";

/** The full project tree (index.html slide 3.2 — no highlight). */
const TREE: TreeRow[] = [
  { text: "~/project/", tone: "root" },
  { text: "├── CLAUDE.md" },
  { text: "├── .claude/" },
  { text: "│   └── skills/" },
  { text: "│      ├── grill-me.md" },
  { text: "│      ├── to-prd.md" },
  { text: "│      ├── session-planner.md" },
  { text: "│      └── improve-codebase-architecture.md" },
  { text: "├── .beads/" },
  { text: "├── agent_docs/" },
  { text: "│   ├── adding-a-feature.md" },
  { text: "│   ├── anti-patterns.md" },
  { text: "│   ├── architecture.md" },
  { text: "│   ├── components.md" },
  { text: "│   ├── server.md" },
  { text: "│   ├── tech-debt.md" },
  { text: "│   ├── workflow.md" },
  { text: "│   └── specs/" },
  { text: "├── scripts/" },
  { text: "│   └── ralph.sh" },
  { text: "└── src/" },
  { text: "    ├── app/" },
  { text: "    │   └── CLAUDE.md" },
  { text: "    ├── modules/" },
  { text: "    │   └── CLAUDE.md" },
  { text: "    ├── components/" },
  { text: "    │   └── CLAUDE.md" },
  { text: "    └── server/" },
  { text: "        └── CLAUDE.md" },
];

/** The six harness pieces, in order (index.html slide 3.2 numbered list). */
const POINTS = [
  ["01", "CLAUDE.md", "project map · multi-level"],
  ["02", "agent_docs/", "architecture · conventions · specs"],
  ["03", "custom skills", "slash commands · tiny markdown"],
  ["04", "issue tracker", "Beads · dependency graph · survives sessions"],
  ["05", "The Ralph loop", "the loop · fresh window each pass"],
];

/**
 * s-3-2 — "the setup" (index.html data-num 3.2): the harness overview. The
 * persistent project tree beside the numbered index of the pieces that make it up.
 * Single state.
 */
export function TheSetup() {
  return (
    <Slide anchor="top">
      <PanelHeading>The setup.</PanelHeading>
      <TwoColPanel tree={<Tree rows={TREE} />}>
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-5">
          {POINTS.map(([num, title, desc]) => (
            <Fragment key={num}>
              <span className="font-mono text-sm text-accent">{num}</span>
              <div>
                <div className="font-mono text-sm text-ink">{title}</div>
                <div className="mt-0.5 font-mono text-xs text-ink-soft">
                  {desc}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </TwoColPanel>
    </Slide>
  );
}
