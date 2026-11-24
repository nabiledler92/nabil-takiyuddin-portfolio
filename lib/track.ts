/**
 * GTM dataLayer events. Labels only: never pass names, emails, messages or
 * anything a visitor typed. Does nothing when GTM is not loaded (local and
 * preview builds have no NEXT_PUBLIC_GTM_ID).
 *
 * Two ways to fire an event:
 * - In client code, call `track("event_name", { param: "value" })`.
 * - On any element (server components too), spread `trackAttrs(...)`. The
 *   global <ClickTracker /> pushes the event when that element is clicked.
 */
export type TrackParams = Record<string, string | number | boolean>;

export function track(event: string, params: TrackParams = {}) {
  if (typeof window === "undefined") return;
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer?.push({ event, ...params });
}

/** Attributes that make <ClickTracker /> fire `event` when the element is clicked. */
export function trackAttrs(event: string, params: TrackParams = {}) {
  return { "data-track": event, "data-track-params": JSON.stringify(params) } as const;
}
