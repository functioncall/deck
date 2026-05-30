import type { Metadata } from "next";
import { MarketingPageTemplate } from "@/components/templates";
import { Navbar, Footer, CONTACT_EMAIL } from "@/components/organisms";
import { Heading, Label, Link, Text } from "@/components/atoms";
import { CheckoutButton } from "@/components/molecules";

/**
 * `/privacy` — Privacy Policy for the waitlist phase. Describes what is actually
 * collected today: email via Loops, plus anonymous product analytics via
 * Amplitude (gated by EU/EEA consent). Payment processing is named as a future
 * processor that only engages when the Kit ships. Static legal surface reusing
 * the L1 template/organisms/atoms; token-only (ADR-0005). No accounts; access is
 * email-based (ADR-0004).
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
  <CheckoutButton className="px-5 py-2.5 text-sm">Join the waitlist</CheckoutButton>
);

export const metadata: Metadata = {
  title: "Privacy Policy — Beontheloop",
  description:
    "What Beontheloop collects today: email via Loops, plus consent-gated anonymous analytics. Payment processing engages only when the Kit ships.",
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
          Beontheloop is in its waitlist phase. The only personal data we collect
          today is the email address you give us when you join the waitlist. We
          don&rsquo;t sell your data. Here is exactly what is collected, who
          processes it, and the choices you have.
        </Text>

        <div className="mt-12 flex flex-col gap-10">
          <section>
            <Label>Email — Loops</Label>
            <Text className="mt-3">
              When you join the waitlist, we store your email address as a
              Subscriber in <span className="text-ink">Loops</span>, our email
              tool. We use it to send the Deck, launch updates, and to let you
              know when the Harness Starter Kit ships. You can unsubscribe from
              any email at any time.
            </Text>
          </section>

          <section>
            <Label>Product analytics — Amplitude</Label>
            <Text className="mt-3">
              We use <span className="text-ink">Amplitude</span> for product
              analytics: anonymous, aggregate funnel events that tell us how the
              Deck and the waitlist are working. We track which slide of the Deck
              you reach, whether you finish it, and when a waitlist signup
              happens. These are usage events about behaviour on the site — not
              your card data (we don&rsquo;t take payments yet), and we
              don&rsquo;t use them to build advertising profiles or sell them on.
            </Text>
            <Text className="mt-4">
              <span className="text-ink">For visitors in the EU / EEA:</span>{" "}
              product analytics are loaded only with your consent. If you do not
              consent, we don&rsquo;t send your behaviour to Amplitude — the site
              still works, we just stop measuring. You can withdraw consent at
              any time, and we honour Do-Not-Track and standard privacy signals
              where your browser sends them.
            </Text>
          </section>

          <section>
            <Label>Payments — when the Kit ships</Label>
            <Text className="mt-3">
              The waitlist takes no payment today. When the Harness Starter Kit
              ships, payments will be processed by{" "}
              <span className="text-ink">Lemon Squeezy</span> as our Merchant of
              Record — they will handle your card details and billing
              information, and we will never see or store your card number. At
              that point we will keep a record of the Purchase (email, the
              offer, the amount, and the date) so we can honour your founding
              access and any refund window. None of that data is collected
              today.
            </Text>
          </section>

          <section>
            <Label>No accounts</Label>
            <Text className="mt-3">
              There is no login and no account to manage (ADR-0004). Future
              access will be tied to the email you sign up with, which keeps the
              data we hold to a minimum.
            </Text>
          </section>

          <section>
            <Label>Your choices &amp; contact</Label>
            <Text className="mt-3">
              You can ask us what we hold about you, ask us to delete it, or
              unsubscribe — just email{" "}
              <Link href={`mailto:${CONTACT_EMAIL}`} variant="accent">
                {CONTACT_EMAIL}
              </Link>{" "}
              and a human will handle it. The refund window described in the{" "}
              <Link href="/refund-policy" variant="accent">
                Refund Policy
              </Link>{" "}
              will start once the Kit ships.
            </Text>
          </section>
        </div>
      </article>
    </MarketingPageTemplate>
  );
}
