import type { ReactNode } from "react";

/**
 * CodeBlock — the deck's `.code` surface (index.html ~347): a `bg-card` panel
 * with a rule border, mono ink-soft body, and an optional uppercase `.code-title`
 * eyebrow. The deck's syntax spans (`kw`/`str`/`cmt`) are provided as token-styled
 * sub-components (`CodeBlock.Kw|Str|Cmt`) so callers compose highlighted code
 * without raw color literals. Token-only styling (ADR-0005).
 */
type CodeBlockProps = { title?: string; children: ReactNode; className?: string };

type SpanProps = { children: ReactNode };

// kw = accent, str = good, cmt = dim italic — matching index.html .code spans.
function Kw({ children }: SpanProps) {
  return <span className="text-accent">{children}</span>;
}
function Str({ children }: SpanProps) {
  return <span className="text-good">{children}</span>;
}
function Cmt({ children }: SpanProps) {
  return <span className="italic text-ink-dim">{children}</span>;
}

export function CodeBlock({ title, children, className }: CodeBlockProps) {
  return (
    <div
      className={`w-full rounded border border-rule bg-bg-card p-6${
        className ? ` ${className}` : ""
      }`}
    >
      {title ? (
        <div className="mb-3 font-mono text-xs uppercase tracking-wider text-ink-dim">
          {title}
        </div>
      ) : null}
      <pre className="overflow-x-auto font-mono text-sm leading-relaxed text-ink-soft">
        <code>{children}</code>
      </pre>
    </div>
  );
}

CodeBlock.Kw = Kw;
CodeBlock.Str = Str;
CodeBlock.Cmt = Cmt;
