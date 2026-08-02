import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Toolwright",
  description:
    "About Toolwright — free online calculators (Age, mortgage, BMI, pregnancy & more). Fast answers, US-ready defaults, private in your browser.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description:
      "Free calculators with US units, clear English, and no signup wall — Age Calculator, mortgage, BMI, and 100+ tools.",
    url: absoluteUrl("/about"),
    locale: "en_US",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            ...organizationJsonLd(),
            foundingLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
            },
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <nav aria-label="Breadcrumb" className="text-sm text-ink-faint">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-ink-muted">About</li>
          </ol>
        </nav>

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.08em] text-ink-faint">
          Made in the United States
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Built by an American, for people who just need the number
        </h1>

        <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-muted">
          <p>
            Hey — I’m the person behind {siteConfig.name}. I got tired of
            opening a “simple” calculator online and getting hit with pop-ups,
            newsletter traps, and a page that takes forever to load. So I built
            the kind of site I’d actually use on a Tuesday afternoon in the
            States: open it, enter your numbers, get the answer, move on.
          </p>
          <p>
            This project is aimed first at folks in the{" "}
            <strong className="font-semibold text-ink">
              United States and the rest of the English-speaking West
            </strong>
            . Defaults lean American where it matters — pounds and inches on
            health tools, dates written the US way, plain English, no weird
            unit surprises. If you’re filling out a form, checking a due date,
            figuring BMI before a checkup, or logging macros for the gym, you’re
            who I had in mind.
          </p>
          <p>
            Every calculator stays free. Your numbers stay on your device. I’m
            not selling your data, and I’m not going to make you create an
            account to see a result. That’s not how this should work.
          </p>
          <p>
            Is every estimate perfect? No — and I’ll say that up front. Health
            and pregnancy tools are for planning and curiosity, not a
            substitute for your doctor. But they use the same formulas Americans
            already see everywhere (Mifflin–St Jeor, Naegele’s rule, Navy body
            fat, and so on), laid out clean so you can trust what you’re looking
            at.
          </p>
          <p>
            If something’s broken, confusing, or missing a calculator you use
            all the time, email me. This is a real product from a real person —
            not a content farm.
          </p>
        </div>

        <dl className="mt-10 grid gap-4 border-t border-line pt-8 sm:grid-cols-3">
          {[
            { label: "Home base", value: "United States" },
            { label: "Language", value: "American English" },
            { label: "Units", value: "US defaults (lb / in)" },
          ].map((item) => (
            <div key={item.label}>
              <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-faint">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/tools" className="btn btn-primary">
            Browse the calculators
          </Link>
          <a href={`mailto:${siteConfig.email}`} className="btn btn-secondary">
            Email me
          </a>
          <Link href="/privacy" className="btn btn-secondary">
            Privacy Policy
          </Link>
        </div>
      </div>
    </>
  );
}
