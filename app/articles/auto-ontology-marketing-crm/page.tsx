import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ChannelChart, RunStrips, WonDateChart } from "@/components/articles/auto-ontology/Charts";
import { Architecture } from "@/components/articles/auto-ontology/Architecture";
import { CompileChart, KumoChart, QuestionSetsChart, SpeedChart } from "@/components/articles/auto-ontology/ResultCharts";
import { rawSources, sample } from "@/components/articles/auto-ontology/data";
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
  { id: "setup", label: "The setup" },
  { id: "measure", label: "How I measured" },
  { id: "not-working", label: "What did not work" },
  { id: "working", label: "What worked" },
  { id: "results", label: "The results" },
  { id: "kumo", label: "Side quest: Kumo" },
  { id: "lessons", label: "Lessons" },
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

const B = ({ children }: { children: React.ReactNode }) => <strong className="text-ink">{children}</strong>;

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
                Source code on GitHub <ArrowUpRight />
              </a>
            </li>
          </ul>
          <p className="rise mt-8 max-w-3xl rounded-xl border border-line bg-cyan/5 px-4 py-3 text-sm leading-relaxed text-soft">
            <span className="font-semibold text-ink">About the data.</span> The pilot ran on a real CRM export from an
            anonymous B2B services company. Nothing from that export appears here: from the real data I only report test
            scores, such as how many answers were right and how long they took. Every chart of data values, every table
            of records and every screenshot comes from a seeded synthetic CRM built to have the same quirks. The Kumo
            Engine test ran on synthetic data only.
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
                Marketing funnel numbers usually live in pivot sheets. The word “leads” means one thing in one tab and
                something else in the next, raw lead sources are messy, and when two reports disagree nobody can say
                which one is right.
              </P>
              <P>
                An <B>ontology layer</B> is a shared set of business definitions that sits on top of the data: what a
                lead is, when a deal counts as won, which channel a contact belongs to. The promise is that anyone can
                ask a funnel question in plain English and get an answer that follows the agreed definitions, with the
                SQL shown so the number can be checked.
              </P>
              <P>
                I wanted to know if that holds up, correctly and every time, so I tested{" "}
                <a
                  href="https://github.com/NVIDIA/auto-ontology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan underline decoration-line-strong underline-offset-4 hover:decoration-cyan"
                >
                  NVIDIA Auto Ontology
                </a>{" "}
                (open source, Apache-2.0) on a real CRM export from a company with no data warehouse yet. The short
                version: the defaults failed, more words and a bigger model only helped partly, and the big jump came
                from <B>taking choices away from the AI</B>.
              </P>
            </Section>

            <Section id="setup" title="The setup">
              <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
                {[
                  ["01", "CRM export", "Contacts, deals, leads, stages"],
                  ["02", "PostgreSQL", "8 tables; email and phone dropped first"],
                  ["03", "Auto Ontology", "Business terms, column descriptions, table links"],
                  ["04", "SQL metrics", "The agreed funnel rules, written by hand"],
                ].map(([n, t, d]) => (
                  <li key={n} className="bg-deep/95 p-4 sm:p-5">
                    <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-cyan">STEP {n}</p>
                    <p className="mt-2 font-semibold text-ink">{t}</p>
                    <p className="mt-1 text-sm leading-snug text-muted">{d}</p>
                  </li>
                ))}
              </ol>
              <P>
                I loaded the CRM export into Postgres as 8 tables. Auto Ontology then read the database, sampled values
                and drafted a business map on its own: terms such as Deal and Lead, a description for each column, and
                the links between tables. It writes no business rules, so I added the agreed funnel definitions myself
                as <B>10 SQL metrics</B>: leads, qualified leads, SQLs (sales-qualified leads), won deals, won revenue and channel results. Run
                directly, those metrics matched the company’s own reference figures exactly.
              </P>
              <P>
                The question was whether the chat agent on top would use those definitions when someone asked in plain
                English.
              </P>
              <P>
                <B>Which models.</B> Auto Ontology does not run a model locally. It calls NVIDIA’s hosted models through
                their API, once to build the map and again for every question. B1 and B2 used the tool’s smaller
                default model, <B>NVIDIA Nemotron 3.5 Lightning</B>, for answering; from B3 on, answers came from{" "}
                <B>NVIDIA Nemotron Ultra</B>, a larger model. The database, the ontology and the agent ran on my
                machine in Docker. Kumo Engine, in the side test, ran on a local CPU.
              </P>
              <Architecture />
              <Shot
                src={graphImg}
                alt="Auto Ontology exploration view showing four terms, Person, Deal, Lead and Stage, connected by lines."
                caption="The business map Auto Ontology drafted for the synthetic CRM: four terms and the links between them."
              />
            </Section>

            <Section id="measure" title="How I measured: the same question, 8 times">
              <P>
                A chat demo that answers one question well proves very little. AI answers vary from run to run, so I
                asked the <B>same funnel question 8 times per setup</B>: for one month, how many leads, qualified leads,
                SQLs and won deals, and how much won revenue. Every answer was scored by value against a known-correct
                result computed directly in SQL.
              </P>
              <P>
                Scoring by value matters. My first scoring script compared column names and wrongly failed two correct
                answers. I rescored every batch by value, and all numbers here are the corrected ones.
              </P>
              <P>
                Between batches I changed one thing at a time. Later I also ran two larger sets of plain-language
                questions, asked once each, to see whether the fix carried over beyond one question.
              </P>
              <Shot
                src={chatImg}
                alt="Chat answer saying 13 deals were won in November 2025, with the SQL that filters on won_time and a result table."
                caption="A chat answer with its SQL, on the synthetic CRM. The SQL is what makes the answer checkable."
              />
            </Section>

            <Section id="not-working" title="What did not work">
              <P>
                <B>The default build.</B> The first build reported success while 9 model calls had failed. The hosted
                endpoint rejected one field that the tool’s client library sends. I tried 7 hosted models; the 5 that
                responded all failed the same way, so changing the model would not have helped. The result was thin:
                104 of 130 columns described and a single link between tables. A patch of about six lines fixed it by
                sending requests through the endpoint’s OpenAI-compatible client with tool calling.
              </P>
              <P>
                <B>Putting the rules in descriptions.</B> With the default model (Nemotron 3.5 Lightning) and the funnel rules written into the
                term descriptions, 3 of 8 answers were right (B1). The most common error was counting won deals by the
                month they were created instead of the month they were won.
              </P>
              <WonDateChart />
              <P>
                On the synthetic CRM, {sample.wonLaterMonth} of {sample.won} won deals were won in a later month than
                they were created. Ask “how many deals did we win in November?” and count by creation month, and you
                get 0 instead of 13. On the real data the same trap produced confident, wrong answers.
              </P>
              <P>
                <B>One big canonical query.</B> I gave the agent a single query that computes the whole monthly funnel.
                It ignored it, and the score dropped to 2 of 8 (B2).
              </P>
              <P>
                <B>A bigger model on its own.</B> Switching to a larger model for answering (Nemotron Ultra) removed the
                worst failures, no answer at all and SQL made only of typed-in numbers, but it still guessed the rules:
                4 of 8 (B3). Adding one narrow metric that stated the won-date rule lifted it to 6 of 8 (B4), and then
                two different errors appeared. Fixes did not stack neatly.
              </P>
            </Section>

            <Section id="working" title="What worked: remove choices instead of adding words">
              <P>
                Every failing answer had the same shape. The agent had several plausible ways to compute a number and
                picked the wrong one: the wrong date column, the wrong table for “lead”, a raw source column instead of
                the agreed channel group. More description gave it more to read, not fewer ways to go wrong.
              </P>
              <P>So I took the choices away:</P>
              <Bullets
                items={[
                  <>
                    <B>Narrow, single-purpose metrics.</B> One metric per way of computing one figure, each stating one
                    rule, such as “won deals are counted by won date”.
                  </>,
                  <>
                    <B>Database views that build the rules in.</B> A view of won deals with the won month already
                    worked out, a view of deals that carries the agreed channel group, and a monthly funnel view. The
                    agent no longer has to know the rule; the only column on offer is the right one.
                  </>,
                  <>
                    <B>Hiding the tables that confused it.</B> Two tables were hidden from the agent. In the synthetic
                    demo the equivalent is an inbox table also called “leads”, which is not the funnel’s definition of a
                    lead.
                  </>,
                  <>
                    <B>One stated definition for every ambiguous word.</B> “SQL” and “win rate” were guessed differently
                    from run to run until a metric stated them. Win rate alone has two common definitions: won out of
                    closed deals, or won out of all deals.
                  </>,
                ]}
              />
              <Shot
                src={metricsImg}
                alt="Deal term page listing SQL attributes such as Monthly Funnel, SQL and Won by Channel, Won Deals, and Won Deals and Revenue by Won Month."
                caption="Narrow funnel metrics under the Deal term on the synthetic CRM, each one a single SQL definition."
              />
            </Section>

            <Section id="results" title="The results">
              <P>
                With the views in place and the two tables hidden, the same funnel question was answered correctly{" "}
                <B>8 times out of 8</B> (B5), up from 3 of 8 with the defaults.
              </P>
              <RunStrips />
              <P>
                The fix carried over. On the real data, a set of 17 plain-language questions, the way a marketer would
                ask them, scored 15 of 17 with the views and a stated win-rate metric, and 17 of 17 once a person-level
                channel view was added. On the synthetic demo the gain was smaller because the clean schema was already
                easy: 15 to 16 of 17 for plain wording, and 19 of 20 before and after for questions with the rules
                spelled out.
              </P>
              <QuestionSetsChart />
              <P>
                Removing choices also made answers faster. The median answer time fell from 59.5 seconds in B4 to 21
                seconds in B5.
              </P>
              <SpeedChart />
              <P>
                And the build itself: once the client was patched and the views were in, every column was described.
                The lesson from the first build stands, though. Every one of these builds said “success”.
              </P>
              <CompileChart />
              <P>
                One thing held from the start: asked for ad spend, which the data does not contain, the agent said so
                instead of inventing a number. Once it returned empty cost columns instead of a clean refusal, which is
                still not a made-up figure but is easier to misread.
              </P>
            </Section>

            <Section id="kumo" title="Side quest: predictions with Kumo Engine">
              <P>
                With the definitions in place, the next obvious question is prediction: which leads are likely to
                become deals? I tried Kumo Engine, which builds prediction models straight from linked database
                tables, on the synthetic CRM on a local CPU.
              </P>
              <KumoChart />
              <P>
                Across runs Kumo Engine scored an AUROC of 0.52 to 0.58 for lead scoring. A simple rate per channel, each
                channel’s historical conversion rate, scored 0.589, and the best possible score on this data was 0.606. All of
                these sit close together and the intervals overlap.
              </P>
              <P>
                That is not a verdict on Kumo Engine. The synthetic data was generated so that the channel is the only
                real signal, so there was nothing extra for a model to learn. The useful point is the order of work:{" "}
                <B>measure a simple baseline first</B>. On small data a per-channel rate is a tough number to beat, and
                if a model cannot beat it, the cheaper answer wins.
              </P>
            </Section>

            <Section id="lessons" title="Lessons for marketing and CRM teams">
              <div className="overflow-x-auto">
                <table className="viz-table">
                  <thead>
                    <tr>
                      <th>Lesson</th>
                      <th>What I saw</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Remove choices instead of adding words</td>
                      <td>Descriptions and a bigger model gave 4 to 6 of 8; views plus hidden tables gave 8 of 8</td>
                    </tr>
                    <tr>
                      <td>Give every ambiguous business word one stated definition</td>
                      <td>“SQL” and “win rate” were guessed differently until a metric stated them</td>
                    </tr>
                    <tr>
                      <td>Raw columns compete with agreed groupings</td>
                      <td>
                        Referral leads came out wrong from the raw source column until a view carried the agreed channel
                        group
                      </td>
                    </tr>
                    <tr>
                      <td>Check what the tool actually built</td>
                      <td>The first build said “success” with 9 failed steps</td>
                    </tr>
                    <tr>
                      <td>Measure with repeats and score by value</td>
                      <td>Single answers looked fine; repeats showed a coin flip before the fix</td>
                    </tr>
                    <tr>
                      <td>Start with a simple baseline, then a model</td>
                      <td>A per-channel rate matched Kumo Engine on the synthetic data</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <P>
                The channel lesson is the one most CRM teams will recognise. Raw lead source holds blanks, “google” and
                “google.com”, page URLs and referrers. Reporting only becomes useful once each value maps to one agreed
                group, and the AI only uses that group when it is the easiest thing to reach. Here is what that looks
                like on the synthetic CRM:
              </P>
              <ChannelChart />
              <div className="overflow-x-auto">
                <table className="viz-table">
                  <caption className="mb-3 text-left text-sm text-muted">
                    Raw lead source values in the synthetic CRM and the agreed group each one maps to.
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
              <P>
                Building the layer also surfaced CRM hygiene issues worth fixing on their own: untagged traffic landing
                in “direct”, a qualification flag that barely separates leads, and won dates that look recorded late.
              </P>
            </Section>

            <Section id="limits" title="Limits">
              <Bullets
                items={[
                  "Not production-ready, and not “always right”. The samples are small: 8 runs per batch on one funnel question, and one run per question in the larger sets.",
                  "Nothing is certified. Certification is the human review step in Auto Ontology, and I did not do it; every term below is still pending approval.",
                  "Each fix was tuned on the questions I tested. New questions can bring new errors, so funnel answers still need their SQL read.",
                  "The Kumo Engine test used synthetic data whose only signal is the channel. It says nothing about how Kumo Engine performs on richer data.",
                  "Sampled values and questions go to NVIDIA’s hosted models. Review that before using real client data.",
                  "Rates written as ratios of monthly totals can go above 100%. A cohort funnel is the fairer next metric for campaigns.",
                ]}
              />
              <Shot
                src={termsImg}
                alt="Auto Ontology Terms page listing the Deal and Lead terms with counts of column attributes, SQL attributes and related terms."
                caption="Terms catalog on the synthetic CRM. Every term is still marked Pending Approval because no one certified it."
              />
            </Section>

            <Section id="reproduce" title="Reproduce it on synthetic data">
              <P>
                The repository has the synthetic CRM generator, the funnel SQL and views, a script that checks the
                totals add up, the patch and the anonymized test log. It needs Docker, uv and an NVIDIA API key for the
                Auto Ontology step.
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
                Built on NVIDIA Auto Ontology (Apache-2.0). Not affiliated with or endorsed by NVIDIA or Kumo.
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
