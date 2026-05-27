"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { GameShell } from "@/components/games/shared/GameShell";
import { StatsBar, Stat } from "@/components/games/shared/StatsBar";
import { EventLog, type LogEntry } from "@/components/games/shared/EventLog";
import { HeatmapGrid } from "./HeatmapGrid";
import { useHeatmap } from "./useHeatmap";

function formatTime(t: number): string {
  return new Date(t).toTimeString().slice(0, 5);
}

const statusHint: Record<string, string> = {
  idle: "> tap a cell to paint — your contribution persists for everyone",
  rate_limited: "> easy — wait 2s between paints",
  quota: "> quota reached — 10 paints per visit",
  error: "> couldn't reach the shared grid right now",
};

export function HeatmapGame() {
  const router = useRouter();
  const { cells, recent, status, paint, used, filled, total, atLimit } =
    useHeatmap();

  const log: LogEntry[] = recent.map((p, i) => {
    const [row, col] = p.cell.split(",");
    return {
      id: `${p.cell}-${p.t}-${i}`,
      time: formatTime(p.t),
      message: `cell painted at (${col}, ${row})`,
      delta: `→ ${p.value}`,
      tone: "accent",
    };
  });

  return (
    <GameShell
      title="CONTRIBUTION_HEATMAP"
      tagline="paint a cell — everyone shares one grid"
      state="running"
      urlPath="/play/heatmap"
      inputHint={statusHint[status]}
      onBack={() => router.push("/play")}
      stats={
        <StatsBar>
          <Stat label="CELLS" value={total.toLocaleString()} />
          <Stat label="FILLED" value={filled.toLocaleString()} tone="accent" />
          <Stat
            label="PAINTS"
            value={`${used} / 10`}
            tone={atLimit ? "negative" : "positive"}
          />
        </StatsBar>
      }
      log={<EventLog entries={log} />}
    >
      <div className="space-y-4">
        <HeatmapGrid cells={cells} onPaint={paint} />
        <p
          className={cn(
            "font-mono text-[11px]",
            atLimit || status === "rate_limited"
              ? "text-negative"
              : "text-ink-muted",
          )}
        >
          paints used: {used} / 10
        </p>
      </div>
    </GameShell>
  );
}

export default HeatmapGame;
