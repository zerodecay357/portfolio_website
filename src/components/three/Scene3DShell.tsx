"use client";

import { Suspense, useEffect, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";

function useReducedMotionPref() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function SceneFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-noir-surface">
      <div className="h-10 w-10 animate-pulse rounded-full border-2 border-dim/40" />
    </div>
  );
}

export default function Scene3DShell({
  children,
  height = 420,
  cameraPosition = [4, 3, 6],
  fov = 42,
  minDistance = 3,
  maxDistance = 14,
  className = "",
}: {
  children: ReactNode;
  height?: number;
  cameraPosition?: [number, number, number];
  fov?: number;
  minDistance?: number;
  maxDistance?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotionPref();

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg bg-noir-surface ${className}`}
      style={{ height }}
    >
      <Suspense fallback={<SceneFallback />}>
        <Canvas
          camera={{ position: cameraPosition, fov }}
          frameloop={reducedMotion ? "demand" : "always"}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.65} />
          <directionalLight position={[5, 6, 4]} intensity={1.1} />
          <directionalLight position={[-4, 2, -3]} intensity={0.35} color="#B9826A" />
          {children}
          <OrbitControls
            enablePan={false}
            autoRotate={!reducedMotion}
            autoRotateSpeed={0.8}
            minDistance={minDistance}
            maxDistance={maxDistance}
          />
          <Preload all />
        </Canvas>
      </Suspense>
      <div className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-noir/70 px-2.5 py-1 font-heading text-[10px] uppercase tracking-[1px] text-dim">
        drag to orbit
      </div>
    </div>
  );
}
