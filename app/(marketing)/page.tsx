import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { Reveal } from "@/components/ui/Reveal";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { bio } from "@/content/bio";
import { stack } from "@/content/stack";
import { projects } from "@/content/projects";

export default function HomePage() {
  const preview = projects.filter(
    (project) => project.featured || project.slug === "hello-geo",
  );

  return (
    <>
      <Hero />

      <section id="content" className="scroll-mt-8 pt-20">
        <Reveal className="space-y-5">
          <MonoLabel as="h2" tone="muted">
            {"// CURRENTLY"}
          </MonoLabel>
          <p className="max-w-2xl text-[17px] leading-[1.65] text-ink-secondary">
            I&rsquo;m building <span className="text-ink">Chronos</span>, a
            distributed job scheduler with cron execution, Redisson-backed
            locking, exponential-backoff retries, and email notifications. I
            care about systems that stay correct under concurrency and scale out
            cleanly &mdash; and about the unglamorous details that keep them
            reliable in production.
          </p>
          <ul className="flex flex-wrap gap-2 pt-1">
            {stack.primary.map((item) => (
              <li key={item}>
                <Pill variant="tag">{item}</Pill>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="pt-20">
        <Reveal className="space-y-6">
          <div className="flex items-center justify-between">
            <MonoLabel as="h2" tone="muted">
              {"// SELECTED_WORK"}
            </MonoLabel>
            <Link
              href="/work"
              className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent transition-colors duration-200 ease-out"
            >
              VIEW_ALL_WORK →
            </Link>
          </div>
          <ProjectGrid projects={preview} />
        </Reveal>
      </section>

      <section className="pb-16 pt-20">
        <Reveal className="space-y-5">
          <MonoLabel as="h2" tone="muted">
            {"// GET_IN_TOUCH"}
          </MonoLabel>
          <p className="max-w-md text-[17px] leading-[1.65] text-ink-secondary">
            Open to backend and platform engineering roles. The fastest way to
            reach me is email.
          </p>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Button href="/contact">CONTACT →</Button>
            <Button href={bio.contact.github} external variant="secondary">
              GITHUB ↗
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
