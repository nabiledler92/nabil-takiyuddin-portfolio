/** Shared section header: mono index label, title and optional lede. */
export function SectionHeading({
  index,
  code,
  title,
  lede,
  id,
}: {
  index: string;
  code: string;
  title: string;
  lede?: string;
  id: string;
}) {
  return (
    <header className="mb-10 sm:mb-14" data-reveal>
      <div className="flex items-center gap-4">
        <p className="label label-cyan shrink-0">
          <span className="text-dim">{"// "}</span>
          {index} <span className="text-dim">·</span> {code}
        </p>
        <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-line-strong to-transparent" />
      </div>
      <h2
        id={id}
        className="mt-5 max-w-3xl font-display text-[2rem] leading-[1.08] font-semibold tracking-tight text-balance text-ink sm:text-5xl"
      >
        {title}
      </h2>
      {lede ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg">{lede}</p> : null}
    </header>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative mx-auto max-w-[1180px] px-5 py-20 outline-none sm:px-8 sm:py-28 ${className}`}
    >
      {children}
    </section>
  );
}
