import type { Metadata } from "next";
import Link from "next/link";
import { FeasibilityHeatmap, LowRoiChart, ScenarioChart } from "@/components/articles/mmm-benchmark/Charts";
import { ArrowLeft, ArrowRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { getArticle } from "@/content/articles";
import { profile } from "@/content/profile";
import { getCaseStudy } from "@/content/projects";
import { articleLd } from "@/lib/jsonld";
import { SITE_NAME } from "@/lib/site";

const SLUG = "mmm-benchmark-meridian-pymc";
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
  { id: "setup", label: "The benchmark" },
  { id: "tie", label: "Out of the box" },
  { id: "priors", label: "Unusual ROIs" },
  { id: "lift", label: "Lift tests" },
  { id: "curves", label: "Curve shape" },
  { id: "real", label: "A real campaign" },
  { id: "feasibility", label: "What was readable" },
  { id: "playbook", label: "The playbook" },
  { id: "decisions", label: "Business decisions" },
  { id: "limits", label: "Limits" },
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

const B = ({ children }: { children: React.ReactNode }) => <strong className="text-ink">{children}</strong>;

const ext = "text-cyan underline decoration-line-strong underline-offset-4 hover:decoration-cyan";

export default function MmmBenchmarkArticle() {
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
              Benchmark
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
          <p className="rise mt-8 max-w-3xl rounded-xl border border-line bg-cyan/5 px-4 py-3 text-sm leading-relaxed text-soft">
            <span className="font-semibold text-ink">About the data.</span> Every outcome in this article is simulated, so
            the true ROI is known and each tool can be scored. The second half uses the shape of a real campaign’s
            flighting, with streams simulated on top. No client name, artist, dates, spend or ad data appear here.
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
            <Section id="problem" title="Nobody can check an MMM's answer">
              <P>
                A marketing mix model (MMM) reads weekly sales and media spend and estimates what each channel returned:
                its <B>ROI</B>, the revenue a channel added per unit of spend. Budgets get moved on those numbers.
              </P>
              <P>
                The catch is that the answer can never be checked on real data. Nobody sees what sales would have been
                without a channel, so there is no true ROI to compare against. Two tools can give different ROIs for the
                same channel, and both can fit the data well.
              </P>
              <P>
                I wanted to compare the two best-known open-source Bayesian MMMs,{" "}
                <a href="https://github.com/google/meridian" target="_blank" rel="noopener noreferrer" className={ext}>
                  Google Meridian
                </a>{" "}
                and{" "}
                <a href="https://github.com/pymc-labs/pymc-marketing" target="_blank" rel="noopener noreferrer" className={ext}>
                  PyMC-Marketing
                </a>
                , apples to apples. The only way to do that fairly is to build data where the truth is known.
              </P>
            </Section>

            <Section id="setup" title="The benchmark: simulated data with known ROIs">
              <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
                {[
                  ["01", "Simulate", "156 weeks, 3 channels, true ROIs set on purpose"],
                  ["02", "Fit both", "Same table, same controls, same 143-week training split"],
                  ["03", "Score", "ROI error against the truth, interval coverage, held-out fit"],
                  ["04", "Repeat", "5 seeds per scenario, 4 scenarios"],
                ].map(([n, t, d]) => (
                  <li key={n} className="bg-deep/95 p-4 sm:p-5">
                    <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-cyan">STEP {n}</p>
                    <p className="mt-2 font-semibold text-ink">{t}</p>
                    <p className="mt-1 text-sm leading-snug text-muted">{d}</p>
                  </li>
                ))}
              </ol>
              <P>
                The simulator writes 156 weeks of national data for YouTube, TikTok and Meta. Spend comes in campaign
                bursts, plus six shared “release” weeks where every channel pushes at once, so the channels are
                correlated the way they are in a real launch. Revenue is a baseline (level, trend, yearly seasonality)
                plus media effects with carryover (geometric adstock) and diminishing returns (Hill saturation), plus 4%
                noise.
              </P>
              <P>
                Both tools get the same spend columns, the same controls and the same split: 143 weeks to train, the
                last 13 held out. Each runs with its out-of-the-box priors and 4 chains. Every scenario runs on 5 random
                seeds: different spend patterns and noise, same true ROIs.
              </P>
            </Section>

            <Section id="tie" title="Out of the box: a tie, and fit proves nothing">
              <P>
                With true ROIs of <B>YouTube 1.8, TikTok 1.2 and Meta 2.6</B>, both tools were about 10% off on average
                (Meridian 10.2%, PyMC-Marketing 10.4%). Both ranked the three channels in the right order in all 5
                seeds, and both had the truth inside their 90% interval in 13 of 15 cases.
              </P>
              <ScenarioChart />
              <P>
                They failed in different places. PyMC-Marketing kept underestimating YouTube, the channel with the
                slowest carryover. Meridian overestimated TikTok, the smallest and fastest-fading channel.
              </P>
              <P>
                The more important finding: <B>fit doesn’t prove ROI</B>. Both tools predicted held-out revenue within
                about 2.5%, yet on the same seed their YouTube ROIs differed by up to 25% (1.81 against 1.44). If you
                picked a model by its fit, you would never see that.
              </P>
            </Section>

            <Section id="priors" title="When the truth is unusual, the prior shows">
              <P>
                The first scenario’s ROIs sat close to Meridian’s default ROI prior. So I moved two channels well away
                from it: <B>YouTube 0.4</B>, a channel that loses 60 cents per unit spent, and <B>TikTok 5.0</B>. Meta
                stayed at 2.6.
              </P>
              <P>
                A high ROI was no problem: both tools found TikTok’s 5.0 within about 5%. The low ROI was where the
                prior showed. Meridian pulled YouTube’s 0.4 up to <B>0.58</B> on average, with wide intervals.
                PyMC-Marketing erred the other way, at 0.25, with tighter intervals that missed the truth more often.
              </P>
              <LowRoiChart />
              <P>
                That changes the decision. Both point estimates say YouTube is below break-even, but Meridian’s
                interval crossed 1.0 in <B>4 of 5 seeds</B>, so out of the box it could not say with confidence that
                YouTube loses money. Mean error rose to 19.6% for Meridian and 14.3% for PyMC-Marketing.
              </P>
              <P>
                One more lesson from this run: one Meridian fit in five failed to converge (R-hat 26, where a healthy
                fit is about 1.0), and nothing else flagged it. A refit with a different sampler seed converged.{" "}
                <B>Always read R-hat before reading ROIs.</B>
              </P>
            </Section>

            <Section id="lift" title="Lift tests fix it, for both tools">
              <P>
                The fix for a prior that doesn’t match reality is evidence. Each seed got one simulated lift test per
                channel with about <B>20% measurement error</B>, so some reads were well off: in one seed TikTok read
                3.61 against a truth of 5.0. Both tools got the same error draw, each in its own format. Meridian takes
                an ROI and turns it into its ROI prior; PyMC-Marketing takes a point on the response curve.
              </P>
              <P>
                That format difference matters. Steady spend at the average level returns 10–18% more per unit than the
                period ROI, because bursty spend saturates harder. Handing PyMC-Marketing the period ROI would have
                biased it low, so each tool got the readout its own experiment would produce.
              </P>
              <Bullets
                items={[
                  <>
                    <B>Errors fell sharply.</B> Meridian went from 19.6% to <B>6.6%</B>, PyMC-Marketing from 14.3% to{" "}
                    <B>8.7%</B>. Both now covered the truth in 13 of 15 cases and said “YouTube loses money” with
                    confidence in every seed. Meridian’s YouTube estimate landed on 0.40.
                  </>,
                  <>
                    <B>Both models beat the experiments they were given.</B> The raw lift reads alone were 12.2% off.
                    Where the data carried a strong signal, the models overrode bad reads: that 3.61 TikTok read became
                    5.24 in Meridian and 5.15 in PyMC-Marketing. Where the data was weak, they leaned on the test.
                  </>,
                  <>
                    <B>The remaining gap was YouTube alone.</B> On TikTok and Meta the two tools were within 2 points
                    of each other; PyMC-Marketing still pulled YouTube low.
                  </>,
                ]}
              />
            </Section>

            <Section id="curves" title="The curve shape matters more than the tool">
              <P>
                The simulator uses Hill saturation curves, which is also Meridian’s default. PyMC-Marketing’s default is
                logistic. So I reran the calibrated scenario with PyMC-Marketing on Hill curves and changed nothing
                else.
              </P>
              <P>
                Its error fell from 8.7% to <B>7.0%</B>, against Meridian’s 6.6%. Over 15 channel estimates and 5 seeds
                that is a tie. Meridian was a little closer on YouTube, PyMC-Marketing on TikTok, and PyMC-Marketing
                covered the truth once more (14 of 15).
              </P>
              <P>
                Both tools support either curve. Picking the one that matches how a channel really saturates moved
                PyMC-Marketing’s error by about 20%, more than the difference between the tools. On real data the true
                shape is unknown, so <B>fitting both curves and checking whether the ROIs move</B> is a cheap,
                sensible check.
              </P>
              <P>
                The clearest difference left was speed. On CPU, Meridian fitted in about 14–17 seconds per run,
                PyMC-Marketing in about 60–90 seconds: roughly 5x faster, which matters when refitting often or running
                many markets.
              </P>
            </Section>

            <Section id="real" title="Then a real campaign: unmeasurable by design">
              <P>
                With the tools understood, I tried a real campaign: a <B>music-video launch across five Southeast Asian
                markets</B> (Singapore, Vietnam, Thailand, the Philippines and Malaysia) on TikTok, Meta (Facebook) and
                YouTube via Google Ads. There was a 17-day launch flight on all three platforms after about four months
                of lighter flights on TikTok and Meta.
              </P>
              <P>It could not be measured, for two reasons:</P>
              <Bullets
                items={[
                  <>
                    <B>No outcome was collected.</B> Every campaign was bought on view or display objectives. The ad
                    platforms report what the spend bought (impressions, views), but nothing recorded streams, so there
                    was no sales-like series for an MMM to explain.
                  </>,
                  <>
                    <B>YouTube started on release day.</B> Its spend rose exactly when organic streams would surge from
                    the release itself. No model can separate two things that move together perfectly.
                  </>,
                ]}
              />
              <P>
                So I turned the question round: <B>if streams had been collected, could any MMM have told the three
                channels apart, given how the campaign was actually flighted?</B>
              </P>
            </Section>

            <Section id="feasibility" title="What any MMM could have read: TikTok yes, Meta unclear, YouTube no">
              <P>
                I kept the real daily spend schedule by market and platform and simulated streams on top, with known
                true effects. Baseline streams scale with market population and include a weekly cycle; the release
                doubles streams and fades over about two weeks; daily noise is 15%. Since the real effect size is
                unknown, I varied it: paid ads drive <B>5%, 15% or 30%</B> of streams during the launch flight, with
                3 seeds each.
              </P>
              <P>
                I fitted Meridian with data by market, Meridian on national totals, and PyMC-Marketing on national
                totals. A channel counts as measurable when the 90% range contains the truth, is no wider than the
                effect itself, and the estimate is within 25%.
              </P>
              <FeasibilityHeatmap />
              <Bullets
                items={[
                  <>
                    <B>TikTok was measurable.</B> It had the longest and most varied spend history. With market-level
                    data, Meridian recovered it within 12% even when ads drive only 5% of streams, and within 3–4% at
                    larger effects.
                  </>,
                  <>
                    <B>YouTube was effectively unmeasurable.</B> National models credited YouTube with the release
                    itself, overstating its effect by 390% to 3,120%. Only with market-level data and a large effect
                    (30% of streams) did it become readable.
                  </>,
                  <>
                    <B>Meta stayed ambiguous.</B> Estimates landed near the truth, but the ranges were 1.3x to 4x the
                    effect itself, too wide to act on.
                  </>,
                  <>
                    <B>Market-level data was the biggest lever.</B> At the same effect size, splitting by market cut
                    YouTube’s error from 3,120% to 182% and made TikTok measurable at every effect size. Markets moving
                    at different times is what lets a model separate ads from everything else.
                  </>,
                ]}
              />
              <P>
                PyMC-Marketing on national daily totals never converged (R-hat 1.6–1.7) with default settings, so its
                cells are greyed out. It was not tuned, and a tuned or market-level version could do better.
              </P>
            </Section>

            <Section id="playbook" title="The playbook: buy what you want to measure">
              <P>
                The campaign’s design decided what could be measured, more than the choice of tool. Impact can’t be
                measured after the fact if the outcome was never recorded, so the playbook for the next launch starts
                before any money is spent.
              </P>
              <div className="overflow-x-auto">
                <table className="viz-table">
                  <thead>
                    <tr>
                      <th>Step</th>
                      <th>What to do</th>
                      <th>Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1. Collect the outcome</td>
                      <td>Daily streams by market, from 8+ weeks before release to 4 weeks after the last ad</td>
                      <td>No outcome series, no MMM</td>
                    </tr>
                    <tr>
                      <td>2. Stagger the start</td>
                      <td>Start a channel on release day in some markets and a week later in others</td>
                      <td>Separates the channel from the release surge</td>
                    </tr>
                    <tr>
                      <td>3. Hold one market out</td>
                      <td>Keep one channel off in one market for 2–3 weeks; rotate the channel each flight</td>
                      <td>A geo lift test to calibrate the MMM, which cut error to 6.6% in the benchmark</td>
                    </tr>
                    <tr>
                      <td>4. Vary spend on purpose</td>
                      <td>On/off pulses, uneven market splits, a longer and steadier Meta flight</td>
                      <td>Variation in time and across markets is what makes a channel readable</td>
                    </tr>
                    <tr>
                      <td>5. Align part of the buy</td>
                      <td>Test a streams-oriented setup (streaming-link traffic, pre-saves) in some markets</td>
                      <td>Views objectives optimise for views, not streams</td>
                    </tr>
                    <tr>
                      <td>6. Check the plan first</td>
                      <td>Run the feasibility simulation on the planned flighting before launch</td>
                      <td>If a channel can’t be recovered on clean simulated data, change the plan, not the model</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <P>
                After the campaign: a market-level model on daily data with a release-window control, ROI priors from
                the holdout tests, an R-hat check, both curve shapes compared, and ranges reported instead of single
                numbers. Act only where the range clears break-even.
              </P>
            </Section>

            <Section id="decisions" title="What it means for business and decision making">
              <P>
                An MMM is not a reporting tool; it is a budgeting tool. Its ROIs decide which channel gets more money next
                quarter and which one gets cut. So the useful question is not “which tool is more accurate?” but{" "}
                <B>“which decision would I have made, and would it have been right?”</B>
              </P>

              <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                A worked example: the channel that loses money
              </h3>
              <P>
                Take the benchmark’s YouTube channel with a true ROI of 0.4. For every 100 spent, it brings back 40: a loss
                of 60. The right decision is to cut it or move the budget. Here is what each setup would have told the
                marketing team, and what they would most likely have done:
              </P>
              <div className="overflow-x-auto">
                <table className="viz-table">
                  <thead>
                    <tr>
                      <th>Setup</th>
                      <th>Return per 100 spent</th>
                      <th>Range below break-even?</th>
                      <th>Likely decision</th>
                      <th>Right call?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Truth</td>
                      <td>40</td>
                      <td>n/a</td>
                      <td>Cut or move the budget</td>
                      <td>n/a</td>
                    </tr>
                    <tr>
                      <td>Meridian, default prior</td>
                      <td>58</td>
                      <td>1 of 5 runs</td>
                      <td>“Not sure it loses money”: budget usually stays, or another quarter of spend goes in to find out</td>
                      <td>Delayed; the loss continues</td>
                    </tr>
                    <tr>
                      <td>PyMC-Marketing, default</td>
                      <td>25</td>
                      <td>5 of 5 runs</td>
                      <td>Cut</td>
                      <td>Yes, though it makes the channel look worse than it is</td>
                    </tr>
                    <tr>
                      <td>Either tool, with lift tests</td>
                      <td>32 to 40</td>
                      <td>5 of 5 runs</td>
                      <td>Cut, with evidence to defend it</td>
                      <td>Yes, confidently</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <P>
                The point estimates all said “below break-even”. What changed the decision was the <B>range</B>. A range
                that crosses break-even means the model can’t tell a loss from a gain, and most teams don’t cut a channel
                on “can’t tell”. That is how a money-losing channel survives several budget cycles. Splits between healthy
                channels are exposed too: two tools that fit the data equally well gave one channel ROIs 25% apart, enough to move
                a budget split between channels, and nothing in the fit warned about it.
              </P>

              <h3 className="font-display text-xl font-semibold tracking-tight text-ink">The decisions, one by one</h3>
              <div className="overflow-x-auto">
                <table className="viz-table">
                  <thead>
                    <tr>
                      <th>Business question</th>
                      <th>What the study says</th>
                      <th>What to do</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Which MMM tool should we adopt?</td>
                      <td>
                        With the same information and the same curve shape, they tied (6.6% vs 7.0%). Meridian fitted
                        about 5x faster.
                      </td>
                      <td>
                        Choose on speed, data shape (Meridian is built for market-level data) and your team’s skills.
                        Don’t expect a tool switch to fix accuracy.
                      </td>
                    </tr>
                    <tr>
                      <td>Can we trust the ROI in the deck?</td>
                      <td>A good fit (within 2.5%) said nothing about whether the ROIs were right.</td>
                      <td>
                        Ask for the range, not just the number, and for the convergence check (R-hat). One fit in five
                        failed silently.
                      </td>
                    </tr>
                    <tr>
                      <td>Should we cut or scale a channel?</td>
                      <td>Point estimates agreed; ranges decided whether a call could be made.</td>
                      <td>
                        Act only where the range clears break-even. Where it doesn’t, run a test before moving money.
                      </td>
                    </tr>
                    <tr>
                      <td>Is a lift test worth its cost?</td>
                      <td>
                        Even noisy tests cut error by about two thirds (19.6% to 6.6%) and turned “unclear” into a
                        confident call in every run.
                      </td>
                      <td>
                        Weigh one market held dark for 2–3 weeks against misallocating the budget every flight after it.
                        Rotate the tested channel each flight.
                      </td>
                    </tr>
                    <tr>
                      <td>Is a channel unusual for our business?</td>
                      <td>Default priors held up near typical ROIs and failed on a low one.</td>
                      <td>
                        For channels you suspect are weak (or very strong), calibrate with a test before trusting the
                        default settings.
                      </td>
                    </tr>
                    <tr>
                      <td>How do we plan the next launch?</td>
                      <td>
                        The campaign’s flighting, not the tool, decided what could be measured. YouTube’s value was
                        unknowable the day it launched with the release.
                      </td>
                      <td>
                        Collect the outcome by market, stagger channel starts and hold one market out. Check the plan
                        with a simulation before spending.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                What the music-video team could have decided
              </h3>
              <P>
                Had streams been collected, the real campaign would have supported some decisions and not others:
              </P>
              <Bullets
                items={[
                  <>
                    <B>TikTok: scale or cut with evidence.</B> Its long, varied spend history made it readable within 12%
                    by market, so its budget could be defended either way.
                  </>,
                  <>
                    <B>Meta: test before adding money.</B> Estimates were near the truth but too uncertain to justify a
                    budget change. A holdout market would settle it.
                  </>,
                  <>
                    <B>YouTube: no decision possible.</B> Launching on release day tied its spend to the organic surge.
                    National models would have credited it with up to about 30 times its real effect, the kind of
                    number that wins a bigger budget next time for the wrong reason.
                  </>,
                ]}
              />
              <P>
                The bigger business point is upstream of any model. Every buy was optimised for views and no streams
                were recorded, so the one question the label cared about, <B>did the ads drive listening?</B>, could not
                be answered at any price after the fact. Deciding what success means, and collecting it, is a planning
                decision, not an analytics one.
              </P>
              <P>
                The practical version for a marketing team: choose the tool for speed, data shape and how your team
                works, then spend the effort on <B>experiments and campaign design</B>. That is where the accuracy, and
                the confidence to move budget, came from in every scenario here.
              </P>
            </Section>

            <Section id="limits" title="Limits">
              <Bullets
                items={[
                  "The simulation uses Hill saturation, Meridian’s own default. Scenarios 1–3 ran PyMC-Marketing on its logistic default, which favours Meridian; Scenario 4 removes that difference.",
                  "The lift-test error (20%) and the prior widths are choices. Different values shift the calibrated numbers.",
                  "The benchmark uses national data only. Meridian is designed for geo-level data, where it should gain more.",
                  "Five seeds per scenario and three per feasibility setting show patterns, not precise rates. Budget-optimiser outputs were not compared.",
                  "In the feasibility study the true effects, decay rates, noise and release-surge shape are assumptions. The ranking of which channels are measurable comes from the real flighting and should hold; the exact percentages would not.",
                  "PyMC-Marketing ran with default settings throughout and was not tuned for the daily feasibility data.",
                ]}
              />
              <p className="max-w-3xl text-sm leading-relaxed text-muted">
                Built with Google Meridian 2.2 and PyMC-Marketing 0.19 (both open source). Not affiliated with or
                endorsed by Google or PyMC Labs.
              </p>
            </Section>
          </div>
        </div>

        <nav aria-label="More" className="mt-20 flex flex-wrap gap-3 border-t border-line pt-10 sm:mt-28">
          <Link href="/" className="btn btn-ghost">
            <ArrowLeft /> Back to mission control
          </Link>
          {caseStudy ? (
            <Link href={`/projects/${caseStudy.slug}`} className="btn btn-ghost">
              Case file {caseStudy.code} <ArrowRight />
            </Link>
          ) : null}
          <Link href="/#contact" className="btn btn-primary">
            Contact Nabil <ArrowRight />
          </Link>
        </nav>
      </article>
    </>
  );
}
