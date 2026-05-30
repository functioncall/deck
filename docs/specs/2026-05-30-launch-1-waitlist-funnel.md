# Launch #1 — HN-ready Waitlist Funnel (PPT deck)

> Spec for the Launch-#1 Ralph loop. Frozen once the loop runs; only the verify
> epic may append a Verification report. Mirrors the L4 spec's structure and tone.
> PRD: bd **Deck-9lh**.

---

## Context

L0–L4 built the foundation, design system, deck, landing page, and the (deferred)
pre-sell engine. The site then **pivoted to a waitlist** (commit `63d5ff7`):
payments (Lemon Squeezy) and the live checkout are off; the only required key is
`LOOPS_API_KEY`; Amplitude is configured and its funnel events fire.

**Launch #1** publishes the **Deck** publicly and shares it on Hacker News / X.
The Deck — not the root URL — is the promoted entry point and the first thing a
cold visitor sees. **The Deck stays a click-through presentation (PPT-style); it is
NOT being rebuilt into a scrollable essay.** This phase makes that funnel survive
contact with HN traffic by closing real holes without changing the deck's format:

- The Deck has no escape hatch — no logo / home link inside `/deck`, so a visitor
  from HN can't get back to the site without finishing or dismissing. The top-left
  chrome cluster (home/back glyphs + SECTIONS + section label) is also messy.
