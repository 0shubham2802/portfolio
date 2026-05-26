import { MonoLabel } from "@/components/ui/MonoLabel";
import { cn } from "@/lib/cn";
import type { TimelineEntry } from "@/content/timeline";

interface TimelineProps {
  entries: TimelineEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <ol className="border-t border-line-subtle">
      {entries.map((entry, index) => (
        <li
          key={`${entry.title}-${index}`}
          className={cn(
            "grid grid-cols-[auto_1fr] gap-x-6 border-b border-line-subtle py-5",
            entry.current && "border-l border-accent pl-4",
          )}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-muted">
            {entry.when}
          </span>
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <h3 className="text-[17px] font-medium text-ink">
                {entry.title}
              </h3>
              <span className="text-[15px] text-ink-secondary">
                {entry.org}
              </span>
              {entry.current ? (
                <MonoLabel tone="accent" className="text-[10px]">
                  {"// NOW"}
                </MonoLabel>
              ) : null}
            </div>
            {entry.detail ? (
              <p className="max-w-2xl text-[15px] leading-[1.6] text-ink-tertiary">
                {entry.detail}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default Timeline;
