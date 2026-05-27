import Link from "next/link";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pill } from "@/components/ui/Pill";
import type { ProjectBadge } from "@/content/projects";

interface CaseStudyHeaderProps {
  title: string;
  pathLabel: string;
  badges?: ProjectBadge[];
}

export function CaseStudyHeader({
  title,
  pathLabel,
  badges = [],
}: CaseStudyHeaderProps) {
  return (
    <header className="flex flex-col gap-4 pt-8">
      <Link
        href="/work"
        className="w-fit font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted transition-colors duration-200 ease-out hover:text-accent"
      >
        ← BACK_TO_WORK
      </Link>

      <MonoLabel>{"> SELECTED_WORK"}</MonoLabel>

      <h1 className="font-medium leading-[0.95] tracking-[-1px] text-[clamp(32px,5vw,48px)] text-ink">
        {title}
      </h1>

      <MonoLabel tone="accent" className="normal-case tracking-[0.04em]">
        {pathLabel}
      </MonoLabel>

      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {badges.map((badge) => (
            <Pill key={badge.label} variant={badge.variant}>
              {badge.label}
            </Pill>
          ))}
        </div>
      )}
    </header>
  );
}

export default CaseStudyHeader;
