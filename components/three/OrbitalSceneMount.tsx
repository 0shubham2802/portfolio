"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { OrbitalSceneFallback } from "./OrbitalSceneFallback";

function CenteredFallback({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <OrbitalSceneFallback className="h-full w-auto" />
    </div>
  );
}

const OrbitalScene = dynamic(
  () => import("./OrbitalScene").then((m) => m.OrbitalScene),
  {
    ssr: false,
    loading: () => <CenteredFallback className="h-full w-full" />,
  },
);

interface OrbitalSceneMountProps {
  className?: string;
}

export function OrbitalSceneMount({ className }: OrbitalSceneMountProps) {
  const [mountWebGL, setMountWebGL] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ric = window.requestIdleCallback;
    if (typeof ric === "function") {
      const id = ric(() => setMountWebGL(true), { timeout: 1500 });
      return () => window.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setMountWebGL(true), 400);
    return () => window.clearTimeout(id);
  }, []);

  if (!mountWebGL) {
    return <CenteredFallback className={className} />;
  }

  return <OrbitalScene className={className} />;
}

export default OrbitalSceneMount;
