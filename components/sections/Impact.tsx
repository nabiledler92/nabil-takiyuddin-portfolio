import { Section, SectionHeading } from "@/components/SectionHeading";
import { Counter } from "@/components/fx/Counter";
import { achievements } from "@/content/profile";

const spanClass: Record<number, string> = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
};

export function Impact() {
  return (
    <Section id="impact">
      <SectionHeading
        id="impact-title"
        index="02"
        code="Impact"
        title="Measured outcomes."
        lede="Key achievements from six years of MarTech, analytics and data work, each attributed to the employer where it happened."
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {achievements.map((a, i) => (
          <li
            key={a.id}
            data-reveal
            style={{ "--d": `${(i % 3) * 90}ms` } as React.CSSProperties}
            className={`panel panel-hover ticks flex flex-col p-6 sm:p-7 ${spanClass[a.span]} ${
              a.metrics.length > 1 ? "sm:col-span-2" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <p className="label">
                M-{String(i + 1).padStart(2, "0")}
              </p>
              <p className="chip chip-mono border-line-strong text-cyan">{a.org}</p>
            </div>

            <div className={`mt-6 grid gap-x-6 gap-y-5 ${a.metrics.length === 3 ? "grid-cols-3" : a.metrics.length === 2 ? "grid-cols-2" : ""}`}>
              {a.metrics.map((m) => (
                <div key={m.label}>
                  <p
                    className={`num-gradient font-display leading-none font-semibold tracking-[-0.04em] ${
                      a.metrics.length === 3
                        ? "text-[2.1rem] sm:text-6xl"
                        : a.metrics.length === 2
                          ? "text-5xl sm:text-6xl"
                          : m.value > 9999
                            ? "text-[2.9rem] sm:text-6xl"
                            : "text-6xl sm:text-7xl"
                    }`}
                  >
                    <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} />
                  </p>
                  <p className="mt-2.5 font-mono text-[0.6875rem] leading-snug tracking-[0.12em] text-muted uppercase">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 border-t border-line pt-4 text-[0.9375rem] leading-relaxed text-pretty text-soft">
              {a.text}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
