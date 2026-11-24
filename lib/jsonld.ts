import type { Article } from "@/content/articles";
import { profile } from "@/content/profile";
import type { CaseStudy } from "@/content/projects";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function personLd() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    url: SITE_URL,
    image: absoluteUrl("/images/nabil-takiyuddin.jpg"),
    jobTitle: profile.role,
    description: profile.answer,
    email: `mailto:${profile.email}`,
    worksFor: { "@type": "Organization", name: profile.employer },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Universiti Teknologi MARA (UiTM)" },
      { "@type": "CollegeOrUniversity", name: "Yarmouk University" },
    ],
    knowsAbout: [...profile.knowsAbout],
    knowsLanguage: profile.languages.map((l) => l.name),
    sameAs: [profile.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location.locality,
      addressRegion: profile.location.region,
      addressCountry: profile.location.countryCode,
    },
  };
}

export function homeLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        description: profile.answer,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: `${profile.name} | ${profile.role}`,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
      },
      personLd(),
    ],
  };
}

export function caseStudyLd(cs: CaseStudy) {
  const url = absoluteUrl(`/projects/${cs.slug}`);
  const contributors = (cs.team ?? [])
    .filter((n) => n !== profile.name)
    .map((name) => ({ "@type": "Person", name }));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": cs.schemaType,
        "@id": `${url}#work`,
        url,
        mainEntityOfPage: url,
        name: cs.title,
        headline: cs.title.length > 110 ? cs.shortTitle : cs.title,
        description: cs.summary,
        inLanguage: "en",
        keywords: cs.keywords.join(", "),
        image: absoluteUrl(`/projects/${cs.slug}/opengraph-image`),
        author: {
          "@type": "Person",
          "@id": PERSON_ID,
          name: profile.name,
          url: SITE_URL,
        },
        ...(contributors.length ? { contributor: contributors } : {}),
        ...(cs.recognition ? { award: cs.recognition.title } : {}),
        isPartOf: { "@type": "WebSite", "@id": WEBSITE_ID, url: SITE_URL, name: SITE_NAME },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Case studies", item: `${SITE_URL}/#work` },
          { "@type": "ListItem", position: 3, name: cs.shortTitle, item: url },
        ],
      },
    ],
  };
}

export function articleLd(a: Article) {
  const url = absoluteUrl(`/articles/${a.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        url,
        mainEntityOfPage: url,
        headline: a.title.length > 110 ? a.shortTitle : a.title,
        description: a.summary,
        inLanguage: "en",
        keywords: a.keywords.join(", "),
        datePublished: a.published,
        dateModified: a.updated,
        image: absoluteUrl("/opengraph-image"),
        author: { "@type": "Person", "@id": PERSON_ID, name: profile.name, url: SITE_URL },
        ...(a.caseStudy ? { about: { "@id": `${absoluteUrl(`/projects/${a.caseStudy}`)}#work` } } : {}),
        isPartOf: { "@type": "WebSite", "@id": WEBSITE_ID, url: SITE_URL, name: SITE_NAME },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: a.shortTitle, item: url },
        ],
      },
    ],
  };
}
