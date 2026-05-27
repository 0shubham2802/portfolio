"use client";

import { cn } from "@/lib/cn";
import { Pill } from "@/components/ui/Pill";
import type { Job } from "./useScheduleHack";

export function JobCard({ job, queuedCount }: { job: Job | null; queuedCount: number }) {
  if (!job) {
    return (
      <div className="flex min-h-[120px] items-center justify-center border border-dashed border-line bg-surface-deep p-4 font-mono text-[12px] text-ink-deep">
        {"// no active job — waiting…"}
      </div>
    );
  }

  const remaining = Math.max(0, job.expiresInMs / job.totalExpiresMs);
  const urgent = remaining < 0.34;

  return (
    <div className="border border-line bg-surface-deep p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] text-ink-muted">{job.id}</span>
        <Pill variant={job.priority === "high" ? "outline" : "muted"}>
          {job.priority}
        </Pill>
      </div>

      <div className="mt-2 break-all font-mono text-[15px] text-ink">
        {job.name}
      </div>
      <div className="mt-1 font-mono text-[11px] text-ink-tertiary">
        runtime {(job.runtimeMs / 1000).toFixed(1)}s · +{job.scoreValue}
      </div>

      <div className="mt-3 h-1.5 w-full bg-line-subtle">
        <div
          className={cn("h-full", urgent ? "bg-negative" : "bg-accent")}
          style={{ width: `${remaining * 100}%` }}
        />
      </div>

      {queuedCount > 0 ? (
        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">
          queued: {queuedCount}
        </div>
      ) : null}
    </div>
  );
}

export default JobCard;
