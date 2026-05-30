import type { Metadata } from "next";
import { MarketingPageTemplate } from "@/components/templates";
import { Navbar, Footer, CONTACT_EMAIL } from "@/components/organisms";
import { Heading, Label, Link, Text } from "@/components/atoms";
import { harnessStarterKit } from "@/content";

/**
 * `/thank-you` — the post-waitlist-signup confirmation page. The site is in its
 * waitlist phase: no payments today, so this page no longer offers a download
 * (the L4 placeholder Kit artifact would have misrepresented the product). It
 * confirms the waitlist signup and points back to the Deck. `noindex` (it&rsquo;s
 * only reached after a form submit, and `robots.ts` Disallows it as well).
 * Reuses the L1 template/organisms/atoms; token-only (ADR-0005).
 */

const FOOTER_LINKS = [
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/deck", label: "Read the Deck" },
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
  title: "You're on the waitlist — Beontheloop",
  description:
    "Thanks for joining the waitlist. We'll email you when the Harness Starter Kit ships.",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <MarketingPageTemplate
      nav={<Navbar links={[]} cta={navCta} />}
      footer={<Footer links={FOOTER_LINKS} />}
    >
      <section className="mx-auto max-w-2xl px-6 py-20 text-center md:py-28">
        <Label accent>You&rsquo;re on the list</Label>
        <Heading as="h1" size="display-sm" className="mt-4">
          Welcome to the waitlist.
        </Heading>
        <Text variant="lead" className="mx-auto mt-6">
          Thanks for joining. We&rsquo;ll email you when the{" "}
          {harnessStarterKit.name} ships — waitlist members get first crack at
          the founding price before it rises to the launch price.
        </Text>

        <div className="mt-10 flex justify-center">
          <Link href="/deck" variant="accent">
            In the meantime, read the Deck
          </Link>
        </div>

        <Text variant="soft" className="mt-12">
          Didn&rsquo;t mean to sign up, or want to unsubscribe? Email{" "}
          <Link href={`mailto:${CONTACT_EMAIL}`} variant="accent">
            {CONTACT_EMAIL}
          </Link>{" "}
          and a human will sort it out.
        </Text>
      </section>
    </MarketingPageTemplate>
  );
}
