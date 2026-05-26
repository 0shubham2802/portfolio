import Link from "next/link";

import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";
import type { Project } from "@/content/projects";

interface ProjectGridProps {
  projects: Project[];
}

const accentLink =
  "font-mono text-[11px] uppercase tracking-[0.08em] text-accent transition-colors duration-200 ease-out";

function ProjectCta({ project }: { project: Project }) {
  if (project.hasCaseStudy) {
    return (
      <Link href={`/work/${project.slug}`} className={accentLink}>
        Read {project.title} case study →
      </Link>
    );
  }

  if (project.links.github) {
    return (
      <a
        href={project.links.github}
        target="_blank"
        rel="noopener noreferrer"
        className={accentLink}
      >
        {project.title} on GitHub ↗
      </a>
    );
  }

  return null;
}

function FeaturedCard({ project }: { project: Project }) {
  const isLinked = project.hasCaseStudy || Boolean(project.links.github);
  const tags = project.tags.slice(0, 6);

  return (
    <article
      className={cn(
        "border border-line-subtle bg-surface p-8",
        isLinked &&
          "transition-colors duration-200 ease-out hover:border-line-emphasis",
      )}
    >
      <div className="flex flex-col gap-5">
        <MonoLabel tone="muted" className="normal-case">
          {project.order} · {project.kind}
        </MonoLabel>

        <h2 className="text-[28px] font-medium leading-[1.05] tracking-[-0.5px] text-ink">
          {project.title}
          <span className="text-accent">.</span>
        </h2>

        <p className="max-w-2xl text-[16px] leading-[1.6] text-ink-secondary">
          {project.oneLiner}
        </p>

        {project.badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.badges.map((badge) => (
              <Pill key={badge.label} variant={badge.variant}>
                {badge.label}
              </Pill>
            ))}
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Pill key={tag} variant="tag">
                {tag}
              </Pill>
            ))}
          </div>
        )}

        <ProjectCta project={project} />
      </div>
    </article>
  );
}

function SmallCard({ project }: { project: Project }) {
  const isLinked = project.hasCaseStudy || Boolean(project.links.github);
  const showTags = project.tags.length > 0;
  const tags = project.tags.slice(0, 6);

  return (
    <article
      className={cn(
        "border border-line-subtle bg-surface p-6",
        isLinked &&
          "transition-colors duration-200 ease-out hover:border-line-emphasis",
      )}
    >
      <div className="flex flex-col gap-4">
        <MonoLabel tone="muted" className="normal-case">
          {project.order} · {project.kind}
        </MonoLabel>

        <h3 className="text-[20px] font-medium leading-[1.1] tracking-[-0.3px] text-ink">
          {project.title}
        </h3>

        <p className="text-[15px] leading-[1.6] text-ink-secondary">
          {project.oneLiner}
        </p>

        {project.badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.badges.map((badge) => (
              <Pill key={badge.label} variant={badge.variant}>
                {badge.label}
              </Pill>
            ))}
          </div>
        )}

        {showTags && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Pill key={tag} variant="tag">
                {tag}
              </Pill>
            ))}
          </div>
        )}

        <ProjectCta project={project} />
      </div>
    </article>
  );
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const featured = projects.find((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <div className="flex flex-col gap-6">
      {featured && <FeaturedCard project={featured} />}

      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {rest.map((project) => (
            <SmallCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectGrid;
