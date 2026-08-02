import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { siteConfig } from "@/lib/site";
import { categories, tools, type ToolCategory } from "@/lib/tools";

const footerCategories: ToolCategory[] = [
  "finance",
  "fitness",
  "pregnancy",
  "nutrition",
];

export function Footer() {
  const year = new Date().getFullYear();
  const popular = tools.filter((t) => t.featured).slice(0, 8);

  return (
    <footer className="relative z-10 mt-auto border-t border-line bg-bg-elevated">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <BrandLogo size="md" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
            {siteConfig.tagline} Free online calculators for mortgages, loans,
            health, pregnancy, and everyday math.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-faint">
            Popular tools
          </p>
          <ul className="mt-4 space-y-2">
            {popular.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/${tool.slug}`}
                  className="text-sm text-ink-muted hover:text-ink"
                >
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-faint">
            Categories
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            {footerCategories.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/tools?category=${cat}`}
                  className="hover:text-ink"
                >
                  {categories[cat].label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/tools" className="hover:text-ink">
                All tools
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-faint">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            <li>
              <Link href="/blog" className="hover:text-ink">
                Blog & guides
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-ink">
                About
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-ink">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-ink">
                Terms of Use
              </Link>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-ink">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {year} {siteConfig.name}. All tools are free to use.
          </p>
          <p className="flex flex-wrap gap-x-3 gap-y-1">
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink">
              Terms
            </Link>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-ink">
              Contact
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
