import NextLink from "next/link";
import { Heading, Label, Text } from "@/components/atoms";
import { harnessStarterKit } from "@/content";

/**
 * WhatsInTheKit — the Harness Starter Kit contents (SPEC §3): the paid hero, the
 * founder's real agentic-coding harness as reusable templates. Lists the Kit's
 * pieces using the glossary terms exactly (custom skills, CLAUDE.md, ralph-loop
 * script, agent_docs templates) and carries the buy CTA. The Kit name comes from
 * typed content (`@/content`). Token-only styling (ADR-0005).
 *
 * The section `id` is the anchor target for the buy CTAs across the site
 * (including the `/deck` conversion surfaces' `/#harness-starter-kit`).
 */
type SectionProps = { className?: string };

// PLACEHOLDER — L4 replaces this with the real Lemon Squeezy checkout URL.
const KIT_CHECKOUT_HREF = "/#harness-starter-kit";

// The Kit's contents — glossary terms exact (CONTEXT.md: Harness Starter Kit).
const KIT_CONTENTS = [
  {
    name: "custom skills",
    desc: "The slash-command workflows — /grill-me, /to-prd, and the rest — that wrap a recurring task into one verb.",
  },
  {
    name: "CLAUDE.md",
    desc: "The project instruction sheet that grounds every agent run in your conventions and architecture.",
  },
  {
    name: "ralph-loop script",
    desc: "The while-loop runner that feeds the agent its prompt and resets the context window each pass.",
  },
  {
    name: "agent_docs templates",
    desc: "The durable specs, ADRs, and context docs the agent reads — so state lives on disk, not in a fragile chat.",
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
        The founder&rsquo;s actual agentic-coding harness — the same one behind the
        Deck — as reusable templates you download the instant you buy. It works
        today.
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
        Founding buyers also lock in founding-member status, the private
        build-log, and a vote on the real task the founder builds in the
        Screencast.
      </Text>
      <div className="mt-10">
        <NextLink
          href={KIT_CHECKOUT_HREF}
          className="inline-flex items-center justify-center rounded bg-accent px-8 py-4 font-sans text-lg font-medium tracking-wide text-bg transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          Get the Kit
        </NextLink>
      </div>
    </section>
  );
}
