export type Faq = { q: string; a: string };

export type GuideSection = { heading: string; paragraphs: string[] };

/** Copy for one tool / landing page. Rendered by components/tool-page.tsx. */
export type PageContent = {
  /** <title>, max 60 chars incl. " | ToolNest" suffix added by the layout (so keep this <= 48). */
  title: string;
  /** Meta description, 120–155 chars. */
  description: string;
  /** The single H1 on the page. */
  h1: string;
  /** 1–2 sentence lead under the H1. */
  intro: string;
  /** "How to" steps, 3–5 short imperative sentences. */
  steps: string[];
  /** Helpful guide: 400–700 words total across sections. Headings render as H2/H3. */
  guide: GuideSection[];
  /** 5–8 FAQs. */
  faqs: Faq[];
};

export type LegalPage = {
  title: string;
  description: string;
  h1: string;
  updated: string;
  sections: GuideSection[];
};
