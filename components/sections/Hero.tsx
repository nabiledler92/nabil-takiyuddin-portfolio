import Image from "next/image";
import { ArrowRight, ArrowUpRight, LinkedInIcon } from "@/components/Icons";
import { Decode } from "@/components/fx/Decode";
import { HeroFx } from "@/components/fx/HeroFx";
import { profile } from "@/content/profile";
import photo from "@/public/images/nabil-takiyuddin.jpg";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-[calc(var(--nav-h)+2.5rem)] outline-none sm:pt-[calc(var(--nav-h)+4.5rem)]"
    >
      <HeroFx />

      <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
        <div>
          <p className="label rise flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="flex items-center gap-2 text-teal">
              <span className="blink size-1.5 rounded-full bg-teal shadow-[0_0_10px_var(--color-teal)]" />
              Signal online
            </span>
            <span aria-hidden="true" className="text-line-strong">
              /
            </span>
            <span>Profile NT-01</span>
            <span aria-hidden="true" className="text-line-strong">
              /
            </span>
            <span>{profile.location.coordinates}</span>
          </p>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[clamp(3.1rem,13.5vw,6.75rem)] leading-[0.92] font-semibold tracking-[-0.045em] text-ink"
          >
            <span className="block">Nabil</span>{" "}
            <span className="text-gradient block pb-2">
              <Decode text="Takiyuddin" delay={250} duration={850} />
            </span>
          </h1>

          <p className="caret mt-5 font-mono text-sm tracking-[0.14em] text-cyan uppercase sm:text-base">
            <Decode text={profile.role} delay={700} duration={900} />
          </p>

          <p
            className="rise mt-6 max-w-xl text-lg leading-relaxed text-pretty text-soft sm:text-xl"
            style={{ "--d": "120ms" } as React.CSSProperties}
          >
            {profile.pitch}
          </p>

          <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--d": "220ms" } as React.CSSProperties}>
            <a href="#work" className="btn btn-primary">
              View work <ArrowRight />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Contact
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer me" className="btn btn-ghost">
              <LinkedInIcon /> LinkedIn <ArrowUpRight width={14} height={14} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        {/* Holographic portrait */}
        <div
          className="rise relative mx-auto w-full max-w-[21rem] sm:max-w-[26rem] lg:max-w-none"
          style={{ "--d": "160ms" } as React.CSSProperties}
        >
          <div className="relative aspect-square">
            <div
              aria-hidden="true"
              className="absolute inset-[6%] rounded-full bg-[radial-gradient(closest-side,rgba(79,227,255,0.3),transparent)] blur-2xl"
            />
            <div aria-hidden="true" className="holo-ring absolute inset-[3%] animate-spin-slow rounded-full" />
            <svg
              aria-hidden="true"
              viewBox="0 0 400 400"
              className="absolute inset-0 size-full animate-spin-rev text-cyan/40"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="200" cy="200" r="198" strokeWidth="1" strokeDasharray="2 10" />
              <circle cx="200" cy="200" r="172" strokeWidth="0.75" strokeDasharray="60 22 4 22" opacity="0.6" />
            </svg>
            <svg aria-hidden="true" viewBox="0 0 400 400" className="absolute inset-0 size-full text-cyan" fill="none" stroke="currentColor">
              <path d="M200 0v14M200 386v14M0 200h14M386 200h14" strokeWidth="1.5" />
              <path d="M22 60V22h38M340 22h38v38M378 340v38h-38M60 378H22v-38" strokeWidth="1" opacity="0.55" />
            </svg>

            <div className="absolute inset-[10.5%] overflow-hidden rounded-full border border-line-strong bg-hull shadow-[0_0_0_6px_rgba(4,8,15,0.9),0_0_70px_-10px_rgba(79,227,255,0.55)]">
              <Image
                src={photo}
                alt="Portrait of Nabil Takiyuddin, smiling with arms crossed, wearing glasses and a navy quarter-zip sweater"
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 330px, 270px"
                className="size-full scale-[1.12] object-cover object-[50%_18%]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(79,227,255,0.1),transparent_35%,rgba(4,8,15,0.5))] mix-blend-screen"
              />
              <div
                aria-hidden="true"
                className="holo-sweep absolute inset-x-0 top-0 h-1/4 bg-[linear-gradient(180deg,transparent,rgba(125,240,255,0.16)_60%,rgba(125,240,255,0.5)_98%,transparent)]"
              />
            </div>

            <p className="label absolute top-[7.5%] left-[8%] hidden sm:block" aria-hidden="true">
              ID <span className="text-cyan">NT-01</span>
            </p>
            <p className="label absolute top-[7.5%] right-[8%] hidden text-right sm:block" aria-hidden="true">
              {profile.location.locality} <span className="text-cyan">MY</span>
            </p>
            <div className="glass absolute bottom-[3%] left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-line-strong px-4 py-2 whitespace-nowrap">
              <span className="blink size-1.5 rounded-full bg-teal" aria-hidden="true" />
              <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-soft uppercase">
                {profile.employer} <span className="text-dim">·</span> APAC
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry strip */}
      <div className="relative mx-auto mt-14 max-w-[1180px] px-5 sm:mt-20 sm:px-8">
        <dl className="panel ticks grid grid-cols-2 lg:grid-cols-4">
          {profile.telemetry.map((t, i) => (
            <div
              key={t.label}
              className={`px-5 py-4 sm:px-6 sm:py-5 ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <dt className="label">{t.label}</dt>
              <dd className="mt-1.5 text-sm leading-snug font-medium text-ink sm:text-base">{t.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
