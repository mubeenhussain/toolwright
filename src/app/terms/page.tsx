import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of Use for ${siteConfig.name}: using free calculators for education and planning — not professional financial, legal, or medical advice.`,
  robots: { index: true, follow: true },
  alternates: {
    canonical: absoluteUrl("/terms"),
  },
};

const updated = "August 1, 2026";

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms of Use", path: "/terms" },
        ])}
      />
      <article className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <nav aria-label="Breadcrumb" className="text-sm text-ink-faint">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-ink-muted">Terms of Use</li>
          </ol>
        </nav>

        <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-2 text-sm text-ink-faint">Last updated: {updated}</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink-muted sm:text-base">
          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              1. Agreement
            </h2>
            <p className="mt-2">
              By using {siteConfig.name} (the “Site”), you agree to these Terms
              of Use. If you do not agree, do not use the Site. The Site is
              operated from the United States and intended primarily for users
              in the US and other English-speaking Western countries.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              2. What we provide
            </h2>
            <p className="mt-2">
              {siteConfig.name} offers free online calculators and utility tools
              for informational and personal use. Features may change, and we
              may add or remove tools at any time.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              3. Not medical, legal, or professional advice
            </h2>
            <p className="mt-2">
              Results from health, fitness, pregnancy, nutrition, age, finance-
              adjacent, or similar tools are{" "}
              <span className="font-semibold text-ink">estimates only</span>.
              They are not medical advice, diagnosis, treatment, or a substitute
              for talking to a licensed professional. Do not make health or
              safety decisions based solely on this Site. Blood-alcohol and
              similar estimates must never be used to decide whether it is legal
              or safe to drive.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              4. Acceptable use
            </h2>
            <p className="mt-2">You agree not to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Abuse, overload, or disrupt the Site or its infrastructure</li>
              <li>Attempt to hack, scrape unlawfully, or reverse engineer the service in violation of law</li>
              <li>Use the Site for illegal activity</li>
              <li>Misrepresent calculator results as certified professional opinions</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              5. Intellectual property
            </h2>
            <p className="mt-2">
              The Site’s design, branding, and original content belong to{" "}
              {siteConfig.name} or its licensors. You may use the tools for
              personal, non-commercial purposes. You may not copy the Site
              wholesale, republish our pages as your own product, or remove
              branding to resell the service without permission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              6. Advertising
            </h2>
            <p className="mt-2">
              The Site may display third-party advertisements (including Google
              AdSense). Ad content is provided by third parties; we are not
              responsible for advertisers’ products or claims. Your use of ads
              and related cookies is also described in our{" "}
              <Link href="/privacy" className="text-accent hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              7. Disclaimer of warranties
            </h2>
            <p className="mt-2">
              THE SITE AND ALL TOOLS ARE PROVIDED “AS IS” AND “AS AVAILABLE,”
              WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED,
              INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT. We do not warrant that results will be accurate,
              complete, or error-free.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              8. Limitation of liability
            </h2>
            <p className="mt-2">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, {siteConfig.name.toUpperCase()}{" "}
              AND ITS OPERATOR WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA,
              PROFITS, OR GOODWILL, ARISING FROM YOUR USE OF THE SITE. OUR TOTAL
              LIABILITY FOR ANY CLAIM RELATED TO THE SITE WILL NOT EXCEED ONE
              HUNDRED U.S. DOLLARS (US $100).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              9. Indemnity
            </h2>
            <p className="mt-2">
              You agree to defend and hold harmless {siteConfig.name} and its
              operator from claims arising out of your misuse of the Site or
              violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              10. Governing law
            </h2>
            <p className="mt-2">
              These Terms are governed by the laws of the United States and the
              State of Delaware, without regard to conflict-of-law rules,
              except where your local mandatory consumer laws say otherwise.
              Courts located in the United States will have exclusive
              jurisdiction over disputes, subject to applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              11. Changes
            </h2>
            <p className="mt-2">
              We may update these Terms at any time. The “Last updated” date
              will change when we do. Continued use after changes means you
              accept the new Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              12. Contact
            </h2>
            <p className="mt-2">
              Questions about these Terms? Email{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent hover:underline"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>
        </div>

        <p className="mt-10 text-sm text-ink-faint">
          Also see our{" "}
          <Link href="/privacy" className="text-accent hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </article>
    </>
  );
}
