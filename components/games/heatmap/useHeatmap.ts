"use client";

import { useCallback, useEffect, useState } from "react";
import { useRateLimit } from "@/hooks/useRateLimit";

export const HEATMAP_COLS = 52;
export const HEATMAP_ROWS = 7;
export const HEATMAP_TOTAL = HEATMAP_COLS * HEATMAP_ROWS;
const MAX_PAINTS = 10;

export interface RecentPaint {
  cell: string;
  value: number;
  t: number;
}

type Status = "idle" | "rate_limited" | "quota" | "error";

export function useHeatmap() {
  const [cells, setCells] = useState<Record<string, number>>({});
  const [recent, setRecent] = useState<RecentPaint[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const rl = useRateLimit({ key: "heatmap", max: MAX_PAINTS, cooldownMs: 2000 });

  const fetchState = useCallback(async () => {
    try {
      const res = await fetch("/api/heatmap", { cache: "no-store" });
      const data = (await res.json()) as {
        cells?: Record<string, number>;
        recent?: RecentPaint[];
      };
      setCells(data.cells ?? {});
      setRecent(data.recent ?? []);
    } catch {
      /* keep last-known state */
    }
  }, []);

  useEffect(() => {
    fetchState();
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") fetchState();
    }, 15000);
    return () => window.clearInterval(interval);
  }, [fetchState]);

  const paint = useCallback(
    async (row: number, col: number) => {
      if (rl.used >= MAX_PAINTS) {
        setStatus("quota");
        return;
      }
      if (!rl.registerAction()) {
        setStatus("rate_limited");
        return;
      }
      setStatus("idle");

      const key = `${row},${col}`;
      setCells((prev) => ({ ...prev, [key]: Math.min(4, (prev[key] ?? 0) + 1) }));

      try {
        const res = await fetch("/api/heatmap", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ cell: key, intensity: 1 }),
        });
        if (res.status === 429) setStatus("rate_limited");
        else if (!res.ok) setStatus("error");
      } catch {
        setStatus("error");
      }
    },
    [rl],
  );

  const filled = Object.values(cells).filter((value) => value > 0).length;

  return {
    cells,
    recent,
    status,
    paint,
    used: rl.used,
    remaining: rl.remaining,
    filled,
    total: HEATMAP_TOTAL,
    atLimit: rl.used >= MAX_PAINTS,
  };
}
