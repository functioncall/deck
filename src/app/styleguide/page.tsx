import type { Metadata } from "next";
import * as atoms from "@/components/atoms";

export const metadata: Metadata = {
  title: "Styleguide — BeyondTheLoop",
  description: "Living catalog of the deck design tokens (ADR-0005).",
};

/*
 * /styleguide — the living catalog (agent_docs/design-system.md).
 *
 * Renders the design tokens defined in src/styles/theme.css purely through the
 * Tailwind utilities generated from the @theme block (e.g. `bg-accent`,
 * `font-serif`). No raw hex/px lives here — the theme is the single token
 * source (ADR-0005). The full Tailwind class strings appear as literals below
 * so the JIT scanner emits them. As atoms land in L1 this page grows into the
 * full component catalog.
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

export default function Styleguide() {
  const atomNames = Object.keys(atoms);

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
          The living catalog of the deck design tokens — the single styling
          source defined in <code className="font-mono text-ink">src/styles/theme.css</code>{" "}
          (ADR-0005). Every swatch and sample below renders through Tailwind
          utilities generated from the <code className="font-mono text-ink">@theme</code> block.
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
        {atomNames.length === 0 ? (
          <p className="font-sans text-ink-soft">
            No atoms yet — the <code className="font-mono text-ink">src/components/atoms</code>{" "}
            barrel is empty in L0. Bespoke atoms built from these tokens (+ Radix
            primitives) land in L1 and will render here in their real states.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {atomNames.map((name) => (
              <li key={name} className="font-mono text-sm text-ink">
                {name}
              </li>
            ))}
          </ul>
        )}
      </Section>
    </main>
  );
}
