import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import type { ProjectBadge } from "@/content/projects";

interface CaseStudyHeaderProps {
  order: string;
  total: string;
  title: string;
  pathLabel: string;
  badges?: ProjectBadge[];
}

export function CaseStudyHeader({
  order,
  total,
  title,
  pathLabel,
  badges = [],
}: CaseStudyHeaderProps) {
  return (
    <Reveal>
      <header className="flex flex-col gap-4 pt-8">
        <MonoLabel>{`> SELECTED_WORK / ${order}_of_${total}`}</MonoLabel>

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
    </Reveal>
  );
}

export default CaseStudyHeader;
