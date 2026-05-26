export function SiteFooter() {
  return (
    <footer className="mt-20 flex flex-col gap-3 border-t-[0.5px] border-line-subtle py-6 font-mono text-[11px] uppercase tracking-[0.08em] sm:flex-row sm:items-center sm:justify-between sm:gap-0">
      <span className="text-ink-muted">
        Built with Next.js · Three.js
      </span>
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
