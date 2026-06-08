import { Heading, Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { Gantt } from "@/components/diagrams";

/**
 * The plan → execute → review split (index.html slide 4.1 gantt rows). A
 * left-aligned bar chart (~209 min total): every bar starts at the same left
 * edge, with width proportional to its share of the time — Plan ~120 min (57%),
 * Execute 59 min (28%), Review ~30 min (15%). No offset, so the bars compare
 * head-to-head instead of cascading.
 */
const ROWS = [
  { label: "Plan", time: "~2:00 hr", width: "57%", variant: "plan" as const },
  {
    label: "Execute",
    time: "59 min",
    width: "28%",
    variant: "agent" as const,
  },
  {
    label: "Review",
    time: "~30 min",
    width: "15%",
    variant: "review" as const,
  },
];

/**
 * s-4-1 — "where my hours actually go" (index.html data-num 4.1): the §4 opener.
 * The Gantt timeline (reused from epic-1) showing the plan/execute/review split —
 * most of the time is in the plan, not the 59-minute run — under a light display
 * title and over the "brainstorm, grill, spec, atomic issues" lead. Single state.
 */
export function ThePlanGantt() {
  return (
    <Slide anchor="center">
      <Heading as="h2" size="display-sm" className="mb-7 font-light">
        Where my hours actually go.
      </Heading>
      <Gantt rows={ROWS} />
      <Text variant="lead" className="mt-6 max-w-2xl text-sm">
        Most of my time is here, not in the run.{" "}
        <em className="italic text-accent">
          Brainstorm, grill, spec, atomic issues.
        </em>
      </Text>
    </Slide>
  );
}
