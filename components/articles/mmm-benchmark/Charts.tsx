"use client";

import { useRef, useState } from "react";
import { DataTable, Legend, tipAt, Tooltip, type Tip } from "../auto-ontology/Charts";
import { channels, feasibility, feasModels, lowRoi, scenarios, shares, TRUE_LOW_ROI, type FeasCell } from "./data";

/*
 * Charts for the MMM benchmark article. Same .viz tokens, legend, tooltip and table view as the
 * Auto Ontology article: viz-1 is Meridian, viz-2 is PyMC-Marketing, neutral is "lift tests alone".
 */

const pct = (v: number) => `${v.toLocaleString("en-US", { maximumFractionDigits: 1 })}%`;
const pct1 = (v: number) => `${v.toFixed(1)}%`;

function useTip() {
  const wrap = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip>(null);
  const bind = (content: React.ReactNode) => ({
    tabIndex: 0,
    onMouseEnter: (e: React.MouseEvent) => setTip({ ...tipAt(wrap.current, e.currentTarget), content }),
    onFocus: (e: React.FocusEvent) => setTip({ ...tipAt(wrap.current, e.currentTarget), content }),
    onBlur: () => setTip(null),
  });
  return { wrap, tip, setTip, bind };
}

/** ROI error by scenario and tool, with the raw lift-test error marked where lift tests were used. */
export function ScenarioChart() {
  const { wrap, tip, setTip, bind } = useTip();
  const MAX = 22;
  const x = (v: number) => `${(v / MAX) * 100}%`;

  return (
    <figure className="panel ticks p-5 sm:p-7">
      <figcaption>
        <p className="font-display text-lg font-semibold tracking-tight text-ink">
          ROI error by scenario: a tie, a gap, then a tie again
        </p>
        <p className="mt-1 text-sm text-muted">
          Mean error of 15 channel ROI estimates (3 channels × 5 seeds) against the true ROI. Lower is better.
        </p>
      </figcaption>
      <div className="mt-4">
        <Legend
          items={[
            { label: "Meridian", swatch: "bg-viz-1" },
            { label: "PyMC-Marketing", swatch: "bg-viz-2" },
            { label: "Lift tests alone (dashed line)", swatch: "border border-dashed border-soft bg-transparent" },
          ]}
        />
      </div>
      <div ref={wrap} className="relative mt-6 space-y-6" onMouseLeave={() => setTip(null)}>
        {scenarios.map((s) => (
          <div key={s.id}>
            <p className="text-sm font-medium text-ink">
              {s.name} <span className="font-normal text-muted">· {s.detail}</span>
            </p>
            <ul className="mt-2 space-y-[2px]">
              {(
                [
                  ["Meridian", s.meridian, "bg-viz-1"],
                  [s.pymcLabel, s.pymc, "bg-viz-2"],
                ] as const
              ).map(([label, v, cls]) => (
                <li
                  key={label}
                  className="grid grid-cols-[minmax(0,1fr)_3.5rem] gap-x-3 gap-y-1 outline-offset-2 sm:grid-cols-[11rem_minmax(0,1fr)_3.5rem]"
                  aria-label={`${s.name}, ${label}: ${pct1(v)} mean ROI error`}
                  {...bind(
                    <>
                      <span className="font-semibold">{label}</span>
                      <br />
                      {pct1(v)} mean ROI error
                    </>,
                  )}
                >
                  <span className="col-span-2 self-center text-xs text-muted sm:col-span-1">{label}</span>
                  <span className="relative block h-5 rounded-[4px] bg-line/40">
                    <span className={`block h-full rounded-r-[4px] ${cls}`} style={{ width: x(v) }} />
                    {s.liftAlone ? (
                      <span
                        aria-hidden="true"
                        className="absolute -top-[2px] -bottom-[2px] border-l-2 border-dashed border-soft"
                        style={{ left: x(s.liftAlone) }}
                      />
                    ) : null}
                  </span>
                  <span className="self-center text-right font-mono text-xs text-ink tabular-nums">{pct1(v)}</span>
                </li>
              ))}
            </ul>
            {s.liftAlone ? (
              <p className="mt-1.5 text-xs text-muted sm:pl-[11.75rem]">
                Dashed line: the lift tests on their own, {pct1(s.liftAlone)} error
              </p>
            ) : null}
          </div>
        ))}
        <Tooltip tip={tip} />
      </div>
      <DataTable summary="Show as a table">
        <table className="viz-table">
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Meridian</th>
              <th>PyMC-Marketing</th>
              <th>Lift tests alone</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((s) => (
              <tr key={s.id}>
                <td>
                  {s.name}: {s.detail}
                </td>
                <td>{pct1(s.meridian)}</td>
                <td>
                  {pct1(s.pymc)} ({s.pymcLabel.replace("PyMC-Marketing ", "")})
                </td>
                <td>{s.liftAlone ? pct1(s.liftAlone) : "n/a"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </figure>
  );
}

const GROUP_CLASS = { meridian: "bg-viz-1", pymc: "bg-viz-2", lift: "bg-viz-neutral" } as const;

/** Dot plot: the low-ROI channel's estimate per setup, against the truth and break-even. */
export function LowRoiChart() {
  const { wrap, tip, setTip, bind } = useTip();
  const MAX = 1.1;
  const x = (v: number) => `${(v / MAX) * 100}%`;
  const ticks = [0, 0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <figure className="panel ticks p-5 sm:p-7">
      <figcaption>
        <p className="font-display text-lg font-semibold tracking-tight text-ink">
          A channel that loses money: true ROI 0.4
        </p>
        <p className="mt-1 text-sm text-muted">
          Mean estimate over 5 seeds. Every setup lands below break-even (1.0); the default prior pulls Meridian up,
          lift tests bring it back to the truth.
        </p>
      </figcaption>
      <div className="mt-4">
        <Legend
          items={[
            { label: "Meridian", swatch: "bg-viz-1 rounded-full" },
            { label: "PyMC-Marketing", swatch: "bg-viz-2 rounded-full" },
            { label: "Lift tests alone", swatch: "bg-viz-neutral rounded-full" },
          ]}
        />
      </div>
      <div ref={wrap} className="relative mt-6" onMouseLeave={() => setTip(null)}>
        <ul className="space-y-1">
          {lowRoi.map((r) => (
            <li
              key={r.setup}
              aria-label={`${r.setup}: estimate ${r.estimate.toFixed(2)}, true 0.40`}
              className="grid grid-cols-1 gap-x-3 outline-offset-2 sm:grid-cols-[15rem_minmax(0,1fr)]"
              {...bind(
                <>
                  <span className="font-semibold">{r.setup}</span>
                  <br />
                  Estimate {r.estimate.toFixed(2)} · true {TRUE_LOW_ROI.toFixed(2)}
                  <br />
                  {r.estimate === TRUE_LOW_ROI
                    ? "On the truth"
                    : `${Math.round((Math.abs(r.estimate - TRUE_LOW_ROI) / TRUE_LOW_ROI) * 100)}% ${r.estimate > TRUE_LOW_ROI ? "too high" : "too low"}`}
                </>,
              )}
            >
              <span className="self-center text-xs text-muted">{r.setup}</span>
              <span className="relative block h-8">
                <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-line" />
                <span
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 w-0.5 -translate-x-1/2 bg-ink/70"
                  style={{ left: x(TRUE_LOW_ROI) }}
                />
                <span
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 -translate-x-1/2 border-l-2 border-dashed border-muted"
                  style={{ left: x(1) }}
                />
                <span
                  aria-hidden="true"
                  className={`absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-deep ${GROUP_CLASS[r.group]}`}
                  style={{ left: x(r.estimate) }}
                />
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-2 grid grid-cols-1 gap-x-3 sm:grid-cols-[15rem_minmax(0,1fr)]">
          <span className="hidden sm:block" />
          <span className="relative block h-9 font-mono text-[0.6875rem] text-muted tabular-nums">
            {ticks.map((t) => (
              <span key={t} className="absolute top-0 -translate-x-1/2" style={{ left: x(t) }}>
                {t.toFixed(1)}
              </span>
            ))}
            <span className="absolute top-4 -translate-x-1/2 text-ink" style={{ left: x(TRUE_LOW_ROI) }}>
              truth
            </span>
            <span className="absolute top-4 -translate-x-1/2 whitespace-nowrap" style={{ left: x(1) }}>
              break-even
            </span>
          </span>
        </div>
        <Tooltip tip={tip} />
      </div>
      <DataTable summary="Show as a table">
        <table className="viz-table">
          <thead>
            <tr>
              <th>Setup</th>
              <th>Estimate (true 0.40)</th>
            </tr>
          </thead>
          <tbody>
            {lowRoi.map((r) => (
              <tr key={r.setup}>
                <td>{r.setup}</td>
                <td>{r.estimate.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </figure>
  );
}

/** Sequential single-hue fill on a log scale: 3% error is faint, 3,000% is strong. */
function cellFill(c: FeasCell) {
  if (!c.converged) return undefined;
  const t = Math.min(Math.max(Math.log10(c.error) / Math.log10(3200), 0), 1);
  const mix = Math.round(8 + t * 72);
  return { background: `color-mix(in oklab, var(--color-viz-2) ${mix}%, transparent)` };
}

const shareLabel = (s: number) => `${Math.round(s * 100)}%`;

/** Heatmap: channel x ads' share of streams, one panel per model. */
export function FeasibilityHeatmap() {
  const { wrap, tip, setTip, bind } = useTip();

  return (
    <figure className="panel ticks p-5 sm:p-7">
      <figcaption>
        <p className="font-display text-lg font-semibold tracking-tight text-ink">
          Which channels could any MMM have read on the real schedule?
        </p>
        <p className="mt-1 text-sm text-muted">
          Real spend schedule, simulated streams. Cell = mean error against the true effect (3 seeds); darker is
          worse. ✓ marks settings where the channel was measurable in at least 2 of 3 seeds.
        </p>
      </figcaption>
      <div ref={wrap} className="relative mt-6 grid gap-6 lg:grid-cols-3" onMouseLeave={() => setTip(null)}>
        {feasModels.map((m) => {
          const ok = m !== "PyMC-Marketing, national";
          return (
            <div key={m}>
              <p className="text-sm font-medium text-ink">
                {m}
                {!ok ? <span className="font-normal text-muted"> · did not converge</span> : null}
              </p>
              <div className="mt-3 grid grid-cols-[4.5rem_repeat(3,minmax(0,1fr))] gap-[2px] text-xs">
                <span />
                {shares.map((s) => (
                  <span key={s} className="pb-1 text-center font-mono text-[0.6875rem] text-muted">
                    {shareLabel(s)}
                  </span>
                ))}
                {channels.map((ch) => (
                  <div key={ch} className="contents">
                    <span className="self-center text-muted">{ch}</span>
                    {feasibility[m][ch].map((c, i) => (
                      <span
                        key={i}
                        aria-label={`${m}, ${ch}, ads drive ${shareLabel(shares[i])} of streams: ${c.converged ? `${pct(c.error)} error, measurable in ${c.measurable} of 3 seeds` : "model did not converge"}`}
                        className={`flex h-12 flex-col items-center justify-center rounded-[4px] outline-offset-2 ${c.converged ? "text-ink" : "viz-hatch bg-line/30 text-dim"}`}
                        style={cellFill(c)}
                        {...bind(
                          <>
                            <span className="font-semibold">
                              {ch} · ads drive {shareLabel(shares[i])} of streams
                            </span>
                            <br />
                            {c.converged ? (
                              <>
                                {pct(c.error)} error, range {c.width}× the effect
                                <br />
                                Measurable in {c.measurable} of 3 seeds
                              </>
                            ) : (
                              <>Did not converge (R-hat 1.6–1.7); not a usable estimate</>
                            )}
                          </>,
                        )}
                      >
                        <span className="font-mono tabular-nums">
                          {c.converged ? pct(Math.round(c.error)) : "–"}
                        </span>
                        {c.converged && c.measurable >= 2 ? <span aria-hidden="true">✓</span> : null}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <Tooltip tip={tip} />
      </div>
      <p className="mt-4 text-xs text-muted">
        Columns: the share of streams that paid ads drive during the launch flight. An error of 3,120% means the model
        credited YouTube with about 32 times its true effect.
      </p>
      <DataTable summary="Show as a table">
        <table className="viz-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Channel</th>
              <th>Ads’ share</th>
              <th>Mean error</th>
              <th>Range width</th>
              <th>Measurable seeds</th>
            </tr>
          </thead>
          <tbody>
            {feasModels.flatMap((m) =>
              channels.flatMap((ch) =>
                feasibility[m][ch].map((c, i) => (
                  <tr key={`${m}-${ch}-${i}`}>
                    <td>{m}</td>
                    <td>{ch}</td>
                    <td>{shareLabel(shares[i])}</td>
                    <td>{c.converged ? pct(c.error) : `${pct(c.error)} (not converged)`}</td>
                    <td>{c.width}×</td>
                    <td>{c.measurable} of 3</td>
                  </tr>
                )),
              ),
            )}
          </tbody>
        </table>
      </DataTable>
    </figure>
  );
}
