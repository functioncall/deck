import { ImageResponse } from "next/og";

/**
 * `/` OG share image — the Next.js file-based Open Graph route for the home /
 * sales page. Rendered by Satori at build time (outside a browser), so it cannot
 * read the Tailwind `@theme` CSS variables from src/styles/theme.css; the deck
 * token values are mirrored here as literals. This file lives in src/app/** (NOT
 * src/components/**), so it is intentionally outside the no-hard-coded-values
 * ESLint scope — that rule guards components, where tokens must be used.
 */

export const alt =
  "Beontheloop — your agents don't finish; it's the harness, not the model";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Deck tokens, mirrored from src/styles/theme.css (Satori can't resolve vars).
const BG = "#0b0c10";
const INK = "#ece9e0";
const INK_SOFT = "#a4a39c";
const ACCENT = "#c89e6e";
const RULE = "#1f2229";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: BG,
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: ACCENT,
          }}
        >
          Beontheloop
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, lineHeight: 1.05, color: INK }}>
            Your agents don&rsquo;t finish.
          </div>
          <div style={{ display: "flex", fontSize: 84, lineHeight: 1.05, color: ACCENT }}>
            It&rsquo;s the harness.
          </div>
          <div style={{ display: "flex", fontSize: 34, marginTop: 28, color: INK_SOFT }}>
            Not a smarter model — the system that makes a long agent run
            actually finish.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            borderTop: `2px solid ${RULE}`,
            paddingTop: 28,
            fontSize: 30,
            lineHeight: 1.25,
            color: INK,
          }}
        >
          <span>
            I built this harness on my own production code.{" "}
            <span style={{ color: ACCENT }}>
              The Kit is what I actually use.
            </span>
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
