import type { Metadata } from "next";
import { MarketingPageTemplate } from "@/components/templates";
import { Navbar, Footer, CONTACT_EMAIL } from "@/components/organisms";
import { Heading, Label, Link, Text } from "@/components/atoms";
import { CheckoutButton } from "@/components/molecules";
import { harnessStarterKit } from "@/content";

/**
 * `/terms` — Terms of Service for the waitlist phase. The site is a waitlist
 * today; payment terms are stated as applying once the Harness Starter Kit
 * ships. Static legal surface reusing the L1 template/organisms/atoms;
 * token-only (ADR-0005). No accounts; access is email-based (ADR-0004).
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
  <CheckoutButton className="px-5 py-2.5 text-sm">Join the waitlist</CheckoutButton>
);

export const metadata: Metadata = {
  title: "Terms of Service — Beontheloop",
  description:
    "The terms that govern Beontheloop and the waitlist for the Harness Starter Kit. Payment terms apply once the Kit ships.",
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
          These terms cover your use of Beontheloop and the waitlist for the{" "}
          {harnessStarterKit.name}. By joining the waitlist, you agree to them.
          The goal here is to be plain, not to bury anything in fine print.
        </Text>

        <div className="mt-12 flex flex-col gap-10">
          <section>
            <Label>Who we are</Label>
            <Text className="mt-3">
              Beontheloop is a small, independent project. We give away an
              interactive Deck — the map — and we&rsquo;re building the{" "}
              {harnessStarterKit.name}: the founder&rsquo;s real agentic-coding
              harness as reusable templates. The Kit hasn&rsquo;t shipped yet.
            </Text>
          </section>

          <section>
            <Label>The waitlist — what you&rsquo;re signing up for</Label>
            <Text className="mt-3">
              Joining the waitlist means we add your email to our list and send
              you the Deck, launch updates, and a heads-up when the Kit ships.
              Waitlist members will get the chance to buy at the founding price
              — the lowest the Kit will ever be sold for. The waitlist itself is
              free, costs nothing, and obligates you to nothing.
            </Text>
          </section>

          <section>
            <Label>Payments — when the Kit ships</Label>
            <Text className="mt-3">
              We are not taking payments today. When the {harnessStarterKit.name}
              {" "}ships, payments will run through Lemon Squeezy as our{" "}
              <span className="text-ink">Merchant of Record</span>. That means
              Lemon Squeezy — not Beontheloop — will be the legal seller for
              your purchase: they will handle the checkout, the receipt, and
              they will collect and remit any sales tax, VAT, or GST owed in
              your country. Your card statement and tax documents will reflect
              Lemon Squeezy as the merchant. Nothing in these terms charges you
              for anything today.
            </Text>
          </section>

          <section>
            <Label>What you&rsquo;ll be buying (later)</Label>
            <Text className="mt-3">
              When the Kit ships, it will be sold at the founding price first —
              locked in for waitlist members — before rising to the launch
              price. Founding buyers will get the Kit the day it ships and
              lifetime access to any later updates. The bundled Screencast will
              ship when it&rsquo;s ready, with no committed date. None of that
              is on sale today.
            </Text>
          </section>

          <section>
            <Label>Access — no accounts</Label>
            <Text className="mt-3">
              There is no login and no account to manage. Access — both the
              waitlist today and any purchase later — is tied to your email.
              Keep your confirmation emails; they are your proof of waitlist
              membership.
            </Text>
          </section>

          <section>
            <Label>License &amp; fair use</Label>
            <Text className="mt-3">
              When the {harnessStarterKit.name} ships, it will be licensed to
              you to use and adapt in your own work. Please don&rsquo;t resell
              or redistribute the files as your own product. The free Deck is
              yours to read and share today.
            </Text>
          </section>

          <section>
            <Label>Refunds (when payments are live)</Label>
            <Text className="mt-3">
              No money has changed hands yet, so there is nothing to refund
              today. Once the Kit ships, purchases will be backed by the policy
              on the{" "}
              <Link href="/refund-policy" variant="accent">
                Refund Policy
              </Link>{" "}
              page.
            </Text>
          </section>

          <section>
            <Label>Changes &amp; contact</Label>
            <Text className="mt-3">
              We may update these terms as the project grows; material changes
              will be noted on this page. Questions about the terms or your
              waitlist signup? Email{" "}
              <Link href={`mailto:${CONTACT_EMAIL}`} variant="accent">
                {CONTACT_EMAIL}
              </Link>
              {" "}and a human will reply.
            </Text>
          </section>
        </div>
      </article>
    </MarketingPageTemplate>
  );
}
