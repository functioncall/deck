import type { Metadata } from "next";
import { MarketingPageTemplate } from "@/components/templates";
import { Navbar, Footer } from "@/components/organisms";
import { Heading, Label, Link, Text } from "@/components/atoms";
import { CheckoutButton } from "@/components/molecules";
import { harnessStarterKit } from "@/content";

/**
 * `/refund-policy` — the 30-day, no-questions-asked refund (CONTEXT.md: Founding
 * price). The Pre-sell's safety net: the Kit is the paid hero and arrives
 * instantly, so the undated Screencast carries no refund risk. A static legal
 * surface reusing the L1 template/organisms/atoms; token-only (ADR-0005).
 * Lemon Squeezy, the Merchant of Record, processes the refund (ADR-0003).
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
  <CheckoutButton className="px-5 py-2.5 text-sm">Get early access</CheckoutButton>
);

export const metadata: Metadata = {
  title: "Refund Policy — BEYOND the loop",
  description:
    "A 30-day, no-questions-asked refund on the Harness Starter Kit Pre-sell. Email us within 30 days and we refund you in full.",
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
          The {harnessStarterKit.name} comes with a 30-day, no-questions-asked
          refund. If it isn&rsquo;t for you, email us within 30 days of your
          purchase and we refund you in full. No forms, no justifying yourself.
        </Text>

        <div className="mt-12 flex flex-col gap-10">
          <section>
            <Label>No questions asked, for 30 days</Label>
            <Text className="mt-3">
              You have 30 days from the date of purchase to ask for a refund, for
              any reason at all. We won&rsquo;t ask you to prove anything or jump
              through hoops — &ldquo;no questions asked&rdquo; means exactly that.
            </Text>
          </section>

          <section>
            <Label>Why this is safe for you</Label>
            <Text className="mt-3">
              The paid hero of the Pre-sell is the {harnessStarterKit.name}, and
              you download it the instant you pay — so you can judge the real thing
              well inside the refund window. The Screencast is bundled free and
              ships when it&rsquo;s ready, with no committed date; because the Kit
              is what you actually pay for and it&rsquo;s in your hands immediately,
              the undated Screencast carries no risk to you.
            </Text>
          </section>

          <section>
            <Label>How to request one</Label>
            <Text className="mt-3">
              Just email us from your purchase email and say you&rsquo;d like a
              refund. Since there are no accounts (ADR-0004), your purchase email is
              all we need to find your order. We&rsquo;ll confirm and process it
              promptly.
            </Text>
          </section>

          <section>
            <Label>How the refund is processed</Label>
            <Text className="mt-3">
              Lemon Squeezy, our Merchant of Record, processes the payment, so the
              refund is issued back to your original payment method through Lemon
              Squeezy. It typically lands within a few business days, depending on
              your bank or card provider.
            </Text>
          </section>

          <section>
            <Label>Questions</Label>
            <Text className="mt-3">
              Anything unclear before you buy? Read the{" "}
              <Link href="/terms" variant="accent">
                Terms
              </Link>{" "}
              and the{" "}
              <Link href="/privacy" variant="accent">
                Privacy Policy
              </Link>
              , or just email us — we&rsquo;d rather answer first than refund later.
            </Text>
          </section>
        </div>
      </article>
    </MarketingPageTemplate>
  );
}