- The whole site sells a $29 "founding price" product with a refund policy, but
  nothing can be bought (it's a waitlist) — trust-killing whiplash.
- The privacy policy describes collection that doesn't match reality; there's no
  consent surface for the already-live Amplitude.
- Proof rests on one unverifiable metric ("270 files / 59 min / exit 0") repeated 4×.
- Trust gaps: dead "email us" with no address, no favicon, public/indexable
  `/styleguide`, an orphaned `/thank-you` placeholder download, misspelled credits.

This delivers: a PPT deck with an **escape hatch + cleaner chrome**; an
**honest-waitlist** reframe across the site; a **single bold founder claim**; the
**EU consent** gate for Amplitude; and the trust/polish fixes that keep HN from
dunking on it.

---

## Locked decisions

1. **`/deck` stays a click-through presentation.** No scrollable rebuild, no
   `SlidePlayer` rewrite, no interleaved capture. The existing player, slides,
   reveals, EndCard, and StickyCaptureBar are kept.
2. **Deck escape hatch + chrome cleanup.** Add a persistent home/brand link inside
   `/deck` so a visitor is never trapped. Simplify the top-left chrome cluster
   (home/back glyphs + SECTIONS + section label) to one quiet, legible line.
   EndCard + StickyCaptureBar remain the conversion surfaces.
3. **Honest-waitlist reframe.** Keep the founding price ($29 → $49) as a *promise*
   ("join the waitlist, lock the founding price, get the Kit the day it ships");
   remove all present-tense "buy / download instantly / refund now." One waitlist
   verb for the email action everywhere (kill the "Follow along" vs "Get early
   access" split) — edited directly in the existing EmailCaptureForm/FinalCTA, no
   new molecule.
4. **Proof = one bold founder claim, no receipt** (chosen Option B). Remove the
   "270 / 59 / exit 0" triple from Hero, Proof, and BOTH OG cards. Replace with a
   confident first-person claim (ADR-0006 anonymous — "I", no name).
5. **Amplitude stays live.** Add a minimal, dismissible EU/EEA **consent banner**
   that gates Amplitude initialization; reword the privacy policy to match what is
   actually collected. The consent gate governs anonymous browsing analytics
   (`deck_slide_viewed` / `deck_completed`).
6. **Trust fixes:** real contact `mailto:` in Footer + legal + thank-you; favicon /
   icon set; custom `not-found`; `/styleguide` noindex; `/thank-you` gated/cleaned
   for the waitlist phase; `robots` + `sitemap`; corrected credits on `Closing`.
7. Token-only styling in `src/components/**` (ADR-0005); layered architecture
   (ADR-0002); email-based / no-auth (ADR-0004) all unchanged. **No ADR needed —
   the deck format does not change.**

---

## Out of scope (deferred)

- Any scrollable-essay rebuild of the deck (explicitly removed).
- Live Lemon Squeezy checkout + webhook (until the Kit ships).
- Building/packaging the actual **Harness Starter Kit** contents and the project →
  agentic-harness setup automation (script/skill).
- The **Screencast**, member area, accounts/auth, the **Consultation** offer.
- A multi-page blog / content engine (the Deck is the single shared asset).
- Promoting the root URL (a later funnel step).
- Linking a real proof artifact / run log (bold claim only this launch).
- Per-slide deep-link / resume in the deck (nice-to-have, not now).

---

## Recon findings (condensed)

### Reuse map

| Need | Reuse |
|---|---|
| Deck player + slides | `SlidePlayer`, `src/app/deck/slides/*` — kept as-is |
| Deck chrome | `SlidePlayer.tsx` top-left cluster + `JumpMenu` (simplify) |
| Conversion surfaces | `EndCard` + `StickyCaptureBar` — kept |
| Email capture | `EmailCaptureForm` (molecule) — verb standardized in place |
| Marketing layout | `MarketingPageTemplate` + `Navbar`/`Footer` + atoms |
| Offer prices | `offers.ts` (cents) |
| Analytics | `events.ts` taxonomy + `trackClient`/`/api/track` — unchanged names |

### Current deck path

`/deck` → `DeckExperience` → `SlidePlayer` + `StickyCaptureBar`; final slide is
`EndCard`. `SlidePlayer` renders the top-left chrome cluster (`⌂` home-to-slide-0,
`←` back, `SECTIONS` jump menu) + the `§ NN TITLE` label, fires `deck_slide_viewed`
on index change and `deck_completed` on the last slide. No link out to `/`.

---

## File structure

`[+]` new, `[~]` modified, `[-]` deleted

```
[~] src/components/deck-player/SlidePlayer.tsx   add a brand/home link to `/`; simplify the top-left chrome cluster to one line
    (or)
[~] src/app/deck/DeckExperience.tsx              mount a small home/brand link overlay inside /deck if cleaner than editing the player

[~] src/components/sections/Hero.tsx             waitlist copy; remove proof stat row → bold claim
[~] src/components/sections/Pricing.tsx          founding price as promise (no "buy now")
[~] src/components/sections/WhatsInTheKit.tsx    future-tense; waitlist CTA label
[~] src/components/sections/Proof.tsx            bold claim; drop 270/59/exit0 metrics
[~] src/components/sections/FinalCTA.tsx         standardized waitlist verb (no new molecule)
[~] src/app/deck/EndCard.tsx                     standardized waitlist verb ("Follow along" → the one verb)
[~] src/app/deck/StickyCaptureBar.tsx            standardized waitlist verb / honest copy
[~] src/content/faq.ts                           waitlist-accurate answers
[~] src/app/opengraph-image.tsx                  drop metric strip; bold claim line
[~] src/app/deck/opengraph-image.tsx             drop metric strip; bold claim line

[~] src/app/privacy/page.tsx                     match reality (Loops; payments/refund "when Kit ships"); consent note
[~] src/app/terms/page.tsx                       waitlist reality
[~] src/app/refund-policy/page.tsx               applies once the Kit ships
[~] src/components/organisms/Footer.tsx          contact mailto
[~] src/app/thank-you/page.tsx                   clean for waitlist (no fake download); mailto
[~] src/app/deck/slides/Closing.tsx              corrected credited names
[+] src/app/not-found.tsx                         custom 404 with home link
[+] src/app/icon.svg (or favicon)                favicon / app icon
[+] src/app/robots.ts                            robots (allow; disallow /styleguide,/thank-you)
[+] src/app/sitemap.ts                           sitemap (/, /deck, legal)
[~] src/app/styleguide/page.tsx                  metadata robots: noindex

[+] src/components/molecules/ConsentBanner.tsx (or app-level)  EU consent gate for Amplitude
[~] src/lib/analytics/client.ts                  respect consent before firing
```

---

## Public APIs

```ts
// ConsentBanner — minimal dismissible EU/EEA consent gate.
type ConsentBannerProps = { /* none required; self-contained, persists choice */ };

// consent decision (pure) used by trackClient:
function analyticsAllowed(): boolean;   // default-deny for EU until accepted
```

No other public API changes — the deck player keeps its existing prop contract.

---

## Architecture by concern

- **Deck (unchanged format).** `SlidePlayer` keeps click/keyboard/swipe nav and the
  reveal/opacity machine. Only two edits: (1) a persistent brand/home link to `/`
  inside `/deck`; (2) the top-left chrome cluster collapses to one quiet line
  (fold "go to start" into the Sections menu; drop the bare `⌂`/`←` glyphs or
  restyle them so they don't read as debug). Slides untouched.
- **Conversion.** EndCard + StickyCaptureBar stay; copy/verb standardized to one
  waitlist action. `EmailCaptureForm` keeps its field/POST mechanism.
- **Analytics (event names unchanged).** A pure `analyticsAllowed()` gate guards
  `trackClient` so `deck_slide_viewed`/`deck_completed` fire only with consent.
  `events.ts` is not changed.
- **Consent.** Small dismissible banner; choice persisted (localStorage/cookie);
  default-deny for EU. No consent-management platform, no new dependency.

---

## Per-epic specifications

Each epic = one fresh session = one commit. The driver closes the bead; gates run
in the driver (the agent never runs tests/build). See each bead's description for
the executable contract.

- **epic-1-deck-nav** (Deck-3dt) — PPT deck escape hatch (home link to `/`) +
  top-left chrome cleanup. No scroll, no player rewrite.
- **epic-2-waitlist-copy** (Deck-0qo) — reframe Hero/Pricing/WhatsInTheKit/FinalCTA
  + EndCard + StickyCaptureBar + `faq.ts`; Proof bold claim; both OG cards;
  standardize the one waitlist verb (no new molecule).
- **epic-3-trust-and-legal** (Deck-d46) — legal pages → waitlist reality (closes
  Deck-4dc), contact mailto, favicon, custom 404, robots+sitemap, styleguide
  noindex, thank-you cleanup, corrected `Closing` credits.
- **epic-4-analytics-consent** (Deck-kyj) — EU consent banner gating Amplitude +
  privacy reword reconciliation.
- **epic-5-verify** (Deck-kzj) — full gate + static review against this checklist +
  Verification report appended here.

---

## Verification (manual, after the loop)

1. `pnpm install && pnpm lint && pnpm exec tsc --noEmit && pnpm build` all green.
2. Desktop: land `/deck` → a visible brand/home link returns to `/`; the top-left
   chrome reads as one clean line; deck still click/keyboard/swipe navigable.
3. Land `/` → submit email → see confirmation; one consistent waitlist verb.
4. No present-tense paid copy ("buy now / download instantly / refund now") anywhere.
5. Legal pages describe email-via-Loops; refund/payment framed "when the Kit ships."
6. A real contact `mailto:` resolves from Footer + legal + thank-you.
7. Favicon shows in the tab; `/deck` share title/description is enticing.
8. `/styleguide` is `noindex`; `/thank-you` has no fake download; `/nope` shows custom 404.
9. EU consent banner appears; declining stops Amplitude; privacy copy matches.
10. No "270 / 59 / exit 0" metric anywhere; a single bold founder claim is present.
11. `Closing` credits spelled correctly.

---

## Risk register

| Risk | Mitigation |
|---|---|
| Editing `SlidePlayer` chrome breaks nav | Keep the nav machine untouched; only add a home link + restyle/relocate the chrome cluster. |
| Two epics touch the same file | Ownership partitioned: deck chrome = epic-1; marketing+deck copy = epic-2; legal/app = epic-3; analytics = epic-4. EndCard/StickyCaptureBar copy is epic-2 only. |
| Consent banner scope creep | Minimal dismissible banner + a pure boolean gate; no platform, no SDK change. |
| Removing metrics misses a spot | epic-5 greps for "270"/"59 min"/"exit 0" across Hero/Proof/both OG cards. |

---

## What this plan does NOT change

- The deck's presentation format, the slide content components, or the nav machine.
- The architecture layers, ports/adapters, or any adapter (ADR-0002).
- The email-based / no-auth model (ADR-0004); no DB.
- The `events.ts` analytics taxonomy.
- `offers.ts` prices (founding $29 → launch $49 stay; only framing changes).
- Any `.env*` file (never read/written).

---

## Verification report (epic-5, 2026-05-30)

Static review of the funnel against the Verification checklist (the DRIVER ran the
lint + `tsc --noEmit` + build gate). Findings, decisions, and residual risks for the
manual browser pass below.

### Checklist results

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | `/deck` stays a click-through presentation (NOT scrollable) | ✓ Pass | `src/app/deck/page.tsx:20` — wrapper is `h-[100svh] w-screen overflow-hidden`. `SlidePlayer.handleClick` still dispatches `next`; keyboard / touch-swipe nav intact. |
| 1 | `/deck` has a visible home/brand link back to `/` | ✓ Pass | `SlidePlayer.tsx:217-225` — persistent `NextLink href="/"` rendered "Beontheloop" inside the top-left chrome. |
| 1 | Top-left chrome reads as one clean line | ✓ Pass | `SlidePlayer.tsx:217-244` — `Beontheloop` line then a single row `[JumpMenu] § NN TITLE`. No bare `⌂`/`←` glyphs. |
| 2 | No present-tense paid copy ("buy now / download instantly / refund now") | ✓ Pass | Grep `buy now|download instantly|refund now` across `src/` returned 0 matches. Pricing/Refund framed "when the Kit ships". |
| 2 | Founding price framed as a waitlist promise | ✓ Pass | `Pricing.tsx:46-54` "Join the waitlist. Lock the Founding price." + 30-day refund framed "once the Kit ships". |
| 2 | Single "Join the waitlist" verb sitewide | ✓ Pass | Every `CheckoutButton` and `EmailCaptureForm` call site uses `Join the waitlist` (Hero, Pricing, WhatsInTheKit, FinalCTA, EndCard, StickyCaptureBar, privacy/terms/refund navCta, page nav). |
| 2 | FinalCTA keeps `id="join"` | ✓ Pass | `FinalCTA.tsx:18` — `id="join"`. |
| 3 | No 270 / 59 min / exit 0 metrics on Hero / Proof / both OG cards | ✓ Pass | Grep on `src/components/sections/Hero.tsx`, `Proof.tsx`, `src/app/opengraph-image.tsx`, `src/app/deck/opengraph-image.tsx` returned 0 matches for those strings. |
| 3 | Bold first-person founder claim present | ✓ Pass | `Proof.tsx:25-29` "I built this harness on my own production code, and I run it every day." Mirrored on both OG cards ("I built this harness on my own production code. The Kit is what I actually use."). |
| 4 | Legal pages reflect waitlist reality | ✓ Pass | `privacy/page.tsx` describes Loops + Amplitude (consent-gated) + Lemon Squeezy "when the Kit ships". `refund-policy/page.tsx` opens with "the waitlist itself is free". `terms/page.tsx` carries the same framing (navCta + footer). |
| 4 | Real `mailto:` from Footer + legal + thank-you | ✓ Pass | `Footer.tsx:13,17-20` exports `CONTACT_EMAIL = "hello@beontheloop.com"` and renders a "Contact" mailto. Reused in `privacy`, `terms`, `refund-policy`, `thank-you`. |
| 4 | Favicon / app icon exists | ✓ Pass | `src/app/icon.svg` is present (321 B SVG icon route — Next.js file-based icon convention). |
| 4 | Custom 404 | ✓ Pass | `src/app/not-found.tsx` — branded 404 with `noindex`, home + Deck links. |
| 4 | `robots.ts` + `sitemap.ts` exist | ✓ Pass | `robots.ts` allows `/`, disallows `/styleguide` + `/thank-you`; `sitemap.ts` lists `/`, `/deck`, `/privacy`, `/terms`, `/refund-policy`. |
| 4 | `/styleguide` noindex | ✓ Pass | `styleguide/page.tsx:42` — `robots: { index: false, follow: false }`. |
| 4 | `/thank-you` has no fake download | ✓ Pass | `thank-you/page.tsx` confirms waitlist signup, links to Deck, no Kit download or fake artifact. `noindex` set; also disallowed in `robots.ts`. |
| 4 | `Closing` credits look correct | ✓ Pass (static) | `Closing.tsx:16-20` — names rendered cleanly with `&middot;` separators. (Final spelling verification belongs in the manual pass.) |
| 5 | Consent banner gates Amplitude | ✓ Pass | `ConsentBanner.tsx` mounted in `app/layout.tsx:69`. `analyticsAllowed()` is default-deny; `trackClient` (`src/lib/analytics/client.ts:49`) short-circuits before POSTing to `/api/track` when consent is not `granted`. Banner renders nothing once a choice persists. |
| 5 | Privacy copy matches consent reality | ✓ Pass | `privacy/page.tsx:73-93` — describes Amplitude as anonymous funnel analytics, names the default-deny banner ("Consent is required before anything loads"), explains withdrawal + DNT. |

### Regression greps (residual matches reviewed)

- `270` / `59 min` / `exit 0` — **0 matches** in Hero / Proof / both OG cards (the
  marketing surfaces called out by the spec). Surviving matches:
  - `src/app/styleguide/page.tsx:664,679-681` — the `Stat` / `Gantt` atom showcase.
    Acceptable: the styleguide is `noindex` and disallowed in `robots.ts`; this
    is a component catalog, not a public claim.
  - `src/app/deck/slides/ThePlanGantt.tsx:7,15` and `src/app/deck/slides/Review.tsx:25,38`
    — slide narrative + a phone-screenshot alt text describing the founder's own
    Ralph run ("59 min, 13 epics, all closed"). Acceptable: spec scope for the
    metric-strip removal is explicitly "Hero, Proof, and BOTH OG cards" (Risk
    register row 4); the deck's first-person story of the run can keep its
    timing details. The removed receipt was the *headline* metric triple
    ("270 / 59 / exit 0") on marketing surfaces, not every duration token in
    the deck narrative.
- `Get early access` / `Follow along` — **0 matches** in any rendered copy. One
  stale JSDoc reference in `src/components/molecules/CheckoutButton.tsx` was
  fixed in this session (small, safe defect).
- `TODO` / `FIXME` / `XXX` — only matches are inside intentional fake-prompt /
  fake-tool-output content in `src/app/deck/slides/LoopInAction.tsx:102,108,117`
  (a slide depicting the agent finding "all TODO comments in src/"). Not a real
  TODO marker — narrative content.
- `buy now` / `download instantly` / `refund now` — **0 matches** anywhere in
  `src/`. No paid-present-tense copy slipped through.

### Defects fixed in this session

1. **`CheckoutButton.tsx:7` JSDoc** — header said `"Get early access"`; updated to
   `"Join the waitlist"` to match the standardized verb (Locked decision 3).
   Comment-only; behaviour unchanged.

### Defects filed for follow-up

None. No large or scope-bearing defect was found during the static review.

### Residual risks for the manual browser pass

- **Visual chrome layering on small viewports.** The home link + JumpMenu + section
  label sit in one cluster at `top-[5vh] left-[5vw]`; a manual mobile pass should
  confirm the line wraps cleanly and never overlaps the `Stepper` at the top
  centre on the narrowest reveal-bearing slides.
- **OG cards.** Satori OG renders cannot be diffed in static review; the manual
  pass should drag both PNG outputs (root + `/deck`) into a share debugger and
  confirm the bold founder claim is fully visible and the metric strip is
  truly gone.
- **Consent banner first-visit copy.** The Decline / Accept buttons are reachable
  by keyboard (Radix-free `Button` atom), but the manual pass should confirm
  focus-visible rings render against `bg-bg-card` and the banner sits above the
  `StickyCaptureBar` on `/deck` without trapping focus.
- **Closing credits spelling.** Names verified to be rendered as intended in
  source; the human pass should sanity-check against the contributors' public
  handles (Geoffrey Huntley, Dexter Horthy, Matt Pocock, Steve Yegge, Ryan
  Lopopolo, Lance Martin, Mario Zechner, Armin Ronacher).
- **Per-deck-slide leftover metric narration.** `ThePlanGantt` and `Review` still
  reference 59 min as the run duration — confirmed in-scope (deck narrative).
  Flag here only so a future copy pass can decide if the deck story itself
  should soften that timing claim too.

