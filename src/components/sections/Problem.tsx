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
    id: "forgets",
    body: (
      <>
        You paste the context in again because the agent{" "}
        <strong>forgot the thread</strong> three steps ago.
      </>
    ),
  },
  {
    id: "drifts",
    body: (
      <>
        It drifts off-task, edits the wrong file, and{" "}
        <strong>you catch it by hand</strong> before it compounds.
      </>
    ),
  },
  {
    id: "zero",
    body: (
      <>
        Every run starts from zero — <strong>no memory</strong> of the plan, the
        spec, or what already shipped.
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
        You&rsquo;re still babysitting the agent.
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
