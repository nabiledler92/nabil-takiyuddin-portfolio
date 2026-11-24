// Sentry in the Edge runtime (used by some Next.js internals, e.g. image routes).
import * as Sentry from "@sentry/nextjs";
import { sentryDataCollection } from "@/lib/sentry-privacy";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.VERCEL_ENV ?? "development",
  tracesSampleRate: 0,
  // idss-web reports to the same Sentry project with site: "idss-web".
  initialScope: { tags: { site: "portfolio" } },
  // No personal data: see lib/sentry-privacy.ts.
  dataCollection: sentryDataCollection,
});
