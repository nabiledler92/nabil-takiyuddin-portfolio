import { ContactForm } from "@/components/ContactForm";
import { ArrowUpRight, LinkedInIcon, MailIcon } from "@/components/Icons";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeading
        id="contact-title"
        index="08"
        code="Contact"
        title="Open a channel."
        lede="For MarTech, analytics, data or AI automation work, email is the fastest way to reach me."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="min-w-0 space-y-4" data-reveal>
          <a href={`mailto:${profile.email}`} className="panel panel-hover ticks group flex items-center gap-4 p-5 sm:p-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-cyan/8 text-cyan">
              <MailIcon width={20} height={20} />
            </span>
            <span className="min-w-0">
              <span className="label block">Email</span>
              <span className="mt-1 block truncate text-[0.9375rem] font-medium text-ink sm:text-base">{profile.email}</span>
            </span>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer me"
            className="panel panel-hover group flex items-center gap-4 p-5 sm:p-6"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-cyan/8 text-cyan">
              <LinkedInIcon width={20} height={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="label block">LinkedIn</span>
              <span className="mt-1 block truncate text-[0.9375rem] font-medium text-ink sm:text-base">
                {profile.linkedinLabel}
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </span>
            <ArrowUpRight className="shrink-0 text-dim transition-colors group-hover:text-cyan" />
          </a>
          <div className="panel p-5 sm:p-6">
            <p className="label">Location</p>
            <p className="mt-1 text-[0.9375rem] font-medium text-ink sm:text-base">
              {profile.location.locality}, {profile.location.region}, {profile.location.country}
            </p>
          </div>
        </div>

        <div className="panel min-w-0 p-5 sm:p-8" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
          <div className="mb-6 flex items-center gap-3 border-b border-line pb-4">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="size-2 rounded-full bg-teal" />
              <span className="size-2 rounded-full bg-cyan/60" />
              <span className="size-2 rounded-full bg-violet/60" />
            </span>
            <h3 className="label">Message uplink</h3>
          </div>
          <ContactForm to={profile.email} />
        </div>
      </div>
    </Section>
  );
}
