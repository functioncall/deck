import { Heading, Label, Text } from "@/components/atoms";
import { PricingTier, CheckoutButton } from "@/components/molecules";
import {
  FOUNDING_PRICE_CENTS,
  LAUNCH_PRICE_CENTS,
  harnessStarterKit,
} from "@/content";

/**
 * Pricing — the offer + price (SPEC §3, §1). Honest-waitlist reframe (Locked
 * decision 3): the Founding price stays as a promise — join the waitlist now,
 * lock the founding price, get the Kit the day it ships. The urgency lever is
 * the rising price (Founding $29 → launch $49), NOT a deadline (CONTEXT.md).
 * Prices come from typed content (`offers.ts`, in cents) and are formatted
 * here — never hard-coded. Token-only styling (ADR-0005).
 */
type SectionProps = { className?: string };

// Format a cents amount as plain USD, dropping the decimals when whole-dollar.
function formatUsd(cents: number): string {
  const dollars = cents / 100;
  return `$${Number.isInteger(dollars) ? dollars : dollars.toFixed(2)}`;
}

// What the waitlist promise locks in (CONTEXT.md: Founding price). Future-tense
// — the Kit hasn't shipped yet; these arrive the day it does.
const KIT_FEATURES = [
  "The full Harness Starter Kit at the founding price — a one-time fee — the day it ships",
  "The Screencast, free, with lifetime access when it ships",
  "The Viewer — a local way to see what your agent did — free when it ships",
  "Founding-member status and the private build-log",
  "A vote on the real task the founder builds in the Screencast",
  "30-day, no-questions-asked refund once the Kit ships",
];

export function Pricing({ className }: SectionProps) {
  const foundingPrice = formatUsd(FOUNDING_PRICE_CENTS);
  const launchPrice = formatUsd(LAUNCH_PRICE_CENTS);

  return (
    <section
      className={`mx-auto max-w-3xl px-6 py-20 md:py-28${
        className ? ` ${className}` : ""
      }`}
    >
      <Label accent>The price</Label>
      <Heading as="h2" size="display-sm" className="mt-4">
        Join the waitlist. Lock the Founding price.
      </Heading>
      <Text variant="lead" className="mt-6">
        Join the waitlist now and lock {foundingPrice} for the Kit — a one-time
        fee you pay the day it ships, and the least it will ever cost. The price
        rises to {launchPrice} after launch; that&rsquo;s the only clock. No
        countdown, no fake deadline.
      </Text>
      <div className="mt-12">
        <PricingTier
          featured
          name="Founding price"
          price={foundingPrice}
          note={`${harnessStarterKit.name} — rises to ${launchPrice} at launch`}
          features={KIT_FEATURES}
          cta={
            <CheckoutButton className="w-full px-8 py-4 text-lg">
              Join the waitlist
            </CheckoutButton>
          }
        />
      </div>
      <Text variant="soft" className="mt-8">
        When the Kit ships, try it on your own work. If it doesn&rsquo;t earn
        its place in your setup, email us within 30 days of shipping and
        we&rsquo;ll refund you in full — no questions asked.
      </Text>
    </section>
  );
}
