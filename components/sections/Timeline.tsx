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
            "grid grid-cols-1 gap-y-2 border-b border-line-subtle py-6 sm:grid-cols-[140px_1fr] sm:gap-x-8",
            entry.current && "border-l-2 border-l-accent pl-4 sm:pl-5",
          )}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-muted sm:pt-1">
            {entry.when}
          </span>

          <div className="space-y-2.5">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <h3 className="text-[17px] font-medium text-ink">{entry.title}</h3>
              {entry.org ? (
                <span className="text-[15px] text-ink-secondary">
                  {entry.org}
                </span>
              ) : null}
              {entry.current ? (
                <MonoLabel tone="accent" className="text-[10px]">
                  {"// NOW"}
                </MonoLabel>
              ) : null}
            </div>

            {entry.points && entry.points.length > 0 ? (
              <ul className="space-y-1.5">
                {entry.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2.5 text-[15px] leading-[1.6] text-ink-tertiary"
                  >
                    <span aria-hidden="true" className="text-accent">
                      —
                    </span>
                    <span className="max-w-2xl">{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default Timeline;
