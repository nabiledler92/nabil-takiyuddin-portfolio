export type SectionLink = { id: string; label: string; short: string };

/** Home page sections, in order. Used by the HUD nav, side rail and command palette. */
export const sections: SectionLink[] = [
  { id: "top", label: "Mission control", short: "Home" },
  { id: "about", label: "About", short: "About" },
  { id: "impact", label: "Impact", short: "Impact" },
  { id: "experience", label: "Experience", short: "Experience" },
  { id: "work", label: "Case studies", short: "Work" },
  { id: "projects", label: "More projects", short: "Projects" },
  { id: "skills", label: "Skills & tools", short: "Skills" },
  { id: "education", label: "Education & certifications", short: "Education" },
  { id: "contact", label: "Contact", short: "Contact" },
];

/** Links shown in the top bar. "projects" highlights the Work link. */
export const topNav = ["about", "impact", "experience", "work", "skills", "education", "contact"];

export const OPEN_PALETTE_EVENT = "nt:open-palette";
