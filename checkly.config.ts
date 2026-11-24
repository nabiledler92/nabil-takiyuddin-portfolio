import { defineConfig } from "checkly";
import { Frequency } from "checkly/constructs";

/**
 * Checkly monitoring as code (Vercel marketplace integration, Hobby plan).
 * CHECKLY_ACCOUNT_ID and CHECKLY_API_KEY are set by the integration.
 *
 *   npx checkly test --record   run every check once in the Checkly cloud
 *   npx checkly deploy          create or update the checks in Checkly
 *
 * 5 checks every 30 minutes from 1 location is about 7,200 runs a month,
 * which stays inside the Hobby plan's API check allowance.
 */
export default defineConfig({
  projectName: "nabil-takiyuddin.dev monitoring",
  logicalId: "nabil-takiyuddin-sites",
  repoUrl: "https://github.com/nabiledler92/nabil-takiyuddin-portfolio",
  checks: {
    frequency: Frequency.EVERY_30M,
    // Singapore: closest Checkly region to most visitors (Malaysia).
    locations: ["ap-southeast-1"],
    tags: ["portfolio"],
    checkMatch: "__checks__/**/*.check.ts",
  },
  cli: {
    runLocation: "ap-southeast-1",
  },
});
