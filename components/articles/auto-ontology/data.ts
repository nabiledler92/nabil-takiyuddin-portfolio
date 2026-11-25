/**
 * Chart data for the Auto Ontology article.
 *
 * Test results (batches B1–B5, question sets, build quality, Kumo Engine) are tool results only,
 * from docs/article-data/*.csv and docs/test-log.md in
 * github.com/nabiledler92/auto-ontology-marketing-showcase. No pilot counts, names or figures.
 * Everything else is computed from the seeded synthetic CRM in that repo (data/synthetic).
 */

export type Outcome = "correct" | "wrong" | "constants" | "none";

export type Batch = {
  id: string;
  setup: string;
  correct: number;
  /** Wrong answers, not counting constants-only SQL. */
  wrong: number;
  /** Wrong answers whose SQL was made only of typed-in numbers. */
  constants: number;
  none: number;
  /** Median answer time over the 8 runs, in seconds (standard median). */
  medianSeconds: number;
};

export const batches: Batch[] = [
  { id: "B1", setup: "Default model (Nemotron 3.5 Lightning), definitions in term descriptions", correct: 3, wrong: 4, constants: 0, none: 1, medianSeconds: 44 },
  { id: "B2", setup: "Default model (Nemotron 3.5 Lightning) plus one canonical monthly funnel query", correct: 2, wrong: 4, constants: 1, none: 1, medianSeconds: 36.5 },
  { id: "B3", setup: "Larger model (Nemotron Ultra) for answering", correct: 4, wrong: 4, constants: 0, none: 0, medianSeconds: 54 },
  { id: "B4", setup: "Larger model plus a narrow “won deals by won month” metric", correct: 6, wrong: 2, constants: 0, none: 0, medianSeconds: 59.5 },
  { id: "B5", setup: "Larger model plus database views that build the rules in, and 2 confusing tables hidden", correct: 8, wrong: 0, constants: 0, none: 0, medianSeconds: 21 },
];

/** Plain-language and explicit question sets, one run per question, scored by value. */
export const questionSets: {
  id: string;
  dataset: string;
  wording: string;
  questions: number;
  before: { label: string; correct: number };
  after: { label: string; correct: number };
}[] = [
  {
    id: "synthetic-explicit",
    dataset: "Synthetic demo",
    wording: "Explicit wording (rules spelled out)",
    questions: 20,
    before: { label: "Before views", correct: 19 },
    after: { label: "After views", correct: 19 },
  },
  {
    id: "synthetic-plain",
    dataset: "Synthetic demo",
    wording: "Plain language",
    questions: 17,
    before: { label: "Before views", correct: 15 },
    after: { label: "After views", correct: 16 },
  },
  {
    id: "pilot-plain",
    dataset: "Real pilot data",
    wording: "Plain language",
    questions: 17,
    before: { label: "Views and a win-rate metric", correct: 15 },
    after: { label: "Plus a person-level channel view", correct: 17 },
  },
];

/** What the automatic build produced at each stage. */
export const compileStages: {
  stage: string;
  short: string;
  failedCalls: number;
  described: number;
  columns: number;
  tableLinks: number;
}[] = [
  { stage: "First build, default client library", short: "First build", failedCalls: 9, described: 104, columns: 130, tableLinks: 1 },
  { stage: "After the 6-line client patch", short: "Patched", failedCalls: 0, described: 125, columns: 126, tableLinks: 5 },
  { stage: "Rebuilt with views and hidden tables", short: "Rebuilt", failedCalls: 0, described: 156, columns: 156, tableLinks: 5 },
];

/** Kumo Engine lead scoring on the synthetic CRM, test AUROC with 95% intervals where available. */
export const kumoLeadScoring: {
  model: string;
  kind: "ceiling" | "baseline" | "kumo";
  auroc: number;
  low?: number;
  high?: number;
  runs?: number[];
  note?: string;
}[] = [
  { model: "Generator truth (ceiling)", kind: "ceiling", auroc: 0.606, low: 0.56, high: 0.65, note: "Best possible on this data" },
  { model: "Per-channel rate (baseline)", kind: "baseline", auroc: 0.589, low: 0.54, high: 0.64 },
  { model: "Kumo Engine, fast (mean of 3)", kind: "kumo", auroc: 0.559, runs: [0.518, 0.582, 0.578], note: "Mean of 3 runs" },
  { model: "Kumo Engine, best (1 run)", kind: "kumo", auroc: 0.544, low: 0.49, high: 0.6 },
];

