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

const variantStyles: Record<NonNullable<TextProps["variant"]>, string> = {
  // .lead — sans, ink-soft, clamp(1rem, 1.4vw, 1.15rem), max-width 720px.
  lead: "max-w-prose text-lg leading-relaxed text-ink-soft",
  body: "text-base leading-relaxed text-ink",
  soft: "text-base leading-relaxed text-ink-soft",
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
