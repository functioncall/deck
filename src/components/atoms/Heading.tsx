import type { ReactNode } from "react";

/**
 * Heading — the deck's `.display` / `.display-sm` (index.html ~184).
 *
 * Serif display type styled entirely from theme tokens: weight 300 for the large
 * `display`, 400 for `display-sm`, tight tracking, `text-ink`. The deck's size
 * clamps are reproduced with responsive Tailwind utilities (no raw clamp/px).
 */
type HeadingProps = {
  as?: "h1" | "h2" | "h3";
  size?: "display" | "display-sm";
  children: ReactNode;
  className?: string;
};

const sizeStyles: Record<NonNullable<HeadingProps["size"]>, string> = {
  // .display — serif 300, clamp(2.5rem, 6.5vw, 5.4rem), line-height 1.02.
  display: "font-light leading-none text-5xl sm:text-6xl lg:text-7xl",
  // .display-sm — serif 400, clamp(1.8rem, 3.5vw, 2.8rem), line-height 1.15.
  "display-sm": "font-normal leading-tight text-3xl sm:text-4xl",
};

export function Heading({
  as = "h2",
  size = "display",
  children,
  className,
}: HeadingProps) {
  const Tag = as;
  return (
    <Tag
      className={`font-serif tracking-tight text-ink ${sizeStyles[size]}${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </Tag>
  );
}
