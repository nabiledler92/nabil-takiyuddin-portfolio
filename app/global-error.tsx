"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

/** Last-resort error screen for errors in the root layout. Reports them to Sentry. */
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#04080f",
          color: "#e8f1ff",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.5rem", margin: "0 0 12px" }}>Something went wrong.</h1>
          <p style={{ color: "#b4c4dc", margin: "0 0 20px" }}>The error has been reported. Please try again.</p>
          {/* A plain link on purpose: this screen replaces the root layout, so a full reload is safest. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" style={{ color: "#4fe3ff" }}>
            Back to the home page
          </a>
        </div>
      </body>
    </html>
  );
}
