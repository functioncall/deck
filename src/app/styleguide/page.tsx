import type { Metadata } from "next";
import {
  Badge,
  Button,
  Callout,
  CodeBlock,
  Heading,
  Input,
  Label,
  Link,
  Stat,
  Text,
} from "@/components/atoms";
import {
  CTAButtonGroup,
  EmailCaptureForm,
  FAQItem,
  FieldRow,
  PricingTier,
  TestimonialCard,
} from "@/components/molecules";
import {
  Accordion,
  Dialog,
  Footer,
  Hero,
  Navbar,
} from "@/components/organisms";
import { MarketingPageTemplate } from "@/components/templates";
import { DeckEngineDemo } from "./DeckEngineDemo";

export const metadata: Metadata = {
  title: "Styleguide — BeyondTheLoop",
  description: "Living catalog of the deck design tokens + component library (ADR-0005).",
};

/*
 * /styleguide — the living catalog (agent_docs/design-system.md).
 *
 * Renders the design tokens defined in src/styles/theme.css purely through the
 * Tailwind utilities generated from the @theme block (e.g. `bg-accent`,
 * `font-serif`), then the full L1 component library — every atom, molecule, and
 * organism in its real states. No raw hex/px lives here — the theme is the
 * single token source (ADR-0005). The full Tailwind class strings appear as
 * literals (in the components and below) so the JIT scanner emits them. This is
 * the manual-verification surface and a regression guard: it imports every
 * barrel, so a broken export fails the build.
 */

type ColorToken = {
  /** Tailwind background utility generated from the --color-* theme variable. */
  swatch: string;
  /** The theme variable this swatch displays. */
  token: string;
  role: string;
  /** True for light surfaces where dark text reads better than the page ink. */
  light?: boolean;
};

type ColorGroup = { heading: string; tokens: ColorToken[] };

const colorGroups: ColorGroup[] = [
  {
    heading: "Surfaces",
    tokens: [
      { swatch: "bg-bg", token: "--color-bg", role: "page background" },
      { swatch: "bg-bg-soft", token: "--color-bg-soft", role: "raised surface" },
      { swatch: "bg-bg-card", token: "--color-bg-card", role: "card surface" },
    ],
  },
  {
    heading: "Ink",
    tokens: [
      { swatch: "bg-ink", token: "--color-ink", role: "primary text", light: true },
      { swatch: "bg-ink-soft", token: "--color-ink-soft", role: "secondary text", light: true },
      { swatch: "bg-ink-dim", token: "--color-ink-dim", role: "muted text" },
    ],
  },
  {
    heading: "Rules",
    tokens: [
      { swatch: "bg-rule", token: "--color-rule", role: "divider / border" },
      { swatch: "bg-rule-soft", token: "--color-rule-soft", role: "subtle divider" },
    ],
  },
  {
    heading: "Accent",
    tokens: [
      { swatch: "bg-accent", token: "--color-accent", role: "gold accent (brand)", light: true },
      { swatch: "bg-accent-soft", token: "--color-accent-soft", role: "accent wash" },
    ],
  },
  {
    heading: "Semantic",
    tokens: [
      { swatch: "bg-bad", token: "--color-bad", role: "negative / before", light: true },
      { swatch: "bg-good", token: "--color-good", role: "positive / after", light: true },
    ],
  },
  {
    heading: "Diagram layers",
    tokens: [
      { swatch: "bg-layer-agent", token: "--color-layer-agent", role: "agent layer", light: true },
      { swatch: "bg-layer-harness", token: "--color-layer-harness", role: "harness layer", light: true },
    ],
  },
];

const fontSamples: { name: string; token: string; className: string }[] = [
  { name: "Serif — Fraunces", token: "--font-serif", className: "font-serif" },
  { name: "Sans — Geist", token: "--font-sans", className: "font-sans" },
  { name: "Mono — Geist Mono", token: "--font-mono", className: "font-mono" },
];

// --- Sample data (CONTEXT.md: Harness Starter Kit · Founding price · map→expedition).
// Real typed content (offers.ts / faq.ts / testimonials.ts) arrives in L3; the
// catalog renders from inline samples only.

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

const footerLinks = [
  { href: "#terms", label: "Terms" },
  { href: "#privacy", label: "Privacy" },
  { href: "#refunds", label: "Refunds" },
];

