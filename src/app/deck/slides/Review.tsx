import { Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { BulletList } from "./BulletList";
import { SectionLabel } from "./SectionLabel";
import { PhoneSplit, Pipeline, StageHeading } from "./stage";
import screenshot from "./ralph-review.jpg";

const POINTS = [
  {
    term: "Open the PR.",
    desc: "Ralph pushed and opened it. I read the diff.",
  },
  {
    term: "Check the preview build.",
    desc: "Web → Vercel preview. Mobile → Xcode Cloud build lands in TestFlight. Click through.",
  },
  {
    term: "Loop back if needed.",
    desc: "Anything off becomes a new issue. Ralph runs again. Otherwise merge.",
  },
];

/**
 * s-5-9 — "review" (index.html data-num 5.9): the close of §5 (workflow stage
 * `review`). Ralph closes the queue, I open the PR — a phone showing the final
 * run summary (59 min, 13 epics, all closed) beside the review steps. Single
 * state.
 */
export function Review() {
  return (
    <Slide hasStepper>
      <SectionLabel num="§ 05">The run</SectionLabel>
      <Pipeline active="review" />
      <StageHeading>Review.</StageHeading>
      <Text variant="lead" className="mb-10 text-base">
        Ralph closes the queue. <em className="italic text-accent">I open the PR.</em>
      </Text>
      <PhoneSplit
        src={screenshot}
        alt="Phone showing the Ralph final summary: 59 min, 13 epics, all closed"
      >
        <BulletList items={POINTS} marker />
      </PhoneSplit>
    </Slide>
  );
}
