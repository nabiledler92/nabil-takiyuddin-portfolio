import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { profile } from "@/content/profile";
import { caseStudies, getCaseStudy } from "@/content/projects";
import { caseStudyLd } from "@/lib/jsonld";
import { SITE_NAME } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  const path = `/projects/${cs.slug}`;
  return {
    title: cs.metaTitle,
    description: cs.metaDescription,
    keywords: cs.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      siteName: SITE_NAME,
      locale: "en_MY",
      title: cs.metaTitle,
      description: cs.metaDescription,
      authors: [profile.name],
    },
    twitter: { card: "summary_large_image", title: cs.metaTitle, description: cs.metaDescription },
  };
}

function Block({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28" data-reveal>
      <div className="flex items-center gap-4">
        <p className="label label-cyan shrink-0">
          <span className="text-dim">{"// "}</span>
          {index}
        </p>
        <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-line-strong to-transparent" />
      </div>
      <h2 id={`${id}-title`} className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-[2rem]">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const idx = caseStudies.findIndex((c) => c.slug === cs.slug);
  const prev = caseStudies[(idx - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(idx + 1) % caseStudies.length];
  const others = caseStudies.filter((c) => c.slug !== cs.slug);
  const hasMetrics = cs.results.metrics.length > 0;

  const toc = [
    { id: "problem", label: "Problem" },
    { id: "approach", label: "Approach" },
    { id: "results", label: "Results" },
    { id: "tools", label: "Tools" },
    { id: "team", label: "Role & team" },
  ];

  const facts = [
    { label: "Course", value: `${cs.course.code} ${cs.course.name}` },
    { label: "Format", value: cs.formatLabel },
    ...(cs.date ? [{ label: "Date", value: cs.date }] : []),
    { label: "Programme", value: "Master of Data Science, UiTM" },
    ...(cs.supervisor ? [{ label: "Supervisor", value: cs.supervisor }] : []),
    ...(cs.team ? [{ label: "Team", value: `${cs.team.length} members` }] : []),
  ];

  return (
    <>
      <JsonLd data={caseStudyLd(cs)} />
      <article className="relative mx-auto max-w-[1180px] px-5 pt-[calc(var(--nav-h)+2rem)] pb-10 sm:px-8 sm:pt-[calc(var(--nav-h)+3.5rem)]">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <Link
            href="/"
            className="group inline-flex h-10 items-center gap-2.5 rounded-lg border border-line-strong bg-cyan/5 px-3.5 font-mono text-[0.6875rem] tracking-[0.14em] text-cyan uppercase transition-colors hover:border-cyan hover:bg-cyan/10"
          >
            <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
            Back to mission control
          </Link>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] text-dim uppercase">
              <li>
                <Link href="/" className="transition-colors hover:text-cyan">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#work" className="transition-colors hover:text-cyan">
                  Case studies
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-soft">
                {cs.code}
              </li>
            </ol>
          </nav>
        </div>

        <header className="mt-10 sm:mt-14">
          <p className="label rise flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="flex items-center gap-2 text-teal">
              <span aria-hidden="true" className="blink size-1.5 rounded-full bg-teal shadow-[0_0_10px_var(--color-teal)]" />
              Case file {cs.code}
            </span>
            <span aria-hidden="true" className="text-line-strong">
              /
            </span>
            <span>{cs.course.code}</span>
            <span aria-hidden="true" className="text-line-strong">
              /
            </span>
            <span>{cs.formatLabel}</span>
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-[2rem] leading-[1.06] font-semibold tracking-[-0.03em] text-balance text-ink sm:text-5xl lg:text-[3.5rem]">
            {cs.title}
          </h1>
          <p
            className="rise mt-6 max-w-3xl text-lg leading-relaxed text-pretty text-soft sm:text-xl"
            style={{ "--d": "100ms" } as React.CSSProperties}
          >
            {cs.summary}
          </p>

          <dl
            className="panel ticks rise mt-10 grid grid-cols-2 gap-px overflow-hidden bg-line lg:grid-cols-4"
            style={{ "--d": "180ms" } as React.CSSProperties}
          >
            <div className={`col-span-2 bg-deep/95 p-5 sm:p-6 lg:col-span-1 ${facts.length > 3 ? "lg:row-span-2" : ""}`}>
              <dt className="label label-cyan">Headline</dt>
              <dd className="mt-3">
                <span className="num-gradient block font-display text-5xl leading-none font-semibold tracking-[-0.04em] sm:text-6xl lg:text-5xl xl:text-6xl">
                  {cs.highlight.value}
                </span>
                <span className="mt-3 block font-mono text-[0.6875rem] leading-relaxed tracking-[0.1em] text-muted uppercase">
                  {cs.highlight.label}
                </span>
              </dd>
            </div>
            {facts.map((f) => (
              <div key={f.label} className="bg-deep/95 p-5 sm:p-6">
                <dt className="label">{f.label}</dt>
                <dd className="mt-1.5 text-sm leading-snug font-medium text-ink sm:text-[0.9375rem]">{f.value}</dd>
              </div>
            ))}
            {Array.from({ length: (3 - (facts.length % 3)) % 3 }).map((_, i) => (
              <div key={`lg-${i}`} aria-hidden="true" className="hidden bg-deep/95 lg:block" />
            ))}
            {facts.length % 2 ? <div aria-hidden="true" className="bg-deep/95 lg:hidden" /> : null}
          </dl>
        </header>

        <div className="mt-16 grid gap-12 sm:mt-20 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="label">On this page</p>
              <ol className="mt-4 space-y-1 border-l border-line">
                {toc.map((t, i) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="-ml-px flex items-center gap-3 border-l border-transparent py-1.5 pl-4 font-mono text-[0.6875rem] tracking-[0.12em] text-muted uppercase transition-colors hover:border-cyan hover:text-cyan"
                    >
                      <span className="text-dim tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      {t.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="min-w-0 space-y-16 sm:space-y-20">
            <Block id="problem" index="01 · Problem" title="The problem">
              <div className="max-w-3xl space-y-4">
                {cs.problem.map((p) => (
                  <p key={p} className="text-base leading-relaxed text-pretty text-soft sm:text-lg">
                    {p}
                  </p>
                ))}
              </div>
            </Block>

            <Block id="approach" index="02 · Approach" title="The approach">
              <ol className="grid gap-4 sm:grid-cols-2">
                {cs.approach.map((a, i) => (
                  <li key={a.title} className="panel panel-hover p-5 sm:p-6">
                    <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-cyan">
                      STEP {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">{a.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-pretty text-muted">{a.text}</p>
                  </li>
                ))}
              </ol>
            </Block>

            <Block id="results" index="03 · Results" title={hasMetrics ? "The results" : "Results"}>
              {hasMetrics ? (
                <ul className={`grid grid-cols-2 gap-4 ${cs.results.metrics.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
                  {cs.results.metrics.map((m) => (
                    <li key={m.label} className="panel ticks flex flex-col p-5 sm:p-6">
                      <p className="num-gradient font-display text-[2rem] leading-none font-semibold tracking-[-0.03em] sm:text-[2.75rem]">
                        {m.value}
                      </p>
                      <p className="mt-3 text-sm leading-snug font-medium text-ink">{m.label}</p>
                      {m.note ? (
                        <p className="mt-1 font-mono text-[0.6875rem] leading-relaxed tracking-[0.06em] text-muted">
                          {m.note}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}
              <ul className={`max-w-3xl space-y-3 ${hasMetrics ? "mt-8" : ""}`}>
                {cs.results.notes.map((n) => (
                  <li key={n} className="relative pl-5 text-base leading-relaxed text-pretty text-soft sm:text-lg">
                    <span aria-hidden="true" className="absolute top-[0.75em] left-0 h-px w-2.5 bg-cyan" />
                    {n}
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="tools" index="04 · Tools" title="Tools and methods">
              <ul className="flex flex-wrap gap-2">
                {cs.tools.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="team" index="05 · Role & team" title="Role and team">
              <p className="max-w-3xl text-base leading-relaxed text-pretty text-soft sm:text-lg">{cs.role}</p>
              {cs.supervisor ? (
                <p className="mt-4 text-base text-soft sm:text-lg">
                  <span className="label mr-3">Supervisor</span>
                  {cs.supervisor}
                </p>
              ) : null}
              {cs.team ? (
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {cs.team.map((member) => {
                    const me = member === profile.name;
                    return (
                      <li
                        key={member}
                        className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                          me ? "border-line-strong bg-cyan/8" : "border-line bg-void/40"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`size-2 shrink-0 rounded-full ${me ? "bg-cyan shadow-[0_0_10px_var(--color-cyan)]" : "bg-line-strong"}`}
                        />
                        <span className="text-[0.9375rem] text-ink">{member}</span>
                        {me ? (
                          <span className="ml-auto font-mono text-[0.625rem] tracking-[0.16em] text-cyan uppercase">This site</span>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </Block>
          </div>
        </div>

        <nav aria-label="More case studies" className="mt-20 border-t border-line pt-10 sm:mt-28" data-reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href={`/projects/${prev.slug}`} className="panel panel-hover group p-5 sm:p-6">
              <span className="label flex items-center gap-2">
                <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" /> Previous · {prev.code}
              </span>
              <span className="mt-3 block text-lg leading-snug font-semibold tracking-tight text-ink">{prev.shortTitle}</span>
            </Link>
            <Link href={`/projects/${next.slug}`} className="panel panel-hover group p-5 text-right sm:p-6">
              <span className="label flex items-center justify-end gap-2">
                Next · {next.code} <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="mt-3 block text-lg leading-snug font-semibold tracking-tight text-ink">{next.shortTitle}</span>
            </Link>
          </div>

          <h2 className="label mt-10">All other case studies</h2>
          <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/projects/${o.slug}`} className="group flex items-baseline gap-3 py-1.5 text-[0.9375rem] text-soft transition-colors hover:text-cyan">
                  <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-dim group-hover:text-cyan">{o.code}</span>
                  {o.shortTitle}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-ghost">
              <ArrowLeft /> Back to mission control
            </Link>
            <Link href="/#contact" className="btn btn-primary">
              Contact Nabil <ArrowRight />
            </Link>
          </div>
        </nav>
      </article>
    </>
  );
}
