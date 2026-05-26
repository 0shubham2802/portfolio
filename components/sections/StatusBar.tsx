import { bio } from "@/content/bio";

export function StatusBar() {
  return (
    <div className="flex items-center justify-between border-t-[0.5px] border-line-subtle py-5 font-mono text-[11px] uppercase tracking-[0.08em]">
      <span className="flex items-center gap-2 text-ink-secondary">
        <span
          className="inline-block h-1.5 w-1.5 rounded-full bg-positive"
          aria-hidden="true"
        />
        {bio.status}
      </span>
      <span className="text-ink-muted">{bio.location}</span>
      <a
        href="#content"
        className="text-ink-tertiary transition-colors duration-200 ease-out hover:text-accent"
      >
        SCROLL ↓
      </a>
    </div>
  );
}

export default StatusBar;
