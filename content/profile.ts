/**
 * Core profile content. Everything here comes from the resume.
 * Edit this file to change the hero, about, impact tiles, education and contact details.
 */

export const profile = {
  name: "Nabil Takiyuddin",
  role: "MarTech & Analytics Manager",
  employer: "ReMotive Media",
  location: {
    locality: "Puchong",
    region: "Selangor",
    country: "Malaysia",
    countryCode: "MY",
    // Approximate public coordinates of Puchong (town level), used as a HUD detail.
    coordinates: "3.02°N 101.62°E",
  },
  email: "nabil.takiyuddin92@gmail.com",
  linkedin: "https://www.linkedin.com/in/nabil-takiyuddin-/",
  linkedinLabel: "linkedin.com/in/nabil-takiyuddin-",
  pitch:
    "I connect marketing technology, digital analytics, data engineering and applied AI: CRM and automation platforms, data pipelines, BigQuery models, automated dashboards and AI-assisted workflows.",
  /** Plain, fact-first answer to "who is Nabil Takiyuddin?" shown near the top of the home page. */
  answer:
    "Nabil Takiyuddin is a MarTech and Analytics Manager at ReMotive Media, based in Puchong, Selangor, Malaysia. He has 6 years of experience across marketing technology, digital analytics and data engineering, and holds a Master of Data Science from Universiti Teknologi MARA (UiTM).",
  summary: [
    "MarTech and Analytics Manager with 6 years of experience across marketing technology, digital analytics, and data engineering.",
    "Configures and maintains CRM and marketing automation platforms (Salesforce, Salesforce Account Engagement/Pardot, HubSpot, Demandbase), builds lead scoring models and lifecycle workflows, and owns monthly performance reporting across paid media, SEO, and attribution.",
    "Builds data pipelines (Google Cloud Dataflow, Airbyte, PySpark), BigQuery data models, and automated dashboards in Looker Studio and Tableau, and uses agentic AI tools to automate reporting and content workflows.",
  ],
  about: {
    arc: "My career started in sales and marketing, moved into performance marketing and web analytics, and then into the systems underneath: tagging frameworks, ETL pipelines, BigQuery warehouses, CRM architecture and lead scoring. Today I manage MarTech and analytics at ReMotive Media and build AI-assisted tools that automate reporting and content workflows.",
    path: "It is an unusual path. Before data, I studied Islamic law: a Bachelor of Syariah (Fiqh wa Usul) at Yarmouk University in Jordan, then a Postgraduate Diploma in Syariah Law and Practice at Universiti Teknologi MARA. I later returned to UiTM for a Master of Data Science.",
  },
  languages: [
    { name: "Malay", level: "Native" },
    { name: "English", level: "Professional working" },
    { name: "Arabic", level: "Professional working" },
    { name: "Mandarin", level: "Elementary" },
    { name: "Hebrew", level: "Elementary" },
  ],
  /** Short facts for the hero telemetry strip. */
  telemetry: [
    { label: "Experience", value: "6 years" },
    { label: "Base", value: "Puchong, Selangor, MY" },
    { label: "Current", value: "ReMotive Media · APAC" },
    { label: "Degree", value: "Master of Data Science, UiTM" },
  ],
  knowsAbout: [
    "Marketing technology",
    "Marketing operations",
    "Digital analytics",
    "Data engineering",
    "Machine learning",
    "Applied AI and workflow automation",
    "Salesforce",
    "HubSpot",
    "Google Analytics 4",
    "Google BigQuery",
    "Looker Studio",
    "Tableau",
  ],
} as const;

export type Metric = {
  /** Numeric part, animated on scroll. */
  value: number;
  prefix?: string;
  suffix?: string;
  /** Short label under the number. */
  label: string;
};

export type Achievement = {
  id: string;
  metrics: Metric[];
  /** Exact wording from the resume. */
  text: string;
  org: string;
  /** Grid span on large screens (out of 6 columns). */
  span: 2 | 3 | 4;
};

