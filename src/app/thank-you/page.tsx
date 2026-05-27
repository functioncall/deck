import type { Metadata } from "next";
import { MarketingPageTemplate } from "@/components/templates";
import { Navbar, Footer } from "@/components/organisms";
import { Heading, Label, Link, Text } from "@/components/atoms";
import { harnessStarterKit } from "@/content";

/**
 * `/thank-you` — the post-purchase access surface (SPEC §4.2). No accounts, no
 * login (ADR-0004): access is email-based and the Harness Starter Kit downloads
 * INSTANTLY here. In L4 the download is a CLEARLY-LABELED PLACEHOLDER artifact
 * served from `public/harness-starter-kit/` — the real Kit contents are packaged
 * later (SPEC §6). Reuses the L1 template/organisms/atoms; token-only (ADR-0005).
 */

// The instant download — the PLACEHOLDER Kit artifact under public/ (served as a
// static file). Real Kit contents replace it later (SPEC §6).
const KIT_DOWNLOAD_HREF = "/harness-starter-kit/README.md";

const FOOTER_LINKS = [
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/deck", label: "Read the Deck" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/refund-policy", label: "Refund Policy" },
];

// Post-purchase, the persistent buy CTA is moot — point the header at the Deck.
const navCta = (
  <Link href="/deck" variant="muted" className="text-sm">
    Read the Deck
  </Link>
);

export const metadata: Metadata = {
  title: "Thank you — your Harness Starter Kit",
  description:
    "Your purchase is complete. Download the Harness Starter Kit instantly — no account needed.",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <MarketingPageTemplate
      nav={<Navbar links={[]} cta={navCta} />}
      footer={<Footer links={FOOTER_LINKS} />}
    >
      <section className="mx-auto max-w-2xl px-6 py-20 text-center md:py-28">
        <Label accent>Payment complete</Label>
        <Heading as="h1" size="display-sm" className="mt-4">
          You&rsquo;re in. Grab the {harnessStarterKit.name}.
        </Heading>
        <Text variant="lead" className="mx-auto mt-6">
          Thanks for becoming a founding buyer. Your download is ready right
          now — no account, no login. A receipt is on its way to your email.
        </Text>

        <div className="mt-10 flex justify-center">
          <a
            href={KIT_DOWNLOAD_HREF}
            download
            className="inline-flex items-center justify-center rounded bg-accent px-8 py-4 font-sans text-lg font-medium tracking-wide text-bg transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Download the {harnessStarterKit.name}
          </a>
        </div>

        <div className="mt-12 rounded-lg border border-rule bg-bg-card p-6 text-left">
          <Text variant="soft" className="text-sm">
            <span className="text-ink">Heads up — placeholder download.</span>{" "}
            This is a temporary placeholder artifact while the real{" "}
            {harnessStarterKit.name} contents are packaged. Founding buyers keep
            lifetime access — the full Kit and the Screencast arrive in your inbox
            the moment they ship.
          </Text>
        </div>

        <Text variant="soft" className="mt-10">
          Trouble downloading? Email us and we&rsquo;ll sort it out — your
          founding access is tied to your purchase email.
        </Text>
      </section>
    </MarketingPageTemplate>
  );
}
