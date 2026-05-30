import { Heading, Label, Text } from "@/components/atoms";

/**
 * Proof — the evidence section (SPEC §3). Anonymous positioning: trust rests on
 * the WORK, not a named author (ADR-0006). For Launch #1 the proof is ONE bold,
 * honest, first-person founder claim (Locked decision 4) — no run metrics, no
 * receipt — anchored by the artifacts a visitor can already judge: the free
 * Deck and the Kit's actual files. For the waitlist launch there are no
 * testimonials yet, so an honest early-access block stands in for placeholder
 * quotes (Deck-n87) — help-don't-sell. Token-only (ADR-0005).
 */
type SectionProps = { className?: string };

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
        I built this harness on my own production code, and I run it every
        day. The Kit is the harness I actually use — not a demo, not a
        tutorial, not a thought experiment.
      </Text>
      <Text variant="soft" className="mt-4 max-w-2xl">
        The Deck you&rsquo;re reading was built with it. The Kit&rsquo;s files
        are the same ones on my disk — you&rsquo;ll be able to read them before
        you trust them.
      </Text>
      <div className="mt-16 rounded-lg border border-rule bg-bg-card p-8 md:p-10">
        <Label accent>Waitlist</Label>
        <Heading as="h3" size="display-sm" className="mt-3">
          No testimonials yet &mdash; and I won&rsquo;t invent any.
        </Heading>
        <Text variant="soft" className="mt-4 max-w-2xl">
          You&rsquo;d be among the first to run this harness outside the
          projects it was built for. So instead of a wall of quotes,
          here&rsquo;s what&rsquo;s real: the free Deck, the Kit&rsquo;s actual
          files, and the founder behind both. Join the waitlist and
          you&rsquo;ll lock the founding price &mdash; and help shape what
          ships.
        </Text>
      </div>
    </section>
  );
}
