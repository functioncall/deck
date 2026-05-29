import { Fragment } from "react";
import { Heading, Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";

/** Each recurring friction folds back into the harness (index.html 7.2). */
const MAPPINGS = [
  { from: "Every repeated mistake", to: "an anti-pattern entry." },
  { from: "Every repeated workflow", to: "a slash command." },
  { from: "Every recurring correction", to: "a CLAUDE.md edit." },
  { from: "Every mechanical rule", to: "a lint." },
];

/**
 * s-7-2 — "the harness compounds" (index.html data-num 7.2): a three-column mono
 * mapping of recurring friction → a permanent harness fix, so each session
 * starts smarter than the last. Single state.
 */
export function HarnessCompounds() {
  return (
    <Slide anchor="center">
      <Heading as="h1" size="display-sm" className="mb-8 font-light">
        The harness compounds.
      </Heading>
      <div className="grid max-w-3xl grid-cols-[auto_auto_auto] items-baseline gap-x-6 gap-y-4 text-left font-mono text-base">
        {MAPPINGS.map((m) => (
          <Fragment key={m.from}>
            <span className="text-ink-soft">{m.from}</span>
            <span className="text-accent">→</span>
            <span className="text-ink">{m.to}</span>
          </Fragment>
        ))}
      </div>
      <Text variant="lead" className="mt-8 text-base">
        Each fix is permanent. The next session starts smarter than the last.
      </Text>
    </Slide>
  );
}
