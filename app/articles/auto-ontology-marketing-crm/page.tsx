import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ChannelChart, RunStrips, WonDateChart } from "@/components/articles/auto-ontology/Charts";
import { funnelTail, rawSources, sample } from "@/components/articles/auto-ontology/data";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { getArticle } from "@/content/articles";
import { profile } from "@/content/profile";
import { getCaseStudy } from "@/content/projects";
import { articleLd } from "@/lib/jsonld";
import { SITE_NAME } from "@/lib/site";
import { trackAttrs } from "@/lib/track";
import graphImg from "@/public/images/articles/auto-ontology/01-semantic-graph.jpg";
import termsImg from "@/public/images/articles/auto-ontology/02-terms-catalog.jpg";
import metricsImg from "@/public/images/articles/auto-ontology/03-deal-term-metrics.jpg";
import chatImg from "@/public/images/articles/auto-ontology/04-chat-answer-with-sql.jpg";

const SLUG = "auto-ontology-marketing-crm";
const REPO = "https://github.com/nabiledler92/auto-ontology-marketing-showcase";
const article = getArticle(SLUG)!;
const caseStudy = article.caseStudy ? getCaseStudy(article.caseStudy) : undefined;

export const metadata: Metadata = {
  title: article.metaTitle,
  description: article.metaDescription,
  keywords: article.keywords,
  alternates: { canonical: `/articles/${SLUG}` },
  openGraph: {
    type: "article",
    url: `/articles/${SLUG}`,
    siteName: SITE_NAME,
    locale: "en_MY",
    title: article.metaTitle,
    description: article.metaDescription,
    authors: [profile.name],
    publishedTime: article.published,
    modifiedTime: article.updated,
  },
  twitter: { card: "summary_large_image", title: article.metaTitle, description: article.metaDescription },
};

const toc = [
  { id: "problem", label: "The problem" },
  { id: "setup", label: "What I built" },
  { id: "sample", label: "Sample data" },
  { id: "tests", label: "How I tested" },
  { id: "results", label: "Results" },
  { id: "screens", label: "Screenshots" },
  { id: "value", label: "Marketing & CRM" },
  { id: "limits", label: "Limits" },
  { id: "reproduce", label: "Reproduce it" },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  const i = String(toc.findIndex((t) => t.id === id) + 1).padStart(2, "0");
  const label = toc.find((t) => t.id === id)?.label;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28" data-reveal>
      <div className="flex items-center gap-4">
        <p className="label label-cyan shrink-0">
          <span className="text-dim">{"// "}</span>
          {i} · {label}
        </p>
        <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-line-strong to-transparent" />
      </div>
      <h2 id={`${id}-title`} className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-[2rem]">
        {title}
      </h2>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="max-w-3xl text-base leading-relaxed text-pretty text-soft sm:text-lg">{children}</p>;
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="max-w-3xl space-y-3">
      {items.map((n, i) => (
        <li key={i} className="relative pl-5 text-base leading-relaxed text-pretty text-soft sm:text-lg">
          <span aria-hidden="true" className="absolute top-[0.75em] left-0 h-px w-2.5 bg-cyan" />
          {n}
        </li>
      ))}
    </ul>
  );
}

function Shot({ src, alt, caption }: { src: StaticImageData; alt: string; caption: string }) {
  return (
    <figure className="panel overflow-hidden p-0">
      <Image src={src} alt={alt} sizes="(min-width: 1180px) 900px, 100vw" className="block h-auto w-full" />
      <figcaption className="border-t border-line px-4 py-3 text-sm leading-relaxed text-muted">{caption}</figcaption>
    </figure>
  );
}

function Stat({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <li className="panel ticks flex flex-col p-5">
      <p className="num-gradient font-display text-[2rem] leading-none font-semibold tracking-[-0.03em] sm:text-[2.5rem]">
        {value}
      </p>
      <p className="mt-3 text-sm leading-snug font-medium text-ink">{label}</p>
      {note ? <p className="mt-1 font-mono text-[0.6875rem] leading-relaxed tracking-[0.06em] text-muted">{note}</p> : null}
    </li>
  );
}

