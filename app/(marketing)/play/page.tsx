import type { Metadata } from "next";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { GameCard } from "@/components/games/shared/GameCard";
import { games } from "@/content/games";

export const metadata: Metadata = {
  title: "Arcade — Shubham Pant",
  description:
    "Three small games — each demonstrates a piece of how Chronos works: distributed locking, job dispatch, and the contribution-graph problem.",
};

export default function PlayPage() {
  return (
    <section className="enter-fade-up space-y-10 pt-8">
      <header className="space-y-4">
        <MonoLabel>{"> ARCADE.INDEX"}</MonoLabel>
        <h1 className="font-medium leading-[0.95] tracking-[-1px] text-[clamp(32px,5vw,48px)] text-ink">
          Three small games<span className="text-accent">.</span>
        </h1>
        <p className="max-w-2xl text-[15px] leading-[1.65] text-ink-secondary">
          Each demonstrates a piece of how Chronos works under the hood —
          distributed locking, job dispatch, and the contribution-graph problem
          that every solo developer knows too well.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {games.map((game) => (
          <GameCard key={game.slug} game={game} total={games.length} />
        ))}
      </div>
    </section>
  );
}
