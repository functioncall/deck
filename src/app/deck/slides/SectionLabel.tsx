import type { ReactNode } from "react";

/**
 * SectionLabel — the deck's `.section-label` corner marker (index.html ~170):
 * a mono uppercase eyebrow pinned top-left of the slide, with the `§ 0N` number
 * in the gold accent. Positioned absolutely so it escapes `Slide`'s centred
 * content flow and pins to the slide frame (the nearest positioned ancestor is
 * the player's full-bleed slide wrapper). Shared chrome for the §1+ slides —
 * not a registry slide. Token-only (ADR-0005).
 */
type SectionLabelProps = { num: string; children: ReactNode };

export function SectionLabel({ num, children }: SectionLabelProps) {
  return (
    <div className="absolute left-[5vw] top-[5vh] z-10 font-mono text-xs font-medium uppercase tracking-widest text-ink-dim">
      <span className="mr-2 text-accent">{num}</span>
      {children}
    </div>
  );
}
