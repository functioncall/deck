import { Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { BulletList } from "./BulletList";
import { SectionLabel } from "./SectionLabel";
import { PhoneSplit, Pipeline, StageHeading } from "./stage";
import screenshot from "./ralph-run.jpg";

/** A mono inline code fragment in the §5 bullets (the deck's accent `<code>`). */
function Code({ children }: { children: string }) {
  return <code className="font-mono text-accent">{children}</code>;
}

const POINTS = [
  {
    term: "Launched from the session, not a terminal.",
    desc: (
      <>
        Same session that did grilling, spec, decompose now runs{" "}
        <Code>ralph.sh</Code>.
      </>
    ),
  },
  {
    term: "Ralph runs headless.",
    desc: (
      <>
        Each iteration spawns a fresh <Code>claude -p</Code>, picks the next Beads
        issue, lints, commits, closes it, loops. Verbose output streams to a log.
      </>
    ),
  },
  {
    term: "The session polls the log.",
    desc: "Tails every minute, summarizes progress, flags failures. I’m on my phone.",
  },
];

/**
 * s-5-2 — "the run" (index.html data-num 5.2): the §5 opener (workflow stage
 * `run`). The same session that planned the work now runs and watches it — a
 * phone tailing the Ralph log beside how the headless loop works. Single state.
 */
export function TheRun() {
  return (
    <Slide hasStepper>
      <SectionLabel num="§ 05">The run</SectionLabel>
      <Pipeline active="run" />
      <StageHeading>The run.</StageHeading>
      <Text variant="lead" className="mb-10 text-base">
        The same session that planned the work{" "}
        <em className="italic text-accent">now runs and watches it.</em>
      </Text>
      <PhoneSplit
        src={screenshot}
        alt="Phone showing a Claude session tailing the Ralph log"
      >
        <BulletList items={POINTS} marker />
      </PhoneSplit>
    </Slide>
  );
}
