import NextLink from "next/link";
import type { ReactNode } from "react";
import { Link } from "@/components/atoms";

/**
 * Navbar — net-new marketing header (the deck has no nav). A serif brand
 * wordmark on the left, optional nav links, and a PERSISTENT buy CTA slot on the
 * right that is always rendered (the "Get the Kit" call-to-action; SPEC §3). The
 * wordmark is a direct serif brand link — distinct from the sans body `Link`
 * atom, which renders the nav items. Token-only styling (ADR-0005).
 */
type NavbarProps = {
  links?: { href: string; label: string }[];
  cta: ReactNode;
};

export function Navbar({ links = [], cta }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <NextLink
          href="/"
          className="font-serif text-lg font-normal text-ink transition-colors hover:text-accent"
        >
          Beontheloop
        </NextLink>
        <div className="flex items-center gap-6">
          {links.length > 0 ? (
            <ul className="hidden items-center gap-6 sm:flex">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} variant="muted" className="text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          {cta}
        </div>
      </nav>
    </header>
  );
}
