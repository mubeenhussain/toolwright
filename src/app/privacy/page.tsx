import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}: what we collect (usually little), cookies, ads, and how calculator inputs stay in your browser.`,
  robots: { index: true, follow: true },
  alternates: {
    canonical: absoluteUrl("/privacy"),
  },
};

const updated = "August 1, 2026";

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
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
            <li className="text-ink-muted">Privacy Policy</li>
          </ol>
        </nav>

        <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-ink-faint">Last updated: {updated}</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink-muted sm:text-base">
          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              1. Who we are
            </h2>
            <p className="mt-2">
              {siteConfig.name} (“we,” “us,” or “our”) operates{" "}
              <a href={siteConfig.url} className="text-accent hover:underline">
                {siteConfig.url}
              </a>
              , a free online calculator and tools website based in the United
              States. If you have questions about this policy, email{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent hover:underline"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              2. What this site does with your calculator inputs
            </h2>
            <p className="mt-2">
              Most tools on {siteConfig.name} run in your browser. When you type
              numbers, dates, or text into a calculator, that information is
              processed on your device to show a result. We do not ask you to
              create an account, and we do not intentionally upload your tool
              inputs to our servers for storage or sale.
            </p>
            <p className="mt-2">
              Health, fitness, and pregnancy calculators provide estimates only.
              They are not medical advice.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              3. Information we may collect
            </h2>
            <p className="mt-2">Depending on how you use the site, we may process:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <span className="font-semibold text-ink">Contact email</span> —
                if you email us, we receive whatever you send (your address and
                message).
              </li>
              <li>
                <span className="font-semibold text-ink">
                  Basic technical data
                </span>{" "}
                — such as IP address, browser type, device type, and pages
                visited, which hosting providers or analytics tools may log
                automatically.
              </li>
              <li>
                <span className="font-semibold text-ink">Cookies and similar
                technologies</span>{" "}
                — used for site operation, preferences, analytics, and (if
                enabled) advertising.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              4. Advertising (Google AdSense) & cookies
            </h2>
            <p className="mt-2">
              We may use Google AdSense or similar advertising partners to show
              ads. Third-party vendors, including Google, may use cookies or
              similar technologies to serve ads based on your prior visits to
              this site or other sites.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Google’s use of advertising cookies enables it and its partners
                to serve ads based on your visit to {siteConfig.name} and/or
                other sites on the Internet.
              </li>
              <li>
                You may opt out of personalized advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  className="text-accent hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Google Ads Settings
                </a>
                , or opt out of some third-party vendors’ use of cookies for
                personalized advertising at{" "}
                <a
                  href="https://www.aboutads.info/choices/"
                  className="text-accent hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  aboutads.info/choices
                </a>
                .
              </li>
            </ul>
            <p className="mt-2">
              For more detail on how Google uses data, see{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                className="text-accent hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                How Google uses information from sites or apps that use our
                services
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              5. Analytics
            </h2>
            <p className="mt-2">
              We may use privacy-conscious or standard analytics (for example,
              Google Analytics) to understand which pages are popular and how
              the site performs. These tools may set cookies and collect
              aggregated usage information.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              6. How we use information
            </h2>
            <p className="mt-2">We use information to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Operate, maintain, and improve {siteConfig.name}</li>
              <li>Respond to messages you send us</li>
              <li>Measure traffic and fix bugs</li>
              <li>Show ads (when advertising is enabled)</li>
              <li>Comply with law and protect the site from abuse</li>
            </ul>
            <p className="mt-2">
              We do not sell your calculator inputs. We do not sell personal
              information in the ordinary sense of “selling a customer list.”
              Some advertising and analytics partners may process data as
              described in their own policies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              7. Children’s privacy
            </h2>
            <p className="mt-2">
              {siteConfig.name} is not directed at children under 13. We do not
              knowingly collect personal information from children under 13. If
              you believe a child has provided us information, contact us and we
              will take appropriate steps.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              8. Your choices (US & elsewhere)
            </h2>
            <p className="mt-2">
              Depending on where you live, you may have rights to access,
              correct, or delete certain personal information, or to opt out of
              sale/sharing of personal information for advertising. To make a
              request, email{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent hover:underline"
              >
                {siteConfig.email}
              </a>
              . You can also control cookies through your browser settings and
              the ad opt-out links above.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              9. Data security & retention
            </h2>
            <p className="mt-2">
              We use reasonable measures to protect the site. No method of
              transmission over the Internet is 100% secure. We retain contact
              emails and server logs only as long as needed for the purposes
              above, unless a longer period is required by law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              10. Third-party links
            </h2>
            <p className="mt-2">
              The site may link to other websites. We are not responsible for
              their privacy practices. Review their policies separately.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              11. Changes
            </h2>
            <p className="mt-2">
              We may update this Privacy Policy from time to time. The “Last
              updated” date at the top will change when we do. Continued use of
              the site after changes means you accept the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              12. Contact
            </h2>
            <p className="mt-2">
              {siteConfig.name}
              <br />
              United States
              <br />
              Email:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent hover:underline"
              >
                {siteConfig.email}
              </a>
            </p>
          </section>
        </div>

        <p className="mt-10 text-sm text-ink-faint">
          Also see our{" "}
          <Link href="/terms" className="text-accent hover:underline">
            Terms of Use
          </Link>
          .
        </p>
      </article>
    </>
  );
}
