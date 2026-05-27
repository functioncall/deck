import type { ReactNode } from "react";

/**
 * BulletList — the deck's `.slide-inner ul` point lists (index.html slides
 * 3.3/3.4/3.6/3.7): a bold `term` lead-in followed by dimmed supporting prose.
 * `marker` adds the deck's accent `▸` (slide 3.7). Shared chrome — token-only
 * (ADR-0005).
 */
type Bullet = { term: ReactNode; desc: ReactNode };

export function BulletList({
  items,
  marker = false,
}: {
  items: Bullet[];
  marker?: boolean;
}) {
  return (
    <ul className="flex flex-col gap-4 text-left">
      {items.map((item, i) => (
        <li
          key={i}
          className={`text-sm leading-relaxed${marker ? " flex gap-3" : ""}`}
        >
          {marker ? (
            <span aria-hidden="true" className="flex-shrink-0 text-accent">
              ▸
            </span>
          ) : null}
          <span>
            <strong className="font-semibold text-ink">{item.term}</strong>{" "}
            <span className="text-ink-soft">{item.desc}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
