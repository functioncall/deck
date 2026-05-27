import { Heading, Label, Stat, Text } from "@/components/atoms";

/**
 * Proof — the authority + evidence section (SPEC §3): the practitioner who built
 * the harness (CTO @ Skyhost) and the founder's headline run metrics via the L1
 * `Stat` atom (270 files / 59 min / exit 0; 95–99% task-fit). For the waitlist
 * launch there are no testimonials yet, so an honest early-access block stands
 * in for placeholder quotes (Deck-n87) — help-don't-sell: real practice, not hype.
 * Token-only styling (ADR-0005).
 */
type SectionProps = { className?: string };

// The founder's headline run metrics (SPEC §1) — one unattended ralph run, plus
// the task-fit band the harness holds.
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
        Built by someone who ships this way.
      </Heading>
      <Text variant="lead" className="mt-6">
        The harness in the Kit isn&rsquo;t a thought experiment. It&rsquo;s the
        setup the founder — a working CTO at Skyhost — runs on real production
        code every day. One unattended run, measured:
      </Text>
      <div className="mt-12 grid grid-cols-2 gap-10 sm:grid-cols-4">
        {METRICS.map((metric) => (
          <Stat key={metric.label} value={metric.value} label={metric.label} />
        ))}
      </div>
      <div className="mt-16 rounded-lg border border-rule bg-bg-card p-8 md:p-10">
        <Label accent>Early access</Label>
        <Heading as="h3" size="display-sm" className="mt-3">
          No testimonials yet — and we won&rsquo;t invent any.
        </Heading>
        <Text variant="soft" className="mt-4 max-w-2xl">
          You&rsquo;d be among the first to run this harness outside the
          founder&rsquo;s own projects. So instead of a wall of quotes,
          here&rsquo;s what&rsquo;s real: the run above, on production code at
          Skyhost, every day. Get early access and you&rsquo;ll get the Kit at the
          lowest price it will ever be — and help shape what ships.
        </Text>
      </div>
    </section>
  );
}
