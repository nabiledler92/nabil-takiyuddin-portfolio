/**
 * Projects from the Master of Data Science (UiTM), plus competition work.
 *
 * To add a case study: append an object to `caseStudies`. A page is generated at
 * /projects/<slug> and it is added to the home page, sitemap, llms.txt and command palette.
 * To add a small project card: append an object to `moreProjects`.
 */

export type ProjectTag = "ML" | "Data Engineering" | "BI" | "Statistics" | "Optimisation";

export const projectTags: ProjectTag[] = ["ML", "Data Engineering", "BI", "Statistics", "Optimisation"];

export type CaseMetric = { value: string; label: string; note?: string };

export type CaseStudy = {
  slug: string;
  /** Short HUD identifier, e.g. "CS-01". */
  code: string;
  title: string;
  shortTitle: string;
  /** schema.org type used in JSON-LD. */
  schemaType: "ScholarlyArticle" | "CreativeWork";
  course: { code: string; name: string };
  format: "Individual" | "Group";
  /** Human-readable label, e.g. "Dissertation" or "Group project". */
  formatLabel: string;
  date?: string;
  /** 50–60 characters. */
  metaTitle: string;
  /** 150–160 characters. */
  metaDescription: string;
  /** One or two sentences for cards and the page intro. */
  summary: string;
  /** Headline number on the home page card. */
  highlight: { value: string; label: string };
  problem: string[];
  approach: { title: string; text: string }[];
  results: { metrics: CaseMetric[]; notes: string[] };
  tools: string[];
  role: string;
  team?: string[];
  supervisor?: string;
  /** Where the work was done. Defaults to the Master of Data Science at UiTM. */
  context?: { label: string; value: string };
  /** External links shown under the page intro, e.g. the source code. */
  links?: { label: string; href: string }[];
  tags: ProjectTag[];
  keywords: string[];
};

const DEFAULT_CONTEXT = { label: "Programme", value: "Master of Data Science, UiTM" };

