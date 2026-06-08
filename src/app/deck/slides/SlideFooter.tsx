import type { ReactNode } from "react";
import { Link } from "@/components/atoms";

/**
 * SlideFooter — the deck's `.slide-footer` reference line (index.html ~107):
 * a mono "Reference" label over the cited person + an accent link, pinned to the
 * bottom-left of the slide frame. Sits at `bottom-20` so it clears the fixed
 * `StickyCaptureBar` at the bottom of `/deck` (they used to overlap). Shared
 * chrome for the cited slides — not a registry slide. Token-only (ADR-0005).
 *
 * Two forms:
 *  - single: `<SlideFooter person href>label</SlideFooter>`
 *  - multi:  `<SlideFooter refs={[{ person?, href, label }, ...]} />` — stacks
 *    each entry vertically under one "References" eyebrow.
 */
type SlideRef = { person?: string; href: string; label: ReactNode };

type SlideFooterProps =
  | { person: string; href: string; children: ReactNode; refs?: never }
  | { refs: SlideRef[]; person?: never; href?: never; children?: never };

function RefLine({ person, href, label }: SlideRef) {
  return (
    <div>
      {person ? (
        <>
          <span className="text-ink">{person}</span> ·{" "}
        </>
      ) : null}
      <Link href={href} target="_blank" rel="noopener" variant="accent">
        {label}
      </Link>
    </div>
  );
}

export function SlideFooter(props: SlideFooterProps) {
  const refs: SlideRef[] = props.refs
    ? props.refs
    : [{ person: props.person, href: props.href, label: props.children }];

  return (
    <div className="absolute inset-x-[10vw] bottom-20 text-left font-mono text-sm text-ink-soft">
      <div className="mb-1 text-xs uppercase tracking-widest text-ink-dim">
        {refs.length > 1 ? "References" : "Reference"}
      </div>
      <div className="flex flex-col gap-1">
        {refs.map((ref, i) => (
          <RefLine key={i} {...ref} />
        ))}
      </div>
    </div>
  );
}
