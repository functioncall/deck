import type { ReactNode } from "react";
import { Heading } from "@/components/atoms";

/**
 * The §3 "setup" panel chrome (index.html slides 3.2–3.7): a left-aligned serif
 * panel title over a two-column layout — the persistent project `Tree` on the
 * left, the explanation on the right. Shared chrome, not registry slides.
 * Token-only (ADR-0005).
 */

/** A row of the `Tree` and its highlight tone (the deck's `.tree-index` spans). */
type TreeTone = "root" | "default" | "dim" | "active" | "active-file";
export type TreeRow = { text: string; tone?: TreeTone };

const treeToneClass: Record<TreeTone, string> = {
  root: "font-medium text-ink",
  default: "text-ink-soft",
  dim: "text-ink-dim",
  // The deck highlights the active section in blue — mapped to the harness layer
  // token; the active files use the bright ink (ADR-0005, no raw hex).
  active: "font-medium text-layer-harness",
  "active-file": "text-ink",
};

/**
 * Tree — the deck's persistent index tree (`.tree-index`). `whitespace-pre`
 * preserves the box-drawing indentation. Dim by default, the active section
 * highlighted per row.
 */
export function Tree({ rows }: { rows: TreeRow[] }) {
  return (
    <div className="whitespace-pre text-left font-mono text-xs leading-relaxed">
      {rows.map((row, i) => (
        <div key={i} className={treeToneClass[row.tone ?? "default"]}>
          {row.text}
        </div>
      ))}
    </div>
  );
}

/** The left-aligned serif panel title, in a fixed-height row so the panels below
 *  start at the same baseline across the 3.2–3.7 set (the deck's min-height). */
export function PanelHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-20 w-full items-start">
      <Heading as="h2" size="display-sm" className="text-left font-light">
        {children}
      </Heading>
    </div>
  );
}

/** The 40 / 60 two-column layout: the `Tree` rail beside the explanation. */
export function TwoColPanel({
  tree,
  children,
}: {
  tree: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid w-full max-w-6xl grid-cols-1 gap-10 text-left md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-16">
      <div>{tree}</div>
      <div>{children}</div>
    </div>
  );
}
