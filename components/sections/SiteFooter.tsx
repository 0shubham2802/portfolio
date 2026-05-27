import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 flex flex-col gap-3 border-t-[0.5px] border-line-subtle py-6 font-mono text-[11px] uppercase tracking-[0.08em] sm:flex-row sm:items-center sm:justify-between sm:gap-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <span className="text-ink-muted">Built with Next.js · Three.js</span>
        <Link
          href="/play"
          className="text-ink-muted transition-colors duration-200 ease-out hover:text-accent"
        >
          Arcade ↗
        </Link>
      </div>
      <span className="text-ink-tertiary">© 2026 Shubham Pant</span>
      <a
        href="#top"
        className="text-ink-muted transition-colors duration-200 ease-out hover:text-accent"
      >
        Back to top ↑
      </a>
    </footer>
  );
}

export default SiteFooter;