/** Synthetic CRM: won deals per month, counted the right way (won date) and the wrong way (created date). */
export const wonByMonth: { month: string; byWon: number; byCreated: number }[] = [
  { month: "2024-01", byWon: 0, byCreated: 0 },
  { month: "2024-02", byWon: 0, byCreated: 4 },
  { month: "2024-03", byWon: 2, byCreated: 6 },
  { month: "2024-04", byWon: 5, byCreated: 9 },
  { month: "2024-05", byWon: 7, byCreated: 4 },
  { month: "2024-06", byWon: 8, byCreated: 10 },
  { month: "2024-07", byWon: 3, byCreated: 4 },
  { month: "2024-08", byWon: 3, byCreated: 9 },
  { month: "2024-09", byWon: 10, byCreated: 7 },
  { month: "2024-10", byWon: 11, byCreated: 5 },
  { month: "2024-11", byWon: 4, byCreated: 8 },
  { month: "2024-12", byWon: 5, byCreated: 7 },
  { month: "2025-01", byWon: 9, byCreated: 7 },
  { month: "2025-02", byWon: 7, byCreated: 5 },
  { month: "2025-03", byWon: 6, byCreated: 8 },
  { month: "2025-04", byWon: 5, byCreated: 14 },
  { month: "2025-05", byWon: 9, byCreated: 3 },
  { month: "2025-06", byWon: 9, byCreated: 8 },
  { month: "2025-07", byWon: 5, byCreated: 14 },
  { month: "2025-08", byWon: 8, byCreated: 8 },
  { month: "2025-09", byWon: 14, byCreated: 9 },
  { month: "2025-10", byWon: 8, byCreated: 5 },
  { month: "2025-11", byWon: 13, byCreated: 0 },
  { month: "2025-12", byWon: 3, byCreated: 0 },
];

/** Synthetic CRM: deals by the agreed source/medium group, sorted by deal count. */
export const channels: { group: string; deals: number; won: number; wonValue: number }[] = [
  { group: "direct / none", deals: 148, won: 34, wonValue: 331320 },
  { group: "google / cpc", deals: 115, won: 37, wonValue: 285079 },
  { group: "referral", deals: 103, won: 47, wonValue: 392344 },
  { group: "organic / google", deals: 84, won: 25, wonValue: 257463 },
  { group: "ai / assistant", deals: 21, won: 3, wonValue: 21540 },
  { group: "email", deals: 17, won: 5, wonValue: 44094 },
  { group: "organic / bing", deals: 11, won: 3, wonValue: 15036 },
];

/** Synthetic CRM: raw lead_source values and the agreed group each one maps to. */
export const rawSources: { raw: string; medium: string; group: string; persons: number }[] = [
  { raw: "google", medium: "cpc", group: "google / cpc", persons: 945 },
  { raw: "(blank)", medium: "(blank)", group: "direct / none", persons: 855 },
  { raw: "google", medium: "organic", group: "organic / google", persons: 528 },
  { raw: "partner-referral", medium: "referral", group: "referral", persons: 526 },
  { raw: "(direct)", medium: "none", group: "direct / none", persons: 397 },
  { raw: "https://example-site.test/contact/", medium: "(blank)", group: "direct / none", persons: 329 },
  { raw: "newsletter", medium: "email", group: "email", persons: 230 },
  { raw: "google.com", medium: "(blank)", group: "organic / google", persons: 221 },
  { raw: "bing", medium: "organic", group: "organic / bing", persons: 135 },
  { raw: "chatgpt.com", medium: "referral", group: "ai / assistant", persons: 132 },
];

/** Synthetic CRM: headline counts. */
export const sample = {
  persons: 4298,
  qualified: 4238,
  inbox: 3008,
  deals: 499,
  won: 154,
  wonLaterMonth: 148,
  months: 24,
};
