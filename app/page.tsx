import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Impact } from "@/components/sections/Impact";
import { EducationSection, MoreProjects, Skills } from "@/components/sections/More";
import { Work } from "@/components/sections/Work";
import { homeLd } from "@/lib/jsonld";
import { SITE_NAME } from "@/lib/site";

const TITLE = "Nabil Takiyuddin | MarTech & Analytics Manager, Malaysia";
const DESCRIPTION =
  "Nabil Takiyuddin is a MarTech & Analytics Manager in Malaysia working across marketing technology, analytics, data engineering and applied AI. MSc Data Science.";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/" },
    openGraph: {
      type: "profile",
      url: "/",
      siteName: SITE_NAME,
      locale: "en_MY",
      title: TITLE,
      description: DESCRIPTION,
      firstName: "Nabil",
      lastName: "Takiyuddin",
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  };
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeLd()} />
      <Hero />
      <About />
      <Impact />
      <Experience />
      <Work />
      <MoreProjects />
      <Skills />
      <EducationSection />
      <Contact />
    </>
  );
}
