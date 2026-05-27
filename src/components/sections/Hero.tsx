import NextLink from "next/link";
import { Hero as MarketingHero } from "@/components/organisms";
import { CTAButtonGroup, CheckoutButton } from "@/components/molecules";
import { deck, harnessStarterKit } from "@/content";

/**
 * Hero — the top of the landing page (SPEC §3): the promise, the founder's
 * proof metric (the "270 files / 59 min" `Stat` row), and the dual CTA — buy the
 * Harness Starter Kit (the paid hero) or read the free Deck. It reuses the L1
 * `Hero` organism for layout and the L1 `CTAButtonGroup` for the CTA row; offer
 * names come from typed content (`@/content`). Token-only styling (ADR-0005).
 */

// The founder's headline proof metric (SPEC §1) — one unattended ralph run.
const PROOF_STATS = [
  { value: "270", label: "files in one run" },
  { value: "59 min", label: "unattended" },
  { value: "exit 0", label: "clean finish" },
];

export function Hero() {
  return (
    <MarketingHero
      eyebrow="For developers running agent harnesses"
      title={
        <>
          Stop babysitting your AI.{" "}
          <em className="text-accent">Start shipping with it.</em>
        </>
      }
      lead={
        <>
          {deck.name} is the map — how long-running agents actually work, free and
          open. The {harnessStarterKit.name} hands you the founder&rsquo;s real
          harness so you can build that way today.
        </>
      }
      cta={
        <CTAButtonGroup
          primary={
            <CheckoutButton className="px-8 py-4 text-lg">
              Get the Kit
            </CheckoutButton>
          }
          secondary={
            <NextLink
              href="/deck"
              className="inline-flex items-center justify-center rounded border border-rule bg-transparent px-8 py-4 font-sans text-lg font-medium tracking-wide text-ink transition-colors hover:bg-bg-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Read the Deck — free
            </NextLink>
          }
        />
      }
      stats={PROOF_STATS}
    />
  );
}
