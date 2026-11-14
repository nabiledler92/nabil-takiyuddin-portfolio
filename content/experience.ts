/** Work history. Bullets use the resume's wording. Newest first. */
export type Role = {
  id: string;
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  /** ISO year-month, used for <time> elements. */
  startISO: string;
  endISO?: string;
  bullets: string[];
  /** Optional extra context: named clients and internal tools. */
  notes?: { label: string; items: string[] }[];
  stack?: string[];
};

export const experience: Role[] = [
  {
    id: "remotive",
    title: "MarTech and Analytics Manager",
    company: "ReMotive Media",
    location: "APAC",
    start: "Jul 2026",
    end: "Present",
    startISO: "2026-07",
    bullets: [
      "Led setup of a CRM integration for cold outreach and lead nurture, coordinating email authentication and admin approvals to take the pipeline live.",
      "Own end-to-end monthly client reporting across Google Ads, SEO, and CRM/attribution; recent cycles showed +14% ROAS, +20% paid media revenue, and +58% SQLs month-over-month.",
      "Identified a 35%+ month-over-month drop in organic search impressions and traced a lead-attribution gap, surfacing untagged leads tied to unaccounted revenue.",
      "Built AI-assisted internal tools, including an auto-generated, brand-consistent client reporting deck and a LinkedIn content-generation workflow for the marketing team.",
      "Supported evaluation of a new business vertical by assessing compliance positioning and market opportunity across Singapore and Malaysia.",
    ],
    notes: [
      {
        label: "Client work",
        items: [
          "Toyota: “Move Your World Beat” campaign",
          "DD Bricks (custom LEGO for business): Looker reporting dashboard and Pipedrive sales pipeline setup",
        ],
      },
      {
        label: "Internal AI tools",
        items: [
          "Brand-consistent, auto-generated client reporting deck",
          "LinkedIn content-generation workflow",
          "AI-assisted sales and outreach pipeline (Apollo-based cold outreach and lead nurture)",
        ],
      },
    ],
    stack: ["Google Ads", "SEO", "CRM/attribution", "Looker", "Pipedrive", "Apollo", "Agentic AI"],
  },
  {
    id: "2x",
    title: "Senior Marketing Technology Specialist",
    company: "2X Marketing Sdn Bhd",
    location: "Malaysia",
    start: "Oct 2025",
    end: "Jul 2026",
    startISO: "2025-10",
    endISO: "2026-07",
    bullets: [
      "Managed marketing operations for enterprise B2B accounts using Salesforce, Pardot (Account Engagement), HubSpot, and Demandbase.",
      "Oversaw a multi-CRM contact database synced across Salesforce, HubSpot, and Microsoft Dynamics 365, monitoring data flows to keep records accurate.",
      "Cleaned up 160,000+ duplicate CRM records using Insycle, improving data integrity across connected systems.",
      "Built lead scoring models and automated lead lifecycle workflows in HubSpot, including inbound and outbound nurture flows that reduced manual work.",
      "Developed SARIMA-based models to forecast customer lifecycle stage transitions, supporting lead scoring and campaign planning.",
      "Closed real-time reporting gaps by building a custom reporting framework for campaign and lifecycle performance.",
      "Created RACI matrices, SLA frameworks, and workflow documentation for go-to-market execution; mentored a junior marketing operations specialist.",
    ],
    notes: [
      {
        label: "Accounts",
        items: ["Enterprise B2B accounts, including FARO Creaform"],
      },
    ],
    stack: ["Salesforce", "Pardot", "HubSpot", "Demandbase", "Dynamics 365", "Insycle", "SARIMA"],
  },
  {
    id: "chubb",
    title: "Google Tagging Analytics Engineer – APAC",
    company: "Chubb Development IT Centre (Chubb Insurance)",
    location: "Malaysia",
    start: "Sep 2024",
    end: "Sep 2025",
    startISO: "2024-09",
    endISO: "2025-09",
    bullets: [
      "Created standardized web analytics implementation frameworks and documentation, reducing implementation time by 95% across multiple markets.",
      "Built ETL pipelines with PySpark and Airbyte to ingest customer journey data from Google Analytics, customer databases, and marketing platforms into central data warehouses.",
      "Built executive dashboards tracking process efficiency and user journey performance to guide data-driven improvements.",
      "Analyzed customer journey processes across APAC markets and redesigned workflows to improve conversion rates and user experience metrics.",
      "Gathered requirements with Experience Designers, IT developers, and regional business units, and designed tracking for Single Page Applications.",
    ],
    stack: ["Google Tag Manager", "GA4", "PySpark", "Airbyte", "ETL"],
  },
  {
    id: "aswhite",
    title: "Digital Analytics Specialist",
    company: "AS White Global Sdn Bhd; Cleanaway Waste Management (Australia)",
    location: "Kuala Lumpur",
    start: "Jan 2023",
    end: "Sep 2024",
    startISO: "2023-01",
    endISO: "2024-09",
    bullets: [
      "Automated reporting with Looker Studio (Google Data Studio) and Tableau dashboards fed by a Cloud Data Lake, reducing manual reporting by 95% and contributing 15% year-on-year to ROI.",
      "Built streaming data pipelines into Google Cloud Platform using Google Cloud Dataflow, Dataproc, and Airbyte to ingest data from multiple sources.",
      "Integrated GA4 with Salesforce and Google Ads to track website traffic, conversions, and ad campaigns.",
      "Wrote SQL in Google BigQuery (views, stored procedures) and maintained the BigQuery data warehouse.",
      "Created and maintained Google Tag Manager tags to keep website and campaign tracking accurate and consistent.",
    ],
    stack: ["Looker Studio", "Tableau", "BigQuery", "Dataflow", "Dataproc", "Airbyte", "GA4"],
  },
  {
    id: "doctoroncall",
    title: "Performance Marketer",
    company: "DoctorOnCall (Digital Health Technologies Sdn Bhd)",
    location: "Kuala Lumpur",
    start: "Nov 2021",
    end: "Jan 2023",
    startISO: "2021-11",
    endISO: "2023-01",
    bullets: [
      "Migrated Google Analytics from GA3 (Universal Analytics) to GA4 and documented the event tracking framework and data validation process.",
      "Built 15 dashboards for business units, plus 6 custom reports and 12 Explore reports in GA4 for performance monitoring.",
      "Implemented Google Tag Manager conversion events for web and app, including Enhanced Ecommerce events, working with developers on backend tracking.",
      "Managed Google Ads and Facebook Ads campaigns, optimizing ROAS above 10x, and integrated Hotjar and Netcore (including personalization) for web analysis.",
    ],
    stack: ["GA4", "Google Tag Manager", "Google Ads", "Facebook Ads", "Hotjar", "Netcore"],
  },
  {
    id: "pdc",
    title: "Program Manager, R&D and Operations",
    company: "Performance Development Consultants Sdn Bhd",
    location: "Petaling Jaya",
    start: "Nov 2020",
    end: "Nov 2021",
    startISO: "2020-11",
    endISO: "2021-11",
    bullets: [
      "Managed training programs funded by HRD Corp and PERKESO grants and led a team of two in the Operations Division.",
      "Led company digital marketing, using Google Analytics and social media data to plan and adjust marketing activity.",
    ],
  },
  {
    id: "alfa",
    title: "Sales and Marketing Executive",
    company: "ALFA International College",
    location: "Subang Jaya",
    start: "Sep 2018",
    end: "Oct 2020",
    startISO: "2018-09",
    endISO: "2020-10",
    bullets: [
      "Secured 30 student registrations through one-to-one consultations and guided PTPTN loan applications.",
    ],
  },
];
