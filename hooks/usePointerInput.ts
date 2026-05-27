import { useCallback, useRef } from "react";
import type React from "react";

export interface PointerInfo {
  x: number;
  y: number;
  timestamp: number;
}

export function usePointerInput(
  onInput: (info: PointerInfo) => void,
): { onPointerUp: (e: React.PointerEvent) => void } {
  const onInputRef = useRef(onInput);
  onInputRef.current = onInput;

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onInputRef.current({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      timestamp: performance.now(),
    });
  }, []);

  return { onPointerUp };
}
