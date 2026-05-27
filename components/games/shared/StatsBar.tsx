import { cn } from "@/lib/cn";

type StatTone = "default" | "accent" | "positive" | "negative";

const toneClass: Record<StatTone, string> = {
  default: "text-ink",
  accent: "text-accent",
  positive: "text-positive",
  negative: "text-negative",
};

export function Stat({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: StatTone;
}) {
  return (
    <div className="flex-1 px-3 py-2.5 md:px-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">
        {label}
      </div>
      <div
        className={cn(
          "mt-0.5 font-mono text-[18px] tabular-nums md:text-[20px]",
          toneClass[tone],
        )}
      >
        {value}
      </div>
    </div>
  );
}

export function StatsBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex divide-x divide-line-subtle border border-line-subtle bg-surface-deep">
      {children}
    </div>
  );
}

export default StatsBar;
