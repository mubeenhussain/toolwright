import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-start px-5 py-24 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-faint">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-ink-muted">
        That URL doesn’t match a tool or page on Toolwright. Head back to the
        toolkit and keep building.
      </p>
      <Link href="/tools" className="btn btn-primary mt-8">
        Browse tools
      </Link>
    </div>
  );
}
