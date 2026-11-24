// Sentry in the Edge runtime (used by some Next.js internals, e.g. image routes).
import * as Sentry from "@sentry/nextjs";
import { sentryDataCollection } from "@/lib/sentry-privacy";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.VERCEL_ENV ?? "development",
  tracesSampleRate: 0,
  // No personal data: see lib/sentry-privacy.ts.
  dataCollection: sentryDataCollection,
});
