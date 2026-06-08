import { Heading, Label, Link, Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";

/**
 * s-7-3 — the sources slide (new for launch-1): the people and talks the deck
 * draws on, paid off from the cold-open attribution note. People as a quiet
 * list, the two talks as accent links that open in a new tab (same target/rel
 * as SlideFooter). Single state, no section label.
 */
const PEOPLE = [
  "Dex Horthy",
  "Geoffrey Huntley",
  "Matt Pocock",
  "Steve Yegge",
  "andrej-karpathy-skills — CLAUDE.md",
];

const TALKS = [
  {
    person: "Geoffrey Huntley",
    label:
      "Fundamental skills and knowledge you must have in 2026 for SWE",
    href: "https://www.youtube.com/watch?v=Jr2auYrBDA4",
  },
  {
    person: "Dex Horthy",
    label: "Escaping the Dumb Zone (#262)",
    href: "https://www.youtube.com/watch?v=sSeqKe5ZPYY",
  },
];

export function Sources() {
  return (
    <Slide anchor="center">
      <Heading as="h2" size="display-sm">
        Standing on shoulders
      </Heading>

      <div className="mt-12 flex w-full max-w-2xl flex-col gap-3 text-left">
        <Label>People</Label>
        <ul className="flex flex-col gap-2">
          {PEOPLE.map((person) => (
            <li key={person}>
              <Text variant="soft" as="span">
                {person}
              </Text>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex w-full max-w-2xl flex-col gap-3 text-left">
        <Label>Talks</Label>
        <ul className="flex flex-col gap-2">
          {TALKS.map((talk) => (
            <li key={talk.href}>
              <span className="text-ink">{talk.person}</span>
              {" — "}
              <Link
                href={talk.href}
                target="_blank"
                rel="noopener"
                variant="accent"
              >
                {talk.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Slide>
  );
}
