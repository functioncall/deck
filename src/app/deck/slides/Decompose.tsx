import type { ReactNode } from "react";
import { Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { BulletList } from "./BulletList";
import { Pipeline, StageHeading } from "./stage";

/** A `.stack-block` node in the decompose fan-out (index.html slide 4.11). */
function StackBlock({
  accent = false,
  children,
}: {
  accent?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded border bg-bg-card px-4 py-2.5 font-mono text-xs ${
        accent ? "border-accent-soft text-accent" : "border-rule text-ink-soft"
      }`}
    >
      {children}
    </div>
  );
}

/** Flow arrow — points down on mobile (a top-down tree) and right on desktop. */
function FlowArrow() {
  return (
    <span aria-hidden="true" className="text-ink-dim">
      <span className="md:hidden">↓</span>
      <span className="max-md:hidden">→</span>
    </span>
  );
}

/** The three artefacts /session-planner fans out to. */
const OUTPUTS = ["feature branch", "N Beads issues + deps", "ralph.sh"];

const POINTS = [
  {
    term: "Sized for the smart zone.",
    desc: "Each issue fits one fresh session.",
  },
  {
    term: "Ralph script wired to this queue.",
    desc: "Per-epic guard rails, ready to run.",
  },
];

/**
 * s-4-11 — "decompose" (index.html data-num 4.11): the `/session-planner` stepper
 * slide (workflow stage `decompose`). The spec fans out into a feature branch, N
 * dependency-linked Beads issues, and a wired ralph.sh — each issue sized for the
 * smart zone. Single state.
 */
export function Decompose() {
  return (
    <Slide hasStepper>
      <Pipeline active="decompose" />
      <StageHeading skill="/session-planner">Decompose.</StageHeading>
      <Text variant="lead" className="mb-8 text-base">
        Spec to issues,{" "}
        <em className="italic text-accent">sized for the smart zone.</em>
      </Text>
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-5">
        <StackBlock>spec.md</StackBlock>
        <FlowArrow />
        <StackBlock accent>/session-planner</StackBlock>
        <FlowArrow />
        <div className="flex flex-col gap-3">
          {OUTPUTS.map((out) => (
            <StackBlock key={out}>{out}</StackBlock>
          ))}
        </div>
      </div>
      <div className="mt-10 w-full max-w-2xl">
        <BulletList items={POINTS} marker />
      </div>
    </Slide>
  );
}
