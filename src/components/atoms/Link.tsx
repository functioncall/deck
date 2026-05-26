import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * Link — a styled wrapper over `next/link`. Net-new marketing surface (the deck
 * has no links), built from tokens only. Variants tune the resting/hover ink:
 * `default` reads as ink and warms to accent, `muted` is secondary ink, `accent`
 * is the gold brand link.
 */
type LinkVariant = "default" | "muted" | "accent";

type LinkProps = ComponentProps<typeof NextLink> & { variant?: LinkVariant };

const variantStyles: Record<LinkVariant, string> = {
  default: "text-ink hover:text-accent",
  muted: "text-ink-soft hover:text-ink",
  accent: "text-accent hover:text-ink",
};

export function Link({ variant = "default", className, ...props }: LinkProps) {
  return (
    <NextLink
      className={`font-sans underline-offset-4 transition-colors hover:underline ${
        variantStyles[variant]
      }${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
