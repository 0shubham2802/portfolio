"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Edges } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { cn } from "@/lib/cn";

const ACCENT = "#3D7BFF";
const SURFACE = "#13161F";
const RING = "#32415D";
const BASE = "#0A0C14";

const ORBIT_TILT = 1.28; // radians (~73°) — flattens the circular orbit into an ellipse
const ORBIT_RADIUS = 2.45;
const RING_RADII = [1.35, 1.9, 2.45];
const REVOLUTION_SECONDS = 30;
const TILT_MAX_DEG = 14;
const PULSE_INTERVAL_MS = 4000;
const PULSE_DURATION_MS = 400;
const IDLE_MS = 60000;

type FatLine = THREE.Object3D & {
  material: THREE.Material & { opacity: number };
};

function ellipsePoints(
  radius: number,
  segments = 96,
): [number, number, number][] {
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    pts.push([Math.cos(t) * radius, Math.sin(t) * radius, 0]);
  }
  return pts;
}

function useLabelTexture() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = ACCENT;
      ctx.fillRect(0, 0, size, size);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = BASE;
      ctx.font = "500 38px 'JetBrains Mono', ui-monospace, monospace";
      ctx.fillText("CHRONOS", size / 2, size / 2 - 14);
      ctx.globalAlpha = 0.72;
      ctx.font = "400 28px 'JetBrains Mono', ui-monospace, monospace";
      ctx.fillText("scheduler", size / 2, size / 2 + 24);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, []);
}

function CentralCube() {
  const labelTex = useLabelTexture();
  const materials = useMemo(() => {
    const blue = new THREE.MeshBasicMaterial({ color: ACCENT });
    const face = new THREE.MeshBasicMaterial({ map: labelTex });
    // box face order: +X, -X, +Y, -Y, +Z, -Z — label on the +Z face (toward camera)
    return [blue, blue, blue, blue, face, blue];
  }, [labelTex]);

  useEffect(() => {
    return () => {
      labelTex.dispose();
      materials.forEach((m) => m.dispose());
    };
  }, [labelTex, materials]);

  return (
    <mesh material={materials}>
      <boxGeometry args={[1.15, 1.15, 1.15]} />
    </mesh>
  );
}

interface SceneProps {
  workerCount: number;
  interactive: boolean;
}

function Scene({ workerCount, interactive }: SceneProps) {
  const tiltGroup = useRef<THREE.Group>(null);
  const spinGroup = useRef<THREE.Group>(null);
  const lineRefs = useRef<(FatLine | null)[]>([]);

  const pointer = useRef({ x: 0, y: 0 });
  const nextPulse = useRef(performance.now() + PULSE_INTERVAL_MS);
  const pulse = useRef({ index: -1, start: 0 });

  const workers = useMemo(() => {
    return Array.from({ length: workerCount }, (_, i) => {
      const angle = (i / workerCount) * Math.PI * 2;
      return {
        position: [
          Math.cos(angle) * ORBIT_RADIUS,
          Math.sin(angle) * ORBIT_RADIUS,
          0,
        ] as [number, number, number],
      };
    });
  }, [workerCount]);

  useEffect(() => {
    if (!interactive) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [interactive]);

  useFrame((_, rawDelta) => {
    if (!interactive) return; // mobile renders a static composition
    const now = performance.now();
    const delta = Math.min(rawDelta, 0.05);

    if (spinGroup.current) {
      spinGroup.current.rotation.z +=
        (delta * Math.PI * 2) / REVOLUTION_SECONDS;
    }

    if (tiltGroup.current) {
      const max = THREE.MathUtils.degToRad(TILT_MAX_DEG);
      const targetX = -pointer.current.y * max;
      const targetY = pointer.current.x * max;
      tiltGroup.current.rotation.x +=
        (targetX - tiltGroup.current.rotation.x) * 0.08;
      tiltGroup.current.rotation.y +=
        (targetY - tiltGroup.current.rotation.y) * 0.08;
    }

    if (now >= nextPulse.current) {
      pulse.current = {
        index: Math.floor(Math.random() * workerCount),
        start: now,
      };
      nextPulse.current = now + PULSE_INTERVAL_MS;
    }

    lineRefs.current.forEach((line, i) => {
      if (!line) return;
      let opacity = 0.5;
      if (pulse.current.index === i) {
        const t = (now - pulse.current.start) / PULSE_DURATION_MS;
        if (t >= 0 && t <= 1) {
          const triangle = 1 - Math.abs(t * 2 - 1); // 0 → 1 → 0
          opacity = 0.5 + 0.5 * triangle;
        }
      }
      line.material.opacity = opacity;
    });
  });

  return (
    <group ref={tiltGroup}>
      <CentralCube />

      <group rotation={[ORBIT_TILT, 0, 0]}>
        {RING_RADII.map((r) => (
          <Line
            key={r}
            points={ellipsePoints(r)}
            color={RING}
            lineWidth={0.75}
            transparent
            opacity={0.85}
          />
        ))}

        <group ref={spinGroup}>
          {workers.map((worker, i) => (
            <group key={i}>
              <Line
                ref={(el) => {
                  lineRefs.current[i] = (el as unknown as FatLine) ?? null;
                }}
                points={[[0, 0, 0], worker.position]}
                color={ACCENT}
                lineWidth={0.6}
                transparent
                opacity={0.5}
              />
              <mesh position={worker.position}>
                <boxGeometry args={[0.38, 0.38, 0.38]} />
                <meshBasicMaterial color={SURFACE} />
                <Edges color={ACCENT} />
              </mesh>
            </group>
          ))}
        </group>
      </group>
    </group>
  );
}

const CORNERS = [
  { label: "+ java17", className: "left-0 top-0" },
  { label: "+ spring", className: "right-0 top-0" },
  { label: "+ postgres", className: "left-0 bottom-0" },
  { label: "+ redisson", className: "right-0 bottom-0" },
];

interface OrbitalSceneProps {
  className?: string;
}

export function OrbitalScene({ className }: OrbitalSceneProps) {
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  useEffect(() => {
    // Animate continuously on every device (desktop + mobile); pause after 60s
    // of no pointer movement (mouse OR touch) to save battery, resume on move.
    let timer = window.setTimeout(() => setFrameloop("never"), IDLE_MS);
    const onMove = () => {
      setFrameloop((prev) => (prev === "never" ? "always" : prev));
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setFrameloop("never"), IDLE_MS);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className={cn("relative", className)}>
      <Canvas
        frameloop={frameloop}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 5.6], fov: 38 }}
      >
        <Scene workerCount={6} interactive />
      </Canvas>

      {CORNERS.map((corner) => (
        <span
          key={corner.label}
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute font-mono text-[10px] text-ink-deep",
            corner.className,
          )}
        >
          {corner.label}
        </span>
      ))}
    </div>
  );
}

export default OrbitalScene;
