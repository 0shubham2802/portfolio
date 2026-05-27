"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useHighScore } from "@/hooks/useHighScore";
import type { LogEntry } from "@/components/games/shared/EventLog";

export const RACE_ROUNDS = 5;
const READY_MIN = 1500;
const READY_MAX = 3500;
const RESULT_MS = 1200;

export type RacePhase = "idle" | "ready" | "go" | "result";
export type RaceOutcome = "you" | "cpu" | "collision";
export type RaceGameState = "ready" | "running" | "over";

interface RaceState {
  gameState: RaceGameState;
  phase: RacePhase;
  round: number;
  results: RaceOutcome[];
  lastOutcome: RaceOutcome | null;
  lastDelta: number | null;
}

const INITIAL: RaceState = {
  gameState: "ready",
  phase: "idle",
  round: 0,
  results: [],
  lastOutcome: null,
  lastDelta: null,
};

export function useRaceCondition() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { highScore, setHighScore } = useHighScore("race-condition");
  const [state, setState] = useState<RaceState>(INITIAL);
  const [log, setLog] = useState<LogEntry[]>([]);

  const windowMs = isMobile ? 80 : 50;
  const cpuMin = isMobile ? 100 : 80;
  const cpuMax = isMobile ? 320 : 280;

  const goAt = useRef<number | null>(null);
  const youAt = useRef<number | null>(null);
  const cpuAt = useRef<number | null>(null);
  const resolved = useRef(false);
  const roundRef = useRef(0);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const addLog = useCallback((round: number, outcome: RaceOutcome, delta: number | null) => {
    const tone = outcome === "you" ? "positive" : outcome === "collision" ? "negative" : "default";
    const message =
      outcome === "you"
        ? delta != null
          ? `you grabbed the lock — faster by ${delta}ms`
          : `you grabbed the lock`
        : outcome === "cpu"
          ? delta != null
            ? `cpu grabbed the lock — faster by ${delta}ms`
            : `cpu grabbed the lock`
          : delta != null
            ? `collision — both within ${delta}ms, no winner`
            : `false start — collision, no winner`;
    setLog((prev) => [
      { id: `r${round}-${Date.now()}`, time: `round ${round}`, message, tone },
      ...prev,
    ]);
  }, []);

  const resolveRound = useCallback(
    (override?: RaceOutcome) => {
      if (resolved.current) return;
      resolved.current = true;
      clearTimers();

      let outcome: RaceOutcome;
      let delta: number | null = null;
      if (override) {
        outcome = override;
      } else {
        const you = youAt.current;
        const cpu = cpuAt.current;
        if (you == null) outcome = "cpu";
        else if (cpu == null) outcome = "you";
        else {
          delta = Math.round(Math.abs(you - cpu));
          outcome = delta <= windowMs ? "collision" : you < cpu ? "you" : "cpu";
        }
      }

      const round = roundRef.current + 1;
      addLog(round, outcome, delta);
      setState((s) => ({
        ...s,
        phase: "result",
        results: [...s.results, outcome],
        lastOutcome: outcome,
        lastDelta: delta,
      }));

      const t = window.setTimeout(() => {
        setState((s) => {
          if (s.round + 1 >= RACE_ROUNDS) {
            const wins = s.results.filter((r) => r === "you").length;
            setHighScore(wins);
            return { ...s, gameState: "over", phase: "idle" };
          }
          return { ...s, round: s.round + 1, phase: "idle" };
        });
      }, RESULT_MS);
      timers.current.push(t);
    },
    [windowMs, clearTimers, addLog, setHighScore],
  );

  const beginRound = useCallback(() => {
    resolved.current = false;
    goAt.current = null;
    youAt.current = null;
    cpuAt.current = null;
    setState((s) => ({ ...s, phase: "ready" }));

    const readyDelay = READY_MIN + Math.random() * (READY_MAX - READY_MIN);
    const readyTimer = window.setTimeout(() => {
      goAt.current = performance.now();
      setState((s) => ({ ...s, phase: "go" }));

      const reaction = cpuMin + Math.random() * (cpuMax - cpuMin);
      const cpuTimer = window.setTimeout(() => {
        cpuAt.current = performance.now();
        if (youAt.current != null) {
          resolveRound();
        } else {
          const followUp = window.setTimeout(() => resolveRound(), windowMs + 40);
          timers.current.push(followUp);
        }
      }, reaction);
      timers.current.push(cpuTimer);

      const safety = window.setTimeout(() => resolveRound(), 2500);
      timers.current.push(safety);
    }, readyDelay);
    timers.current.push(readyTimer);
  }, [cpuMin, cpuMax, windowMs, resolveRound]);

  // Drive round start whenever we enter an idle phase mid-game.
  useEffect(() => {
    roundRef.current = state.round;
    if (state.gameState === "running" && state.phase === "idle") {
      beginRound();
    }
  }, [state.gameState, state.phase, state.round, beginRound]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const start = useCallback(() => {
    clearTimers();
    resolved.current = false;
    setLog([]);
    setState({ ...INITIAL, gameState: "running" });
  }, [clearTimers]);

  const reset = useCallback(() => {
    clearTimers();
    resolved.current = false;
    setLog([]);
    setState(INITIAL);
  }, [clearTimers]);

  const onTap = useCallback(() => {
    if (state.gameState === "ready") {
      start();
      return;
    }
    if (state.gameState !== "running") return;
    if (state.phase === "ready") {
      resolveRound("collision"); // false start
      return;
    }
    if (state.phase === "go" && youAt.current == null) {
      youAt.current = performance.now();
      if (cpuAt.current != null) resolveRound();
    }
  }, [state.gameState, state.phase, start, resolveRound]);

  const wins = state.results.filter((r) => r === "you").length;
  const cpuWins = state.results.filter((r) => r === "cpu").length;
  const collisions = state.results.filter((r) => r === "collision").length;

  return {
    state,
    log,
    onTap,
    start,
    reset,
    wins,
    cpuWins,
    collisions,
    highScore,
    isMobile,
    rounds: RACE_ROUNDS,
  };
}
