import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// 'unsafe-inline' is required for the inline data-js script in app/layout.tsx and Next.js bootstrap scripts
// on statically rendered pages (nonces would force every page to render dynamically).
// 'unsafe-eval' is only needed by the dev server.
// Vercel Analytics is served from the same origin (/_vercel/insights) in production;
// in development it loads a debug script from va.vercel-scripts.com.
//
// Google Tag Manager + GA4 (including Google Signals and GTM Preview / Tag Assistant).
// Any tag added in GTM later (Clarity, LinkedIn Insight, Meta Pixel, Hotjar, ...) needs its
// domains added here as well, or it will be blocked silently.
const GTM = "https://www.googletagmanager.com";
const GTM_PREVIEW = "https://tagmanager.google.com";
const GA = "https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net";
// Microsoft Clarity (loaded through GTM): tag loader on www.clarity.ms, script on scripts.clarity.ms,
// data collection on *.clarity.ms, and c.bing.com for Clarity's cookie sync.
const CLARITY = "https://*.clarity.ms https://c.bing.com";
// Live app embedded on the kopi-sentiment-idss case study (content/projects.ts `demo`).
// It allows being framed by this site through its own frame-ancestors policy.
const EMBEDDED_DEMOS = "https://idss.nabil-takiyuddin.dev";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${GTM} ${GTM_PREVIEW} ${CLARITY}${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}`,
  `style-src 'self' 'unsafe-inline' ${GTM_PREVIEW} https://fonts.googleapis.com`,
  `img-src 'self' data: blob: ${GTM} ${GA} ${CLARITY} https://ssl.gstatic.com https://www.gstatic.com`,
  "font-src 'self' https://fonts.gstatic.com",
  `connect-src 'self' ${GTM} ${GA} ${CLARITY}`,
  `frame-src ${GTM} ${EMBEDDED_DEMOS}`,
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
