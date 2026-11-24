// Sentry in the browser. Errors only: no tracing or session replay, which keeps
// the bundle small and the free Developer plan's quota for real errors.
import * as Sentry from "@sentry/nextjs";
import { sentryDataCollection } from "@/lib/sentry-privacy";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development",
  // Send events through this site (the server forwards them), so ad blockers
  // don't drop them and the CSP needs no Sentry hosts. See sentry.server.config.ts.
  tunnel: true,
  tracesSampleRate: 0,
  // No personal data: see lib/sentry-privacy.ts.
  dataCollection: sentryDataCollection,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
