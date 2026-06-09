import type { Metadata } from "next";
import { MarketingPageTemplate } from "@/components/templates";
import { Navbar, Footer } from "@/components/organisms";
import { Heading, Label, Link, Text } from "@/components/atoms";

/**
 * Custom 404 — reuses the L1 template/organisms/atoms so a missing route still
 * lands in the brand and offers two ways back: the home page and the Deck (the
 * promoted entry point for HN visitors).
 */

const NAV_LINKS = [
  { href: "/#pricing", label: "Pricing" },
  { href: "/deck", label: "Read the Deck" },
];

const FOOTER_LINKS = [
  ...NAV_LINKS,
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/refund-policy", label: "Refund Policy" },
];

const navCta = (
  <Link href="/deck" variant="muted" className="text-sm">
    Read the Deck
  </Link>
);

export const metadata: Metadata = {
  title: "Page not found — Beontheloop",
  description: "That page isn't here. Head back to the home page or read the Deck.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <MarketingPageTemplate
      nav={<Navbar links={NAV_LINKS} cta={navCta} />}
      footer={<Footer links={FOOTER_LINKS} />}
    >
      <section className="mx-auto max-w-2xl px-6 py-20 text-center md:py-28">
        <Label accent>404</Label>
        <Heading as="h1" size="display-sm" className="mt-4">
          That page isn&rsquo;t on the loop.
        </Heading>
        <Text variant="lead" className="mx-auto mt-6">
          The URL you tried doesn&rsquo;t exist on Beontheloop. Try one of these.
        </Text>

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <Link href="/" variant="accent">
            Go to the home page
          </Link>
          <Link href="/deck" variant="accent">
            Read the Deck
          </Link>
        </div>
      </section>
    </MarketingPageTemplate>
  );
}
