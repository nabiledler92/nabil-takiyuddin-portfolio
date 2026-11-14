import Link from "next/link";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { certifications, education } from "@/content/profile";
import { moreProjects, projectTags } from "@/content/projects";
import { skillGroups } from "@/content/skills";

export function MoreProjects() {
  return (
    <Section id="projects">
      <SectionHeading
        id="projects-title"
        index="05"
        code="More projects"
        title="More coursework projects."
        lede="Ten more projects from the Master of Data Science. Filter by discipline."
      />
      <ProjectsGrid projects={moreProjects} tags={projectTags} />
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        id="skills-title"
        index="06"
        code="Skills & tools"
        title="Systems and tools."
        lede="Eight modules, from CRM and marketing automation to data engineering and machine learning."
      />
      <ul className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((g, i) => (
          <li
            key={g.id}
            data-reveal
            style={{ "--d": `${(i % 2) * 90}ms` } as React.CSSProperties}
            className="panel panel-hover p-6 sm:p-7"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-cyan">
                MOD-{String(i + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
              <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-dim tabular-nums">
                {String(g.items.length).padStart(2, "0")} items
              </span>
            </div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">{g.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function EducationSection() {
  return (
    <Section id="education">
      <SectionHeading
        id="education-title"
        index="07"
        code="Education"
        title="Education and certifications."
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <ol className="space-y-4">
          {education.map((e, i) => (
            <li key={e.degree} data-reveal className={`panel p-6 sm:p-7 ${i === 0 ? "ticks" : ""}`}>
              <p className="label label-cyan">{e.period}</p>
              <h3 className="mt-3 text-xl leading-snug font-semibold tracking-tight text-ink sm:text-2xl">{e.degree}</h3>
              <p className="mt-1 text-[0.9375rem] text-muted">
                {e.school}
                {e.location ? `, ${e.location}` : ""}
              </p>
              {e.note ? <p className="mt-4 text-[0.9375rem] leading-relaxed text-pretty text-soft">{e.note}</p> : null}
              {e.details ? (
                <ul className="mt-4 space-y-2.5">
                  {e.details.map((d) => (
                    <li key={d} className="relative pl-5 text-[0.9375rem] leading-relaxed text-pretty text-soft">
                      <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-2.5 bg-cyan" />
                      {d}
                    </li>
                  ))}
                </ul>
              ) : null}
              {i === 0 ? (
                <p className="mt-5">
                  <Link href="/projects/kopi-sentiment-idss" className="link text-sm">
                    Read the dissertation case study
                  </Link>
                </p>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="panel self-start p-6 sm:p-7" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
          <h3 className="label label-cyan">Certifications</h3>
          <div className="mt-5 space-y-6">
            {certifications.map((c) => (
              <div key={c.issuer}>
                <h4 className="flex items-center gap-3 text-lg font-semibold text-ink">
                  {c.issuer}
                  <span aria-hidden="true" className="h-px flex-1 bg-line" />
                </h4>
                <ul className="mt-3 space-y-2">
                  {c.items.map((it) => (
                    <li key={it} className="relative pl-5 text-[0.9375rem] leading-relaxed text-soft">
                      <span aria-hidden="true" className="absolute top-[0.55em] left-0 size-1.5 rotate-45 border border-cyan" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
