import { Heading, Label, Stat, Text } from "@/components/atoms";

/**
 * Proof — the evidence section (SPEC §3). Anonymous positioning: trust rests on
 * the WORK, not a named author. Two anchors — the artifact (the free Deck you're
 * reading + the Kit's actual files, judgeable before you buy) and the result
 * (one measured, unattended ralph run via the L1 `Stat` atom: 270 files / 59 min
 * / exit 0; 95–99% task-fit). For the waitlist launch there are no testimonials
 * yet, so an honest early-access block stands in for placeholder quotes
 * (Deck-n87) — help-don't-sell: real practice, not hype. Token-only (ADR-0005).
 */
type SectionProps = { className?: string };

// Headline run metrics (SPEC §1) — one unattended ralph run, plus the task-fit
// band the harness holds. The result you can point at without a persona.
const METRICS = [
  { value: "270", label: "files in one run" },
  { value: "59 min", label: "unattended" },
  { value: "exit 0", label: "clean finish" },
  { value: "95–99%", label: "task-fit" },
];

export function Proof({ className }: SectionProps) {
  return (
    <section
      className={`mx-auto max-w-5xl px-6 py-20 md:py-28${
        className ? ` ${className}` : ""
      }`}
    >
      <Label accent>The proof</Label>
      <Heading as="h2" size="display-sm" className="mt-4">
        Judge the work, not the r&eacute;sum&eacute;.
      </Heading>
      <Text variant="lead" className="mt-6">
        The harness in the Kit isn&rsquo;t a thought experiment. It&rsquo;s the
        same working setup behind the Deck you&rsquo;re reading &mdash; run on
        real production code, not a demo. One unattended run, measured:
      </Text>
      <div className="mt-12 grid grid-cols-2 gap-10 sm:grid-cols-4">
        {METRICS.map((metric) => (
          <Stat key={metric.label} value={metric.value} label={metric.label} />
        ))}
      </div>
      <div className="mt-16 rounded-lg border border-rule bg-bg-card p-8 md:p-10">
        <Label accent>Early access</Label>
        <Heading as="h3" size="display-sm" className="mt-3">
          No testimonials yet &mdash; and we won&rsquo;t invent any.
        </Heading>
        <Text variant="soft" className="mt-4 max-w-2xl">
          You&rsquo;d be among the first to run this harness outside the projects
          it was built for. So instead of a wall of quotes, here&rsquo;s
          what&rsquo;s real: the run above, on production code &mdash; and the
          Kit&rsquo;s actual files, which you can read before you trust them. Get
          early access and you&rsquo;ll get the Kit at the lowest price it will
          ever be &mdash; and help shape what ships.
        </Text>
      </div>
    </section>
  );
}
