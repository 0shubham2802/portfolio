"use client";

import { useRouter } from "next/navigation";
import { GameShell } from "@/components/games/shared/GameShell";
import { StatsBar, Stat } from "@/components/games/shared/StatsBar";
import { EventLog } from "@/components/games/shared/EventLog";
import { GameOverModal } from "@/components/games/shared/GameOverModal";
import { Worker } from "./Worker";
import { JobCard } from "./JobCard";
import { useScheduleHack } from "./useScheduleHack";

export function ScheduleHackGame() {
  const router = useRouter();
  const s = useScheduleHack();
  const canDispatch = s.activeJob != null;

  return (
    <div className="enter-fade-up pt-8">
      <GameShell
        title="SCHEDULE_HACK"
        tagline="dispatch jobs before they expire to the DLQ"
        state={s.gameState}
        urlPath="/play/schedule-hack"
        inputHint="> tap an idle worker to dispatch the active job"
        highScore={s.highScore.toLocaleString()}
        onBack={() => router.push("/play")}
        stats={
          <StatsBar>
            <Stat label="TIME" value={s.clock} />
            <Stat label="SCORE" value={s.score.toLocaleString()} tone="accent" />
            {!s.isMobile ? (
              <Stat label="COMPLETED" value={String(s.completed)} />
            ) : null}
            <Stat label="DLQ" value={String(s.dlqCount)} tone="negative" />
          </StatsBar>
        }
        log={<EventLog entries={s.log} />}
      >
        {s.gameState === "ready" ? (
          <button
            type="button"
            onClick={s.start}
            className="flex min-h-[260px] w-full flex-col items-center justify-center gap-2 border border-accent bg-accent-soft font-mono text-accent transition-colors duration-150 ease-out hover:bg-accent hover:text-base"
          >
            <span className="text-[15px] uppercase tracking-[0.1em]">
              tap to start
            </span>
            <span className="text-[11px] text-ink-muted">60 seconds · {s.workerCount} workers</span>
          </button>
        ) : (
          <div className="grid gap-4 md:grid-cols-[2fr_3fr]">
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">
                active job
              </div>
              <JobCard job={s.activeJob} queuedCount={s.queuedCount} />
            </div>
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">
                workers
              </div>
              <div className="grid grid-cols-[repeat(2,minmax(0,80px))] gap-2.5 md:grid-cols-[repeat(3,minmax(0,84px))]">
                {s.workers.map((w) => (
                  <Worker
                    key={w.id}
                    worker={w}
                    canDispatch={canDispatch}
                    onDispatch={s.dispatch}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </GameShell>

      {s.gameState === "over" ? (
        <GameOverModal
          scoreLabel="FINAL SCORE"
          score={s.score.toLocaleString()}
          newHighScore={s.score > 0 && s.score >= s.highScore}
          onPlayAgain={s.start}
          onBack={() => router.push("/play")}
        >
          <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
            <div>
              <div className="text-ink-muted">DONE</div>
              <div className="text-positive">{s.completed}</div>
            </div>
            <div>
              <div className="text-ink-muted">DISPATCHED</div>
              <div className="text-ink">{s.dispatched}</div>
            </div>
            <div>
              <div className="text-ink-muted">DLQ</div>
              <div className="text-negative">{s.dlqCount}</div>
            </div>
          </div>
        </GameOverModal>
      ) : null}
    </div>
  );
}

export default ScheduleHackGame;
