import NextLink from "next/link";
import { Hero as MarketingHero } from "@/components/organisms";
import { CTAButtonGroup, CheckoutButton } from "@/components/molecules";
import { deck, harnessStarterKit } from "@/content";

/**
 * Hero — the top of the landing page (SPEC §3): the promise and the dual CTA —
 * join the waitlist for the Harness Starter Kit or read the free Deck. It reuses
 * the L1 `Hero` organism for layout and the L1 `CTAButtonGroup` for the CTA row;
 * offer names come from typed content (`@/content`). Token-only styling (ADR-0005).
 *
 * Honest-waitlist reframe (Locked decision 3 + 4): the proof-stat row is gone;
 * the single bold first-person founder claim lives in `Proof`. The paid CTA is
 * a waitlist promise — lock the founding price, get the Kit the day it ships.
 */

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
          {deck.name} is the map — how long-running agents actually work, free
          and open. Join the waitlist to lock the founding price on the{" "}
          {harnessStarterKit.name} and get it the day it ships.
        </>
      }
      cta={
        <CTAButtonGroup
          primary={
            <CheckoutButton className="px-8 py-4 text-lg">
              Join the waitlist
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
    />
  );
}
