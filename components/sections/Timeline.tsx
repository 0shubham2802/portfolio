import { cn } from "@/lib/cn";
import type { TimelineItem } from "@/content/timeline";

interface TimelineProps {
  entries: TimelineItem[];
}

function Panel({ item, side }: { item: TimelineItem; side: "left" | "right" }) {
  return (
    <div
      className={cn(
        "max-w-[300px]",
        side === "left" ? "text-right" : "text-left",
      )}
    >
      <h3 className="text-[13px] font-medium leading-[1.3] text-ink md:text-[15px]">
        {item.org}
      </h3>
      <p className="mt-1 font-mono text-[11px] tracking-[0.05em] text-ink-tertiary">
        {item.when}
      </p>
      <ul className="mt-2 space-y-1">
        {item.bullets.map((bullet) => (
          <li
            key={bullet}
            className="text-[11px] leading-[1.6] text-ink-muted md:text-[12px]"
          >
            {`· ${bullet}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <ol className="relative mx-auto flex w-full max-w-3xl flex-col">
      {entries.map((item, index) => {
        const isRight = index % 2 === 0;
        const isLast = index === entries.length - 1;

        return (
          <li
            key={`${item.org}-${index}`}
            className={cn(
              "grid grid-cols-[1fr_16px_1fr] gap-x-4",
              !isLast && "pb-[60px] md:pb-20",
            )}
          >
            <div className="flex justify-end">
              {!isRight ? <Panel item={item} side="left" /> : null}
            </div>

            <div className="relative">
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-1/2 top-[10px] w-px -translate-x-1/2 bg-line"
                />
              ) : null}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-1/2 top-[3px] block h-3.5 w-3.5 -translate-x-1/2 rounded-full",
                  item.current
                    ? "bg-accent"
                    : "border-[1.5px] border-line-emphasis bg-base",
                )}
              />
            </div>

            <div className="flex justify-start">
              {isRight ? <Panel item={item} side="right" /> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default Timeline;
