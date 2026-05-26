import { cn } from "@/lib/cn";

interface TierItem {
  label: string;
  dashed?: boolean;
}

interface Tier {
  title: string;
  items: TierItem[];
}

const tiers: Tier[] = [
  {
    title: "API",
    items: [{ label: "REST" }, { label: "JWT" }, { label: "RBAC" }],
  },
  {
    title: "SCHEDULER",
    items: [
      { label: "Quartz" },
      { label: "cron" },
      { label: "dispatch" },
      { label: "Redisson lock" },
    ],
  },
  {
    title: "WORKERS",
    items: [
      { label: "worker 1" },
      { label: "worker 2" },
      { label: "worker n" },
    ],
  },
  {
    title: "DATA",
    items: [
      { label: "Postgres" },
      { label: "Redis" },
      { label: "DLQ", dashed: true },
    ],
  },
];

function TierBox({ tier }: { tier: Tier }) {
  return (
    <div className="flex-1 border border-line-subtle bg-surface p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
        {`// ${tier.title}`}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {tier.items.map((item) => (
          <li key={item.label}>
            <span
              className={cn(
                "inline-flex items-center border border-line-subtle px-2 py-1 font-mono text-[11px] text-ink-secondary",
                item.dashed && "border-dashed text-ink-muted",
              )}
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Connector() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center text-ink-deep"
    >
      {/* down arrow on mobile */}
      <span className="font-mono text-[16px] leading-none md:hidden">↓</span>
      {/* right arrow on md+ */}
      <span className="hidden font-mono text-[16px] leading-none md:inline">
        →
      </span>
    </div>
  );
}

export function ArchitectureDiagram() {
  return (
    <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-stretch">
      {tiers.map((tier, index) => (
        <div key={tier.title} className="contents">
          <TierBox tier={tier} />
          {index < tiers.length - 1 && <Connector />}
        </div>
      ))}
    </div>
  );
}

export default ArchitectureDiagram;
