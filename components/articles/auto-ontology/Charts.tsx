"use client";

import { useRef, useState } from "react";
import { batches, channels, wonByMonth, type Outcome } from "./data";

/*
 * Charts for the Auto Ontology article. Colours come from the .viz tokens in globals.css
 * (validated for both themes against the site's surfaces). Each chart has a legend,
 * a hover/focus tooltip and a table view, so nothing depends on colour alone.
 */

export type Tip = { x: number; y: number; content: React.ReactNode } | null;

export function Tooltip({ tip }: { tip: Tip }) {
  if (!tip) return null;
  return (
    <div
      role="status"
      className="viz-tip pointer-events-none absolute z-10 w-max max-w-[16rem] -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded-lg border border-line-strong px-3 py-2 text-xs leading-relaxed text-ink shadow-lg"
      style={{ left: tip.x, top: tip.y }}
    >
      {tip.content}
    </div>
  );
}

export function Legend({ items }: { items: { label: string; swatch: string }[] }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-soft">
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-2">
          <span aria-hidden="true" className={`inline-block size-3 rounded-[3px] ${i.swatch}`} />
          {i.label}
        </li>
      ))}
    </ul>
  );
}

export function DataTable({ summary, children }: { summary: string; children: React.ReactNode }) {
  return (
    <details className="group mt-5">
      <summary className="cursor-pointer font-mono text-[0.6875rem] tracking-[0.12em] text-muted uppercase transition-colors hover:text-cyan">
        {summary}
      </summary>
      <div className="mt-3 overflow-x-auto">{children}</div>
    </details>
  );
}

/** Position a tooltip relative to `wrap` from an element's box. */
export function tipAt(wrap: HTMLElement | null, el: Element) {
  if (!wrap) return { x: 0, y: 0 };
  const w = wrap.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return { x: r.left - w.left + r.width / 2, y: r.top - w.top };
}

const OUTCOME_LABEL: Record<Outcome, string> = {
  correct: "Correct",
  wrong: "Wrong",
  constants: "Wrong: SQL made only of typed-in numbers",
  none: "No answer",
};
const OUTCOME_CLASS: Record<Outcome, string> = {
  correct: "bg-viz-1",
  wrong: "bg-viz-2",
  constants: "bg-viz-2 viz-hatch",
  none: "bg-viz-neutral",
};

