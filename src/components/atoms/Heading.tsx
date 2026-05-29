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
  // .display — serif 300, the cold-open hero. Already large; left as-is.
  display: "font-light leading-none text-5xl sm:text-6xl lg:text-7xl",
  // .display-sm — the per-slide title. Bumped one step (was 3xl/4xl) so the
  // editorial prose reads on a screen, not like a slide bullet.
  "display-sm": "font-normal leading-tight text-4xl sm:text-5xl",
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
