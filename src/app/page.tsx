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

// Navbar + Footer share the same in-page anchors (Pricing/FAQ get id wrappers
// below) plus the free Deck route.
const NAV_LINKS = [
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/deck", label: "Read the Deck" },
];

// The persistent "Get the Kit" header CTA (SPEC §3) — opens the Lemon checkout.
const navCta = (
  <CheckoutButton className="px-5 py-2.5 text-sm">Get the Kit</CheckoutButton>
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
