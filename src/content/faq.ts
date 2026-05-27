// FAQ entries for the landing page. Help-don't-sell voice (CONTEXT.md): answer
// the question honestly, use the glossary terms exactly (Deck, Harness Starter
// Kit, Screencast, Pre-sell, Founding price). Copy lives here, not in components.

export type FaqEntry = { question: string; answer: string };

export const faq: FaqEntry[] = [
  {
    question: 'Is the Deck free forever?',
    answer:
      "Yes. The Deck is the map — it stays fully open and shareable, no email required. It's how the ideas spread, and it's the free preview of everything the Harness Starter Kit puts in your hands.",
  },
  {
    question: 'What exactly is the Harness Starter Kit?',
    answer:
      "It's the paid hero of the Pre-sell: the founder's real agentic-coding harness as reusable templates — the custom skills, the CLAUDE.md, the ralph-loop script, and the agent_docs templates you see described in the Deck. You download the whole Kit the instant you pay, and it works today.",
  },
  {
    question: 'Is the Screencast included? When does it ship?',
    answer:
      "It's included free for everyone who buys during the Pre-sell. The Screencast is the expedition — an over-the-shoulder build-along where the founder runs a real task end-to-end. It ships when it's ready, with lifetime access and no committed date. Because the Kit you get instantly is the paid hero, the undated Screencast is a bonus on top, not the thing you're paying for.",
  },
  {
    question: 'What if it isn’t for me?',
    answer:
      "There's a 30-day, no-questions-asked refund. Try the Harness Starter Kit on your own work; if it doesn't earn its place in your setup, email us within 30 days and we'll refund you in full.",
  },
  {
    question: 'Why does the price rise?',
    answer:
      "Early buyers take a bet before there's a wall of testimonials, so they get the lowest price the Kit will ever have. The Founding price is $29 and rises to $49 at launch. The urgency is the rising price, not a fake deadline — buy when it's worth it to you.",
  },
  {
    question: 'What does the Founding price lock in?',
    answer:
      "Buying at the Founding price locks in $29 for the full bundle — the Harness Starter Kit now plus the Screencast free when it ships. Founding buyers also get founding-member status, the private build-log, and a vote on the real task the founder builds in the Screencast.",
  },
];
