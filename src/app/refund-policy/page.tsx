import type { Metadata } from "next";
import { MarketingPageTemplate } from "@/components/templates";
import { Navbar, Footer, CONTACT_EMAIL } from "@/components/organisms";
import { Heading, Label, Link, Text } from "@/components/atoms";
import { CheckoutButton } from "@/components/molecules";
import { harnessStarterKit } from "@/content";

/**
 * `/refund-policy` — the 30-day, no-questions-asked refund. Framed for the
 * waitlist phase: no money has changed hands yet, so the policy describes what
 * will apply once the {harnessStarterKit.name} ships. Static legal surface
 * reusing the L1 template/organisms/atoms; token-only (ADR-0005). Lemon Squeezy,
 * our Merchant of Record, will process refunds at that point (ADR-0003).
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
  title: "Refund Policy — Beontheloop",
  description:
    "A 30-day, no-questions-asked refund on the Harness Starter Kit — applies once the Kit ships. The waitlist itself is free.",
};

export default function RefundPolicy() {
  return (
    <MarketingPageTemplate
      nav={<Navbar links={NAV_LINKS} cta={navCta} />}
      footer={<Footer links={FOOTER_LINKS} />}
    >
      <article className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Label accent>Legal</Label>
        <Heading as="h1" size="display-sm" className="mt-4">
          Refund Policy
        </Heading>
        <Text variant="soft" className="mt-4">
          Last updated: May 2026
        </Text>
        <Text variant="lead" className="mt-6">
          Beontheloop is in its waitlist phase, and the waitlist itself is
          free — nothing is for sale today. Once the {harnessStarterKit.name}{" "}
          ships, every purchase will be backed by a 30-day, no-questions-asked
          refund. The policy below is what will apply at that point.
        </Text>

        <div className="mt-12 flex flex-col gap-10">
          <section>
            <Label>Today — the waitlist is free</Label>
            <Text className="mt-3">
              No money changes hands when you join the waitlist. There is
              nothing to refund today, because there is nothing for sale today.
              If you don&rsquo;t want to be on the list any more, you can
              unsubscribe from any email at any time.
            </Text>
          </section>

          <section>
            <Label>When the Kit ships — 30 days, no questions asked</Label>
            <Text className="mt-3">
              From the day the {harnessStarterKit.name} ships and you buy it,
              you&rsquo;ll have 30 days to ask for a refund, for any reason at
              all. We won&rsquo;t ask you to prove anything or jump through
              hoops — &ldquo;no questions asked&rdquo; will mean exactly that.
            </Text>
          </section>

          <section>
            <Label>Why this is safe for you</Label>
            <Text className="mt-3">
              The paid hero will be the {harnessStarterKit.name}, and
              you&rsquo;ll download it the instant you pay — so you can judge
              the real thing well inside the refund window. The Screencast will
              be bundled free and ships when it&rsquo;s ready, with no
              committed date; because the Kit is what you&rsquo;ll actually pay
              for, and it&rsquo;ll be in your hands immediately, the undated
              Screencast carries no risk to you.
            </Text>
          </section>

          <section>
            <Label>How to request one (once payments are live)</Label>
            <Text className="mt-3">
              Email{" "}
              <Link href={`mailto:${CONTACT_EMAIL}`} variant="accent">
                {CONTACT_EMAIL}
              </Link>{" "}
              from your purchase email and say you&rsquo;d like a refund. Since
              there are no accounts (ADR-0004), your purchase email is all
              we&rsquo;ll need to find your order. We&rsquo;ll confirm and
              process it promptly.
            </Text>
          </section>

          <section>
            <Label>How the refund will be processed</Label>
            <Text className="mt-3">
              Lemon Squeezy, our Merchant of Record, will process the payment,
              so the refund will be issued back to your original payment method
              through Lemon Squeezy. It typically lands within a few business
              days, depending on your bank or card provider.
            </Text>
          </section>

          <section>
            <Label>Questions</Label>
            <Text className="mt-3">
              Anything unclear before the Kit ships? Read the{" "}
              <Link href="/terms" variant="accent">
                Terms
              </Link>{" "}
              and the{" "}
              <Link href="/privacy" variant="accent">
                Privacy Policy
              </Link>
              , or just email{" "}
              <Link href={`mailto:${CONTACT_EMAIL}`} variant="accent">
                {CONTACT_EMAIL}
              </Link>
              .
            </Text>
          </section>
        </div>
      </article>
    </MarketingPageTemplate>
  );
}
