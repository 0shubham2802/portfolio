"use client";

import { cn } from "@/lib/cn";
import type { WorkerSlot } from "./useScheduleHack";

export function Worker({
  worker,
  canDispatch,
  onDispatch,
}: {
  worker: WorkerSlot;
  canDispatch: boolean;
  onDispatch: (id: string) => void;
}) {
  const busy = worker.state === "busy";
  const remaining =
    busy && worker.job
      ? Math.max(0, worker.runtimeRemainingMs / worker.job.runtimeMs)
      : 0;
  const dispatchable = !busy && canDispatch;

  return (
    <button
      type="button"
      disabled={!dispatchable}
      onClick={() => onDispatch(worker.id)}
      aria-label={
        busy
          ? `Worker ${worker.id} busy`
          : dispatchable
            ? `Dispatch to idle worker ${worker.id}`
            : `Worker ${worker.id} idle`
      }
      className={cn(
        "relative flex aspect-square min-h-[64px] flex-col items-center justify-center gap-1 overflow-hidden border font-mono transition-colors duration-150 ease-out",
        busy
          ? "border-accent bg-accent text-base"
          : dispatchable
            ? "border-accent bg-accent-soft text-accent"
            : "border-line-emphasis bg-surface-deep text-ink-muted",
      )}
    >
      <span className="text-[12px]">{worker.id}</span>
      <span className="text-[9px] uppercase tracking-[0.08em]">
        {busy ? `${Math.ceil(worker.runtimeRemainingMs / 1000)}s` : "idle"}
      </span>
      {busy ? (
        <span
          className="absolute bottom-0 left-0 h-1 bg-positive"
          style={{ width: `${remaining * 100}%` }}
        />
      ) : null}
    </button>
  );
}

export default Worker;
