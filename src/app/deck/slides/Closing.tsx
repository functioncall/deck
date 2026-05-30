import { Heading, Label, Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";

/**
 * s-7-5 — the closing slide (index.html data-num 7.5): the "Be on the loop. Not
 * in." sign-off, the contributors the ideas came from, and a final thank-you. No
 * section label (the deck's last slide drops its corner chrome). Single state.
 */
export function Closing() {
  return (
    <Slide anchor="center">
      <Heading as="h1" size="display" className="italic">
        Be on the loop. <em className="text-accent">Not in.</em>
      </Heading>
      <Label className="mt-24">With ideas from</Label>
      <Text variant="soft" className="mt-4 max-w-4xl leading-loose">
        Geoffrey Huntley &middot; Dexter Horthy &middot; Matt Pocock &middot;
        Steve Yegge
        <br />
        Ryan Lopopolo &middot; Lance Martin &middot; Mario Zechner &middot; Armin
        Ronacher
      </Text>
      <p className="mt-20 font-serif text-2xl font-light italic text-ink">
        Thank you.
      </p>
    </Slide>
  );
}