/** Key Achievements, with the resume's figures and attributions. */
export const achievements: Achievement[] = [
  {
    id: "reporting",
    metrics: [{ value: 95, suffix: "%", label: "less manual reporting" }],
    text: "Reduced manual reporting by 95% by automating Looker Studio and Tableau dashboards, contributing 15% year-on-year to ROI.",
    org: "AS White Global",
    span: 2,
  },
  {
    id: "implementation",
    metrics: [{ value: 95, suffix: "%", label: "less implementation time" }],
    text: "Cut web analytics implementation time by 95% across multiple APAC markets through standardized frameworks.",
    org: "Chubb",
    span: 2,
  },
  {
    id: "dedupe",
    metrics: [{ value: 160000, suffix: "+", label: "duplicate CRM records cleaned" }],
    text: "Cleaned 160,000+ duplicate CRM records across a Salesforce, HubSpot, and Dynamics 365 database using Insycle.",
    org: "2X Marketing",
    span: 2,
  },
  {
    id: "reporting-cycles",
    metrics: [
      { value: 14, prefix: "+", suffix: "%", label: "ROAS" },
      { value: 20, prefix: "+", suffix: "%", label: "paid media revenue" },
      { value: 58, prefix: "+", suffix: "%", label: "SQLs" },
    ],
    text: "Reported +14% ROAS, +20% paid media revenue, and +58% SQLs month-over-month in recent client reporting cycles.",
    org: "ReMotive Media",
    span: 3,
  },
  {
    id: "pmax",
    metrics: [
      { value: 30, prefix: "~", suffix: "%", label: "CPA below target" },
      { value: 40, prefix: "+", suffix: "%", label: "organic lead volume" },
    ],
    text: "Helped drive Performance Max CPA roughly 30% below target while growing organic lead volume by 40%.",
    org: "ReMotive Media",
    span: 3,
  },
  {
    id: "qa",
    metrics: [{ value: 3, suffix: "-layer", label: "QA/QC process" }],
    text: "Designed a 3-layer QA/QC process (self-check, peer review, lead sign-off) adopted as the account-wide standard.",
    org: "2X Marketing",
    span: 3,
  },
  {
    id: "roas",
    metrics: [{ value: 10, suffix: "x+", label: "paid campaign ROAS" }],
    text: "Optimized paid campaign ROAS above 10x across Google Ads and Facebook Ads.",
    org: "DoctorOnCall",
    span: 3,
  },
];

export type Education = {
  degree: string;
  school: string;
  location?: string;
  period: string;
  note?: string;
  details?: string[];
};

export const education: Education[] = [
  {
    degree: "Master of Data Science",
    school: "Universiti Teknologi MARA (UiTM)",
    period: "Sep 2024 – Jul 2026",
    note: "13 courses. Dissertation: Machine Learning-Based Sentiment Analysis for an Intelligent Decision Support System in Malaysian Kopi F&B SMEs.",
    details: [
      "Analyzed 1,000+ customer reviews in a Kopi Kenangan case study, comparing 20 models across 5 experiments.",
      "Selected Logistic Regression with SMOTE as the best model, reaching about 92.5% accuracy in sentiment classification.",
      "Built a Streamlit decision-support app with the open-source Qwen 2.5 7B LLM (Hugging Face) acting as an AI business analyst agent.",
    ],
  },
  {
    degree: "Postgraduate Diploma in Syariah Law and Practice",
    school: "Universiti Teknologi MARA (UiTM)",
    period: "2019 – 2020",
  },
  {
    degree: "Bachelor of Syariah (Fiqh wa Usul)",
    school: "Yarmouk University",
    location: "Jordan",
    period: "2011 – 2018",
  },
];

export const certifications: { issuer: string; items: string[] }[] = [
  {
    issuer: "Google",
    items: [
      "Data Analytics Professional Certificate (2021)",
      "Business Intelligence Professional Certificate (2022)",
      "Digital Marketing & E-commerce Professional Certificate (2022)",
      "Building Resilient Streaming Analytics Systems on Google Cloud",
    ],
  },
  {
    issuer: "IBM",
    items: ["Data Engineering Professional Certificate (2022)"],
  },
  {
    issuer: "Other",
    items: [
      "Account-Based Go-to-Market (GTM) Certification",
      "Pipedrive Setup for Admins",
      "Crash Course on Python",
      "Claude 101",
    ],
  },
];
