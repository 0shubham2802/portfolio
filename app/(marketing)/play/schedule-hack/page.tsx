"use client";

import { useRouter } from "next/navigation";
import { GameShell } from "@/components/games/shared/GameShell";

export default function ScheduleHackPage() {
  const router = useRouter();
  return (
    <div className="enter-fade-up pt-8">
      <GameShell
        title="SCHEDULE_HACK"
        tagline="dispatch jobs before they expire to the DLQ"
        state="ready"
        inputHint="> coming soon — the dispatcher lands in phase 4"
        urlPath="/play/schedule-hack"
        onBack={() => router.push("/play")}
      >
        <div className="flex min-h-[220px] items-center justify-center font-mono text-[12px] text-ink-deep">
          {"// game body — built in a later phase"}
        </div>
      </GameShell>
    </div>
  );
}
