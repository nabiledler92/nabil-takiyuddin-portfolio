import { experience } from "@/content/experience";
import { certifications, education, profile } from "@/content/profile";
import { caseStudies, moreProjects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** /llms.txt: a plain-language, facts-only summary generated from the content files. */
export function GET() {
  const lines: string[] = [
    `# ${profile.name}`,
    "",
    `> ${profile.answer}`,
    "",
    "## What he does",
    "",
    ...profile.summary.map((s) => `- ${s}`),
    "",
    "## Background",
    "",
    `- Location: ${profile.location.locality}, ${profile.location.region}, ${profile.location.country}`,
    `- Languages: ${profile.languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(", ")}`,
    ...education.map(
      (e) => `- ${e.degree}, ${e.school}${e.location ? `, ${e.location}` : ""} (${e.period})`,
    ),
    "",
    "## Experience",
    "",
    ...experience.map((r) => `- ${r.title}, ${r.company} (${r.start} to ${r.end})`),
    "",
    "## Skills",
    "",
    ...skillGroups.map((g) => `- ${g.title}: ${g.items.join(", ")}`),
    "",
    "## Certifications",
    "",
    ...certifications.flatMap((c) => c.items.map((i) => `- ${c.issuer === "Other" ? "" : `${c.issuer}: `}${i}`)),
    "",
    "## Featured case studies",
    "",
    ...caseStudies.map((c) => `- [${c.title}](${absoluteUrl(`/projects/${c.slug}`)}): ${c.summary}`),
    "",
    "## More projects",
    "",
    ...moreProjects.map((p) => `- ${p.title} (${p.course}): ${p.summary}${p.result ? ` Result: ${p.result}.` : ""}`),
    "",
    "## Contact",
    "",
    `- Website: ${SITE_URL}`,
    `- Email: ${profile.email}`,
    `- LinkedIn: ${profile.linkedin}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
