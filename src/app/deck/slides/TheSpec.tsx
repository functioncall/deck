import { Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { SlideFooter } from "./SlideFooter";
import { Pipeline, StageHeading } from "./stage";

/** The PRD the grilling session synthesises (index.html slide 4.7 doc preview). */
const SECTIONS = [
  ["## GOAL", "Reimplement 8 web components for React Native."],
  [
    "## CONTEXT",
    "Web components don't translate 1:1 to RN. Preserve the visual language.",
  ],
  [
    "## SCOPE",
    "atoms, molecules, weather, explore, profile, places, itineraries, verification.",
  ],
  ["## ACCEPTANCE", "Visual parity at 3 breakpoints. All existing tests pass."],
  ["## OUT OF SCOPE", "Architecture decisions, navigation refactor."],
];

/**
 * s-4-7 — "the spec" (index.html data-num 4.7): the `/to-prd` stepper slide
 * (workflow stage `spec`). The grilling session synthesised into a PRD on disk —
 * no new interview — shown as a titled spec-document panel (the deck's `.code`
 * surface with prose body). Single state; cites Matt Pocock's to-prd skill.
 */
export function TheSpec() {
  return (
    <Slide hasStepper>
      <Pipeline active="spec" />
      <StageHeading skill="/to-prd">The spec.</StageHeading>
      <Text variant="lead" className="mb-8 text-base">
        Synthesizes the grilling session into a PRD on disk.{" "}
        <em className="italic text-accent">No new interview.</em>
      </Text>
      <div className="w-full max-w-3xl rounded border border-rule bg-bg-card p-6 text-left">
        <div className="mb-3 font-mono text-xs uppercase tracking-wider text-ink-dim">
          specs/2026-05-04-mobile-components-phase-4.md
        </div>
        <div className="flex flex-col gap-2 font-sans text-sm leading-relaxed text-ink">
          {SECTIONS.map(([heading, body]) => (
            <div key={heading}>
              <div className="font-mono text-xs text-accent">{heading}</div>
              <div>{body}</div>
            </div>
          ))}
        </div>
      </div>
      <SlideFooter
        person="Matt Pocock"
        href="https://github.com/mattpocock/skills/blob/main/skills/engineering/to-prd/SKILL.md"
      >
        to-prd skill
      </SlideFooter>
    </Slide>
  );
}
