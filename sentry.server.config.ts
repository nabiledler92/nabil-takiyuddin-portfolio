// Sentry on the Node.js server: route handlers (/api/contact), server components
// and the tunnel that forwards browser events to Sentry.
import * as Sentry from "@sentry/nextjs";
import { sentryDataCollection } from "@/lib/sentry-privacy";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.VERCEL_ENV ?? "development",
  // Answers the browser's `tunnel: true` requests and forwards them to Sentry.
  integrations: [Sentry.serveTunnelIntegration()],
  tracesSampleRate: 0,
  // idss-web reports to the same Sentry project with site: "idss-web".
  initialScope: { tags: { site: "portfolio" } },
  // No personal data: see lib/sentry-privacy.ts.
  dataCollection: sentryDataCollection,
});
