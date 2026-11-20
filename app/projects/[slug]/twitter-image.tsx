import { caseContext, caseStudies, getCaseStudy } from "@/content/projects";
import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Case study by Nabil Takiyuddin";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  return renderOg({
    eyebrow: cs ? `Case study ${cs.code} · ${cs.course.code}` : "Case study",
    title: cs?.shortTitle ?? "Case study",
    subtitle: cs ? `${cs.formatLabel}, ${caseContext(cs).value}` : "Nabil Takiyuddin",
    metric: cs?.highlight,
  });
}
