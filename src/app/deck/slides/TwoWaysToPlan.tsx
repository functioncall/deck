import type { ReactNode } from "react";
import { Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { CtxLabel, Pipeline, StageHeading } from "./stage";

/** One side of the plan-mode vs /grill-me contrast (index.html slide 4.6 split). */
function PlanWay({
  tone,
  label,
  verb,
  desc,
}: {
  tone: "good" | "bad";
  label: string;
  verb: ReactNode;
  desc: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <CtxLabel tone={tone}>{label}</CtxLabel>
      </div>
      <div className="font-serif text-2xl font-light italic text-ink">
        eager to <em className="not-italic font-normal">{verb}</em>
      </div>
      <Text variant="soft" className="text-sm">
        {desc}
      </Text>
    </div>
  );
}

/**
 * s-4-6 — "two ways to plan" (index.html data-num 4.6): the first §4 stepper
 * slide (workflow stage `grill`). The contrast between plan mode — eager to write
 * an asset first — and `/grill-me` — eager to understand first. Single state.
 */
export function TwoWaysToPlan() {
  return (
    <Slide hasStepper>
      <Pipeline active="grill" />
      <StageHeading>Two ways to plan.</StageHeading>
      <Text variant="lead" className="mb-10 text-base">
        Write the spec after you understand it,{" "}
        <em className="italic text-accent">not before.</em>
      </Text>
      <div className="grid w-full max-w-4xl grid-cols-1 items-center gap-8 text-left md:grid-cols-2 md:gap-[4vw]">
        <PlanWay
          tone="bad"
          label="Plan mode"
          verb="write"
          desc="Rushes to write the plan before it understands the problem. The asset comes first; understanding never catches up."
        />
        <PlanWay
          tone="good"
          label="/grill-me"
          verb="understand"
          desc="Builds shared understanding of the problem first. The asset comes after — and it's right."
        />
      </div>
    </Slide>
  );
}
