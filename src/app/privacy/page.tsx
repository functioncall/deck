import type { Metadata } from "next";
import { MarketingPageTemplate } from "@/components/templates";
import { Navbar, Footer } from "@/components/organisms";
import { Heading, Label, Link, Text } from "@/components/atoms";
import { CheckoutButton } from "@/components/molecules";

/**
 * `/privacy` — Privacy Policy. A static legal surface reusing the L1
 * template/organisms/atoms; token-only (ADR-0005). Names the three processors
 * behind the ports (Loops for email, Lemon Squeezy as Merchant of Record for
 * purchases, Amplitude for product analytics) and carries the Amplitude
 * EU-consent note: what the funnel events collect and that EU/EEA visitors are
 * tracked only with consent. No accounts; access is email-based (ADR-0004).
 */

const NAV_LINKS = [
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/deck", label: "Read the Deck" },
];

const FOOTER_LINKS = [
  ...NAV_LINKS,
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/refund-policy", label: "Refund Policy" },
];

const navCta = (
  <CheckoutButton className="px-5 py-2.5 text-sm">Get the Kit</CheckoutButton>
);

export const metadata: Metadata = {
  title: "Privacy Policy — BeyondTheLoop",
  description:
    "What BeyondTheLoop collects and why — email via Loops, purchases via Lemon Squeezy, and product analytics via Amplitude, with consent for EU/EEA visitors.",
};

export default function Privacy() {
  return (
    <MarketingPageTemplate
      nav={<Navbar links={NAV_LINKS} cta={navCta} />}
      footer={<Footer links={FOOTER_LINKS} />}
    >
      <article className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Label accent>Legal</Label>
        <Heading as="h1" size="display-sm" className="mt-4">
          Privacy Policy
        </Heading>
        <Text variant="soft" className="mt-4">
          Last updated: May 2026
        </Text>
        <Text variant="lead" className="mt-6">
          BeyondTheLoop collects the least it can to run an email list and a
          Pre-sell. We don&rsquo;t sell your data. Here is exactly what is
          collected, who processes it, and the choices you have.
        </Text>

        <div className="mt-12 flex flex-col gap-10">
          <section>
            <Label>Email — Loops</Label>
            <Text className="mt-3">
              When you give us your email — to follow along free or as part of a
              Pre-sell purchase — we store it as a Subscriber in{" "}
              <span className="text-ink">Loops</span>, our email tool, to send the
              Deck, launch updates, and the Screencast when it ships. You can
              unsubscribe from any email at any time.
            </Text>
          </section>

          <section>
            <Label>Purchases — Lemon Squeezy</Label>
            <Text className="mt-3">
              Payments are processed by{" "}
              <span className="text-ink">Lemon Squeezy</span>, our Merchant of
              Record. They handle your card details and billing information — we
              never see or store your card number. We keep a record of the
              Purchase (email, the offer, the amount, and the date) so we can honour
              your founding access and your refund window.
            </Text>
          </section>

          <section>
            <Label>Product analytics — Amplitude</Label>
            <Text className="mt-3">
              We use <span className="text-ink">Amplitude</span> for product
              analytics: anonymous, aggregate funnel events that tell us how the
              Deck and the Pre-sell are working. We track which slide of the Deck
              you reach and whether you finish it, when an email signup happens, and
              when a checkout starts and a purchase completes. These are usage
              events about behaviour on the site — not your card data, and we
              don&rsquo;t use them to build advertising profiles or sell them on.
            </Text>
            <Text className="mt-4">
              <span className="text-ink">For visitors in the EU / EEA:</span>{" "}
              product analytics are loaded only with your consent. If you do not
              consent, we don&rsquo;t send your behaviour to Amplitude — the site
              still works, we just stop measuring. You can withdraw consent at any
              time, and we honour Do-Not-Track and standard privacy signals where
              your browser sends them.
            </Text>
          </section>

          <section>
            <Label>No accounts</Label>
            <Text className="mt-3">
              There is no login and no account to manage (ADR-0004). Access is tied
              to your purchase email, which keeps the data we hold to a minimum.
            </Text>
          </section>

          <section>
            <Label>Your choices &amp; contact</Label>
            <Text className="mt-3">
              You can ask us what we hold about you, ask us to delete it, or
              unsubscribe — just email us and a human will handle it. To request a
              refund, see the{" "}
              <Link href="/refund-policy" variant="accent">
                Refund Policy
              </Link>
              .
            </Text>
          </section>
        </div>
      </article>
    </MarketingPageTemplate>
  );
}
