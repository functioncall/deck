// Named tester / testimonial entries for the landing page.
//
// SAMPLE COPY — these are authored placeholders, NOT real people or real quotes.
// They exist to drive layout and tone until genuine early-tester testimonials are
// collected. Do NOT present these as real attributions; replace before launch.

export type Testimonial = { quote: string; name: string; title?: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "I stopped babysitting the agent and started reviewing finished work. The harness in the Kit is the difference between a demo and something that actually ships.",
    name: 'Sample Tester',
    title: 'Staff Engineer (sample)',
  },
  {
    quote:
      "The Deck reframed how I think about long-running agents. The Kit just handed me the setup it took the founder a year to find.",
    name: 'Sample Tester',
    title: 'Founder & CTO (sample)',
  },
  {
    quote:
      "Dropped the ralph-loop script and the agent_docs templates into a real project and had a clean exit-0 run the same afternoon. Worth far more than the Founding price.",
    name: 'Sample Tester',
    title: 'Indie Developer (sample)',
  },
];
