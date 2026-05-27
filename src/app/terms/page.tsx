import type { Metadata } from "next";
import { MarketingPageTemplate } from "@/components/templates";
import { Navbar, Footer } from "@/components/organisms";
import { Heading, Label, Link, Text } from "@/components/atoms";
import { CheckoutButton } from "@/components/molecules";
import { harnessStarterKit } from "@/content";

/**
 * `/terms` — Terms of Service for Beontheloop and the Pre-sell. A static legal
 * surface reusing the L1 template/organisms/atoms; token-only (ADR-0005). The
 * key legal fact: Lemon Squeezy is the Merchant of Record — the legal seller of
 * record that processes payment and remits global VAT/GST (ADR-0003). No
 * accounts; access is email-based (ADR-0004). Help-don't-sell voice with the
 * CONTEXT.md glossary terms (Pre-sell, Harness Starter Kit, Founding price,
 * Screencast, Deck).
 */

// Top nav mirrors the sales page; legal routes live in the footer.
const NAV_LINKS = [
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/deck", label: "Read the Deck" },
];

// The footer carries the legal routes alongside the marketing anchors.
const FOOTER_LINKS = [
  ...NAV_LINKS,
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/refund-policy", label: "Refund Policy" },
];

const navCta = (
  <CheckoutButton className="px-5 py-2.5 text-sm">Get early access</CheckoutButton>
);

export const metadata: Metadata = {
  title: "Terms of Service — Beontheloop",
  description:
    "The terms that govern Beontheloop and the Pre-sell of the Harness Starter Kit. Lemon Squeezy is the Merchant of Record.",
};

export default function Terms() {
  return (
    <MarketingPageTemplate
      nav={<Navbar links={NAV_LINKS} cta={navCta} />}
      footer={<Footer links={FOOTER_LINKS} />}
    >
      <article className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Label accent>Legal</Label>
        <Heading as="h1" size="display-sm" className="mt-4">
          Terms of Service
        </Heading>
        <Text variant="soft" className="mt-4">
          Last updated: May 2026
        </Text>
        <Text variant="lead" className="mt-6">
          These terms cover your use of Beontheloop and the Pre-sell of the{" "}
          {harnessStarterKit.name}. By buying or signing up, you agree to them.
          The goal here is to be plain, not to bury anything in fine print.
        </Text>

        <div className="mt-12 flex flex-col gap-10">
          <section>
            <Label>Who we are</Label>
            <Text className="mt-3">
              Beontheloop is a small, independent project that gives away an
              interactive Deck — the map — and pre-sells the {harnessStarterKit.name}:
              the founder&rsquo;s real agentic-coding harness as reusable templates.
            </Text>
          </section>

          <section>
            <Label>Lemon Squeezy is the seller of record</Label>
            <Text className="mt-3">
              Payments run through Lemon Squeezy, which acts as our{" "}
              <span className="text-ink">Merchant of Record</span>. That means
              Lemon Squeezy — not Beontheloop — is the legal seller for your
              purchase: they handle the checkout, the receipt, and they collect
              and remit any sales tax, VAT, or GST owed in your country. Your card
              statement and tax documents reflect Lemon Squeezy as the merchant.
            </Text>
          </section>

          <section>
            <Label>What you&rsquo;re buying</Label>
            <Text className="mt-3">
              The Pre-sell sells the {harnessStarterKit.name} at the Founding
              price — the lowest price it will ever be, locked in for early buyers.
              You download the Kit the instant you pay. The Screencast, the
              over-the-shoulder build-along, is included free for Pre-sell buyers
              and ships when it&rsquo;s ready, with lifetime access and no
              committed date. Because the Kit is the paid hero and arrives
              immediately, the undated Screencast carries no risk to you.
            </Text>
          </section>

          <section>
            <Label>Access — no accounts</Label>
            <Text className="mt-3">
              There is no login and no account to manage. Access is tied to your
              purchase email: the download is instant on the thank-you page, and
              the Screencast arrives by email when it ships. Keep your receipt — it
              is your proof of founding access.
            </Text>
          </section>

          <section>
            <Label>License &amp; fair use</Label>
            <Text className="mt-3">
              The {harnessStarterKit.name} is licensed to you to use and adapt in
              your own work. Please don&rsquo;t resell or redistribute the files as
              your own product. The free Deck is yours to read and share.
            </Text>
          </section>

          <section>
            <Label>Refunds</Label>
            <Text className="mt-3">
              The Pre-sell is backed by a 30-day, no-questions-asked refund — the
              full policy is on the{" "}
              <Link href="/refund-policy" variant="accent">
                Refund Policy
              </Link>{" "}
              page.
            </Text>
          </section>

          <section>
            <Label>Changes &amp; contact</Label>
            <Text className="mt-3">
              We may update these terms as the project grows; material changes will
              be noted on this page. Questions about the terms or your purchase?
              Email us and a human will reply — your founding access is tied to your
              purchase email.
            </Text>
          </section>
        </div>
      </article>
    </MarketingPageTemplate>
  );
}
