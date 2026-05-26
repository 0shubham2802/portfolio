"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

interface ParallaxContext {
  mx: MotionValue<number>;
  my: MotionValue<number>;
}

const Ctx = createContext<ParallaxContext | null>(null);

export function MouseParallaxGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 90, damping: 22, mass: 0.4 });
  const my = useSpring(myRaw, { stiffness: 90, damping: 22, mass: 0.4 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mxRaw.set((e.clientX / window.innerWidth) * 2 - 1);
      myRaw.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mxRaw, myRaw]);

  return (
    <div ref={ref} className={className}>
      <Ctx.Provider value={{ mx, my }}>{children}</Ctx.Provider>
    </div>
  );
}

export function MouseParallaxLayer({
  children,
  depth = 10,
  className,
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}) {
  const ctx = useContext(Ctx);
  const fallback = useMotionValue(0);
  const x = useTransform(ctx?.mx ?? fallback, (v) => v * depth);
  const y = useTransform(ctx?.my ?? fallback, (v) => v * depth);

  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}

export default MouseParallaxGroup;
