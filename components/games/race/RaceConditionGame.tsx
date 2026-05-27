"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { GameShell } from "@/components/games/shared/GameShell";
import { StatsBar, Stat } from "@/components/games/shared/StatsBar";
import { EventLog } from "@/components/games/shared/EventLog";
import { GameOverModal } from "@/components/games/shared/GameOverModal";
import { useRaceCondition, RACE_ROUNDS } from "./useRaceCondition";
import type { RaceOutcome } from "./useRaceCondition";

const dotTone: Record<RaceOutcome, string> = {
  you: "bg-accent border-accent",
  cpu: "bg-ink-muted border-ink-muted",
  collision: "bg-negative border-negative",
};

function Cube({ label, active, tone }: { label: string; active: boolean; tone: "accent" | "muted" }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center border font-mono text-[10px] transition-colors duration-150 ease-out md:h-16 md:w-16",
          active && tone === "accent"
            ? "border-accent bg-accent text-base"
            : "border-line-emphasis bg-surface-deep text-ink-muted",
        )}
      >
        {label}
      </div>
    </div>
  );
}

export function RaceConditionGame() {
  const router = useRouter();
  const race = useRaceCondition();
  const { state, onTap, start, isMobile } = race;

  useEffect(() => {
    if (isMobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        onTap();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobile, onTap]);

  const center = (() => {
    if (state.gameState === "ready")
      return { text: "READY?", tone: "text-ink-muted" };
    if (state.phase === "ready")
      return { text: "WAIT…", tone: "text-ink-tertiary" };
    if (state.phase === "go") return { text: "GO!", tone: "text-accent" };
    if (state.phase === "result" && state.lastOutcome) {
      const label =
        state.lastOutcome === "you"
          ? "YOU WIN"
          : state.lastOutcome === "cpu"
            ? "CPU WINS"
            : "COLLISION";
      const tone =
        state.lastOutcome === "you"
          ? "text-positive"
          : state.lastOutcome === "collision"
            ? "text-negative"
            : "text-ink-muted";
      return { text: label, tone };
    }
    return { text: "·", tone: "text-ink-deep" };
  })();

  const buttonLabel =
    state.gameState === "ready"
      ? isMobile
        ? "TAP TO START"
        : "TAP / SPACE TO START"
      : state.phase === "go"
        ? "GRAB!"
        : state.phase === "ready"
          ? "WAIT FOR GO"
          : "···";

  const youActive = state.phase === "result" && state.lastOutcome === "you";
  const cpuActive = state.phase === "result" && state.lastOutcome === "cpu";

  return (
    <div className="enter-fade-up pt-8">
      <GameShell
        title="RACE_CONDITION"
        tagline="grab the lock before the CPU — don't collide"
        state={state.gameState}
        urlPath="/play/race"
        inputHint="> tap the button (or press space) the instant it says GO"
        highScore={`${race.highScore} / ${RACE_ROUNDS}`}
        onBack={() => router.push("/play")}
        stats={
          <StatsBar>
            <Stat label="YOU" value={String(race.wins)} tone="accent" />
            <Stat label="OPPONENT" value={String(race.cpuWins)} />
            <Stat label="COLLISIONS" value={String(race.collisions)} tone="negative" />
          </StatsBar>
        }
        log={<EventLog entries={race.log} />}
      >
        <div className="space-y-5">
          {/* round dots */}
          <div className="flex justify-center gap-2">
            {Array.from({ length: RACE_ROUNDS }, (_, i) => {
              const outcome = state.results[i];
              return (
                <span
                  key={i}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full border",
                    outcome ? dotTone[outcome] : "border-line-emphasis",
                  )}
                />
              );
            })}
          </div>

          {/* arena */}
          <div className="flex items-center justify-between gap-4 py-4">
            <Cube label="YOU" active={youActive} tone="accent" />
            <div
              className={cn(
                "flex-1 text-center font-mono text-[22px] tracking-[0.05em] tabular-nums md:text-[28px]",
                center.tone,
              )}
            >
              {center.text}
              {state.phase === "result" && state.lastDelta != null ? (
                <div className="mt-1 font-mono text-[11px] text-ink-tertiary">
                  Δ {state.lastDelta}ms
                </div>
              ) : null}
            </div>
            <Cube label="CPU" active={cpuActive} tone="muted" />
          </div>

          {/* tap zone */}
          <button
            type="button"
            onClick={onTap}
            className={cn(
              "h-[120px] w-full border font-mono text-[13px] uppercase tracking-[0.1em] transition-colors duration-150 ease-out",
              state.phase === "go"
                ? "border-accent bg-accent text-base"
                : "border-accent bg-accent-soft text-accent hover:bg-accent hover:text-base",
            )}
          >
            {buttonLabel}
          </button>
        </div>
      </GameShell>

      {state.gameState === "over" ? (
        <GameOverModal
          scoreLabel="ROUNDS WON"
          score={`${race.wins} / ${RACE_ROUNDS}`}
          newHighScore={race.wins > 0 && race.wins >= race.highScore}
          onPlayAgain={start}
          onBack={() => router.push("/play")}
        >
          <p className="text-left font-mono text-[12px] leading-[1.6] text-ink-secondary">
            This is why Chronos uses Redisson. Real distributed locks don&apos;t
            race — they queue. Fair, fast, no wasted compute.
          </p>
          <Link
            href="/work/chronos"
            className="inline-block font-mono text-[11px] uppercase tracking-[0.08em] text-accent transition-colors duration-200 ease-out hover:underline"
          >
            READ_MORE →
          </Link>
        </GameOverModal>
      ) : null}
    </div>
  );
}

export default RaceConditionGame;
