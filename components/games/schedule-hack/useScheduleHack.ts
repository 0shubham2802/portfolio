"use client";

import { useCallback, useReducer, useRef, useState } from "react";
import { useGameLoop } from "@/hooks/useGameLoop";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useHighScore } from "@/hooks/useHighScore";
import type { LogEntry } from "@/components/games/shared/EventLog";

export const GAME_MS = 60_000;

export type Priority = "low" | "normal" | "high";
export type WorkerState = "idle" | "busy";

export interface Job {
  id: string;
  name: string;
  runtimeMs: number;
  expiresInMs: number;
  totalExpiresMs: number;
  priority: Priority;
  scoreValue: number;
}

export interface WorkerSlot {
  id: string;
  state: WorkerState;
  job: Job | null;
  runtimeRemainingMs: number;
}

interface GameData {
  timeRemainingMs: number;
  score: number;
  completed: number;
  dlqCount: number;
  dispatched: number;
  workers: WorkerSlot[];
  activeJob: Job | null;
  queued: Job[];
  nextSpawnInMs: number;
  log: LogEntry[];
  jobSeq: number;
}

const NAMES = [
  "send_quarterly_emails", "retry_batch", "export_csv", "cleanup_temp",
  "run_migration", "compute_metrics", "sync_users", "backup_db",
  "process_webhook", "recompute_leaderboard", "rotate_logs", "warm_cache",
];

const SCORE: Record<Priority, number> = { low: 100, normal: 200, high: 350 };

function fmtClock(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface Tier {
  weights: [number, number, number]; // low, normal, high
  runtime: [number, number];
  expire: number;
  spawn: number;
}

function tierFor(elapsedMs: number, isMobile: boolean): Tier {
  const expireBonus = isMobile ? 1000 : 0;
  const spawnBase = isMobile ? 2800 : 2000;
  if (elapsedMs < 20_000)
    return { weights: [15, 80, 5], runtime: [2000, 4000], expire: 5000 + expireBonus, spawn: spawnBase };
  if (elapsedMs < 40_000)
    return { weights: [25, 50, 25], runtime: [1000, 4000], expire: 4000 + expireBonus, spawn: spawnBase };
  return { weights: [20, 30, 50], runtime: [1000, 3000], expire: 3000 + expireBonus, spawn: spawnBase * 0.75 };
}

function rollPriority([low, normal]: [number, number, number]): Priority {
  const r = Math.random() * 100;
  if (r < low) return "low";
  if (r < low + normal) return "normal";
  return "high";
}

export function useScheduleHack() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { highScore, setHighScore } = useHighScore("schedule-hack");
  const [gameState, setGameState] = useState<"ready" | "running" | "over">("ready");
  const [, forceRender] = useReducer((x: number) => x + 1, 0);
  const stateRef = useRef<"ready" | "running" | "over">("ready");
  const workerCount = isMobile ? 4 : 6;

  const game = useRef<GameData>(makeInitial(workerCount));

  function makeInitial(count: number): GameData {
    return {
      timeRemainingMs: GAME_MS,
      score: 0,
      completed: 0,
      dlqCount: 0,
      dispatched: 0,
      workers: Array.from({ length: count }, (_, i) => ({
        id: `w${i + 1}`,
        state: "idle" as WorkerState,
        job: null,
        runtimeRemainingMs: 0,
      })),
      activeJob: null,
      queued: [],
      nextSpawnInMs: 500,
      log: [],
    jobSeq: 4729,
    };
  }

  const log = useCallback((entry: Omit<LogEntry, "id" | "time">) => {
    const g = game.current;
    g.log = [
      { ...entry, id: `${g.jobSeq}-${Date.now()}-${Math.random()}`, time: fmtClock(GAME_MS - g.timeRemainingMs) },
      ...g.log,
    ].slice(0, 8);
  }, []);

  const spawn = useCallback(() => {
    const g = game.current;
    const tier = tierFor(GAME_MS - g.timeRemainingMs, isMobile);
    const priority = rollPriority(tier.weights);
    const runtimeMs = tier.runtime[0] + Math.random() * (tier.runtime[1] - tier.runtime[0]);
    g.jobSeq += Math.floor(1 + Math.random() * 30);
    const job: Job = {
      id: `#${g.jobSeq}`,
      name: pick(NAMES),
      runtimeMs,
      expiresInMs: tier.expire,
      totalExpiresMs: tier.expire,
      priority,
      scoreValue: SCORE[priority],
    };
    if (!g.activeJob) g.activeJob = job;
    else g.queued.push(job);
  }, [isMobile]);

  const tick = useCallback(
    (deltaMs: number) => {
      if (stateRef.current !== "running") return;
      const g = game.current;

      g.timeRemainingMs -= deltaMs;

      // worker runtimes
      for (const w of g.workers) {
        if (w.state === "busy" && w.job) {
          w.runtimeRemainingMs -= deltaMs;
          if (w.runtimeRemainingMs <= 0) {
            g.score += w.job.scoreValue;
            g.completed += 1;
            log({ message: `${w.id} completed ${w.job.name}`, delta: `+${w.job.scoreValue}`, tone: "positive" });
            w.state = "idle";
            w.job = null;
            w.runtimeRemainingMs = 0;
          }
        }
      }

      // active job expiration
      if (g.activeJob) {
        g.activeJob.expiresInMs -= deltaMs;
        if (g.activeJob.expiresInMs <= 0) {
          g.dlqCount += 1;
          g.score = Math.max(0, g.score - g.activeJob.scoreValue);
          log({ message: `${g.activeJob.name} expired → DLQ`, delta: `-${g.activeJob.scoreValue}`, tone: "negative" });
          g.activeJob = g.queued.shift() ?? null;
        }
      }

      // spawning
      g.nextSpawnInMs -= deltaMs;
      if (g.nextSpawnInMs <= 0) {
        spawn();
        const tier = tierFor(GAME_MS - g.timeRemainingMs, isMobile);
        g.nextSpawnInMs = tier.spawn + (Math.random() - 0.5) * 1000;
      }

      // end
      if (g.timeRemainingMs <= 0) {
        g.timeRemainingMs = 0;
        stateRef.current = "over";
        setGameState("over");
        setHighScore(g.score);
      }

      forceRender();
    },
    [isMobile, log, spawn, setHighScore],
  );

  useGameLoop({ onTick: tick, fps: 30, pauseOnBlur: true });

  const start = useCallback(() => {
    game.current = makeInitial(workerCount);
    stateRef.current = "running";
    setGameState("running");
    forceRender();
  }, [workerCount]);

  const dispatch = useCallback(
    (workerId: string) => {
      if (stateRef.current !== "running") return;
      const g = game.current;
      if (!g.activeJob) return;
      const w = g.workers.find((x) => x.id === workerId);
      if (!w || w.state !== "idle") return;
      w.state = "busy";
      w.job = g.activeJob;
      w.runtimeRemainingMs = g.activeJob.runtimeMs;
      g.dispatched += 1;
      log({ message: `${w.id} dispatched ${g.activeJob.name}`, tone: "default" });
      g.activeJob = g.queued.shift() ?? null;
      forceRender();
    },
    [log],
  );

  const g = game.current;
  return {
    gameState,
    start,
    dispatch,
    isMobile,
    highScore,
    workerCount,
    clock: fmtClock(g.timeRemainingMs),
    score: g.score,
    completed: g.completed,
    dlqCount: g.dlqCount,
    dispatched: g.dispatched,
    workers: g.workers,
    activeJob: g.activeJob,
    queuedCount: g.queued.length,
    log: g.log,
  };
}
