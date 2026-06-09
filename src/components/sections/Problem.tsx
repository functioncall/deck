import type { ReactNode } from "react";
import { Callout, Heading, Label, Text } from "@/components/atoms";

/**
 * Problem — the pain (SPEC §3): babysitting AI. Help-don't-sell voice — name
 * what the reader already feels, no product pitch yet. Composes the L1 `Heading`,
 * `Text`, and `Callout` atoms; narrative copy is section-local. Token-only
 * styling (ADR-0005).
 */
type SectionProps = { className?: string };

// The pain points, each lifting the felt cost (the `<strong>` reads as full ink).
const PAINS: { id: string; body: ReactNode }[] = [
  {
    id: "rot",
    body: (
      <>
        Context rots — failed attempts pile up until the spec scrolls out of
        the window, and it <strong>starts hallucinating</strong> with total
        confidence.
      </>
    ),
  },
  {
    id: "retry",
    body: (
      <>
        It gets stuck retrying the same broken fix, over and over,{" "}
        <strong>burning tokens at 10&times;</strong> until you notice and kill
        it.
      </>
    ),
  },
  {
    id: "false-done",
    body: (
      <>
        It <strong>declares victory on nothing</strong> — &ldquo;looks done to
        me&rdquo; — and you find out at review, three commits too late.
      </>
    ),
  },
  {
    id: "blast",
    body: (
      <>
        Left running unsupervised, it fires the destructive command — people
        have <strong>wiped years of prod data</strong> this way.
      </>
    ),
  },
];

export function Problem({ className }: SectionProps) {
  return (
    <section
      className={`mx-auto max-w-3xl px-6 py-20 md:py-28${
        className ? ` ${className}` : ""
      }`}
    >
      <Label accent>The problem</Label>
      <Heading as="h2" size="display-sm" className="mt-4">
        The agent still can&rsquo;t finish without you.
      </Heading>
      <Text variant="lead" className="mt-6">
        The demos look like magic. Real work looks like you, hunched over the
        terminal, steering a model that loses the plot the moment the task gets
        long.
      </Text>
      <div className="mt-10 flex flex-col gap-4">
        {PAINS.map((pain) => (
          <Callout key={pain.id}>{pain.body}</Callout>
        ))}
      </div>
    </section>
  );
}
