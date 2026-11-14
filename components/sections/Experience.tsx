import { ChevronDown } from "@/components/Icons";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { experience, type Role } from "@/content/experience";

/** Roles after this index render collapsed (still in the HTML for crawlers). */
const OPEN_COUNT = 3;

function RoleBody({ role }: { role: Role }) {
  return (
    <div className="mt-5">
      <ul className="space-y-2.5">
        {role.bullets.map((b) => (
          <li key={b} className="relative pl-5 text-[0.9375rem] leading-relaxed text-pretty text-soft">
            <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-2.5 bg-cyan" />
            {b}
          </li>
        ))}
      </ul>

      {role.notes ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {role.notes.map((n) => (
            <div key={n.label} className="rounded-xl border border-line bg-void/50 p-4">
              <h4 className="label label-cyan">{n.label}</h4>
              <ul className="mt-2.5 space-y-1.5">
                {n.items.map((it) => (
                  <li key={it} className="text-sm leading-relaxed text-soft">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}

      {role.stack ? (
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tools used in this role">
          {role.stack.map((s) => (
            <li key={s} className="chip chip-mono">
              {s}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function RoleHeader({ role, index }: { role: Role; index: number }) {
  return (
    <div className="min-w-0 flex-1">
      <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 lg:hidden">
        <span className="text-cyan">
          <time dateTime={role.startISO}>{role.start}</time> –{" "}
          {role.endISO ? <time dateTime={role.endISO}>{role.end}</time> : role.end}
        </span>
        <span>{role.location}</span>
      </p>
      <h3 className="mt-2 text-xl leading-snug font-semibold tracking-tight text-ink sm:text-2xl lg:mt-0">
        {role.title}
      </h3>
      <p className="mt-1 text-[0.9375rem] text-muted">
        {role.company}
        {index === 0 ? (
          <span className="ml-2.5 inline-flex items-center gap-1.5 align-middle font-mono text-[0.625rem] tracking-[0.16em] text-teal uppercase">
            <span aria-hidden="true" className="blink size-1.5 rounded-full bg-teal" />
            Current
          </span>
        ) : null}
      </p>
    </div>
  );
}

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        id="experience-title"
        index="03"
        code="Experience"
        title="Career data stream."
        lede="Seven roles from 2018 to today, newest first."
      />

      <div className="relative">
        <div aria-hidden="true" className="stream left-[7px] lg:left-[11.5rem]" />
        <ol className="space-y-5">
          {experience.map((role, i) => (
            <li key={role.id} className="relative pl-8 lg:grid lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-x-12 lg:pl-0" data-reveal>
              <span
                aria-hidden="true"
                className={`absolute top-7 left-0 size-[15px] rounded-full border bg-void lg:left-[calc(11.5rem-7px)] ${
                  i === 0
                    ? "border-cyan shadow-[0_0_0_4px_rgba(79,227,255,0.14),0_0_18px_var(--color-cyan)]"
                    : "border-line-strong"
                }`}
              >
                <span className={`absolute inset-[3px] rounded-full ${i === 0 ? "bg-cyan" : "bg-line-strong"}`} />
              </span>

              <div className="hidden pt-6 text-right lg:block">
                <p className="font-mono text-xs tracking-[0.1em] text-cyan uppercase">
                  <time dateTime={role.startISO}>{role.start}</time>
                  <span className="text-dim"> – </span>
                  {role.endISO ? <time dateTime={role.endISO}>{role.end}</time> : role.end}
                </p>
                <p className="label mt-1.5">{role.location}</p>
              </div>

              {i < OPEN_COUNT ? (
                <article className="panel panel-hover p-5 sm:p-7">
                  <RoleHeader role={role} index={i} />
                  <RoleBody role={role} />
                </article>
              ) : (
                <details className="panel panel-hover group">
                  <summary className="flex items-start gap-4 rounded-[14px] p-5 sm:p-7">
                    <RoleHeader role={role} index={i} />
                    <span className="mt-1 flex shrink-0 items-center gap-2 font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase group-hover:text-cyan">
                      <span className="hidden sm:inline">
                        <span className="when-closed">Expand</span>
                        <span className="when-open">Collapse</span>
                      </span>
                      <ChevronDown className="chev transition-transform duration-300" />
                    </span>
                  </summary>
                  <div className="-mt-5 px-5 pb-5 sm:px-7 sm:pb-7">
                    <RoleBody role={role} />
                  </div>
                </details>
              )}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
