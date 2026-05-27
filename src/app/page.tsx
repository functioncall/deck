import NextLink from "next/link";
import { MarketingPageTemplate } from "@/components/templates";
import { Navbar, Footer } from "@/components/organisms";
import {
  Hero,
  Problem,
  TheShift,
  DeckPreview,
  WhatsInTheKit,
  Proof,
  Pricing,
  FAQ,
  FinalCTA,
} from "@/components/sections";

/**
 * `/` — the home / sales page. Assembles the nine SPEC §3 sections in order
 * (Hero → Problem → The Shift → Free Deck preview → What's in the Kit → Proof →
 * Pricing → FAQ → Final CTA) as children of the L1 `MarketingPageTemplate`
 * (sticky Navbar + main + Footer). The sections read their copy from typed
 * content and compose L1 organisms + L2 diagrams; this page only orders them and
 * wires the persistent header CTA + nav/footer links.
 */

// PLACEHOLDER buy target — L4 swaps this for the real Lemon Squeezy checkout URL.
// It anchors to the Kit section (id="harness-starter-kit"), matching the in-page
// and /deck conversion surfaces' KIT_CHECKOUT_HREF.
const KIT_CHECKOUT_HREF = "/#harness-starter-kit";

// Navbar + Footer share the same in-page anchors (Pricing/FAQ get id wrappers
// below) plus the free Deck route.
const NAV_LINKS = [
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/deck", label: "Read the Deck" },
];

// The persistent "Get the Kit" header CTA (SPEC §3) — a buy placeholder until L4.
const navCta = (
  <NextLink
    href={KIT_CHECKOUT_HREF}
    className="inline-flex items-center justify-center rounded bg-accent px-5 py-2.5 font-sans text-sm font-medium tracking-wide text-bg transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
  >
    Get the Kit
  </NextLink>
);

export default function Home() {
  return (
    <MarketingPageTemplate
      nav={<Navbar links={NAV_LINKS} cta={navCta} />}
      footer={<Footer links={NAV_LINKS} />}
    >
      <Hero />
      <Problem />
      <TheShift />
      <DeckPreview />
      <WhatsInTheKit />
      <Proof />
      <div id="pricing">
        <Pricing />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <FinalCTA />
    </MarketingPageTemplate>
  );
}
