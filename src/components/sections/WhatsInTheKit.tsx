import { Heading, Label, Text } from "@/components/atoms";
import { CheckoutButton } from "@/components/molecules";
import { harnessStarterKit } from "@/content";

/**
 * WhatsInTheKit — the Harness Starter Kit contents (SPEC §3): the paid hero,
 * the founder's real agentic-coding harness as reusable templates. Lists the
 * Kit's pieces using the glossary terms exactly (custom skills, CLAUDE.md,
 * ralph-loop script, agent_docs templates) and carries the waitlist CTA. The
 * Kit name comes from typed content (`@/content`). Token-only styling (ADR-0005).
 *
 * Honest-waitlist reframe (Locked decision 3): waitlist members lock in the
 * founding price and receive the Kit the day it ships. The section `id` remains
 * the named landing anchor for the Kit (deep links).
 */
type SectionProps = { className?: string };

// The Kit's contents — glossary terms exact (CONTEXT.md: Harness Starter Kit).
const KIT_CONTENTS = [
  {
    name: "ralph-loop script",
    desc: "The death it kills: context rot. The while-loop runner resets the context every pass, so failed attempts don't pile up and the spec never scrolls out of the window — it grinds through a long job instead of rotting into hallucination.",
  },
  {
    name: "CLAUDE.md",
    desc: "The death it kills: drift. The instruction sheet is reloaded into every pass, so the agent stays grounded in your conventions and architecture instead of wandering off and editing the wrong file.",
  },
  {
    name: "agent_docs templates",
    desc: "The death it kills: lost state. Specs, ADRs, and context docs keep the plan on disk, not in a fragile chat thread — so the work survives when the context window dies.",
  },
  {
    name: "custom skills",
    desc: "The death it kills: the false finish. Slash-command workflows — /grill-me, /to-prd, and the rest — turn a spec into an issue-tracked backlog and a verify-gate the agent has to clear before it can call a job done.",
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
      <Label accent>The toolkit — paid</Label>
      <Heading as="h2" size="display-sm" className="mt-4">
        Inside the {harnessStarterKit.name}.
      </Heading>
      <Text variant="lead" className="mt-6">
        Not a folder of config files — a loop that finishes. The founder&rsquo;s
        actual agentic-coding harness, the same one behind this Deck, with the
        four things that derail a long run already solved. Join the waitlist and
        you&rsquo;ll get it at the founding price the day it ships.
      </Text>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {KIT_CONTENTS.map((item) => (
          <div
            key={item.name}
            className="rounded-lg border border-rule bg-bg-card p-6"
          >
            <div className="font-mono text-sm tracking-wide text-ink">
              {item.name}
            </div>
            <Text variant="soft" className="mt-2">
              {item.desc}
            </Text>
          </div>
        ))}
      </div>
      <Text variant="soft" className="mt-8">
        And it&rsquo;s growing: waitlist members lock in founding-member status,
        the private build-log, and a vote on the real task built in the
        Screencast &mdash; plus the Screencast itself and the Viewer, a local way
        to start a loop and see exactly what your agent did, free when they ship.
      </Text>
      <div className="mt-10">
        <CheckoutButton className="px-8 py-4 text-lg">Join the waitlist</CheckoutButton>
      </div>
    </section>
  );
}
