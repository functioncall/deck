import { Heading } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { ContextWindow } from "@/components/diagrams";
import { SectionLabel } from "./SectionLabel";

/** The deck's `.bullets` list (index.html ~1511): ◆-marked left-aligned points. */
const POINTS = [
  "Every API call sends the entire array.",
  "Each turn appends.",
  "The model is stateless.",
];

/**
 * s-1-3 — "the context window is just an array" (index.html data-num 1.3): the
 * title + bullets beside the tall `ContextWindow` diagram (the 200K budget made
 * tangible). Two-column split, the window on the right.
 */
export function ContextArray() {
  return (
    <Slide anchor="center">
      <SectionLabel num="§ 01">The model</SectionLabel>
      <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-[4vw] text-left md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Heading as="h2" size="display-sm" className="text-left font-light">
            The context window
            <br />
            is just <em className="text-accent">an array</em>.
          </Heading>
          <ul className="mt-6 flex flex-col gap-3">
            {POINTS.map((point) => (
              <li
                key={point}
                className="relative pl-6 font-sans text-base leading-snug text-ink-soft"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 text-xs text-accent"
                >
                  ◆
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center">
          <ContextWindow tall />
        </div>
      </div>
    </Slide>
  );
}
