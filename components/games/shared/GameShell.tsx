"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type GameState = "ready" | "running" | "paused" | "over";

const stateLabel: Record<GameState, string> = {
  ready: "READY",
  running: "RUNNING",
  paused: "PAUSED",
  over: "OVER",
};

const stateTone: Record<GameState, string> = {
  ready: "text-ink-muted",
  running: "text-positive",
  paused: "text-ink-muted",
  over: "text-negative",
};

interface GameShellProps {
  title: string;
  tagline: string;
  state: GameState;
  stats?: ReactNode;
  log?: ReactNode;
  inputHint: string;
  highScore?: string;
  urlPath?: string; // shown in the faux URL bar
  onBack?: () => void;
  children: ReactNode;
}

export function GameShell({
  title,
  tagline,
  state,
  stats,
  log,
  inputHint,
  highScore,
  urlPath,
  onBack,
  children,
}: GameShellProps) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="overflow-hidden border border-line bg-surface">
        {/* faux browser title bar */}
        <div className="flex items-center gap-2 border-b border-line-subtle bg-surface-deep px-3 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full border border-line-emphasis" />
            <span className="h-2.5 w-2.5 rounded-full border border-line-emphasis" />
            <span className="h-2.5 w-2.5 rounded-full border border-line-emphasis" />
          </span>
          <span className="ml-2 truncate font-mono text-[11px] text-ink-tertiary">
            shubhampant.dev{urlPath ?? `/play/${title.toLowerCase()}`}
          </span>
        </div>

        {/* header */}
        <div className="flex items-start justify-between gap-3 border-b border-line-subtle px-4 py-3.5 md:px-6">
          <div className="min-w-0">
            <div className="font-mono text-[13px] text-accent">{`> ${title}.EXE`}</div>
            <div className="mt-0.5 truncate font-mono text-[11px] text-ink-muted">
              {tagline}
            </div>
          </div>
          <span
            className={cn(
              "shrink-0 font-mono text-[11px] uppercase tracking-[0.1em]",
              stateTone[state],
            )}
          >
            ● {stateLabel[state]}
          </span>
        </div>

        {stats ? (
          <div className="border-b border-line-subtle px-4 py-3 md:px-6">
            {stats}
          </div>
        ) : null}

        <div className="px-4 py-4 md:px-6 md:py-6">{children}</div>

        {log ? (
          <div className="border-t border-line-subtle bg-surface-deep px-4 py-3 md:px-6">
            {log}
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-3 border-t border-line-subtle px-4 py-3 md:px-6">
          <span className="min-w-0 truncate font-mono text-[11px] text-ink-tertiary">
            {inputHint}
          </span>
          {highScore ? (
            <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-muted">
              HI {highScore}
            </span>
          ) : null}
        </div>
      </div>

      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted transition-colors duration-200 ease-out hover:text-accent"
        >
          ← back to arcade
        </button>
      ) : null}
    </div>
  );
}

export default GameShell;
