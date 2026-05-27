import type { Metadata } from "next";

import { ArchitectureDiagram } from "@/components/sections/ArchitectureDiagram";
import { CaseStudyHeader } from "@/components/sections/CaseStudyHeader";
import { FeatureBadge } from "@/components/sections/FeatureBadge";
import { Button } from "@/components/ui/Button";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pill } from "@/components/ui/Pill";
import {
  chronosFeatures,
  type FeatureStatus,
} from "@/content/chronos-features";

const oneLiner =
  "Multi-tenant distributed job scheduler with cron execution, Redisson-backed distributed locking, exponential-backoff retries, and email-driven failure notifications — full-stack (Spring Boot + React + Docker Compose).";

const github = "https://github.com/0shubham2802/Chronos-job-scheduler";

const tags = [
  "java 17",
  "spring boot 3.3.5",
  "postgres",
  "redis · redisson",
  "quartz",
  "jwt",
  "react 18",
  "vite",
  "docker",
  "nginx",
];

const featureGroups: { status: FeatureStatus; items: string[] }[] = [
  { status: "shipped", items: chronosFeatures.shipped },
  { status: "inProgress", items: chronosFeatures.inProgress },
  { status: "roadmap", items: chronosFeatures.roadmap },
];

export const metadata: Metadata = {
  title: "Chronos — Shubham Pant",
  description: oneLiner,
};

export default function ChronosPage() {
  return (
    <article className="enter-fade-up pt-8 space-y-16">
      <CaseStudyHeader
        title="Chronos"
        pathLabel="distributed_job_scheduler/"
        badges={[
          { label: "CAPSTONE", variant: "solid" },
          { label: "5 PHASES", variant: "muted" },
        ]}
      />

      <p className="max-w-2xl text-[17px] leading-[1.65] text-ink-secondary">
        {oneLiner}
      </p>

      <section className="space-y-6">
        <MonoLabel as="p">{"// ARCHITECTURE"}</MonoLabel>
        <ArchitectureDiagram />
      </section>

      <section className="space-y-6">
        <MonoLabel as="p">{"// FEATURES"}</MonoLabel>
        <div className="space-y-8">
          {featureGroups.map((group) => (
            <div key={group.status} className="space-y-3">
              <h3>
                <FeatureBadge status={group.status} />
              </h3>
              <ul>
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-line-subtle py-2.5 text-[15px] text-ink-secondary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <MonoLabel as="p">{"// TECHNICAL_DECISIONS"}</MonoLabel>
        <div className="max-w-2xl space-y-4">
          <p className="text-[16px] leading-[1.65] text-ink-secondary">
            <span className="text-ink">Splitting the scheduler from the workers</span>{" "}
            lets each scale independently and keeps responsibilities clean — the
            scheduler owns timing and dispatch, workers own execution.
          </p>
          <p className="text-[16px] leading-[1.65] text-ink-secondary">
            <span className="text-ink">Quartz over a hand-rolled cron parser</span>:
            it&apos;s battle-tested, handles misfires and persistence, and frees the
            project to focus on the distributed concerns rather than calendar math.
          </p>
          <p className="text-[16px] leading-[1.65] text-ink-secondary">
            <span className="text-ink">Redisson over plain Redis SETNX</span>: it
            provides proper lease renewal, fairness, and a watchdog that extends
            locks for long-running jobs, so a single-execution guarantee holds even
            under GC pauses.
          </p>
          <p className="text-[16px] leading-[1.65] text-ink-secondary">
            <span className="text-ink">Flyway over JPA ddl-auto</span>: migrations
            are versioned, reproducible, and safe to run in production, instead of
            letting an ORM mutate the schema implicitly.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <MonoLabel as="p">{"// STACK"}</MonoLabel>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Pill key={tag} variant="tag">
              {tag}
            </Pill>
          ))}
        </div>
      </section>

      <section className="space-y-4 border border-line-subtle bg-surface p-6">
        <MonoLabel as="p">{"// TRY_IT_YOURSELF"}</MonoLabel>
        <p className="max-w-2xl text-[14px] leading-[1.65] text-ink-secondary">
          A 60-second playable version of Chronos lives in the arcade. Dispatch
          jobs to idle workers and watch the DLQ fill if you&apos;re too slow.
        </p>
        <div className="flex flex-col items-start gap-3 sm:flex-row">
          <Button href="/play/schedule-hack">PLAY_SCHEDULE_HACK →</Button>
          <Button variant="secondary" href="/play/race">
            PLAY_RACE_CONDITION →
          </Button>
        </div>
      </section>

      <div className="flex flex-col items-start gap-3 sm:flex-row">
        <Button href={github} external>
          GITHUB ↗
        </Button>
        <Button variant="secondary" href="#">
          LIVE_DEMO ↗
        </Button>
        <Button variant="secondary" href="/work">
          ← BACK_TO_WORK
        </Button>
      </div>
    </article>
  );
}
