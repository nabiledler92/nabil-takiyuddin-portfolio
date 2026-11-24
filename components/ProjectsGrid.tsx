"use client";

import { useState } from "react";
import type { MiniProject, ProjectTag } from "@/content/projects";
import { track } from "@/lib/track";

/** Filterable grid of smaller projects. All cards are in the server-rendered HTML. */
export function ProjectsGrid({ projects, tags }: { projects: MiniProject[]; tags: ProjectTag[] }) {
  const [filter, setFilter] = useState<ProjectTag | "All">("All");
  const options: (ProjectTag | "All")[] = ["All", ...tags];
  const count = (t: ProjectTag | "All") =>
    t === "All" ? projects.length : projects.filter((p) => p.tags.includes(t)).length;
  const shown = count(filter);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by tag"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        data-reveal
      >
        {options.map((t) => {
          const on = filter === t;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setFilter(t);
                track("project_filter", { tag: t });
              }}
              className={`flex h-10 shrink-0 items-center gap-2 rounded-lg border px-3.5 font-mono text-[0.6875rem] tracking-[0.12em] uppercase transition-colors ${
                on
                  ? "border-cyan bg-cyan/12 text-cyan shadow-[0_0_24px_-8px_var(--color-cyan)]"
                  : "border-line text-muted hover:border-line-strong hover:text-ink"
              }`}
            >
              {t}
              <span className={`tabular-nums ${on ? "text-ink" : "text-dim"}`}>{String(count(t)).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {shown} of {projects.length} projects{filter === "All" ? "" : ` tagged ${filter}`}.
      </p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => {
          const visible = filter === "All" || p.tags.includes(filter);
          return (
            <li
              key={p.id}
              hidden={!visible}
              data-reveal
              style={{ "--d": `${(i % 3) * 70}ms` } as React.CSSProperties}
              className="panel panel-hover flex flex-col p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="label">P-{String(i + 1).padStart(2, "0")}</p>
                <ul className="flex flex-wrap justify-end gap-1" aria-label="Tags">
                  {p.tags.map((t) => (
                    <li key={t} className="chip chip-mono border-line-strong text-cyan">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <h3 className="mt-4 text-lg leading-snug font-semibold tracking-tight text-ink">{p.title}</h3>
              <p className="mt-1 font-mono text-[0.6875rem] leading-relaxed tracking-[0.06em] text-dim">
                {p.course} · {p.format}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-pretty text-muted">{p.summary}</p>
              {p.result ? (
                <p className="mt-3 text-sm font-medium text-ink">
                  <span className="label label-cyan mr-2">Result</span>
                  {p.result}
                </p>
              ) : null}
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Tools">
                {p.tools.map((t) => (
                  <li key={t} className="chip chip-mono">
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
