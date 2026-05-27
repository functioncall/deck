# Beontheloop

The product and marketing site (Next.js) that gives away an interactive **Deck** for free and pre-sells a paid build-along **Screencast** about building long-running AI agents. This glossary fixes the language we use for the *business and product*, not the deck's teaching content.

## Language

**Beontheloop**:
The brand and the website (beontheloop.com). Named after the Deck's thesis — going *beyond* the basic LLM inference loop into long-running agents.
_Avoid_: "the site", "the app" (too generic), "the course" (it is not a course)

**Deck**:
The free, interactive presentation — currently `index.html`, to be rebuilt in Next.js — that teaches the concepts. Positioned as **"the map"**. It is the free trust-engine and preview.
_Avoid_: "slides", "presentation", "preview" used alone

**Screencast**:
The over-the-shoulder build-along where the founder runs a real task end-to-end (grill → spec → ralph loop → review → shipped). Positioned as **"the expedition"**. Does not exist yet; ships **"when it's ready," with lifetime access and no committed date**, and is included free for **Pre-sell** buyers. It is *not* the paid hero — the **Harness Starter Kit** is.
_Avoid_: "video", "course", "tutorial"

**Pre-sell**:
Selling the **Harness Starter Kit** now at a **Founding price**, with the **Screencast** included free for buyers when it ships. Money changes hands today (the chosen validation model), but the *paid hero is the Kit they get instantly* — so the undated Screencast carries no refund risk. Urgency comes from the rising price, not a deadline.
_Avoid_: "waitlist", "pre-booking" (those imply no payment — we decided against the no-charge path)

**Founding price**:
The lowest-ever price (~$29) for the **Harness Starter Kit** bundle, locked in by early buyers; rises to the launch price (~$49) later. The rising price — not a ship date — is the **Pre-sell**'s urgency lever. Refunds: 30-day, no-questions-asked.
_Avoid_: "discount", "coupon" (avoid quantity-capped coupons specifically — see lessons learned)

**Consultation**:
A future paid offer — private 1:1 hours (2–3h) with the founder, booked via an integrated calendar. A separate, higher-priced "work with me" track, not part of the Screencast.
_Avoid_: "coaching", "mentoring" (pick one term later), "support"

**Offer**:
The umbrella term for anything Beontheloop sells or gives away — currently the (free) **Deck**, the (paid) **Screencast**, and the (future, paid) **Consultation**. The site's information architecture is offer-oriented so new offers slot in without a rebuild.

**Subscriber**:
Someone who has given their email — either to follow along (free) or as part of a **Pre-sell** purchase. The entity behind the `SubscriberRepository`; stored in the email tool (Kit/Loops) today.

**Purchase**:
A completed **Pre-sell** transaction for the **Screencast** (later, the **Consultation**). The entity behind the `PurchaseRepository`; recorded by Lemon Squeezy today. Carries the locked **Founding price** and entitlement to the deliverable.

**Harness Starter Kit**:
The **paid hero** of the **Pre-sell** — the founder's actual agentic-coding harness as reusable templates (custom skills, `CLAUDE.md`, ralph-loop script, `agent_docs` templates) described in the **Deck**, downloaded the instant a buyer pays. Cheap to deliver (digital files), high developer value, and exists today — which is what makes the undated **Screencast** safe to bundle on top. Founding buyers also get founding-member status, the private build-log, and a vote on the real task built in the **Screencast**.
_Avoid_: "templates pack", "freebie" (it is the paid hero product, not a giveaway)

## Relationships

- **Beontheloop** hosts multiple **Offers**: the **Deck** (free), the **Screencast** (paid, pre-sold), and later the **Consultation** (paid 1:1). The brand is built to house more.
- The **Deck** is the lead-in to the paid **Offers**: map → expedition. Free concept → paid execution → 1:1 help.
- A **Pre-sell** purchase locks a **Founding price** and entitles the buyer to the **Screencast** when it ships.

## Example dialogue

> **Founder:** "Does the **Deck** stay free forever?"
> **Strategist:** "Yes — the **Deck** is the map; it builds trust and feeds the **Pre-sell**. The **Screencast** is the expedition, and that's what they pay the **Founding price** for."

## Flagged ambiguities

- "pre-book / waitlist" (user's original phrasing) was resolved to **Pre-sell** — we are taking money now, not just collecting emails.
- "product" was ambiguous between the **Deck** and the **Screencast** — resolved: free **Deck**, paid **Screencast**, both under the **Beontheloop** brand.
