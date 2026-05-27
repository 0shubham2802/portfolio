"use client";

import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { useHighScore } from "@/hooks/useHighScore";
import type { GameMeta } from "@/content/games";

export function GameCard({ game, total }: { game: GameMeta; total: number }) {
  const { highScore } = useHighScore(game.scoreKey ?? `__none-${game.slug}`);
  const showScore = Boolean(game.scoreKey) && highScore > 0;

  return (
    <article className="flex flex-col gap-4 border border-line-subtle bg-surface p-6 transition-colors duration-200 ease-out hover:border-line-emphasis">
      <div className="flex items-center justify-between gap-2">
        <MonoLabel tone="muted" className="normal-case">
          {`> ARCADE / ${game.order}_of_0${total}`}
        </MonoLabel>
        {showScore ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-accent">
            HI {highScore.toLocaleString()}
          </span>
        ) : null}
      </div>

      <h2 className="text-[22px] font-medium leading-[1.1] tracking-[-0.3px] text-ink">
        {game.name}
        <span className="text-accent">.</span>
      </h2>

      <p className="text-[13px] leading-[1.6] text-ink-secondary">
        {game.description}
      </p>

      <div className="flex flex-wrap gap-2">
        <Pill variant="muted">MECHANIC: {game.mechanic}</Pill>
        <Pill variant="muted">LENGTH: {game.length}</Pill>
        <Pill variant="muted">MOBILE: ✓</Pill>
      </div>

      <div className="mt-auto pt-2">
        <Button href={game.route} variant="primary">
          PLAY →
        </Button>
      </div>
    </article>
  );
}

export default GameCard;
