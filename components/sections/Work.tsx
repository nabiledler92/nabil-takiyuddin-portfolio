import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { caseStudies } from "@/content/projects";

export function Work() {
  return (
    <Section id="work">
      <SectionHeading
        id="work-title"
        index="04"
        code="Case studies"
        title="Featured case studies."
        lede="Five projects from the Master of Data Science at UiTM and one competition build, written up as problem, approach, results, tools and team."
      />

      <ol className="grid gap-4 lg:grid-cols-6">
        {caseStudies.map((cs, i) => {
          const lead = i === 0;
          // After the lead card the rest sit in pairs; a final unpaired card takes the full row.
          const lastAlone = i === caseStudies.length - 1 && (caseStudies.length - 1) % 2 === 1;
          return (
            <li
              key={cs.slug}
              data-reveal
              style={{ "--d": `${(i % 2) * 90}ms` } as React.CSSProperties}
              className={lead || lastAlone ? "lg:col-span-6" : "lg:col-span-3"}
            >
              <article
                className={`panel panel-hover ticks group relative flex h-full flex-col overflow-hidden p-6 sm:p-8 ${
                  lead ? "lg:grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-10" : ""
                }`}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(79,227,255,0.14),transparent)] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative flex flex-1 flex-col">
                  <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-cyan">{cs.code}</span>
                    <span>
                      {cs.course.code} · {cs.formatLabel}
                    </span>
                  </p>
                  <h3
                    className={`mt-4 font-display leading-[1.12] font-semibold tracking-tight text-balance text-ink ${
                      lead ? "text-2xl sm:text-[2rem]" : "text-xl sm:text-2xl"
                    }`}
                  >
                    <Link
                      href={`/projects/${cs.slug}`}
                      className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[14px] focus-visible:after:outline-2 focus-visible:after:outline-offset-[-2px] focus-visible:after:outline-cyan"
                    >
                      {cs.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-pretty text-muted">{cs.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tools">
                    {cs.tools.slice(0, lead ? 6 : 4).map((t) => (
                      <li key={t} className="chip chip-mono">
                        {t}
                      </li>
                    ))}
                  </ul>
                  {!lead ? (
                    <div className="mt-auto pt-7">
                      <div className="flex items-end justify-between gap-4 border-t border-line pt-5">
                      <div>
                        <p className="num-gradient font-display text-3xl leading-none font-semibold tracking-tight sm:text-4xl">
                          {cs.highlight.value}
                        </p>
                        <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.1em] text-muted uppercase">
                          {cs.highlight.label}
                        </p>
                      </div>
                      <span className="flex shrink-0 items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] text-cyan uppercase">
                        <span className="hidden sm:inline">Open</span>
                        <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      </div>
                    </div>
                  ) : null}
                </div>

                {lead ? (
                  <div className="relative mt-7 flex flex-col justify-between rounded-xl border border-line bg-void/50 p-6 lg:mt-0">
                    <p className="label">Headline result</p>
                    <div className="mt-6">
                      <p className="num-gradient font-display text-6xl leading-none font-semibold tracking-[-0.04em] sm:text-7xl">
                        {cs.highlight.value}
                      </p>
                      <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.1em] text-muted uppercase">
                        {cs.highlight.label}
                      </p>
                    </div>
                    <span className="mt-8 flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] text-cyan uppercase">
                      Open case study
                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                ) : null}
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
