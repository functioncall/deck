import { MarketingPageTemplate } from "@/components/templates";
import { Navbar, Footer } from "@/components/organisms";
import { CheckoutButton } from "@/components/molecules";
import {
  Hero,
  Problem,
  TheShift,
  DeckPreview,
  WhatsInTheKit,
  Proof,
  Pricing,
  FinalCTA,
} from "@/components/sections";

/**
 * `/` — the home / sales page. Assembles the eight SPEC §3 sections in order
 * (Hero → Problem → The Shift → Free Deck preview → What's in the Kit → Proof →
 * Pricing → Final CTA) as children of the L1 `MarketingPageTemplate` (sticky
 * Navbar + main + Footer). The sections read their copy from typed content and
 * compose L1 organisms + L2 diagrams; this page only orders them and wires the
 * persistent header CTA + nav/footer links.
 */

// The top nav carries the in-page Pricing anchor plus the free Deck route.
const NAV_LINKS = [
  { href: "/#pricing", label: "Pricing" },
  { href: "/deck", label: "Read the Deck" },
];

// The footer adds the legal routes (L4) alongside the marketing anchors.
const FOOTER_LINKS = [
  ...NAV_LINKS,
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/refund-policy", label: "Refund Policy" },
];

// The persistent header CTA (SPEC §3) — routes to the waitlist capture.
const navCta = (
  <CheckoutButton className="px-5 py-2.5 text-sm">Join the waitlist</CheckoutButton>
);

export default function Home() {
  return (
    <MarketingPageTemplate
      nav={<Navbar links={NAV_LINKS} cta={navCta} />}
      footer={<Footer links={FOOTER_LINKS} />}
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
      <FinalCTA />
    </MarketingPageTemplate>
  );
}
