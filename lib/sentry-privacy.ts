import type * as Sentry from "@sentry/nextjs";

/**
 * What Sentry may collect, shared by the browser, server and edge setups.
 *
 * Sentry v11 collects request bodies, headers, cookies, user info and stack
 * variables by default. Here that would include whatever a visitor types into
 * the contact form (name, email, message), so all of it is switched off: an
 * error report carries the error, the stack trace and the page URL only.
 */
export const sentryDataCollection: NonNullable<Parameters<typeof Sentry.init>[0]>["dataCollection"] = {
  userInfo: false,
  cookies: false,
  httpHeaders: false,
  httpBodies: [],
  urlQueryParams: false,
  stackFrameVariables: false,
  genAI: { inputs: false, outputs: false },
};
