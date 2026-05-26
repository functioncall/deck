import { Heading } from "@/components/atoms";
import { Slide } from "@/components/deck-player";

/**
 * s-0-2 — the bio slide (index.html `.slide.bio`, data-num 0.2): the speaker's
 * name in serif over a mono uppercase role line.
 */
export function Bio() {
  return (
    <Slide anchor="center">
      <Heading as="h2" size="display-sm">
        Shekhar Upadhaya
      </Heading>
      <p className="font-mono text-sm uppercase tracking-widest text-ink-soft">
        CTO · Skyhost &nbsp;·&nbsp; ex-Amazon
      </p>
    </Slide>
  );
}
