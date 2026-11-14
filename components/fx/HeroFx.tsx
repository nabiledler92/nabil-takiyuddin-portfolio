"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const NetworkField = dynamic(() => import("./NetworkField"), { ssr: false });

/**
 * Mounts the canvas effect only after the page is idle, and never for visitors
 * who prefer reduced motion. The hero is complete without it.
 */
export function HeroFx() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const run = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(run, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(run, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,#000_55%,transparent)]"
    >
      {ready ? <NetworkField /> : null}
    </div>
  );
}
