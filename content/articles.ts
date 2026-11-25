/**
 * Long-form articles. Each one has its own page under app/articles/<slug>/page.tsx;
 * this list feeds the sitemap, /llms.txt, JSON-LD and the link from the related case study.
 */
export type Article = {
  slug: string;
  title: string;
  /** Shorter name for links and breadcrumbs. */
  shortTitle: string;
  /** 50–60 characters. */
  metaTitle: string;
  /** 150–160 characters. */
  metaDescription: string;
  /** One or two sentences for the page intro and /llms.txt. */
  summary: string;
  /** Human-readable publish date, e.g. "November 2026". */
  date: string;
  /** First published (YYYY-MM-DD). */
  published: string;
  /** Last time the article changed (YYYY-MM-DD); used as the sitemap lastmod. */
  updated: string;
  /** Slug of the case study this article expands on, if any. */
  caseStudy?: string;
  keywords: string[];
};

export const articles: Article[] = [
  {
    slug: "auto-ontology-marketing-crm",
    title: "Can an AI Ontology Layer Answer Marketing Funnel Questions? From 3 to 8 Correct out of 8 on CRM Data",
    shortTitle: "Auto Ontology use case: marketing funnel on CRM data",
    metaTitle: "Use Case: AI Ontology for CRM Funnels | Nabil Takiyuddin",
    metaDescription:
      "NVIDIA Auto Ontology on CRM funnel data: the same question, asked 8 times per setup, went from 3 to 8 correct once the rules moved into database views.",
    summary:
      "I tested whether NVIDIA Auto Ontology could answer marketing funnel questions on a real CRM export, correctly and every time. Longer descriptions and a bigger model only helped partly; removing choices from the AI took the same question from 3 of 8 to 8 of 8 correct. Plus a side test of Kumo Engine for lead scoring.",
    date: "November 2026",
    published: "2026-11-25",
    updated: "2026-11-25",
    caseStudy: "auto-ontology-marketing-crm",
    keywords: [
      "NVIDIA Auto Ontology",
      "ontology",
      "semantic layer",
      "marketing funnel",
      "CRM analytics",
      "text-to-SQL",
      "LLM evaluation",
      "Kumo Engine",
      "lead scoring",
      "use case",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function articleForCaseStudy(caseSlug: string): Article | undefined {
  return articles.find((a) => a.caseStudy === caseSlug);
}
