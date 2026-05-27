"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { MonoLabel } from "@/components/ui/MonoLabel";

interface GameOverModalProps {
  scoreLabel: string;
  score: string;
  newHighScore?: boolean;
  children?: ReactNode;
  onPlayAgain: () => void;
  onBack: () => void;
}

export function GameOverModal({
  scoreLabel,
  score,
  newHighScore,
  children,
  onPlayAgain,
  onBack,
}: GameOverModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0C14]/90 p-4">
      <div className="w-full max-w-sm space-y-4 border border-line bg-surface p-6 text-center">
        <MonoLabel as="div" tone="muted">
          {"// GAME_OVER"}
        </MonoLabel>

        {newHighScore ? (
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-positive">
            ★ NEW_HIGH_SCORE
          </div>
        ) : null}

        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">
          {scoreLabel}
        </div>
        <div className="font-mono text-[44px] leading-none tabular-nums text-accent">
          {score}
        </div>

        {children}

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center">
          <Button onClick={onPlayAgain}>PLAY_AGAIN ↻</Button>
          <Button variant="secondary" onClick={onBack}>
            ← BACK_TO_ARCADE
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GameOverModal;
