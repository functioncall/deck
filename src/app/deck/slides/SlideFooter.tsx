import type { ReactNode } from "react";
import { Link } from "@/components/atoms";

/**
 * SlideFooter — the deck's `.slide-footer` reference line (index.html ~107):
 * a mono "Reference" label over the cited person + an accent link. On desktop it
 * is pinned to the bottom-left of the slide frame (`bottom-20`, clearing the
 * `StickyCaptureBar`). On mobile the bar is taller and the slide scrolls, so the
 * refs flow inline at the end of the content instead (scrolling with it, cleared
 * by the slide's bottom padding) — never floating over or hidden behind the bar.
 * Shared chrome for the cited slides — not a registry slide. Token-only.
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
    <div className="text-left font-mono text-sm text-ink-soft max-md:mt-6 max-md:w-full md:absolute md:inset-x-[10vw] md:bottom-20">
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
