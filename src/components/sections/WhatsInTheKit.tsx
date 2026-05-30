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
    name: "custom skills",
    desc: "Stop re-typing the same five-step request. The slash-command workflows — /grill-me, /to-prd, and the rest — wrap a recurring task into one verb.",
  },
  {
    name: "CLAUDE.md",
    desc: "Stop re-explaining your project every session. The instruction sheet that grounds every agent run in your conventions and architecture.",
  },
  {
    name: "ralph-loop script",
    desc: "Stop watching it run. The while-loop runner that feeds the agent its prompt and resets the context each pass, so it grinds through long jobs without you.",
  },
  {
    name: "agent_docs templates",
    desc: "Stop losing the plan when the chat dies. The durable specs, ADRs, and context docs the agent reads — so state lives on disk, not in a fragile thread.",
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
        The founder&rsquo;s actual agentic-coding harness — the same one behind
        the Deck — as reusable templates. Join the waitlist and you&rsquo;ll get
        it at the founding price the day it ships.
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
        Screencast &mdash; plus the Screencast itself and the Viewer (a local way
        to see what your agent actually did) free when they ship.
      </Text>
      <div className="mt-10">
        <CheckoutButton className="px-8 py-4 text-lg">Join the waitlist</CheckoutButton>
      </div>
    </section>
  );
}
