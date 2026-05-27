import { useCallback, useEffect, useState } from "react";

const STORAGE_PREFIX = "shubham:scores:";

export function useHighScore(key: string): {
  highScore: number;
  setHighScore: (value: number) => void;
  reset: () => void;
} {
  const [highScore, setHighScoreState] = useState<number>(0);

  const storageKey = `${STORAGE_PREFIX}${key}`;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      const parsed = raw === null ? 0 : Number.parseInt(raw, 10);
      setHighScoreState(Number.isNaN(parsed) ? 0 : parsed);
    } catch {
      setHighScoreState(0);
    }
  }, [storageKey]);

  const setHighScore = useCallback(
    (value: number) => {
      setHighScoreState((current) => {
        if (value > current) {
          try {
            window.localStorage.setItem(storageKey, String(value));
          } catch {
            // localStorage may be unavailable (private mode); ignore.
          }
          return value;
        }
        return current;
      });
    },
    [storageKey],
  );

  const reset = useCallback(() => {
    setHighScoreState(0);
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // localStorage may be unavailable (private mode); ignore.
    }
  }, [storageKey]);

  return { highScore, setHighScore, reset };
}
