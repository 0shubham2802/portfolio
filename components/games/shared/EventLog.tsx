"use client";

import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export type LogTone = "default" | "positive" | "negative" | "accent";

export interface LogEntry {
  id: string;
  time: string; // "00:42"
  message: string;
  delta?: string; // "+250"
  tone?: LogTone;
}

const toneClass: Record<LogTone, string> = {
  default: "text-ink-muted",
  positive: "text-positive",
  negative: "text-negative",
  accent: "text-accent",
};

export function EventLog({
  entries,
  max,
}: {
  entries: LogEntry[];
  max?: number;
}) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const limit = max ?? (isMobile ? 2 : 3);
  const shown = entries.slice(0, limit);

  return (
    <div className="font-mono text-[11px] leading-[1.7]">
      {shown.length === 0 ? (
        <div className="text-ink-deep">{"> awaiting events…"}</div>
      ) : (
        shown.map((entry) => (
          <div key={entry.id} className={toneClass[entry.tone ?? "default"]}>
            <span className="text-ink-deep">{`> ${entry.time}`}</span>{" "}
            {entry.message}
            {entry.delta ? (
              <span className="ml-1 tabular-nums">{entry.delta}</span>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
}

export default EventLog;
