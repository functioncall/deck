import { Heading, Label, Text } from "@/components/atoms";
import { PricingTier, CheckoutButton } from "@/components/molecules";
import {
  FOUNDING_PRICE_CENTS,
  LAUNCH_PRICE_CENTS,
  harnessStarterKit,
} from "@/content";

/**
 * Pricing — the offer + price (SPEC §3, §1): the paid hero at the Founding price,
 * via the L1 `PricingTier`. Prices come from typed content (`offers.ts`, in
 * cents) and are formatted here — never hard-coded. The urgency lever is the
 * rising price (Founding $29 → launch $49), NOT a deadline (CONTEXT.md), and the
 * 30-day no-questions guarantee is stated plainly. Token-only styling (ADR-0005).
 */
type SectionProps = { className?: string };

// Format a cents amount as plain USD, dropping the decimals when whole-dollar.
function formatUsd(cents: number): string {
  const dollars = cents / 100;
  return `$${Number.isInteger(dollars) ? dollars : dollars.toFixed(2)}`;
}

// What buying at the Founding price locks in (CONTEXT.md: Founding price).
const KIT_FEATURES = [
  "The full Harness Starter Kit — yours at the founding price the day it ships",
  "The Screencast, free, with lifetime access when it ships",
  "Founding-member status and the private build-log",
  "A vote on the real task the founder builds in the Screencast",
  "30-day, no-questions-asked refund",
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
        Lock in the Founding price before launch.
      </Heading>
      <Text variant="lead" className="mt-6">
        Get early access before launch and you&rsquo;ll get the Kit at{" "}
        {foundingPrice} — the least it will ever cost. The price rises to{" "}
        {launchPrice} at launch; that&rsquo;s the only clock. No countdown, no
        fake deadline.
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
              Get early access
            </CheckoutButton>
          }
        />
      </div>
      <Text variant="soft" className="mt-8">
        When the Kit ships, try it on your own work. If it doesn&rsquo;t earn its
        place in your setup, email us within 30 days and we&rsquo;ll refund you in
        full — no questions asked.
      </Text>
    </section>
  );
}
