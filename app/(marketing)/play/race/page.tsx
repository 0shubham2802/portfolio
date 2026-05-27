"use client";

import { useRouter } from "next/navigation";
import { GameShell } from "@/components/games/shared/GameShell";

export default function RacePage() {
  const router = useRouter();
  return (
    <div className="enter-fade-up pt-8">
      <GameShell
        title="RACE_CONDITION"
        tagline="grab the lock before the CPU — don't collide"
        state="ready"
        inputHint="> coming soon — the reflex duel lands in phase 3"
        urlPath="/play/race"
        onBack={() => router.push("/play")}
      >
        <div className="flex min-h-[220px] items-center justify-center font-mono text-[12px] text-ink-deep">
          {"// game body — built in a later phase"}
        </div>
      </GameShell>
    </div>
  );
}
