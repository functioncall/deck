import { Label, Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";

/**
 * s-0-2 — the cold-open attribution note (new for launch-1): a short, humble
 * line right after the title. These aren't all my own ideas — it's an aggregate
 * of the best thinking in this space, plus my own experiments on what works and
 * what doesn't. Sources are listed at the end. No section label, single state.
 */
export function AttributionNote() {
  return (
    <Slide anchor="center">
      <Label className="mb-6">A note before we start</Label>
      <Text variant="lead" className="max-w-3xl">
        These aren&rsquo;t all my own ideas. This is an aggregate of the best
        thinking in this space &mdash; the engineers I learn from &mdash; folded
        together with my own experiments on what actually works and what
        doesn&rsquo;t.
      </Text>
      <Text variant="soft" className="mt-6 max-w-2xl">
        The people and talks I&rsquo;m drawing on are{" "}
        <em className="text-accent">listed at the end.</em>
      </Text>
    </Slide>
  );
}
