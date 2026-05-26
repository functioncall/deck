import type { ButtonHTMLAttributes } from "react";

/**
 * Button — net-new marketing surface (the deck slideshow has no buttons), built
 * from theme tokens only. `primary` is the gold brand accent on dark ink text;
 * `secondary` is a ruled outline; `ghost` is bare ink. Focus is a token-coloured
 * `focus-visible` ring. No raw color/size literals (ADR-0005).
 */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-accent text-bg hover:opacity-90",
  secondary: "border border-rule bg-transparent text-ink hover:bg-bg-soft",
  ghost: "bg-transparent text-ink-soft hover:text-ink",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded font-sans font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]}${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
