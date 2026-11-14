import { Section, SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/content/profile";

const arc = [
  { step: "01", title: "Marketing operations", text: "Sales, marketing and performance campaigns" },
  { step: "02", title: "Digital analytics", text: "GA4, Google Tag Manager, dashboards" },
  { step: "03", title: "Data engineering", text: "ETL pipelines, BigQuery, CRM data" },
  { step: "04", title: "AI automation", text: "Machine learning and agentic AI workflows" },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        id="about-title"
        index="01"
        code="About"
        title="From marketing operations to data engineering, analytics and AI automation."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        <div className="space-y-5" data-reveal>
          <p className="text-xl leading-relaxed text-pretty text-ink sm:text-2xl sm:leading-relaxed">{profile.answer}</p>
          <p className="text-base leading-relaxed text-pretty text-muted sm:text-lg">{profile.about.arc}</p>
          <p className="text-base leading-relaxed text-pretty text-muted sm:text-lg">{profile.about.path}</p>
        </div>

        <div className="grid gap-4 self-start" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
          <div className="panel ticks p-6">
            <h3 className="label label-cyan">Base</h3>
            <p className="mt-3 text-lg font-medium text-ink">
              {profile.location.locality}, {profile.location.region}, {profile.location.country}
            </p>
          </div>
          <div className="panel p-6">
            <h3 className="label label-cyan">Languages</h3>
            <ul className="mt-3 divide-y divide-line">
              {profile.languages.map((l) => (
                <li key={l.name} className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
                  <span className="font-medium text-ink">{l.name}</span>
                  <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-muted uppercase">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ol className="mt-10 grid gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" data-reveal>
        {arc.map((a, i) => (
          <li key={a.step} className="relative bg-deep/90 p-5 sm:p-6">
            <p className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.16em] text-cyan">
              {a.step}
              {i < arc.length - 1 ? (
                <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-cyan/50 to-transparent" />
              ) : (
                <span aria-hidden="true" className="size-1.5 rounded-full bg-teal shadow-[0_0_10px_var(--color-teal)]" />
              )}
            </p>
            <h3 className="mt-3 text-lg font-medium text-ink">{a.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{a.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
