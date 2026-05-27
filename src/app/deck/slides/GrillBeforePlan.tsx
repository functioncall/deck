import { Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { SectionLabel } from "./SectionLabel";
import { SlideFooter } from "./SlideFooter";
import { Pipeline, StageHeading } from "./stage";

/** The agent's clarifying questions (index.html slide 4.5 card). */
const QUESTIONS = [
  "What happens when a user pulls to refresh while a stream is loading? Cancel? Queue?",
  "Bottom-sheet scroll behavior, does it lock the parent scroll or compete with it?",
  "Offline state: stale data shown, error shown, or skeleton? Decide once, here.",
];

/**
 * s-4-5 — "grill before you plan" (index.html data-num 4.5): the `/grill-me`
 * stepper slide (workflow stage `grill`). The agent asks its questions now or
 * assumes later — a card of the kind of questions it surfaces. Single state;
 * cites Matt Pocock's grill skill.
 */
export function GrillBeforePlan() {
  return (
    <Slide hasStepper>
      <SectionLabel num="§ 04">The plan</SectionLabel>
      <Pipeline active="grill" />
      <StageHeading skill="/grill-me">Grill before you plan.</StageHeading>
      <Text variant="lead" className="mb-7 text-base">
        The agent asks now or assumes later.{" "}
        <em className="italic text-accent">Assumptions become bugs.</em>
      </Text>
      <div className="w-full max-w-3xl rounded-md border border-rule bg-bg-card p-7 text-left font-mono text-sm leading-relaxed text-ink-soft">
        {QUESTIONS.map((q, i) => (
          <div key={i} className={i > 0 ? "mt-4" : undefined}>
            <div className="mb-2 text-accent">Q{i + 1}.</div>
            <div>{q}</div>
          </div>
        ))}
      </div>
      <SlideFooter
        person="Matt Pocock"
        href="https://github.com/mattpocock/skills/blob/main/skills/engineering/grill/SKILL.md"
      >
        grill skill
      </SlideFooter>
    </Slide>
  );
}
