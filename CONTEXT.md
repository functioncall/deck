# Beontheloop

The product and marketing site (Next.js) that gives away an interactive **Deck** for
free and runs a **Waitlist** for the paid **Harness Starter Kit** — the founder's real
harness for building long-running AI agents. This glossary fixes the language we use for
the *business and product*, not the deck's teaching content.

## Language

**Beontheloop**:
The brand and the website (beontheloop.com). Named after the Deck's thesis — going
*beyond* the basic LLM inference loop into long-running agents.
_Avoid_: "the site", "the app" (too generic), "the course" (it is not a course)

**Deck**:
The free, interactive presentation — currently `index.html`, to be rebuilt in Next.js —
that teaches the concepts. Positioned as **"the map"**. It is the free trust-engine and
the converter that turns readers onto the **Waitlist**.
_Avoid_: "slides", "presentation", "preview" used alone

**Screencast**:
The over-the-shoulder build-along where the founder runs a real task end-to-end (grill →
spec → ralph loop → review → shipped). Positioned as **"the expedition"**. Does not exist
yet; ships **"when it's ready," with lifetime access and no committed date**, and is
included free for **Waitlist** members. It is *not* the paid hero — the **Harness Starter
Kit** is.
_Avoid_: "video", "course", "tutorial"

**Waitlist** (replaces the earlier "Pre-sell"):
The launch model: collect emails now at **no charge**, and let members lock the
**Founding price** on the **Harness Starter Kit** — paid as a **one-time fee the day the
Kit goes live**, not today. The **Screencast** and the future **Viewer** ship free to
Waitlist members when ready. Money changes hands at launch, not now, because the Kit
isn't deliverable yet — charging for a file we can't hand over would break the honesty
the brand runs on. Urgency comes from the rising price, not a deadline.
_Avoid_: "pre-sell", "pre-order", "pre-booking" (those imply money today — we reversed
that decision)

**Founding price**:
The lowest-ever price (~$29) for the **Harness Starter Kit**, locked in by **Waitlist**
members and paid as a one-time fee when the Kit ships; rises to the launch price (~$49)
afterwards. The rising price — not a ship date — is the urgency lever. Refunds: 30-day,
no-questions-asked once the Kit ships.
_Avoid_: "discount", "coupon" (avoid quantity-capped coupons specifically — see lessons
learned)

**Consultation**:
A future paid offer — private 1:1 hours (2–3h) with the founder, booked via an integrated
calendar. A separate, higher-priced "work with me" track, not part of the Screencast.
_Avoid_: "coaching", "mentoring" (pick one term later), "support"

**Viewer** (future — bonus, not the hero):
A future part of the **Harness Starter Kit** vision: a **local** way to *see what a
long-running agent did* — the run, what changed, whether the build is green and the
project is "ready." Not built yet, and **not what the $29 buys today**; like the
**Screencast**, it ships free to **Waitlist** members when ready. The harness *runs* long
agents; the Viewer lets you *trust* what they did.
_Avoid_: "dashboard", "observability platform", "Project Intelligence Layer" (those imply
a hosted SaaS — this is a local view, and a later bonus, not the hero)

**Offer**:
The umbrella term for anything Beontheloop sells or gives away — currently the (free)
**Deck** and the (paid) **Harness Starter Kit** (with the **Screencast** and future
**Viewer** bundled), and later the (paid) **Consultation**. The site's information
architecture is offer-oriented so new offers slot in without a rebuild.

**Subscriber**:
Someone who has given their email — either to follow along (free) or by joining the
**Waitlist**. The entity behind the `SubscriberRepository`; stored in the email tool
(Kit/Loops) today.

**Purchase**:
A completed purchase of the **Harness Starter Kit** at the locked **Founding price**,
made when the Kit goes live (later, the **Consultation**). The entity behind the
`PurchaseRepository`; recorded by Lemon Squeezy. Carries the locked **Founding price** and
entitlement to the deliverable.

**Harness Starter Kit**:
The **paid hero** — the founder's actual agentic-coding harness as reusable templates
(custom skills, `CLAUDE.md`, ralph-loop script, `agent_docs` templates) plus the honest
setup/verify conventions described in the **Deck**, downloaded the instant a buyer pays at
launch. Cheap to deliver (digital files), high developer value, and exists today.
**Waitlist** members lock the **Founding price** and also get founding-member status, the
private build-log, a vote on the real task built in the **Screencast**, and the
**Screencast** and future **Viewer** free when they ship.
_Avoid_: "templates pack", "freebie" (it is the paid hero product, not a giveaway)

## Relationships

- **Beontheloop** hosts multiple **Offers**: the **Deck** (free), the **Harness Starter
  Kit** (paid, waitlisted — with the **Screencast** and future **Viewer** bundled), and
  later the **Consultation** (paid 1:1). The brand is built to house more.
- The **Deck** is the lead-in to the paid **Offers**: map → expedition. Free concept →
  paid execution → 1:1 help. It is the trust engine that converts readers onto the
  **Waitlist**.
- Joining the **Waitlist** locks a **Founding price**, paid when the Kit ships, and
  entitles the member to the **Screencast** (and future **Viewer**) free when ready.

## Example dialogue

> **Founder:** "Does the **Deck** stay free forever?"
> **Strategist:** "Yes — the **Deck** is the map; it builds trust and feeds the
> **Waitlist**. The **Harness Starter Kit** is what they lock the **Founding price** on."

## Flagged ambiguities

- "pre-book / waitlist" (user's original phrasing) was first resolved to **Pre-sell**
  (take money today), then **reversed to Waitlist**: we collect emails now and take the
  one-time fee at launch, because the Kit isn't deliverable yet. The built site already
  reflects this; the glossary now matches.
- "product" was ambiguous between the **Deck** and the paid offer — resolved: free
  **Deck**, paid **Harness Starter Kit** (Screencast + future Viewer bundled), under the
  **Beontheloop** brand.
- "viewer" is the long-running-agent observability idea. Scoped deliberately: a **local
  view** that ships as a later founding-member bonus — NOT a hosted dashboard or a
  separate platform. The standalone tool ("Project Intelligence Layer") is parked:
  strategy is sharp product now, platform later.