const heroStats: { value: string; label: string }[] = [
  { value: "$29", label: "Founding price" },
  { value: "30-day", label: "No-questions refund" },
  { value: "∞", label: "Lifetime access" },
];

const faqItems: { question: string; answer: string }[] = [
  {
    question: "What do I get today?",
    answer:
      "The Harness Starter Kit, instantly — the prompts, configs, and ralph loop the Deck walks through. The Screencast is included free when it ships.",
  },
  {
    question: "When does the Screencast ship?",
    answer:
      "When it's ready — no committed date. You pay the Founding price for the Kit you get now, so the undated expedition carries no risk.",
  },
  {
    question: "What if it isn't for me?",
    answer:
      "A 30-day, no-questions-asked refund. The price rises over time, not your risk.",
  },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6 border-t border-rule pt-10">
      <h2 className="font-mono text-xs uppercase tracking-widest text-ink-soft">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** A labelled example slot inside a catalog section. */
function Specimen({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-mono text-xs uppercase tracking-widest text-ink-dim">
        {label}
      </span>
      {children}
    </div>
  );
}

export default function Styleguide() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-14 px-6 py-20">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          BeyondTheLoop
        </p>
        <h1 className="font-serif text-5xl font-light tracking-tight text-ink">
          Styleguide
        </h1>
        <p className="max-w-2xl font-sans text-ink-soft">
          The living catalog of the deck design tokens and the L1 component
          library — the single styling source defined in{" "}
          <code className="font-mono text-ink">src/styles/theme.css</code>{" "}
          (ADR-0005). Every swatch, sample, and component below renders through
          Tailwind utilities generated from the{" "}
          <code className="font-mono text-ink">@theme</code> block.
        </p>
      </header>

      <Section title="Colors">
        <div className="flex flex-col gap-8">
          {colorGroups.map((group) => (
            <div key={group.heading} className="flex flex-col gap-3">
              <h3 className="font-sans text-sm font-medium text-ink">
                {group.heading}
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {group.tokens.map((t) => (
                  <div
                    key={t.token}
                    className="flex flex-col overflow-hidden rounded-md border border-rule"
                  >
                    <div className={`${t.swatch} flex h-20 items-end p-2`}>
                      <span
                        className={`font-mono text-xs ${t.light ? "text-bg" : "text-ink"}`}
                      >
                        {t.token}
                      </span>
                    </div>
                    <p className="bg-bg-card px-2 py-1.5 font-sans text-xs text-ink-soft">
                      {t.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Fonts">
        <div className="flex flex-col gap-6">
          {fontSamples.map((f) => (
            <div key={f.token} className="flex flex-col gap-1">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-ink-dim">
                  {f.token}
                </span>
                <span className="font-sans text-xs text-ink-soft">{f.name}</span>
              </div>
              <p className={`${f.className} text-2xl text-ink`}>
                The quick brown fox jumps over the lazy dog — 0123456789
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Type scale">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-dim">
              Display — serif, light
            </span>
            <p className="font-serif text-6xl font-light tracking-tight text-ink">
              Beyond the loop
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-dim">
              Display-sm — serif
            </span>
            <p className="font-serif text-3xl text-ink">
              From prompts to a harness
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-dim">
              Lead — sans
            </span>
            <p className="font-sans text-lg text-ink-soft">
              The supporting line that introduces a section without competing
              with the display.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-dim">
              Label — mono, uppercase
            </span>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              Section label
            </p>
          </div>
        </div>
      </Section>

      <Section title="Atoms">
        <div className="flex flex-col gap-10">
          <Specimen label="Button — variant × size">
            <div className="flex flex-col gap-4">
              {(["primary", "secondary", "ghost"] as const).map((variant) => (
                <div key={variant} className="flex flex-wrap items-center gap-4">
                  <Button variant={variant} size="sm">
                    {variant} sm
                  </Button>
                  <Button variant={variant} size="md">
                    {variant} md
                  </Button>
                  <Button variant={variant} size="lg">
                    {variant} lg
                  </Button>
                </div>
              ))}
              <Button disabled>Disabled</Button>
            </div>
          </Specimen>

          <Specimen label="Link — variants">
            <div className="flex flex-wrap items-center gap-6">
              <Link href="#" variant="default">
                Default link
              </Link>
              <Link href="#" variant="muted">
                Muted link
              </Link>
              <Link href="#" variant="accent">
                Accent link
              </Link>
            </div>
          </Specimen>

          <Specimen label="Heading — display / display-sm">
            <div className="flex flex-col gap-4">
              <Heading as="h2" size="display">
                Stop prompting. Start harnessing.
              </Heading>
              <Heading as="h3" size="display-sm">
                From prompts to a harness
              </Heading>
            </div>
          </Specimen>

          <Specimen label="Text — lead / body / soft">
            <div className="flex flex-col gap-3">
              <Text variant="lead">
                The lead line introduces a section in the deck&rsquo;s sans
                voice, sized for a comfortable reading measure.
              </Text>
              <Text variant="body">
                Body copy carries the primary ink for sustained reading.
              </Text>
              <Text variant="soft">
                Soft copy steps back to secondary ink for asides.
              </Text>
            </div>
          </Specimen>

          <Specimen label="Label — default / accent">
            <div className="flex flex-wrap items-center gap-6">
              <Label>Section label</Label>
              <Label accent>Accent label</Label>
            </div>
          </Specimen>

          <Specimen label="Badge — tool chip">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Claude Code</Badge>
              <Badge>ralph loop</Badge>
              <Badge>beads</Badge>
            </div>
          </Specimen>

          <Specimen label="CodeBlock — with title + syntax spans">
            <CodeBlock title="ralph.sh">
              <CodeBlock.Cmt># run the harness loop until the work is done</CodeBlock.Cmt>
              {"\n"}
              <CodeBlock.Kw>while</CodeBlock.Kw> true; <CodeBlock.Kw>do</CodeBlock.Kw>
              {"\n  claude -p "}
              <CodeBlock.Str>&quot;$PROMPT&quot;</CodeBlock.Str>
              {"\n"}
              <CodeBlock.Kw>done</CodeBlock.Kw>
            </CodeBlock>
          </Specimen>

          <Specimen label="Callout — ◆ marker (strong lifts to ink)">
            <Callout>
              The Deck is the <strong>map</strong>; the Screencast is the{" "}
              <strong>expedition</strong>.
            </Callout>
          </Specimen>

          <Specimen label="Stat — serif num + mono label">
            <div className="flex flex-wrap gap-12">
              <Stat value="$29" label="Founding price" />
              <Stat value="30-day" label="Refund window" />
              <Stat value="∞" label="Lifetime access" />
            </div>
          </Specimen>

          <Specimen label="Input — normal / invalid">
            <div className="flex max-w-md flex-col gap-4">
              <Input type="email" placeholder="you@company.com" />
              <Input
                type="email"
                placeholder="you@company.com"
                defaultValue="not-an-email"
                invalid
              />
            </div>
          </Specimen>
        </div>
      </Section>

      <Section title="Molecules">
        <div className="flex flex-col gap-10">
          <Specimen label="FieldRow — help / error">
            <div className="flex max-w-md flex-col gap-6">
              <FieldRow
                label="Work email"
                htmlFor="sg-email-help"
                help="We email the Kit and the Screencast when it ships."
              >
                <Input type="email" placeholder="you@company.com" />
              </FieldRow>
              <FieldRow
                label="Work email"
                htmlFor="sg-email-error"
                error="Enter a valid email address."
              >
                <Input type="email" defaultValue="nope" invalid />
              </FieldRow>
            </div>
          </Specimen>

          <Specimen label="PricingTier — standard / featured">
            <div className="grid gap-6 sm:grid-cols-2">
              <PricingTier
                name="Later"
                price="$49"
                note="The launch price after the founding window closes."
                features={[
                  "Harness Starter Kit",
                  "Screencast when it ships",
                  "30-day refund",
                ]}
                cta={
                  <Button variant="secondary" className="w-full">
                    Get the Kit
                  </Button>
                }
              />
              <PricingTier
                featured
                name="Founding"
                price="$29"
                note="The lowest-ever price, locked in by early buyers."
                features={[
                  "Harness Starter Kit — instantly",
                  "Screencast included free",
                  "Lifetime access · 30-day refund",
                ]}
                cta={<Button className="w-full">Get the Kit</Button>}
              />
            </div>
          </Specimen>

          <Specimen label="FAQItem — semantic Q/A pair">
            <div className="flex flex-col gap-4">
              <FAQItem
                question={faqItems[0].question}
                answer={faqItems[0].answer}
              />
              <FAQItem
                question={faqItems[1].question}
                answer={faqItems[1].answer}
              />
            </div>
          </Specimen>

          <Specimen label="TestimonialCard — quote + attribution">
            <div className="grid gap-6 sm:grid-cols-2">
              <TestimonialCard
                quote="The map finally made the expedition feel obvious. I shipped my first ralph loop the same afternoon."
                name="Dana R."
                title="Staff engineer"
              />
              <TestimonialCard
                quote="It reframed prompting as building a harness. That one idea was worth the Founding price."
                name="Sam K."
              />
            </div>
          </Specimen>

          <Specimen label="EmailCaptureForm — client validation, no POST (L1)">
            <EmailCaptureForm cta="Notify me" />
          </Specimen>

          <Specimen label="CTAButtonGroup — primary + secondary">
            <CTAButtonGroup
              primary={<Button>Get the Kit — $29</Button>}
              secondary={
                <Button variant="ghost">Watch the Deck</Button>
              }
            />
          </Specimen>
        </div>
      </Section>

      <Section title="Organisms">
        <div className="flex flex-col gap-10">
          <Specimen label="Navbar — wordmark + links + persistent buy CTA">
            <div className="overflow-hidden rounded border border-rule">
              <Navbar
                links={navLinks}
                cta={<Button size="sm">Get the Kit — $29</Button>}
              />
            </div>
          </Specimen>

          <Specimen label="Hero — eyebrow + display + lead + CTA + stats">
            <div className="overflow-hidden rounded border border-rule">
              <Hero
                eyebrow="Harness Starter Kit"
                title="Stop prompting. Start harnessing."
                lead="The Deck is the free map. The Kit is everything you need to run a long-lived agent today — prompts, configs, and the ralph loop."
                cta={
                  <CTAButtonGroup
                    primary={<Button>Get the Kit — $29</Button>}
                    secondary={<Button variant="ghost">Watch the Deck</Button>}
                  />
                }
                stats={heroStats}
              />
            </div>
          </Specimen>

          <Specimen label="Footer — brand + links + legal">
            <div className="overflow-hidden rounded border border-rule">
              <Footer links={footerLinks} />
            </div>
          </Specimen>

          <Specimen label="Dialog — Radix (open-able, keyboard-operable)">
            <Dialog
              trigger={<Button variant="secondary">Open dialog</Button>}
              title="Lock the Founding price"
              description="You pay $29 today for the Harness Starter Kit."
            >
              <Text variant="soft">
                The Screencast is included free when it ships, with lifetime
                access and a 30-day, no-questions-asked refund. Press{" "}
                <kbd className="font-mono text-ink">Esc</kbd> or the × to close.
              </Text>
            </Dialog>
          </Specimen>

          <Specimen label="Accordion — Radix FAQ (expand/collapse via keyboard)">
            <Accordion items={faqItems} />
          </Specimen>
        </div>
      </Section>

      <Section title="Template — MarketingPageTemplate">
        <Specimen label="Navbar + slotted sections + Footer">
          <div className="overflow-hidden rounded border border-rule">
            <MarketingPageTemplate
              nav={
                <Navbar
                  links={navLinks}
                  cta={<Button size="sm">Get the Kit — $29</Button>}
                />
              }
              footer={<Footer links={footerLinks} />}
            >
              <Hero
                eyebrow="Harness Starter Kit"
                title="Stop prompting. Start harnessing."
                lead="Everything the Deck walks through, ready to run — at the Founding price."
                cta={
                  <CTAButtonGroup
                    primary={<Button>Get the Kit — $29</Button>}
                    secondary={<Button variant="ghost">Watch the Deck</Button>}
                  />
                }
                stats={heroStats}
              />
            </MarketingPageTemplate>
          </div>
        </Specimen>
      </Section>

      <Section title="Deck engine — SlidePlayer (L2 epic-0, throwaway demo)">
        <Specimen label="Nav (keyboard / click / swipe) + progress + counter + jump menu + stepper reveal">
          <DeckEngineDemo />
        </Specimen>
      </Section>
    </main>
  );
}
