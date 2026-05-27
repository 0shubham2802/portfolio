import { useCallback, useEffect, useRef, useState } from "react";

interface RateLimitOptions {
  key: string;
  max: number;
  cooldownMs: number;
}

interface StoredState {
  count: number;
  last: number;
}

const STORAGE_PREFIX = "shubham:rl:";

function readStored(storageKey: string): StoredState {
  try {
    const raw = window.sessionStorage.getItem(storageKey);
    if (raw === null) {
      return { count: 0, last: 0 };
    }
    const parsed = JSON.parse(raw) as Partial<StoredState>;
    return {
      count: typeof parsed.count === "number" ? parsed.count : 0,
      last: typeof parsed.last === "number" ? parsed.last : 0,
    };
  } catch {
    return { count: 0, last: 0 };
  }
}

function writeStored(storageKey: string, state: StoredState): void {
  try {
    window.sessionStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // sessionStorage may be unavailable (private mode); ignore.
  }
}

export function useRateLimit(options: RateLimitOptions): {
  used: number;
  remaining: number;
  canAct: boolean;
  registerAction: () => boolean;
} {
  const { key, max, cooldownMs } = options;
  const storageKey = `${STORAGE_PREFIX}${key}`;

  const [used, setUsed] = useState<number>(0);
  const [lastActionAt, setLastActionAt] = useState<number>(0);
  const [now, setNow] = useState<number>(0);

  const lastActionAtRef = useRef<number>(0);
  const usedRef = useRef<number>(0);

  useEffect(() => {
    const stored = readStored(storageKey);
    setUsed(stored.count);
    setLastActionAt(stored.last);
    usedRef.current = stored.count;
    lastActionAtRef.current = stored.last;
    setNow(Date.now());
  }, [storageKey]);

  const cooldownElapsed = now - lastActionAt >= cooldownMs;
  const canAct = used < max && cooldownElapsed;

  // While in cooldown (and not maxed out), tick `now` so canAct flips back.
  useEffect(() => {
    if (used >= max) {
      return;
    }
    if (cooldownElapsed) {
      return;
    }
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 250);
    return () => {
      window.clearInterval(interval);
    };
  }, [used, max, cooldownElapsed]);

  const registerAction = useCallback((): boolean => {
    const current = Date.now();
    const withinCooldown = current - lastActionAtRef.current < cooldownMs;
    const atMax = usedRef.current >= max;

    if (atMax || withinCooldown) {
      return false;
    }

    const nextCount = usedRef.current + 1;
    usedRef.current = nextCount;
    lastActionAtRef.current = current;

    writeStored(storageKey, { count: nextCount, last: current });

    setUsed(nextCount);
    setLastActionAt(current);
    setNow(current);

    return true;
  }, [cooldownMs, max, storageKey]);

  return {
    used,
    remaining: max - used,
    canAct,
    registerAction,
  };
}
