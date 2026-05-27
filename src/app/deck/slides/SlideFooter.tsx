import type { ReactNode } from "react";
import { Link } from "@/components/atoms";

/**
 * SlideFooter — the deck's `.slide-footer` reference line (index.html ~107):
 * a mono "Reference" label over the cited person + an accent link, pinned to the
 * bottom-left of the slide frame (absolute, like `SectionLabel`). Shared chrome
 * for the §3 cited slides — not a registry slide. Token-only (ADR-0005).
 */
type SlideFooterProps = { person: string; href: string; children: ReactNode };

export function SlideFooter({ person, href, children }: SlideFooterProps) {
  return (
    <div className="absolute inset-x-[10vw] bottom-[6vh] text-left font-mono text-sm text-ink-soft">
      <div className="mb-1 text-xs uppercase tracking-widest text-ink-dim">
        Reference
      </div>
      <span className="text-ink">{person}</span> ·{" "}
      <Link href={href} target="_blank" rel="noopener" variant="accent">
        {children}
      </Link>
    </div>
  );
}
