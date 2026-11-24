import Link from "next/link";
import { Monogram } from "@/components/Icons";
import { profile } from "@/content/profile";
import { caseStudies } from "@/content/projects";
import { trackAttrs } from "@/lib/track";

export function Footer() {
  return (
    <footer className="relative mt-10 border-t border-line">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-3">
            <Monogram size={34} />
            <span className="font-display text-lg font-semibold tracking-tight text-ink">{profile.name}</span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            {profile.role} at {profile.employer}. Based in {profile.location.locality}, {profile.location.region},{" "}
            {profile.location.country}.
          </p>
          <p className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] tracking-[0.1em] text-dim uppercase">
            Press <kbd>/</kbd> or <kbd>⌘/Ctrl</kbd>
            <kbd>K</kbd> to jump anywhere
          </p>
        </div>

        <nav aria-label="Case studies">
          <h2 className="label label-cyan">Case studies</h2>
          <ul className="mt-4 space-y-2.5">
            {caseStudies.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/projects/${c.slug}`}
                  className="text-sm text-soft transition-colors hover:text-cyan"
                  {...trackAttrs("case_study_open", { case_study: c.slug, click_location: "footer" })}
                >
                  {c.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="label label-cyan">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="break-all text-soft transition-colors hover:text-cyan"
                {...trackAttrs("contact_click", { contact_type: "email", click_location: "footer" })}
              >
                {profile.email}
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer me"
                className="text-soft transition-colors hover:text-cyan"
                {...trackAttrs("contact_click", { contact_type: "linkedin", click_location: "footer" })}
              >
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <Link href="/#contact" className="text-soft transition-colors hover:text-cyan">
                Contact form
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-2 px-5 py-5 font-mono text-[0.625rem] tracking-[0.14em] text-dim uppercase sm:px-8">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Built with Next.js · End of transmission</span>
        </p>
      </div>
    </footer>
  );
}