export function caseContext(cs: CaseStudy): { label: string; value: string } {
  return cs.context ?? DEFAULT_CONTEXT;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "kopi-sentiment-idss",
    code: "CS-01",
    title:
      "Machine Learning-Based Sentiment Analysis for an Intelligent Decision Support System in Malaysian Kopi F&B SMEs",
    shortTitle: "Kopi sentiment analysis and decision support",
    schemaType: "ScholarlyArticle",
    course: { code: "DSC790", name: "Data Science Project" },
    format: "Individual",
    formatLabel: "Master's dissertation",
    metaTitle: "Kopi Sentiment Analysis IDSS Case Study | Nabil Takiyuddin",
    metaDescription:
      "Master's dissertation: sentiment analysis of 1,000+ Kopi Kenangan reviews, comparing six classifiers. Logistic Regression with SMOTE reached about 92.5%.",
    summary:
      "A Master of Data Science dissertation that classifies sentiment in 1,000+ code-switched Malay-English customer reviews (Kopi Kenangan case study) and turns the results into a Streamlit decision-support app with an LLM business-analyst agent.",
    highlight: { value: "≈92.5%", label: "accuracy, Logistic Regression + SMOTE" },
    problem: [
      "Independent kopi F&B SMEs account for roughly 92% of Malaysia's 136,453 F&B establishments. Their customers leave reviews constantly, but the reviews are written in informal, code-switched Malay-English that is hard to read at scale.",
      "The dissertation asks whether machine-learning sentiment analysis can turn those reviews into an intelligent decision support system (IDSS) for kopi F&B SMEs, using Kopi Kenangan as the case study.",
    ],
    approach: [
      {
        title: "Review data",
        text: "Analysed 1,000+ customer reviews from the Kopi Kenangan case study, written in informal, code-switched Malay-English.",
      },
      {
        title: "Six classifiers",
        text: "Compared Naive Bayes, SVM, Logistic Regression, Decision Tree, Random Forest and XGBoost on the same sentiment-classification task.",
      },
      {
        title: "Five experimental conditions",
        text: "Ran the models under baseline, hyperparameter-tuned, SMOTE-resampled and two ensemble-combination conditions, producing 20 model-condition results.",
      },
      {
        title: "Decision-support app",
        text: "Built a Streamlit decision-support app in which the open-source Qwen 2.5 7B LLM (Hugging Face) acts as an AI business-analyst agent.",
      },
    ],
    results: {
      metrics: [
        { value: "≈92.5%", label: "Best accuracy", note: "Logistic Regression with SMOTE" },
        { value: "20", label: "Model-condition results", note: "Across 5 experiments" },
        { value: "6", label: "Classifiers compared" },
        { value: "1,000+", label: "Customer reviews analysed" },
      ],
      notes: [
        "Logistic Regression with SMOTE was selected as the best model, reaching about 92.5% accuracy in sentiment classification.",
        "The work is delivered as a Streamlit decision-support app with Qwen 2.5 7B acting as an AI business-analyst agent.",
        "An extended abstract was prepared for PEERS 2026.",
      ],
    },
    tools: [
      "Python",
      "Streamlit",
      "Hugging Face",
      "Qwen 2.5 7B",
      "SMOTE",
      "Logistic Regression",
      "Naive Bayes",
      "SVM",
      "Decision Tree",
      "Random Forest",
      "XGBoost",
    ],
    role: "Individual dissertation for the Master of Data Science at Universiti Teknologi MARA (UiTM).",
    supervisor: "Ts Dr Ahmad Faiz Mohd Ghazali",
    tags: ["ML"],
    keywords: [
      "sentiment analysis",
      "intelligent decision support system",
      "Malaysian F&B SMEs",
      "code-switched Malay-English",
      "SMOTE",
      "Logistic Regression",
      "Streamlit",
      "Qwen 2.5 7B",
    ],
  },
  {
    slug: "smart-crop-recommendation",
    code: "CS-02",
    title:
      "Smart Crop Recommendation System: Complementing Sistem GeoTanaman by Jabatan Pertanian Malaysia",
    shortTitle: "Smart crop recommendation system",
    schemaType: "CreativeWork",
    course: { code: "SYS751", name: "Advanced Decision Support Systems" },
    format: "Group",
    formatLabel: "Group project",
    date: "July 2025",
    metaTitle: "Smart Crop Recommendation System Case | Nabil Takiyuddin",
    metaDescription:
      "Group project: a machine-learning crop recommendation system complementing Malaysia's Sistem GeoTanaman. Random Forest reached 95.6% accuracy, with a live demo.",
    summary:
      "A decision-support system that recommends crops with machine learning, designed to complement Sistem GeoTanaman by Jabatan Pertanian Malaysia (Department of Agriculture).",
    highlight: { value: "95.6%", label: "accuracy, Random Forest" },
    problem: [
      "Sistem GeoTanaman is a system by Jabatan Pertanian Malaysia, the Department of Agriculture. The project identified two gaps in the existing system: its advice is generic, and it relies on outdated soil data.",
      "The team set out to build a smart crop recommendation system that complements GeoTanaman instead of replacing it.",
    ],
    approach: [
      {
        title: "Gap analysis",
        text: "Reviewed the existing Sistem GeoTanaman and framed the project around generic advice and outdated soil data.",
      },
      {
        title: "Model building",
        text: "Trained and compared crop-recommendation classifiers in Python with scikit-learn and XGBoost.",
      },
      {
        title: "Decision-support app",
        text: "Wrapped the model in a Streamlit app and presented it as a live demo in July 2025.",
      },
    ],
    results: {
      metrics: [
        { value: "95.6%", label: "Accuracy", note: "Random Forest" },
        { value: "3", label: "Team members" },
        { value: "Live", label: "Streamlit demo", note: "July 2025" },
      ],
      notes: [
        "Random Forest reached 95.6% accuracy.",
        "The system was demonstrated live as a Streamlit application.",
      ],
    },
    tools: ["Python", "scikit-learn", "XGBoost", "Random Forest", "Streamlit"],
    role: "Group project for SYS751 Advanced Decision Support Systems, Master of Data Science, UiTM.",
    team: [
      "Adni Muhammad Fahmi bin Mashudi",
      "Muhammad Aiman Akmal bin Pardan",
      "Nabil Takiyuddin",
    ],
    tags: ["ML"],
    keywords: [
      "crop recommendation",
      "decision support system",
      "Sistem GeoTanaman",
      "Random Forest",
      "Streamlit",
      "agriculture Malaysia",
    ],
  },
  {
    slug: "food-insecurity-forecasting",
    code: "CS-03",
    title:
      "The Rising of Food Insecurity: A Predictive Modeling for Production, Area Harvested and Yield Outcome",
    shortTitle: "Food insecurity predictive modelling",
    schemaType: "CreativeWork",
    course: { code: "DSC761", name: "Advanced Data Science Technology" },
    format: "Group",
    formatLabel: "Group project",
    metaTitle: "Food Insecurity Predictive Modelling | Nabil Takiyuddin",
    metaDescription:
      "Group project: 12 models predicting crop production, area harvested and yield from 1.9 million rows of data. Random Forest reached R² 0.9998 for production.",
    summary:
      "Twelve models that predict crop production, area harvested and yield from the 1.9-million-row Food Bank of the World dataset, delivered with explainability and a Streamlit app.",
    highlight: { value: "R² 0.9998", label: "Random Forest, production target" },
    problem: [
      "Food insecurity is rising, and planning against it depends on reliable estimates of how much food is produced, on how much land, and at what yield.",
      "The project builds predictive models for three outcomes (Production, Area Harvested and Yield) using the Food Bank of the World dataset: 1,895,975 rows covering 150+ crops and 247+ localities.",
    ],
    approach: [
      {
        title: "Large-scale dataset",
        text: "Worked with the Food Bank of the World dataset: 1,895,975 rows, 150+ crops and 247+ localities.",
      },
      {
        title: "Twelve models",
        text: "Trained four algorithms (Random Forest, XGBoost, Linear Regression and an artificial neural network) against each of three targets: Production, Area Harvested and Yield.",
      },
      {
        title: "Explainability",
        text: "Used feature importance as an explainable-AI (XAI) layer, alongside 3D visualisation of the results.",
      },
      {
        title: "Delivery",
        text: "Shipped the models in a Streamlit app, developed in GitHub Codespaces.",
      },
    ],
    results: {
      metrics: [
        { value: "0.9998", label: "R², Production", note: "Random Forest" },
        { value: "0.9987", label: "R², Area Harvested", note: "Random Forest" },
        { value: "0.9895", label: "R², Yield", note: "Random Forest" },
        { value: "12", label: "Models trained", note: "4 algorithms × 3 targets" },
      ],
      notes: [
        "Random Forest gave the reported R² for all three targets: 0.9998 for Production, 0.9987 for Area Harvested and 0.9895 for Yield.",
        "The project includes feature-importance XAI, 3D visualisation and a Streamlit app.",
      ],
    },
    tools: [
      "Python",
      "scikit-learn",
      "XGBoost",
      "TensorFlow/Keras",
      "Streamlit",
      "GitHub Codespaces",
    ],
    role: "Group project for DSC761 Advanced Data Science Technology, Master of Data Science, UiTM.",
    team: [
      "Muhammad Aiman Akmal bin Pardan",
      "Syaza Amani binti Yacob",
      "Nur Amynah binti Abdul 'Adzim Shukri",
      "Nur Fathihah binti Salmizi",
      "Nabil Takiyuddin",
    ],
    tags: ["ML"],
    keywords: [
      "food insecurity",
      "predictive modelling",
      "Random Forest",
      "XGBoost",
      "explainable AI",
      "Streamlit",
    ],
  },
  {
    slug: "hive-vs-spark-sql",
    code: "CS-04",
    title: "Hive vs Spark SQL: Benchmarking Table Configurations and File Formats on Hadoop",
    shortTitle: "Hive vs Spark SQL benchmark",
    schemaType: "CreativeWork",
    course: { code: "DSC761", name: "Advanced Data Science Technology" },
    format: "Individual",
    formatLabel: "Individual project",
    metaTitle: "Hive vs Spark SQL Benchmark on Hadoop | Nabil Takiyuddin",
    metaDescription:
      "Individual project benchmarking Hive and Spark SQL on Hadoop across TextFile and Parquet formats and internal, external, partitioned and bucketed tables.",
    summary:
      "A benchmark of Hive against Spark SQL on a Hadoop cluster, comparing file formats and table configurations on Stack Exchange comments and GDELT event data.",
    highlight: { value: "35,826", label: "Stack Exchange comment records" },
    problem: [
      "On a Hadoop cluster, the same query can behave very differently depending on the engine, the file format and how the table is laid out.",
      "This project benchmarks Hive against Spark SQL across those choices: TextFile vs Parquet, internal vs external tables, and partitioned and bucketed tables.",
    ],
    approach: [
      {
        title: "Cluster and data",
        text: "Ran on a Hadoop cluster (HDFS, YARN) using Stack Exchange comments (35,826 records) and GDELT event data.",
      },
      {
        title: "Table configurations",
        text: "Created internal and external tables, plus partitioned and bucketed variants, in both TextFile and Parquet formats.",
      },
      {
        title: "Two engines",
        text: "Ran the workloads in Hive and in Spark SQL, with PySpark scripts for the Spark side, and compared the results across configurations.",
      },
    ],
    results: {
      metrics: [
        { value: "2", label: "Query engines", note: "Hive and Spark SQL" },
        { value: "2", label: "File formats", note: "TextFile and Parquet" },
        { value: "35,826", label: "Comment records", note: "Stack Exchange" },
      ],
      notes: [
        "Parquet reduced storage substantially compared with TextFile.",
        "Columnar formats sped up analytical queries.",
        "Bucketing helped joins.",
      ],
    },
    tools: ["Hadoop", "HDFS", "YARN", "Hive", "Spark SQL", "PySpark", "Parquet"],
    role: "Individual project for DSC761 Advanced Data Science Technology, Master of Data Science, UiTM.",
    tags: ["Data Engineering"],
    keywords: ["Hive", "Spark SQL", "Hadoop", "Parquet", "PySpark", "big data benchmarking"],
  },
  {
    slug: "aco-auditor-scheduling",
    code: "CS-05",
    title: "Ant Colony Optimization for HRDC Auditor Scheduling and Routing",
    shortTitle: "ACO auditor scheduling and routing",
    schemaType: "CreativeWork",
    course: { code: "ISC747", name: "Optimization with Nature-Inspired Computing" },
    format: "Group",
    formatLabel: "Group project",
    metaTitle: "ACO Auditor Scheduling and Routing Case | Nabil Takiyuddin",
    metaDescription:
      "Group project applying Ant Colony Optimization to an auditor scheduling and routing problem for HRDC (HRD Corp), for a nature-inspired computing course at UiTM.",
    summary:
      "A nature-inspired optimisation project that applies Ant Colony Optimization (ACO) to an auditor scheduling and routing problem for HRDC (HRD Corp).",
    highlight: { value: "ACO", label: "Ant Colony Optimization" },
    problem: [
      "Scheduling auditors and routing them between audits is a combinatorial problem: the number of possible assignments and visit orders grows quickly as auditors and audits are added.",
      "The project models an auditor scheduling and routing problem for HRDC (HRD Corp) and solves it with a nature-inspired metaheuristic.",
    ],
    approach: [
      {
        title: "Problem framing",
        text: "Framed the HRDC case as a combined scheduling and routing problem: which auditor takes which audits, and in what order.",
      },
      {
        title: "Ant Colony Optimization",
        text: "Applied ACO, in which artificial ants build candidate solutions step by step and pheromone trails reinforce the better ones over successive iterations.",
      },
    ],
    results: {
      metrics: [],
      notes: [
        "This page covers the problem and the approach only. Results are not published here.",
      ],
    },
    tools: ["Ant Colony Optimization (ACO)"],
    role: "Group project for ISC747 Optimization with Nature-Inspired Computing, Master of Data Science, UiTM.",
    team: [
      "Muhammad Aiman Akmal bin Pardan",
      "Naelah Farafisyah binti Yahaya",
      "Nur Fathihah binti Salmizi",
      "Nabil Takiyuddin",
    ],
    tags: ["Optimisation"],
    keywords: [
      "Ant Colony Optimization",
      "scheduling",
      "routing",
      "metaheuristics",
      "nature-inspired computing",
    ],
  },
  {
    slug: "myflood",
    code: "CS-06",
    title: "MyFlood: Flood Depth and Loss Estimates for Malaysian Small Businesses, with a Gemini Assistant",
    shortTitle: "MyFlood flood risk platform",
    schemaType: "CreativeWork",
    course: { code: "AI Builder Cup 2026", name: "Competition entry" },
    format: "Group",
    formatLabel: "Competition entry, team lead",
    date: "October 2026",
    context: { label: "Event", value: "AI Builder Cup 2026" },
    links: [{ label: "Source code on GitHub", href: "https://github.com/nabiledler92/myflood" }],
    metaTitle: "MyFlood Flood Risk Platform Case Study | Nabil Takiyuddin",
    metaDescription:
      "AI Builder Cup 2026 entry: a map of modelled river flood depth and rough ringgit loss for 3,421 Malaysian businesses, with a Gemini assistant in Malay and English.",
    summary:
      "A web platform that shows a small business how deep river flood water could get at its premises in the model, and what that could roughly cost, with a Gemini assistant that answers in Bahasa Melayu or English.",
    highlight: { value: "3,421", label: "businesses mapped across 5 areas" },
    problem: [
      "Small businesses in Malaysian river towns rarely have an easy way to see how exposed their premises are to flooding, or what a flood could cost them in stock, equipment and lost trading days.",
      "MyFlood turns open global flood models and open map data into a per-business answer: the modelled water depth for a 1 in 10, 20 and 50 years flood, and a rough loss in ringgit. Every figure is labelled \"in the model\": it is not an official flood map, and it never says a place is safe or will flood.",
    ],
    approach: [
      {
        title: "Flood and map data",
        text: "Combined JRC global river flood depth maps (90 m squares) with OpenStreetMap businesses, roads and relief centres, Copernicus elevation data and a record of past floods. Shah Alam is split into 56 sections with a flash flood potential score.",
      },
      {
        title: "Any point in Malaysia",
        text: "Besides the five built areas, anyone can drop a pin or use GPS to check the modelled depth at any point in Malaysia.",
      },
      {
        title: "Cost engine",
        text: "A form turns the modelled depth into a rough ringgit loss for stock, fittings and closed days. The numbers come from the cost engine, never from the AI.",
      },
      {
        title: "Gemini assistant",
        text: "Gemini answers questions through function calling over the flood data, the cost engine, Google Weather and Google Maps. It also takes voice questions, reads shop-front and stock photos, writes a one-page flood plan and finds grounded flood news.",
      },
    ],
    results: {
      metrics: [
        { value: "3,421", label: "Businesses mapped", note: "Across 5 built areas" },
        { value: "5", label: "Areas built", note: "Selangor, Pahang, Kelantan, Terengganu, Johor" },
        { value: "56", label: "Shah Alam sections scored", note: "Flash flood potential" },
        { value: "2", label: "Languages", note: "Bahasa Melayu and English" },
      ],
      notes: [
        "Built areas: Shah Alam (2,445 businesses, the default), Kuantan, Kota Bharu, Kuala Terengganu and Kota Tinggi town centres.",
        "Shah Alam's record covers 69 past floods from 1992 to 2026, by section.",
        "Deployed on Google Cloud Run during the competition; the code is open source under the MIT licence.",
      ],
    },
    tools: [
      "Python",
      "FastAPI",
      "Gemini",
      "Google Cloud Run",
      "Google Maps Platform",
      "MapLibre",
      "OpenStreetMap",
      "JRC flood maps",
      "Copernicus DEM",
    ],
    role: "Team lead for the MyFlood entry in the AI Builder Cup 2026. The code was written by Putera Mohd Nilam; the original repository is github.com/puteramohammadnilam-cmd/banjir-platform.",
    team: ["Shaqib Shahril", "Fadhli Firdaus", "Putera Mohd Nilam", "Nabil Takiyuddin"],
    tags: ["ML", "Data Engineering"],
    keywords: [
      "flood risk",
      "Malaysia",
      "small business",
      "Gemini",
      "function calling",
      "geospatial",
      "AI Builder Cup 2026",
      "Cloud Run",
    ],
  },
  {
    slug: "sirr-male-fertility",
    code: "CS-07",
    title: "Sirr: A Private, Bilingual First Step into Male Fertility Care",
    shortTitle: "Sirr male fertility care prototype",
    schemaType: "CreativeWork",
    course: { code: "Future Health Challenge 2026", name: "Challenge 01, Male Reproductive Health" },
    format: "Group",
    formatLabel: "Hackathon entry, team lead",
    date: "November 2026",
    context: { label: "Event", value: "Future Health Digital Innovation Challenge 2026" },
    links: [{ label: "Live demo", href: "https://sirr-demo.jollytree-ef416752.eastus2.azurecontainerapps.io/" }],
    metaTitle: "Sirr Male Fertility Care Prototype | Nabil Takiyuddin",
    metaDescription:
      "Hackathon entry: an English/Arabic web prototype giving men a private first step into fertility care, from check-in to a clinician-approved report.",
    summary:
      "An English/Arabic web prototype that gives men a private way to understand fertility concerns, complete an assessment when suitable and receive a clinician-reviewed report, built for the Future Health Digital Innovation Challenge.",
    highlight: { value: "4", label: "roles in one care workflow" },
    problem: [
      "Male fertility concerns often go unspoken. Men need a private, culturally trusted way to understand what is going on and reach the right assessment, without the first step feeling like a clinic visit.",
      "The challenge (Challenge 01, Male Reproductive Health) asked how to identify male reproductive health risks earlier, reduce barriers to assessment and connect men to appropriate care before infertility is diagnosed.",
    ],
    approach: [
      {
        title: "Private check-in",
        text: "A five-question check-in routes each man to an explained next step. Defined urgent answers bypass booking. It gives no diagnosis and no risk score.",
      },
      {
        title: "Learn and Ask Sirr",
        text: "Visual and short video guides, plus Ask Sirr: scripted educational replies with source links (MedlinePlus, NICHD, NHS, WHO). No LLM, and the chat is not stored.",
      },
      {
        title: "Care workflow",
        text: "Patient, courier, laboratory and clinician views share one assessment journey with sample tracking. A report is held until a clinician approves it.",
      },
      {
        title: "Bilingual and deployed",
        text: "English and Arabic with right-to-left layout on mobile and desktop, served from Azure Container Apps that scale to zero when idle, with versioned revisions for instant rollback.",
      },
    ],
    results: {
      metrics: [
        { value: "4", label: "Workflow roles", note: "Patient, courier, lab, clinician" },
        { value: "2", label: "Languages", note: "English and Arabic (RTL)" },
        { value: "5", label: "Check-in questions", note: "With explained routing" },
        { value: "3", label: "Test suites passing", note: "Automated scenario tests" },
      ],
      notes: [
        "All three scenario suites pass, covering urgent bypass, invalid handoffs, pending-report protection, bilingual replies and chat non-persistence.",
        "The prototype uses synthetic data only: no database, no real sign-in and no AI model. Reviewers choose \"Continue with demo patient\" with no account needed.",
        "The proposed next step is a feasibility pilot with about 30 consenting adults at one site, once clinic, laboratory and courier partners, Arabic review and a secure backend are in place.",
      ],
    },
    tools: [
      "JavaScript",
      "HTML/CSS",
      "Azure Container Apps",
      "Azure Container Registry",
      "nginx",
      "Docker",
    ],
    role: "Team lead for Team Excelsoir, Malaysia. Built the prototype and deployed it on Microsoft Azure.",
    team: ["Nabil Takiyuddin", "Syarmine", "Khairulanwar", "Muntaha", "Syamil"],
    tags: ["Data Engineering"],
    keywords: [
      "male fertility",
      "male reproductive health",
      "digital health",
      "Arabic RTL",
      "care workflow",
      "Azure Container Apps",
      "Future Health Digital Innovation Challenge",
      "hackathon",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export type MiniProject = {
  id: string;
  title: string;
  course: string;
  format: "Individual" | "Group" | "Group (team lead)";
  summary: string;
  /** Optional headline result. */
  result?: string;
  tools: string[];
  tags: ProjectTag[];
};

export const moreProjects: MiniProject[] = [
  {
    id: "churn-propensity",
    title: "Customer churn propensity analysis",
    course: "DSC721 Enterprise Data Analytics",
    format: "Individual",
    summary:
      "Churn propensity modelling for an e-commerce case, following the CRISP-DM process in KNIME with a Random Forest model.",
    tools: ["KNIME", "CRISP-DM", "Random Forest"],
    tags: ["ML"],
  },
  {
    id: "mr-diy-campaign-response",
    title: "Mr DIY campaign-response model",
    course: "DSC721 Enterprise Data Analytics",
    format: "Individual",
    summary:
      "A campaign-response model for a customer-acquisition sales package, comparing Random Forest, XGBoost and one other model in KNIME.",
    tools: ["KNIME", "Random Forest", "XGBoost"],
    tags: ["ML"],
  },
  {
    id: "air-quality-classification",
    title: "Air quality classification",
    course: "STA761 Statistical Data Mining",
    format: "Individual",
    summary:
      "Classified air quality in KNIME using SMOTE with Decision Tree, Random Forest, SVM and XGBoost. XGBoost was judged the most realistic model.",
    result: "XGBoost 74.7%",
    tools: ["KNIME", "SMOTE", "XGBoost", "SVM"],
    tags: ["ML", "Statistics"],
  },
  {
    id: "tb-incidence-regression",
    title: "TB incidence regression for Malaysia",
    course: "STA768 Advanced Time Series",
    format: "Group",
    summary:
      "A lagged regression on the determinants of tuberculosis incidence in Malaysia, 2000–2019, using WHO and World Bank data in R.",
    result: "Adjusted R² 0.934",
    tools: ["R", "tidyverse", "psych"],
    tags: ["Statistics"],
  },
  {
    id: "hr-attrition",
    title: "HR employee attrition analysis",
    course: "STA705 Statistical Computing",
    format: "Group",
    summary:
      "Cleaned an HR dataset (missing values, outliers) and ran regression on the drivers of employee attrition in R.",
    tools: ["R"],
    tags: ["Statistics"],
  },
  {
    id: "supermarket-inventory-model",
    title: "Supermarket inventory data model",
    course: "CSC787 Advanced Data Organization",
    format: "Group (team lead)",
    summary:
      "A stock-inventory data model and visualisation for a supermarket manager, with an inventory restock schedule. Led the team.",
    tools: ["Power BI", "Tableau", "MySQL", "Lucidchart"],
    tags: ["BI", "Data Engineering"],
  },
  {
    id: "ecommerce-review-sentiment",
    title: "Women's e-commerce review sentiment",
    course: "DSC766 Text Analytics",
    format: "Individual",
    summary:
      "Multi-class sentiment analysis of women's e-commerce reviews in Python and Orange. Logistic Regression performed best.",
    result: "Logistic Regression 77.7–79.0%",
    tools: ["Python", "Orange"],
    tags: ["ML"],
  },
  {
    id: "sigma-grocer-dashboard",
    title: "Sigma Grocer BI dashboard",
    course: "CSC788 Data Visualization",
    format: "Individual",
    summary:
      "A business-intelligence dashboard for Sigma Grocer Sdn Bhd, built with Looker Studio and Vercel.",
    tools: ["Looker Studio", "Vercel"],
    tags: ["BI"],
  },
  {
    id: "fmcg-esg-analysis",
    title: "FMCG plastic-packaging ESG analysis",
    course: "CSC788 Data Visualization",
    format: "Group",
    summary:
      "An analysis of FMCG plastic-packaging ESG commitments. Wrote the technique justification and coordinated the group submission.",
    tools: ["Orange"],
    tags: ["BI"],
  },
  {
    id: "hybrid-woa",
    title: "Hybrid Whale Optimization Algorithm",
    course: "ISC747 Optimization with Nature-Inspired Computing",
    format: "Individual",
    summary:
      "A term paper on a hybrid metaheuristic that combines the Whale Optimization Algorithm (WOA) with Ant Colony Optimization (ACO).",
    tools: ["WOA", "ACO"],
    tags: ["Optimisation"],
  },
];
