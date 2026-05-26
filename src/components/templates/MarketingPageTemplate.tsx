import type { ReactNode } from "react";

/**
 * MarketingPageTemplate — the page-level scaffold for a marketing surface: a
 * sticky Navbar across the top, the section content as the `main` landmark, and
 * a Footer pinned to the bottom of short pages. `nav` and `footer` are organism
 * slots (the Navbar / Footer composed by the caller via the organisms barrel)
 * and `children` are the page sections. The template's real job is the page
 * shell — a full-height flex column that keeps the footer down and wraps the
 * content in a single semantic `main`. Token-only styling (ADR-0005).
 */
type MarketingPageTemplateProps = {
  nav: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function MarketingPageTemplate({
  nav,
  footer,
  children,
}: MarketingPageTemplateProps) {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      {nav}
      <main className="flex-1">{children}</main>
      {footer}
    </div>
  );
}
