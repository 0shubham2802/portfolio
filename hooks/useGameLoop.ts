import { useCallback, useEffect, useRef, useState } from "react";

interface GameLoopOptions {
  onTick: (deltaMs: number) => void;
  fps?: number;
  pauseOnBlur?: boolean;
  autoStart?: boolean;
}

const MAX_DELTA_MS = 50;

export function useGameLoop(options: GameLoopOptions): {
  pause: () => void;
  resume: () => void;
  isRunning: boolean;
} {
  const {
    onTick,
    fps = 60,
    pauseOnBlur = true,
    autoStart = true,
  } = options;

  const [isRunning, setIsRunning] = useState<boolean>(autoStart);

  const onTickRef = useRef(onTick);
  onTickRef.current = onTick;

  const fpsRef = useRef(fps);
  fpsRef.current = fps;

  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const accumulatorRef = useRef<number>(0);
  // Tracks the running state the visibilitychange handler should restore to.
  const runningRef = useRef<boolean>(autoStart);

  const stopRaf = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    lastTimeRef.current = null;
  }, []);

  const startRaf = useCallback(() => {
    if (rafIdRef.current !== null) {
      return;
    }
    lastTimeRef.current = null;

    const frame = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const rawDelta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      const delta = Math.min(rawDelta, MAX_DELTA_MS);
      accumulatorRef.current += delta;

      const interval = 1000 / fpsRef.current;
      if (accumulatorRef.current >= interval) {
        const stepped = accumulatorRef.current;
        accumulatorRef.current %= interval;
        onTickRef.current(stepped - accumulatorRef.current);
      }

      rafIdRef.current = requestAnimationFrame(frame);
    };

    rafIdRef.current = requestAnimationFrame(frame);
  }, []);

  const pause = useCallback(() => {
    runningRef.current = false;
    setIsRunning(false);
    stopRaf();
  }, [stopRaf]);

  const resume = useCallback(() => {
    runningRef.current = true;
    setIsRunning(true);
    accumulatorRef.current = 0;
    lastTimeRef.current = null;
    startRaf();
  }, [startRaf]);

  useEffect(() => {
    if (isRunning) {
      startRaf();
    } else {
      stopRaf();
    }
    return () => {
      stopRaf();
    };
  }, [isRunning, startRaf, stopRaf]);

  useEffect(() => {
    if (!pauseOnBlur) {
      return;
    }

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        if (runningRef.current) {
          stopRaf();
          setIsRunning(false);
          // Preserve runningRef so we know to resume when visible again.
          runningRef.current = true;
        }
      } else if (document.visibilityState === "visible") {
        if (runningRef.current) {
          accumulatorRef.current = 0;
          lastTimeRef.current = null;
          setIsRunning(true);
          startRaf();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [pauseOnBlur, startRaf, stopRaf]);

  return { pause, resume, isRunning };
}
