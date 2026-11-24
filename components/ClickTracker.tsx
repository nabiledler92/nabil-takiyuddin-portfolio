"use client";

import { useEffect } from "react";
import { track, type TrackParams } from "@/lib/track";

/**
 * One document-level click listener for every element marked with
 * `trackAttrs(...)` (data-track / data-track-params). Capture phase, so it
 * still fires when a link opens a new tab or navigates away.
 */
export function ClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      let params: TrackParams = {};
      try {
        params = JSON.parse(el.dataset.trackParams || "{}") as TrackParams;
      } catch {
        // Ignore malformed params; still send the event name.
      }
      track(el.dataset.track!, params);
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
