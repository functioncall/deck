import { Heading, Label, Text } from "@/components/atoms";
import { CheckoutButton } from "@/components/molecules";
import { harnessStarterKit } from "@/content";

/**
 * WhatsInTheKit — the Harness Starter Kit contents (SPEC §3): the paid hero,
 * the founder's real agentic-coding harness. Each piece is sold by the OUTCOME
 * it buys, with the underlying file kept as a quiet tag — so the section leads
 * with "a loop that finishes", not a folder of config files. The Kit name comes
 * from typed content (`@/content`). Token-only styling (ADR-0005).
 *
 * Honest-waitlist reframe (Locked decision 3): waitlist members lock in the
 * founding price and receive the Kit the day it ships. The section `id` remains
 * the named landing anchor for the Kit (deep links).
 */
type SectionProps = { className?: string };

// The Kit's four pieces — each sold by the outcome it buys, with the underlying
// file as a quiet tag (CONTEXT.md: Harness Starter Kit).
const KIT_CONTENTS = [
  {
    title: "It finishes long jobs",
    desc: "The loop resets its own context every pass, so failed attempts don't pile up and the spec never scrolls out of view. It grinds to the end instead of rotting into hallucination.",
    file: "ralph-loop script",
  },
  {
    title: "It stays on task",
    desc: "Your conventions and architecture get reloaded into every pass, so it keeps building the thing you asked for instead of wandering off and editing the wrong file.",
    file: "CLAUDE.md",
  },
  {
    title: "It never loses the plan",
    desc: "The spec and the decisions live on disk, not in a chat thread — so the work survives when the context window dies.",
    file: "agent_docs templates",
  },
  {
    title: "It won't fake-finish",
    desc: 'Every job has to clear a verify-gate before it can call itself done — no more "looks done to me" three commits too late.',
    file: "custom skills",
  },
];

export function WhatsInTheKit({ className }: SectionProps) {
  return (
    <section
      id="harness-starter-kit"
      className={`mx-auto max-w-5xl px-6 py-20 md:py-28${
        className ? ` ${className}` : ""
      }`}
    >
      <Label accent>The Kit — paid</Label>
      <Heading as="h2" size="display-sm" className="mt-4">
        Inside the {harnessStarterKit.name}.
      </Heading>
      <Text variant="lead" className="mt-6">
        Not a folder of config files — a loop that finishes. It&rsquo;s the
        harness I actually run, with the four things that derail a long job
        already solved.
      </Text>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {KIT_CONTENTS.map((item) => (
          <div
            key={item.file}
            className="rounded-lg border border-rule bg-bg-card p-6"
          >
            <div className="text-base font-medium text-ink">{item.title}</div>
            <Text variant="soft" className="mt-2">
              {item.desc}
            </Text>
            <Text
              variant="soft"
              className="mt-4 block font-mono text-xs tracking-wide"
            >
              {item.file}
            </Text>
          </div>
        ))}
      </div>
      <Text variant="soft" className="mt-8">
        Yes, an AI will happily generate these four files. What it can&rsquo;t
        hand you is which failure each one is shaped against &mdash; and
        that&rsquo;s the part you&rsquo;re paying for.
      </Text>
      <div className="mt-10">
        <CheckoutButton className="px-8 py-4 text-lg">Join the waitlist</CheckoutButton>
      </div>
    </section>
  );
}
