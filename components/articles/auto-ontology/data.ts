/**
 * Chart data for the Auto Ontology article.
 *
 * Test runs (batches B1–B4) are outcome counts only, from the pilot's anonymized test log.
 * Everything else is computed from the seeded synthetic CRM in
 * github.com/nabiledler92/auto-ontology-marketing-showcase (data/synthetic). No client data.
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
};

export const batches: Batch[] = [
  { id: "B1", setup: "Default model, definitions in term descriptions", correct: 3, wrong: 4, constants: 0, none: 1 },
  { id: "B2", setup: "Default model plus one canonical monthly funnel query", correct: 2, wrong: 4, constants: 1, none: 1 },
  { id: "B3", setup: "Larger model (Nemotron Ultra) for answering", correct: 4, wrong: 4, constants: 0, none: 0 },
  { id: "B4", setup: "Larger model plus a narrow “won deals by won month” metric", correct: 6, wrong: 2, constants: 0, none: 0 },
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

/** Synthetic CRM: last six months of the canonical monthly funnel (sql/monthly_funnel.sql). */
export const funnelTail: { month: string; leads: number; qualified: number; sql: number; won: number }[] = [
  { month: "2025-07", leads: 243, qualified: 239, sql: 26, won: 5 },
  { month: "2025-08", leads: 194, qualified: 192, sql: 27, won: 8 },
  { month: "2025-09", leads: 249, qualified: 246, sql: 28, won: 14 },
  { month: "2025-10", leads: 196, qualified: 193, sql: 23, won: 8 },
  { month: "2025-11", leads: 181, qualified: 179, sql: 18, won: 13 },
  { month: "2025-12", leads: 201, qualified: 198, sql: 43, won: 3 },
];
