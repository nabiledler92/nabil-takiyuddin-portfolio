"use client";

import { useRef, useState } from "react";
import { DataTable, Legend, tipAt, Tooltip, type Tip } from "./Charts";
import { batches, compileStages, kumoLeadScoring, questionSets } from "./data";

/*
 * Result charts for the Auto Ontology article: question sets, build quality, answer time and
 * the Kumo Engine side test. Same .viz tokens, legend, tooltip and table view as Charts.tsx.
 */

/** A horizontal bar: 4px rounded data end, anchored at the baseline, on a faint track. */
function HBar({ pct, className }: { pct: number; className: string }) {
  return (
    <span className="block h-5 w-full rounded-[4px] bg-line/40">
      <span className={`block h-full rounded-r-[4px] ${className}`} style={{ width: `${Math.max(pct, 0.5)}%` }} />
    </span>
  );
}

/** Question sets before and after the change, one run per question. */
export function QuestionSetsChart() {
  const wrap = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip>(null);

  return (
    <figure className="panel ticks p-5 sm:p-7">
      <figcaption>
        <p className="font-display text-lg font-semibold tracking-tight text-ink">
          Plain-language questions: 15 to 17 of 17 on the real data
        </p>
        <p className="mt-1 text-sm text-muted">
          One run per question, scored by value. Bar length is the share of the set answered correctly.
        </p>
      </figcaption>
      <div className="mt-4">
        <Legend
          items={[
            { label: "Before the change", swatch: "bg-viz-neutral" },
            { label: "After the change", swatch: "bg-viz-1" },
          ]}
        />
      </div>
      <div ref={wrap} className="relative mt-6 space-y-6" onMouseLeave={() => setTip(null)}>
        {questionSets.map((s) => (
          <div key={s.id}>
            <p className="text-sm font-medium text-ink">
              {s.dataset}{" "}
              <span className="font-normal text-muted">
                · {s.wording} · {s.questions} questions
              </span>
            </p>
            <ul className="mt-2 space-y-[2px]">
              {(
                [
                  ["before", s.before, "bg-viz-neutral"],
                  ["after", s.after, "bg-viz-1"],
                ] as const
              ).map(([k, v, cls]) => {
                const show = (el: Element) =>
                  setTip({
                    ...tipAt(wrap.current, el),
                    content: (
                      <>
                        <span className="font-semibold">{v.label}</span>
                        <br />
                        {v.correct} of {s.questions} correct
                      </>
                    ),
                  });
                return (
                  <li
                    key={k}
                    tabIndex={0}
                    aria-label={`${s.dataset}, ${s.wording}, ${v.label}: ${v.correct} of ${s.questions} correct`}
                    className="grid grid-cols-[minmax(0,1fr)_3.5rem] items-center gap-x-3 gap-y-1 outline-offset-2 sm:grid-cols-[13rem_minmax(0,1fr)_3.5rem]"
                    onMouseEnter={(e) => show(e.currentTarget)}
                    onFocus={(e) => show(e.currentTarget)}
                    onBlur={() => setTip(null)}
                  >
                    <span className="col-span-2 text-xs text-muted sm:col-span-1">{v.label}</span>
                    <HBar pct={(v.correct / s.questions) * 100} className={cls} />
                    <span className="text-right font-mono text-xs text-ink tabular-nums">
                      {v.correct}/{s.questions}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <Tooltip tip={tip} />
      </div>
      <DataTable summary="Show as a table">
        <table className="viz-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Wording</th>
              <th>Before</th>
              <th>After</th>
            </tr>
          </thead>
          <tbody>
            {questionSets.map((s) => (
              <tr key={s.id}>
                <td>{s.dataset}</td>
                <td>{s.wording}</td>
                <td>
                  {s.before.correct}/{s.questions} ({s.before.label.toLowerCase()})
                </td>
                <td>
                  {s.after.correct}/{s.questions} ({s.after.label.toLowerCase()})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </figure>
  );
}

type BarRow = { key: string; label: string; pct: number; value: string; detail: string };

/** Build quality at each stage: failed model calls and the share of columns described. */
export function CompileChart() {
  const wrap = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip>(null);
  const maxFail = Math.max(...compileStages.map((s) => s.failedCalls));

  const panel = (title: string, rows: BarRow[], cls: string) => (
    <div>
      <p className="text-sm font-medium text-ink">{title}</p>
      <ul className="mt-3 space-y-2">
        {rows.map((r) => {
          const show = (el: Element) =>
            setTip({
              ...tipAt(wrap.current, el),
              content: (
                <>
                  <span className="font-semibold">{r.label}</span>
                  <br />
                  {r.detail}
                </>
              ),
            });
          return (
            <li
              key={r.key}
              tabIndex={0}
              aria-label={`${title}, ${r.label}: ${r.detail}`}
              className="grid grid-cols-[5.5rem_minmax(0,1fr)_3rem] items-center gap-3 outline-offset-2"
              onMouseEnter={(e) => show(e.currentTarget)}
              onFocus={(e) => show(e.currentTarget)}
              onBlur={() => setTip(null)}
            >
              <span className="text-xs text-muted">{r.label}</span>
              <HBar pct={r.pct} className={cls} />
              <span className="text-right font-mono text-xs text-ink tabular-nums">{r.value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <figure className="panel ticks p-5 sm:p-7">
      <figcaption>
        <p className="font-display text-lg font-semibold tracking-tight text-ink">
          Check what was built, not the success message
        </p>
        <p className="mt-1 text-sm text-muted">
          Every one of these builds reported success. The first one had quietly skipped 9 steps.
        </p>
      </figcaption>
      <div ref={wrap} className="relative mt-6 grid gap-8 sm:grid-cols-2" onMouseLeave={() => setTip(null)}>
        {panel(
          "Failed model calls",
          compileStages.map((s) => ({
            key: s.short,
            label: s.short,
            pct: (s.failedCalls / maxFail) * 100,
            value: String(s.failedCalls),
            detail: `${s.failedCalls} failed model calls`,
          })),
          "bg-viz-2",
        )}
        {panel(
          "Columns described",
          compileStages.map((s) => ({
            key: s.short,
            label: s.short,
            pct: (s.described / s.columns) * 100,
            value: `${Math.round((s.described / s.columns) * 100)}%`,
            detail: `${s.described} of ${s.columns} columns described, ${s.tableLinks} table link${s.tableLinks === 1 ? "" : "s"}`,
          })),
          "bg-viz-1",
        )}
        <Tooltip tip={tip} />
      </div>
      <DataTable summary="Show as a table">
        <table className="viz-table">
          <thead>
            <tr>
              <th>Stage</th>
              <th>Failed model calls</th>
              <th>Columns described</th>
              <th>Table links</th>
            </tr>
          </thead>
          <tbody>
            {compileStages.map((s) => (
              <tr key={s.stage}>
                <td>{s.stage}</td>
                <td>{s.failedCalls}</td>
                <td>
                  {s.described} of {s.columns}
                </td>
                <td>{s.tableLinks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </figure>
  );
}

/** Median answer time, B4 vs B5. One series, so no legend: the title names it. */
export function SpeedChart() {
  const rows = batches.filter((b) => b.id === "B4" || b.id === "B5");
  const max = Math.max(...rows.map((b) => b.medianSeconds));
  return (
    <figure className="panel ticks p-5 sm:p-7">
      <figcaption>
        <p className="font-display text-lg font-semibold tracking-tight text-ink">Faster too: 59.5 s to 21 s</p>
        <p className="mt-1 text-sm text-muted">Median answer time over the 8 runs of each batch, real pilot data.</p>
      </figcaption>
      <ul className="mt-6 space-y-2">
        {rows.map((b) => (
          <li
            key={b.id}
            aria-label={`${b.id}: median ${b.medianSeconds} seconds`}
            className="grid grid-cols-[2.25rem_minmax(0,1fr)_3.5rem] items-center gap-3"
            title={`${b.id}: median ${b.medianSeconds} s`}
          >
            <span className="font-mono text-xs tracking-[0.12em] text-cyan">{b.id}</span>
            <HBar pct={(b.medianSeconds / max) * 100} className="bg-viz-1" />
            <span className="text-right font-mono text-xs text-ink tabular-nums">{b.medianSeconds} s</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-relaxed text-muted">
        B4: larger model plus a narrow metric. B5: the same model reading database views that already hold the rules.
      </p>
    </figure>
  );
}

/** Kumo Engine lead scoring on the synthetic CRM: dot plot with 95% intervals and a line at 0.5 (random). */
export function KumoChart() {
  const W = 720;
  const rowH = 46;
  const m = { l: 210, r: 24, t: 28, b: 34 };
  const H = m.t + m.b + rowH * kumoLeadScoring.length;
  const lo = 0.45;
  const hi = 0.7;
  const x = (v: number) => m.l + ((v - lo) / (hi - lo)) * (W - m.l - m.r);
  const yRow = (i: number) => m.t + rowH * i + rowH / 2;
  const fill = { ceiling: "fill-muted", baseline: "fill-viz-1", kumo: "fill-viz-2" } as const;
  const stroke = { ceiling: "stroke-muted", baseline: "stroke-viz-1", kumo: "stroke-viz-2" } as const;

  const [hover, setHover] = useState<number | null>(null);
  const hd = hover === null ? null : kumoLeadScoring[hover];

  return (
    <figure className="panel ticks p-5 sm:p-7">
      <figcaption>
        <p className="font-display text-lg font-semibold tracking-tight text-ink">The simple channel rate already wins</p>
        <p className="mt-1 text-sm text-muted">
          Lead scoring on the synthetic CRM, test AUROC with 95% intervals; 0.5 is a coin flip. The fast setting was run
          3 times (small dots), the best setting once.
        </p>
      </figcaption>
      <div className="mt-4">
        <Legend
          items={[
            { label: "Ceiling (the generator’s own truth)", swatch: "bg-muted" },
            { label: "Per-channel rate", swatch: "bg-viz-1" },
            { label: "Kumo Engine", swatch: "bg-viz-2" },
          ]}
        />
      </div>
      <div className="-mx-1 mt-4 overflow-x-auto px-1">
        <div className="relative min-w-[560px]" onMouseLeave={() => setHover(null)}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="block h-auto w-full"
            role="img"
            aria-label="Dot plot of lead-scoring AUROC on synthetic data. Ceiling 0.606, per-channel rate 0.589, Kumo Engine fast mean 0.559 with runs from 0.518 to 0.582, Kumo Engine best 0.544. Random is 0.5."
          >
            {[0.45, 0.5, 0.55, 0.6, 0.65, 0.7].map((t) => (
              <g key={t}>
                <line x1={x(t)} x2={x(t)} y1={m.t - 6} y2={H - m.b} className="stroke-line" strokeWidth={1} />
                <text x={x(t)} y={H - 12} textAnchor="middle" className="fill-dim font-mono text-[11px]">
                  {t.toFixed(2)}
                </text>
              </g>
            ))}
            <line
              x1={x(0.5)}
              x2={x(0.5)}
              y1={m.t - 6}
              y2={H - m.b}
              className="stroke-line-strong"
              strokeWidth={2}
              strokeDasharray="4 4"
            />
            <text x={x(0.5) + 6} y={m.t - 12} className="fill-soft text-[12px]">
              random (0.5)
            </text>
            {kumoLeadScoring.map((d, i) => (
              <g
                key={d.model}
                tabIndex={0}
                aria-label={`${d.model}: AUROC ${d.auroc}${d.low !== undefined ? `, interval ${d.low} to ${d.high}` : ""}${d.runs ? `, runs ${d.runs.join(", ")}` : ""}`}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                className="outline-none"
              >
                <rect
                  x={0}
                  y={yRow(i) - rowH / 2}
                  width={W}
                  height={rowH}
                  className={hover === i ? "fill-line/30" : "fill-transparent"}
                />
                <text x={m.l - 14} y={yRow(i)} dy="0.32em" textAnchor="end" className="fill-soft text-[12px]">
                  {d.model}
                </text>
                {d.low !== undefined && d.high !== undefined ? (
                  <line
                    x1={x(d.low)}
                    x2={x(d.high)}
                    y1={yRow(i)}
                    y2={yRow(i)}
                    className={stroke[d.kind]}
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                ) : null}
                {d.runs?.map((r, j) => (
                  <circle key={j} cx={x(r)} cy={yRow(i)} r={4} className={`${fill[d.kind]} stroke-deep`} strokeWidth={1.5} />
                ))}
                <circle cx={x(d.auroc)} cy={yRow(i)} r={7} className={`${fill[d.kind]} stroke-deep`} strokeWidth={2} />
              </g>
            ))}
          </svg>
          {hd !== null && hover !== null ? (
            <div
              role="status"
              className="viz-tip pointer-events-none absolute z-10 w-max max-w-[16rem] rounded-lg border border-line-strong px-3 py-2 text-xs leading-relaxed text-ink shadow-lg"
              style={{
                left: `${(x(hd.auroc) / W) * 100}%`,
                top: `${((yRow(hover) - rowH / 2) / H) * 100}%`,
                transform: "translate(-50%, calc(-100% - 4px))",
              }}
            >
              <p className="font-semibold">{hd.model}</p>
              <p>
                AUROC <span className="font-semibold tabular-nums">{hd.auroc.toFixed(3)}</span>
                {hd.low !== undefined && hd.high !== undefined ? ` (${hd.low.toFixed(2)} to ${hd.high.toFixed(2)})` : ""}
              </p>
              {hd.runs ? <p className="text-muted">Runs: {hd.runs.join(", ")}</p> : null}
              {hd.note ? <p className="text-muted">{hd.note}</p> : null}
            </div>
          ) : null}
        </div>
      </div>
      <DataTable summary="Show as a table">
        <table className="viz-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Test AUROC</th>
              <th>95% interval</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {kumoLeadScoring.map((d) => (
              <tr key={d.model}>
                <td>{d.model}</td>
                <td>{d.auroc.toFixed(3)}</td>
                <td>{d.low !== undefined && d.high !== undefined ? `${d.low.toFixed(2)} to ${d.high.toFixed(2)}` : "n/a"}</td>
                <td>{d.runs ? `Runs: ${d.runs.join(", ")}` : (d.note ?? "")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </figure>
  );
}
