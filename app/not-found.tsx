import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Page not found | Nabil Takiyuddin",
  description: "This page does not exist. Head back to the home page to see Nabil Takiyuddin's work.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-[1180px] flex-col items-start justify-center px-5 pt-[var(--nav-h)] sm:px-8">
      <p className="label label-cyan">Error 404 · Signal lost</p>
      <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight text-ink sm:text-7xl">
        This page is off the grid.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted">
        The address you followed does not match any page on this site.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        <ArrowLeft /> Back to mission control
      </Link>
    </section>
  );
}