const fmt = (n: number) => n.toLocaleString("en-US");

export default function AutoOntologyArticle() {
  return (
    <>
      <JsonLd data={articleLd(article)} />
      <article className="relative mx-auto max-w-[1180px] px-5 pt-[calc(var(--nav-h)+2rem)] pb-10 sm:px-8 sm:pt-[calc(var(--nav-h)+3.5rem)]">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <Link
            href={caseStudy ? `/projects/${caseStudy.slug}` : "/"}
            className="group inline-flex h-10 items-center gap-2.5 rounded-lg border border-line-strong bg-cyan/5 px-3.5 font-mono text-[0.6875rem] tracking-[0.14em] text-cyan uppercase transition-colors hover:border-cyan hover:bg-cyan/10"
          >
            <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
            {caseStudy ? `Back to case file ${caseStudy.code}` : "Back to mission control"}
          </Link>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] text-dim uppercase">
              <li>
                <Link href="/" className="transition-colors hover:text-cyan">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              {caseStudy ? (
                <>
                  <li>
                    <Link href={`/projects/${caseStudy.slug}`} className="transition-colors hover:text-cyan">
                      {caseStudy.code}
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                </>
              ) : null}
              <li aria-current="page" className="text-soft">
                Article
              </li>
            </ol>
          </nav>
        </div>

        <header className="mt-10 sm:mt-14">
          <p className="label rise flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="flex items-center gap-2 text-teal">
              <span aria-hidden="true" className="blink size-1.5 rounded-full bg-teal shadow-[0_0_10px_var(--color-teal)]" />
              Use case
            </span>
            <span aria-hidden="true" className="text-line-strong">
              /
            </span>
            <span>{article.date}</span>
            <span aria-hidden="true" className="text-line-strong">
              /
            </span>
            <span>{profile.name}</span>
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-[2rem] leading-[1.06] font-semibold tracking-[-0.03em] text-balance text-ink sm:text-5xl lg:text-[3.25rem]">
            {article.title}
          </h1>
          <p
            className="rise mt-6 max-w-3xl text-lg leading-relaxed text-pretty text-soft sm:text-xl"
            style={{ "--d": "100ms" } as React.CSSProperties}
          >
            {article.summary}
          </p>
          <ul className="rise mt-6 flex flex-wrap gap-3" style={{ "--d": "140ms" } as React.CSSProperties}>
            <li>
              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                {...trackAttrs("case_study_link_click", { case_study: SLUG, link_type: "source_code" })}
              >
                Source code and synthetic data <ArrowUpRight />
              </a>
            </li>
          </ul>
          <p className="rise mt-8 max-w-3xl rounded-xl border border-line bg-cyan/5 px-4 py-3 text-sm leading-relaxed text-soft">
            <span className="font-semibold text-ink">About the data.</span> The pilot ran on a real CRM export from an
            anonymous B2B services company. Nothing from that export appears here. The test results are outcome counts
            only. Every chart, table and screenshot of data comes from a seeded synthetic CRM built to have the same quirks.
          </p>
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
            <Section id="problem" title="One word, many meanings, numbers nobody can audit">
              <P>
                Marketing funnel numbers often live in pivot sheets. The word “leads” means different things in
                different tabs, raw lead sources are messy, and when two reports disagree nobody can say which one is
                right.
              </P>
              <P>
                An <strong className="text-ink">ontology layer</strong> is a shared set of business definitions that
                sits on top of the data: what a lead is, when a deal counts as won, which channel a visit belongs to.
                The idea is that anyone can ask a funnel question in plain English and get an answer that follows
                the agreed definitions, with the SQL shown so the number can be checked.
              </P>
              <P>
                I wanted to know whether that works in practice, so I tested it with{" "}
                <a
                  href="https://github.com/NVIDIA/auto-ontology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan underline decoration-line-strong underline-offset-4 hover:decoration-cyan"
                >
                  NVIDIA Auto Ontology
                </a>{" "}
                (open source, Apache-2.0) on CRM data from a company with no data warehouse yet.
              </P>
            </Section>

            <Section id="setup" title="What I built">
              <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
                {[
                  ["01", "CRM export", "Persons, deals, leads, stages"],
                  ["02", "PostgreSQL", "8 tables; email and phone dropped first"],
                  ["03", "Auto Ontology", "Terms, column descriptions, table links"],
                  ["04", "Chat, MCP, API", "Answers with the SQL used"],
                ].map(([n, t, d]) => (
                  <li key={n} className="bg-deep/95 p-4 sm:p-5">
                    <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-cyan">STEP {n}</p>
                    <p className="mt-2 font-semibold text-ink">{t}</p>
                    <p className="mt-1 text-sm leading-snug text-muted">{d}</p>
                  </li>
                ))}
              </ol>
              <P>
                Auto Ontology read the database, sampled values and drafted the business map on its own: business
                terms, descriptions for almost every column, and the links between tables. It did not write any
                business rules, so I added the agreed funnel definitions myself as{" "}
                <strong className="text-ink">10 SQL metrics</strong>: leads, qualified leads, SQLs, won deals, won
                revenue, a channel view and a canonical monthly funnel. Run directly, those metrics matched the
                client’s own reference figures exactly.
              </P>
              <Shot
                src={graphImg}
                alt="Auto Ontology exploration view showing four terms, Person, Deal, Lead and Stage, connected by lines."
                caption="The ontology graph Auto Ontology drafted for the synthetic CRM: four terms and the links between them."
              />
              <P>
                The first build reported success while 9 model calls had failed. The hosted endpoint rejected one
                field that the tool’s client library sends, and every model I tried that responded failed the same
                way. A patch of about six lines switched the client to tool calling and fixed it.
              </P>
              <div className="overflow-x-auto">
                <table className="viz-table max-w-3xl">
                  <thead>
                    <tr>
                      <th>Build</th>
                      <th>Failed model calls</th>
                      <th>Table links found</th>
                      <th>Columns described</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Default client</td>
                      <td>9</td>
                      <td>1</td>
                      <td>Most</td>
                    </tr>
                    <tr>
                      <td>Patched client</td>
                      <td>0</td>
                      <td>5</td>
                      <td>125 of 126</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="sample" title="The sample data">
              <P>
                To show the work without client data, I wrote a seeded generator for a fake Pipedrive-style CRM. It
                copies the quirks that made the real funnel hard to answer, so the same traps show up in the demo.
              </P>
              <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <Stat value={fmt(sample.persons)} label="Persons (funnel leads)" note={`${sample.months} months`} />
                <Stat value={fmt(sample.inbox)} label="Inbox “leads” records" note="A second meaning of lead" />
                <Stat value={fmt(sample.deals)} label="Deals (SQLs)" />
                <Stat value={fmt(sample.won)} label="Won deals" note={`${sample.wonLaterMonth} won in a later month`} />
              </ul>
              <Bullets
                items={[
                  <>
                    <strong className="text-ink">Two meanings of “lead”.</strong> In the funnel a lead is a person. The
                    CRM also has an inbox table called leads. An agent that picks the wrong table gives a confident,
                    wrong number.
                  </>,
                  <>
                    <strong className="text-ink">Won is not created.</strong> {sample.wonLaterMonth} of the {sample.won}{" "}
                    won deals were won in a later month than they were created. Counting them by creation month moves
                    them to the wrong month, as the chart below shows.
                  </>,
                  <>
                    <strong className="text-ink">A qualification flag that barely separates.</strong>{" "}
                    {fmt(sample.qualified)} of {fmt(sample.persons)} persons are marked Qualified, so “qualified to SQL” is
                    almost the same as “lead to SQL”.
                  </>,
                  <>
                    <strong className="text-ink">Messy sources.</strong> Raw lead source holds blanks, “google” and
                    “google.com”, page URLs and referrers. Reporting is only useful after mapping them to agreed groups.
                  </>,
                ]}
              />
              <WonDateChart />
              <P>
                In November 2025 the sample CRM has 13 won deals. Counted by creation month, the same question
                returns 0, because those deals were created months earlier. This was the most common error in the
                tests below.
              </P>
              <ChannelChart />
              <div className="overflow-x-auto">
                <table className="viz-table">
                  <caption className="mb-3 text-left text-sm text-muted">
                    Raw lead source values in the sample CRM and the agreed group each one maps to.
                  </caption>
                  <thead>
                    <tr>
                      <th>Raw lead source</th>
                      <th>Medium</th>
                      <th>Agreed group</th>
                      <th>Persons</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rawSources.map((r) => (
                      <tr key={`${r.raw}-${r.medium}`}>
                        <td className="font-mono text-xs break-all">{r.raw}</td>
                        <td className="font-mono text-xs">{r.medium}</td>
                        <td>{r.group}</td>
                        <td>{fmt(r.persons)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="overflow-x-auto">
                <table className="viz-table">
                  <caption className="mb-3 text-left text-sm text-muted">
                    The canonical monthly funnel on the sample CRM, last six months. Won deals are counted by won date.
                  </caption>
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Leads</th>
                      <th>Qualified</th>
                      <th>SQLs</th>
                      <th>Won</th>
                    </tr>
                  </thead>
                  <tbody>
                    {funnelTail.map((r) => (
                      <tr key={r.month}>
                        <td>{r.month}</td>
                        <td>{r.leads}</td>
                        <td>{r.qualified}</td>
                        <td>{r.sql}</td>
                        <td>{r.won}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="tests" title="How I tested it: accuracy, not impressions">
              <P>
                A chat demo that answers one question well proves little. So on the pilot data I asked the{" "}
                <strong className="text-ink">same funnel question 8 times per setup</strong>: for one month, how many
                leads, qualified leads, SQLs and won deals, and the won revenue. I scored every run by value against
                the known-correct answer.
              </P>
              <P>
                My first scoring script compared column names and wrongly failed two correct runs. I fixed it to score by
                value and rescored every batch. The numbers below are the corrected ones.
              </P>
              <P>Between batches I changed one thing at a time: how the definitions were written, then the model.</P>
            </Section>

            <Section id="results" title="Results: from 3 to 6 correct out of 8">
              <RunStrips />
              <Bullets
                items={[
                  <>
                    <strong className="text-ink">Narrow metrics beat long descriptions.</strong> The won-by-creation-month
                    error disappeared once one metric stated exactly one rule: won deals are counted by won date.
                  </>,
                  <>
                    <strong className="text-ink">A bigger model removed the worst failures</strong> (no answer, and SQL
                    made only of typed-in numbers) but not the wrong-date error.
                  </>,
                  <>
                    <strong className="text-ink">One big query did not help.</strong> In B2 the agent never used the
                    canonical funnel query it was given, and the score dropped.
                  </>,
                  <>
                    <strong className="text-ink">It refuses honestly.</strong> Asked for ad spend, which the data does not
                    contain, it said so instead of inventing a number.
                  </>,
                  <>
                    <strong className="text-ink">Fixes do not stack neatly.</strong> In B4 the old error went away and two
                    new, different errors appeared.
                  </>,
                ]}
              />
            </Section>

            <Section id="screens" title="What it looks like">
              <P>Screenshots from a build of the synthetic database only.</P>
              <Shot
                src={termsImg}
                alt="Auto Ontology Terms page listing the Deal and Lead terms with counts of column attributes, SQL attributes and related terms."
                caption="Terms catalog. Deal carries 6 SQL metrics; every term is still marked Pending Approval because no one certified it."
              />
              <Shot
                src={metricsImg}
                alt="Deal term page listing SQL attributes such as Monthly Funnel, SQL and Won by Channel, Won Deals, and Won Deals and Revenue by Won Month."
                caption="The funnel metrics under the Deal term, each one a single, narrow SQL definition."
              />
              <Shot
                src={chatImg}
                alt="Chat answer saying 13 deals were won in November 2025, with the SQL that filters on won_time and a result table."
                caption="A chat answer with its SQL. It counts by won_time and matches the same query run directly. That was one check, not a repeat test."
              />
            </Section>

            <Section id="value" title="What this means for marketing and CRM teams">
              <div className="overflow-x-auto">
                <table className="viz-table">
                  <thead>
                    <tr>
                      <th>Need</th>
                      <th>What the layer adds</th>
                      <th>What I saw</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>One funnel definition</td>
                      <td>Leads, qualified leads, SQLs and won deals defined once, in SQL</td>
                      <td>Matched the reference figures exactly when run directly</td>
                    </tr>
                    <tr>
                      <td>Channel reporting</td>
                      <td>Always group by the agreed source/medium group, never raw lead source</td>
                      <td>The agent used the grouping once it existed as a metric</td>
                    </tr>
                    <tr>
                      <td>Self-serve questions</td>
                      <td>Plain-English questions, answers in seconds with the SQL</td>
                      <td>Fine for simple questions; funnel questions still need their SQL read</td>
                    </tr>
                    <tr>
                      <td>Honest gaps</td>
                      <td>Missing data, such as ad spend for CAC or ROAS, is reported, not guessed</td>
                      <td>Observed</td>
                    </tr>
                    <tr>
                      <td>CRM data quality</td>
                      <td>Building the layer surfaces issues worth fixing</td>
                      <td>Untagged traffic in “direct”, a weak qualification flag, won dates that look recorded late</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="limits" title="Limits and next steps">
              <Bullets
                items={[
                  "Not production-ready. The best result was 6 of 8 on one question, and 8 runs per batch is a small sample.",
                  "Nothing is certified. Certification is the human review step in Auto Ontology, and I did not do it.",
                  "Only one funnel question was repeat-tested. More questions need the same treatment.",
                  "Sampled values and questions go to NVIDIA’s hosted models. Review that before using real client data.",
                  "Rates written as ratios of monthly totals can go above 100%. A cohort funnel is the fairer next metric.",
                  "Predictions (the optional Kumo integration) were not tested.",
                ]}
              />
            </Section>

            <Section id="reproduce" title="Reproduce it on synthetic data">
              <P>
                The repository has the synthetic CRM generator, the funnel SQL, a script that checks the totals add up,
                and the patch. It needs Docker, uv and an NVIDIA API key for the Auto Ontology step.
              </P>
              <div className="flex flex-wrap gap-3">
                <a
                  href={REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  {...trackAttrs("case_study_link_click", { case_study: SLUG, link_type: "source_code" })}
                >
                  Open the repository <ArrowUpRight />
                </a>
                {caseStudy ? (
                  <Link href={`/projects/${caseStudy.slug}`} className="btn btn-ghost">
                    Case file {caseStudy.code} <ArrowRight />
                  </Link>
                ) : null}
              </div>
              <p className="max-w-3xl text-sm leading-relaxed text-muted">
                Built on NVIDIA Auto Ontology (Apache-2.0). Not affiliated with or endorsed by NVIDIA.
              </p>
            </Section>
          </div>
        </div>

        <nav aria-label="More" className="mt-20 flex flex-wrap gap-3 border-t border-line pt-10 sm:mt-28">
          <Link href="/" className="btn btn-ghost">
            <ArrowLeft /> Back to mission control
          </Link>
          <Link href="/#contact" className="btn btn-primary">
            Contact Nabil <ArrowRight />
          </Link>
        </nav>
      </article>
    </>
  );
}
