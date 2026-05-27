import NextLink from "next/link";
import { Badge, Heading, Label, Text } from "@/components/atoms";
import { ContextWindow } from "@/components/diagrams";
import { deck } from "@/content";

/**
 * DeckPreview — the free-Deck preview (SPEC §3): the map is open, no email, no
 * paywall. Reuses an L2 deck diagram (`ContextWindow`) as the marketing visual,
 * lists the map's stops as L1 `Badge`s, and links to `/deck`. The Deck's name
 * comes from typed content (`@/content`). Token-only styling (ADR-0005).
 */
type SectionProps = { className?: string };

// The map's stops — what the free Deck walks you through (its section titles).
const DECK_TOPICS = [
  "The LLM as a function",
  "Context is an array",
  "The agent harness",
  "Custom skills",
  "The Ralph loop",
  "Task selection",
];

export function DeckPreview({ className }: SectionProps) {
  return (
    <section
      className={`mx-auto max-w-5xl px-6 py-20 md:py-28${
        className ? ` ${className}` : ""
      }`}
    >
      <Label accent>The map — free</Label>
      <Heading as="h2" size="display-sm" className="mt-4">
        See the whole picture first.
      </Heading>
      <div className="mt-10 grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <Text variant="lead">
            {deck.name} is the map: an open, interactive walk through how
            long-running agents actually work. No email, no paywall — read it,
            share it, send it to your team.
          </Text>
          <div className="mt-8 flex flex-wrap gap-3">
            {DECK_TOPICS.map((topic) => (
              <Badge key={topic}>{topic}</Badge>
            ))}
          </div>
          <NextLink
            href="/deck"
            className="mt-10 inline-flex items-center justify-center rounded border border-rule bg-transparent px-8 py-4 font-sans text-lg font-medium tracking-wide text-ink transition-colors hover:bg-bg-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Read the Deck
          </NextLink>
        </div>
        <div className="flex justify-center">
          <ContextWindow />
        </div>
      </div>
    </section>
  );
}
