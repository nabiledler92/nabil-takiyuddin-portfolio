/*
 * Chart data for the MMM benchmark article. Every value comes from the benchmark's public
 * results (README Scenarios 1-4, docs/FEASIBILITY.md and docs/article-data/*.csv). All outcomes
 * are simulated; no client spend, dates or ad data appear here.
 */

export type Scenario = {
  id: string;
  name: string;
  detail: string;
  meridian: number;
  pymc: number;
  pymcLabel: string;
  /** Error of the raw lift-test reads, when the scenario used them. */
  liftAlone?: number;
};

/** Mean ROI error (%) across 15 channel estimates (3 channels x 5 seeds). */
export const scenarios: Scenario[] = [
  {
    id: "s1",
    name: "1 · Out of the box",
    detail: "True ROIs close to Meridian's default prior",
    meridian: 10.2,
    pymc: 10.4,
    pymcLabel: "PyMC-Marketing (logistic)",
  },
  {
    id: "s2",
    name: "2 · Unusual ROIs",
    detail: "YouTube 0.4, TikTok 5.0: far from the prior",
    meridian: 19.6,
    pymc: 14.3,
    pymcLabel: "PyMC-Marketing (logistic)",
  },
  {
    id: "s3",
    name: "3 · Same lift tests",
    detail: "Both tools get the same noisy experiments",
    meridian: 6.6,
    pymc: 8.7,
    pymcLabel: "PyMC-Marketing (logistic)",
    liftAlone: 12.2,
  },
  {
    id: "s4",
    name: "4 · Same curve shape",
    detail: "PyMC-Marketing switched to Hill saturation",
    meridian: 6.6,
    pymc: 7.0,
    pymcLabel: "PyMC-Marketing (Hill)",
    liftAlone: 12.2,
  },
];

/** YouTube ROI estimates when the true ROI is 0.4 (Scenarios 2-4, mean over 5 seeds). */
export const lowRoi: { setup: string; group: "meridian" | "pymc" | "lift"; estimate: number }[] = [
  { setup: "Meridian, default prior", group: "meridian", estimate: 0.58 },
  { setup: "Meridian, lift-calibrated", group: "meridian", estimate: 0.4 },
  { setup: "PyMC-Marketing, default", group: "pymc", estimate: 0.25 },
  { setup: "PyMC-Marketing logistic, lift-calibrated", group: "pymc", estimate: 0.32 },
  { setup: "PyMC-Marketing Hill, lift-calibrated", group: "pymc", estimate: 0.36 },
  { setup: "Lift tests alone", group: "lift", estimate: 0.39 },
];

export const TRUE_LOW_ROI = 0.4;

export type FeasCell = {
  error: number;
  width: number;
  measurable: number;
  converged: boolean;
};

export const channels = ["TikTok", "Meta", "YouTube"] as const;
export const shares = [0.05, 0.15, 0.3] as const;
export const feasModels = ["Meridian, by market", "Meridian, national", "PyMC-Marketing, national"] as const;

type Channel = (typeof channels)[number];
type Model = (typeof feasModels)[number];

/** From feasibility_scores.csv: mean error (% of the true effect), 90% range width (x truth), seeds measurable of 3. */
export const feasibility: Record<Model, Record<Channel, FeasCell[]>> = {
  "Meridian, by market": {
    TikTok: [
      { error: 11.5, width: 0.91, measurable: 3, converged: true },
      { error: 4.2, width: 0.4, measurable: 3, converged: true },
      { error: 2.9, width: 0.22, measurable: 3, converged: true },
    ],
    Meta: [
      { error: 72.1, width: 4.14, measurable: 0, converged: true },
      { error: 28.2, width: 2.19, measurable: 0, converged: true },
      { error: 26.1, width: 1.3, measurable: 0, converged: true },
    ],
    YouTube: [
      { error: 182.4, width: 3.29, measurable: 0, converged: true },
      { error: 53.3, width: 1.19, measurable: 0, converged: true },
      { error: 19.5, width: 0.56, measurable: 2, converged: true },
    ],
  },
  "Meridian, national": {
    TikTok: [
      { error: 43.4, width: 1.27, measurable: 0, converged: true },
      { error: 19.4, width: 0.83, measurable: 2, converged: true },
      { error: 8.3, width: 0.35, measurable: 3, converged: true },
    ],
    Meta: [
      { error: 10.0, width: 2.89, measurable: 0, converged: true },
      { error: 13.9, width: 2.3, measurable: 0, converged: true },
      { error: 30.1, width: 1.44, measurable: 0, converged: true },
    ],
    YouTube: [
      { error: 3119.8, width: 25.5, measurable: 0, converged: true },
      { error: 988.6, width: 9.12, measurable: 0, converged: true },
      { error: 394.1, width: 4.41, measurable: 0, converged: true },
    ],
  },
  "PyMC-Marketing, national": {
    TikTok: [
      { error: 214.5, width: 8.05, measurable: 0, converged: false },
      { error: 54.3, width: 1.92, measurable: 0, converged: false },
      { error: 14.0, width: 0.39, measurable: 3, converged: false },
    ],
    Meta: [
      { error: 615.7, width: 25.19, measurable: 0, converged: false },
      { error: 128.6, width: 8.09, measurable: 0, converged: false },
      { error: 9.0, width: 3.81, measurable: 0, converged: false },
    ],
    YouTube: [
      { error: 2037.8, width: 39.94, measurable: 0, converged: false },
      { error: 577.9, width: 11.81, measurable: 0, converged: false },
      { error: 199.2, width: 5.18, measurable: 0, converged: false },
    ],
  },
};
