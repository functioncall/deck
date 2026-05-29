import type { ReactNode } from "react";

/**
 * Text — the deck's `.lead` plus general body copy (index.html ~203).
 *
 * `lead` is the sans supporting line (ink-soft, readable measure); `body` is
 * primary ink prose; `soft` is secondary ink. All sized via Tailwind utilities
 * from the theme tokens — no raw values.
 */
type TextProps = {
  variant?: "lead" | "body" | "soft";
  as?: "p" | "span";
  children: ReactNode;
  className?: string;
};

// Reader-facing prose, bumped one step for on-screen readability (was lg/base).
// Per-slide overrides (e.g. a `text-sm` className) still win, appended after.
const variantStyles: Record<NonNullable<TextProps["variant"]>, string> = {
  // .lead — sans, ink-soft, the supporting line under a slide title.
  lead: "max-w-prose text-xl leading-relaxed text-ink-soft",
  body: "text-lg leading-relaxed text-ink",
  soft: "text-lg leading-relaxed text-ink-soft",
};

export function Text({
  variant = "body",
  as = "p",
  children,
  className,
}: TextProps) {
  const Tag = as;
  return (
    <Tag
      className={`font-sans ${variantStyles[variant]}${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </Tag>
  );
}
