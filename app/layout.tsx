import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/fx/RevealObserver";
import { CommandPalette } from "@/components/nav/CommandPalette";
import { HudNav } from "@/components/nav/HudNav";
import { profile } from "@/content/profile";
import { caseStudies } from "@/content/projects";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// Self-hosted variable fonts (SIL Open Font License), so builds never depend on a font CDN.
const grotesk = localFont({
  src: "./fonts/space-grotesk-latin-wght-normal.woff2",
  weight: "300 700",
  display: "swap",
  variable: "--font-grotesk",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const jetbrains = localFont({
  src: "./fonts/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  display: "swap",
  variable: "--font-jetbrains",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  publisher: profile.name,
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#04080f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const paletteCases = caseStudies.map((c) => ({
    slug: c.slug,
    code: c.code,
    title: c.shortTitle,
    course: `${c.course.code} ${c.course.name}`,
  }));

  return (
    <html lang="en" className={`${grotesk.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so scroll reveals only hide content when they can also show it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.js='1'" }} />
      </head>
      <body>
        <div className="atmosphere" aria-hidden="true" />
        <HudNav email={profile.email} linkedin={profile.linkedin} />
        <main id="main">{children}</main>
        <Footer />
        <CommandPalette cases={paletteCases} email={profile.email} linkedin={profile.linkedin} />
        <RevealObserver />
      </body>
    </html>
  );
}
