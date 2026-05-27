import { Heading, Label, Stat, Text } from "@/components/atoms";
import { TestimonialCard } from "@/components/molecules";
import { testimonials } from "@/content";

/**
 * Proof — the authority + evidence section (SPEC §3): the practitioner who built
 * the harness (CTO @ Skyhost), the founder's headline run metrics via the L1
 * `Stat` atom (270 files / 59 min / exit 0; 95–99% task-fit), and named
 * testimonials via the L1 `TestimonialCard`, read from typed content
 * (`testimonials.ts`). Help-don't-sell: the proof is real practice, not hype.
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
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.quote}
            quote={testimonial.quote}
            name={testimonial.name}
            title={testimonial.title}
          />
        ))}
      </div>
    </section>
  );
}
