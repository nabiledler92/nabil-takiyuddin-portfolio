/**
 * Credential badges shown above the certification list. Images are saved in
 * public/images/badges so the site doesn't depend on (or need CSP rules for)
 * the issuers' image hosts. Credly badges come from the public profile
 * credly.com/users/muhammad-nabil-mohd-takiyuddin (checked 2026-11-16).
 */
import type { StaticImageData } from "next/image";
import demandbaseAds from "@/public/images/badges/demandbase-digital-advertising-manager.png";
import demandbaseMarketing from "@/public/images/badges/demandbase-digital-marketing-manager.png";
import demandbaseMops from "@/public/images/badges/demandbase-mops-it-admin.png";
import aiAppBuilding from "@/public/images/badges/google-ai-app-building.png";
import aiAppDeployment from "@/public/images/badges/google-ai-app-deployment.png";
import aiBrainstorming from "@/public/images/badges/google-ai-brainstorming-planning.png";
import aiContent from "@/public/images/badges/google-ai-content-creation.png";
import aiDataAnalysis from "@/public/images/badges/google-ai-data-analysis.png";
import aiEssentials from "@/public/images/badges/google-ai-essentials.png";
import aiFundamentals from "@/public/images/badges/google-ai-fundamentals.png";
import aiResearch from "@/public/images/badges/google-ai-research-insights.png";
import aiWriting from "@/public/images/badges/google-ai-writing-communicating.png";
import dataAnalytics from "@/public/images/badges/google-data-analytics.png";
import digitalMarketing from "@/public/images/badges/google-digital-marketing-ecommerce.png";
import promptingEssentials from "@/public/images/badges/google-prompting-essentials.png";
import hubspotMarketing from "@/public/images/badges/hubspot-marketing-hub.png";
import hubspotSales from "@/public/images/badges/hubspot-sales-hub.png";
import salesforceAE from "@/public/images/badges/salesforce-account-engagement-specialist.png";

export type Badge = {
  name: string;
  issuer: string;
  image: StaticImageData;
  /** Verification page. */
  url?: string;
};

const credly = (id: string) => `https://www.credly.com/badges/${id}`;

export const badges: Badge[] = [
  {
    name: "HubSpot Sales Hub Software Certified",
    issuer: "HubSpot Academy",
    image: hubspotSales,
    url: "https://app-na2.hubspot.com/academy/achievements/8yvyz31y/en/1/nabil-takiyuddin/hubspot-sales-hub-software-certified",
  },
  {
    name: "HubSpot Marketing Hub Software Certified",
    issuer: "HubSpot Academy",
    image: hubspotMarketing,
    url: "https://app-na2.hubspot.com/academy/achievements/kx2gm2y0/en/1/nabil-takiyuddin/hubspot-marketing-hub-software-certified",
  },
  {
    name: "Certified Marketing Cloud Account Engagement Specialist",
    issuer: "Salesforce",
    image: salesforceAE,
  },
  {
    name: "Digital Marketing Manager",
    issuer: "Demandbase",
    image: demandbaseMarketing,
    url: credly("277eb138-33a3-440d-90c9-474918d615fb"),
  },
  {
    name: "Marketing Operations / IT Administrator",
    issuer: "Demandbase",
    image: demandbaseMops,
    url: credly("d89e5654-5351-45c9-baf5-6a4a56a131ba"),
  },
  {
    name: "Digital Advertising Manager",
    issuer: "Demandbase",
    image: demandbaseAds,
    url: credly("05858d85-4ce5-41ab-a3b3-a066ecd5ffff"),
  },
  {
    name: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    image: dataAnalytics,
    url: credly("06730556-d9d1-4558-b185-ad3a9cb7dc88"),
  },
  {
    name: "Google Digital Marketing and E-Commerce Professional Certificate",
    issuer: "Google",
    image: digitalMarketing,
    url: credly("4d080b64-d4fe-4d3e-89da-8b26856bf380"),
  },
  {
    name: "Google AI for App Deployment",
    issuer: "Google",
    image: aiAppDeployment,
    url: credly("01a2ca3c-2d0c-4a63-9f7d-d573f7ead081"),
  },
  {
    name: "Google AI for App Building",
    issuer: "Google",
    image: aiAppBuilding,
    url: credly("dadcba97-e9a8-4a9e-aeba-617f5182d8e7"),
  },
  {
    name: "Google AI for Data Analysis",
    issuer: "Google",
    image: aiDataAnalysis,
    url: credly("90971995-ca5f-4776-a719-bb08e61879de"),
  },
  {
    name: "Google AI for Content Creation",
    issuer: "Google",
    image: aiContent,
    url: credly("ba7e3924-89e0-46fa-a3ce-9beaab83bb7e"),
  },
  {
    name: "Google AI for Writing and Communicating",
    issuer: "Google",
    image: aiWriting,
    url: credly("ea66a361-b0a2-4290-b3cc-ee28ae728ebd"),
  },
  {
    name: "Google AI for Brainstorming and Planning",
    issuer: "Google",
    image: aiBrainstorming,
    url: credly("15d58381-715f-437c-92b4-597acb9ffeaf"),
  },
  {
    name: "Google AI for Research and Insights",
    issuer: "Google",
    image: aiResearch,
    url: credly("0e6a1d63-cba1-4380-a2a9-b30ab74c85dd"),
  },
  {
    name: "Google AI Fundamentals",
    issuer: "Google",
    image: aiFundamentals,
    url: credly("ec159788-6b37-492a-87fe-c62ebc6e5cc5"),
  },
  {
    name: "Google AI Essentials",
    issuer: "Google",
    image: aiEssentials,
    url: credly("045c6583-b74d-4bf7-a42c-9ce83bbda614"),
  },
  {
    name: "Google Prompting Essentials",
    issuer: "Google",
    image: promptingEssentials,
    url: credly("d7e5513b-5b42-401b-9369-933115b5e7e2"),
  },
];

export const credlyProfileUrl = "https://www.credly.com/users/muhammad-nabil-mohd-takiyuddin/badges";