/** Four batches of 8 runs of the same question, one cell per run. */
export function RunStrips() {
  const wrap = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip>(null);

  return (
    <figure className="panel ticks p-5 sm:p-7">
      <figcaption>
        <p className="font-display text-lg font-semibold tracking-tight text-ink">
          Same question, 8 tries each: from 3 to 8 correct
        </p>
        <p className="mt-1 text-sm text-muted">
          Real pilot data, 8 runs per batch. Each square is one run, scored by value against the known-correct answer.
          Squares are grouped by outcome, not in run order.
        </p>
      </figcaption>
      <div className="mt-4">
        <Legend
          items={[
            { label: "Correct", swatch: "bg-viz-1" },
            { label: "Wrong", swatch: "bg-viz-2" },
            { label: "Wrong, constants-only SQL", swatch: "bg-viz-2 viz-hatch" },
            { label: "No answer", swatch: "bg-viz-neutral" },
          ]}
        />
      </div>
      <div ref={wrap} className="relative mt-6 space-y-5" onMouseLeave={() => setTip(null)}>
        {batches.map((b) => {
          const runs: Outcome[] = [
            ...Array<Outcome>(b.correct).fill("correct"),
            ...Array<Outcome>(b.wrong).fill("wrong"),
            ...Array<Outcome>(b.constants).fill("constants"),
            ...Array<Outcome>(b.none).fill("none"),
          ];
          return (
            <div key={b.id} className="grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5">
              <span className="font-mono text-xs tracking-[0.12em] text-cyan">{b.id}</span>
              <ul className="flex gap-[2px]" aria-label={`${b.id}: ${b.correct} of 8 correct`}>
                {runs.map((o, i) => (
                  <li
                    key={i}
                    tabIndex={0}
                    aria-label={`${b.id} run: ${OUTCOME_LABEL[o]}`}
                    className={`h-7 min-w-0 flex-1 rounded-[4px] outline-offset-2 sm:h-8 sm:max-w-12 ${OUTCOME_CLASS[o]}`}
                    onMouseEnter={(e) =>
                      setTip({
                        ...tipAt(wrap.current, e.currentTarget),
                        content: (
                          <>
                            <span className="font-semibold">{OUTCOME_LABEL[o]}</span>
                            <br />
                            <span className="text-muted">
                              {b.id}: {b.correct} of 8 correct
                            </span>
                          </>
                        ),
                      })
                    }
                    onFocus={(e) =>
                      setTip({
                        ...tipAt(wrap.current, e.currentTarget),
                        content: <span className="font-semibold">{OUTCOME_LABEL[o]}</span>,
                      })
                    }
                    onBlur={() => setTip(null)}
                  />
                ))}
              </ul>
              <span className="font-display text-xl font-semibold text-ink tabular-nums sm:text-2xl">
                {b.correct}
                <span className="text-sm font-normal text-muted"> / 8</span>
              </span>
              <span className="col-start-2 col-end-4 text-xs leading-snug text-muted">{b.setup}</span>
            </div>
          );
        })}
        <Tooltip tip={tip} />
      </div>
      <DataTable summary="Show as a table">
        <table className="viz-table">
          <thead>
            <tr>
              <th>Batch</th>
              <th>Setup</th>
              <th>Correct</th>
              <th>Wrong</th>
              <th>No answer</th>
              <th>Median time</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.setup}</td>
                <td>{b.correct}</td>
                <td>
                  {b.wrong + b.constants}
                  {b.constants ? ` (${b.constants} constants-only)` : ""}
                </td>
                <td>{b.none}</td>
                <td>{b.medianSeconds} s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </figure>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthName = (m: string) => `${MONTHS[Number(m.slice(5)) - 1]} ${m.slice(0, 4)}`;

/** Won deals per month on the synthetic CRM, counted by won date vs by created date. */
export function WonDateChart() {
  const W = 720;
  const H = 300;
  const m = { l: 34, r: 112, t: 18, b: 34 };
  const yMax = 16;
  const n = wonByMonth.length;
  const step = (W - m.l - m.r) / (n - 1);
  const x = (i: number) => m.l + i * step;
  const y = (v: number) => m.t + (1 - v / yMax) * (H - m.t - m.b);
  const path = (k: "byWon" | "byCreated") =>
    wonByMonth.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(d[k]).toFixed(1)}`).join("");

  const wrap = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const nov = wonByMonth.findIndex((d) => d.month === "2025-11");

  function onMove(e: React.PointerEvent<SVGSVGElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const vx = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round((vx - m.l) / step);
    setHover(i >= 0 && i < n ? i : null);
  }

  const last = wonByMonth[n - 1];
  const hd = hover === null ? null : wonByMonth[hover];
  const tipLeft = hover === null ? 0 : `${(x(hover) / W) * 100}%`;

  return (
    <figure className="panel ticks p-5 sm:p-7">
      <figcaption>
        <p className="font-display text-lg font-semibold tracking-tight text-ink">
          Won deals per month: the same 154 deals, counted two ways
        </p>
        <p className="mt-1 text-sm text-muted">Synthetic sample CRM, 24 months. Hover or tap for a month.</p>
      </figcaption>
      <div className="mt-4">
        <Legend
          items={[
            { label: "By won date (agreed rule)", swatch: "bg-viz-1" },
            { label: "By created date (the trap)", swatch: "bg-viz-2" },
          ]}
        />
      </div>
      <div className="-mx-1 mt-4 overflow-x-auto px-1">
      <div ref={wrap} className="relative min-w-[560px]">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full touch-pan-y"
          role="img"
          aria-label="Line chart of won deals per month, counted by won date and by created date. In November 2025, 13 deals were won; counting by created date shows 0."
          onPointerMove={onMove}
          onPointerDown={onMove}
          onPointerLeave={() => setHover(null)}
        >
          {[0, 4, 8, 12, 16].map((t) => (
            <g key={t}>
              <line x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} className="stroke-line" strokeWidth={1} />
              <text x={m.l - 8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-dim font-mono text-[11px]">
                {t}
              </text>
            </g>
          ))}
          {wonByMonth.map((d, i) =>
            i % 3 === 0 ? (
              <text key={d.month} x={x(i)} y={H - 10} textAnchor="middle" className="fill-dim font-mono text-[11px]">
                {MONTHS[Number(d.month.slice(5)) - 1]} {d.month.slice(2, 4)}
              </text>
            ) : null,
          )}
          {hover !== null ? (
            <line x1={x(hover)} x2={x(hover)} y1={m.t} y2={H - m.b} className="stroke-line-strong" strokeWidth={1} />
          ) : null}
          <path d={path("byCreated")} fill="none" className="stroke-viz-2" strokeWidth={2} strokeLinejoin="round" />
          <path d={path("byWon")} fill="none" className="stroke-viz-1" strokeWidth={2} strokeLinejoin="round" />

          {/* Annotation: the month the chat demo asked about. */}
          <circle cx={x(nov)} cy={y(wonByMonth[nov].byWon)} r={5} className="fill-viz-1 stroke-deep" strokeWidth={2} />
          <circle cx={x(nov)} cy={y(wonByMonth[nov].byCreated)} r={5} className="fill-viz-2 stroke-deep" strokeWidth={2} />
          <line
            x1={x(nov)}
            x2={x(nov)}
            y1={y(15.2)}
            y2={y(wonByMonth[nov].byWon) - 7}
            className="stroke-line-strong"
            strokeWidth={1}
          />
          <text x={x(nov) + 6} y={y(15.2)} dy="0.32em" className="fill-soft text-[12px]">
            Nov 2025: 13 won
          </text>
          <text x={x(nov) - 18} y={y(0) - 10} textAnchor="end" className="fill-soft text-[12px]">
            counted by created date: 0
          </text>

          {/* Direct labels at the line ends. */}
          <text x={W - m.r + 10} y={y(last.byWon)} dy="-0.2em" className="fill-soft text-[12px]">
            By won date
          </text>
          <text x={W - m.r + 10} y={y(last.byCreated)} dy="0.1em" className="fill-soft text-[12px]">
            By created date
          </text>

          {hd !== null && hover !== null ? (
            <>
              <circle cx={x(hover)} cy={y(hd.byCreated)} r={4.5} className="fill-viz-2 stroke-deep" strokeWidth={2} />
              <circle cx={x(hover)} cy={y(hd.byWon)} r={4.5} className="fill-viz-1 stroke-deep" strokeWidth={2} />
            </>
          ) : null}
        </svg>
        {hd !== null ? (
          <div
            role="status"
            className="viz-tip pointer-events-none absolute top-1 z-10 w-max rounded-lg border border-line-strong px-3 py-2 text-xs leading-relaxed text-ink shadow-lg"
            style={{
              left: tipLeft,
              // Sit beside the crosshair, on whichever side has room.
              transform: hover !== null && hover > n / 2 ? "translateX(calc(-100% - 12px))" : "translateX(12px)",
            }}
          >
            <p className="font-semibold">{monthName(hd.month)}</p>
            <p className="flex items-center gap-2">
              <span aria-hidden="true" className="inline-block size-2.5 rounded-[2px] bg-viz-1" />
              By won date: <span className="font-semibold tabular-nums">{hd.byWon}</span>
            </p>
            <p className="flex items-center gap-2">
              <span aria-hidden="true" className="inline-block size-2.5 rounded-[2px] bg-viz-2" />
              By created date: <span className="font-semibold tabular-nums">{hd.byCreated}</span>
            </p>
          </div>
        ) : null}
      </div>
      </div>
      <DataTable summary="Show as a table">
        <table className="viz-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Won, by won date</th>
              <th>Won, by created date</th>
            </tr>
          </thead>
          <tbody>
            {wonByMonth.map((d) => (
              <tr key={d.month}>
                <td>{monthName(d.month)}</td>
                <td>{d.byWon}</td>
                <td>{d.byCreated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </figure>
  );
}

const usd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;

/** Deals by the agreed source/medium group on the synthetic CRM, split into won and not won. */
export function ChannelChart() {
  const wrap = useRef<HTMLUListElement>(null);
  const [tip, setTip] = useState<Tip>(null);
  const max = Math.max(...channels.map((c) => c.deals));

  return (
    <figure className="panel ticks p-5 sm:p-7">
      <figcaption>
        <p className="font-display text-lg font-semibold tracking-tight text-ink">Deals by agreed channel group</p>
        <p className="mt-1 text-sm text-muted">
          Synthetic sample CRM, 499 deals. The biggest group is “direct / none”, which is mostly untagged traffic.
        </p>
      </figcaption>
      <div className="mt-4">
        <Legend
          items={[
            { label: "Won", swatch: "bg-viz-1" },
            { label: "Open or lost", swatch: "bg-viz-neutral" },
          ]}
        />
      </div>
      <ul ref={wrap} className="relative mt-6 space-y-3" onMouseLeave={() => setTip(null)}>
        {channels.map((c) => {
          const show = (el: Element) =>
            setTip({
              ...tipAt(wrap.current, el),
              content: (
                <>
                  <span className="font-semibold">{c.group}</span>
                  <br />
                  {c.deals} deals, {c.won} won ({Math.round((c.won / c.deals) * 100)}%)
                  <br />
                  <span className="text-muted">Won value {usd(c.wonValue)}</span>
                </>
              ),
            });
          return (
            <li key={c.group} className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[9rem_minmax(0,1fr)]">
              <span className="truncate font-mono text-xs text-soft">{c.group}</span>
              <div className="flex items-center gap-3">
                <div
                  tabIndex={0}
                  aria-label={`${c.group}: ${c.deals} deals, ${c.won} won`}
                  className="flex h-6 gap-[2px] outline-offset-2"
                  style={{ width: `${(c.deals / max) * 78}%` }}
                  onMouseEnter={(e) => show(e.currentTarget)}
                  onFocus={(e) => show(e.currentTarget)}
                  onBlur={() => setTip(null)}
                >
                  <span className="h-full rounded-l-[4px] bg-viz-1" style={{ width: `${(c.won / c.deals) * 100}%` }} />
                  <span className="h-full flex-1 rounded-r-[4px] bg-viz-neutral" />
                </div>
                <span className="shrink-0 font-mono text-[0.6875rem] text-muted tabular-nums">
                  {c.deals} · {c.won} won
                </span>
              </div>
            </li>
          );
        })}
        <Tooltip tip={tip} />
      </ul>
      <DataTable summary="Show as a table">
        <table className="viz-table">
          <thead>
            <tr>
              <th>Channel group</th>
              <th>Deals</th>
              <th>Won</th>
              <th>Won value (USD)</th>
            </tr>
          </thead>
          <tbody>
            {channels.map((c) => (
              <tr key={c.group}>
                <td>{c.group}</td>
                <td>{c.deals}</td>
                <td>{c.won}</td>
                <td>{usd(c.wonValue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </figure>
  );
}
