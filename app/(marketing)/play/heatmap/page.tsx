"use client";

import { useRouter } from "next/navigation";
import { GameShell } from "@/components/games/shared/GameShell";

export default function HeatmapPage() {
  const router = useRouter();
  return (
    <div className="enter-fade-up pt-8">
      <GameShell
        title="CONTRIBUTION_HEATMAP"
        tagline="paint a cell — everyone shares one grid"
        state="ready"
        inputHint="> coming soon — the shared grid lands in phase 2"
        urlPath="/play/heatmap"
        onBack={() => router.push("/play")}
      >
        <div className="flex min-h-[220px] items-center justify-center font-mono text-[12px] text-ink-deep">
          {"// game body — built in a later phase"}
        </div>
      </GameShell>
    </div>
  );
}
