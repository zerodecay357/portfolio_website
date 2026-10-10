"use client";

import { Suspense, useRef, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import StudioLights from "./StudioLights";
import Settle from "./Settle";
import { PALETTE } from "./palette";
import { useOnScreen } from "./hooks";

/**
 * Chamfered viewport for case-study scenes. Owns the canvas, the studio
 * lighting and the orbit controls; pauses rendering while offscreen.
 */
export default function Scene3DShell({
  children,
  height = 440,
  cameraPosition = [4, 3, 6],
  target = [0, 0, 0],
  fov = 40,
  minDistance = 3,
  maxDistance = 14,
  animate = true,
  lowPower = false,
  label,
  className = "",
}: {
  children: ReactNode;
  height?: number;
  cameraPosition?: [number, number, number];
  target?: [number, number, number];
  fov?: number;
  minDistance?: number;
  maxDistance?: number;
  animate?: boolean;
  lowPower?: boolean;
  label: string;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(wrap);

  return (
    <div className={`plate w-full ${className}`} style={{ height }}>
      <div ref={wrap} className="plate-inner relative overflow-hidden bg-void" role="img" aria-label={label}>
        <Canvas
          frameloop={!onScreen ? "never" : animate ? "always" : "demand"}
          camera={{ position: cameraPosition, fov, near: 0.1, far: 80 }}
          dpr={lowPower ? [1, 1.5] : [1, 1.75]}
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <color attach="background" args={[PALETTE.void]} />
          <Suspense fallback={null}>
            <StudioLights />
            {children}
            <Preload all />
          </Suspense>
          <OrbitControls
            makeDefault
            target={target}
            enablePan={false}
            enableDamping
            autoRotate={animate}
            autoRotateSpeed={0.6}
            minDistance={minDistance}
            maxDistance={maxDistance}
            maxPolarAngle={Math.PI / 2.1}
          />
          <Settle active={!animate && onScreen} />
        </Canvas>
        {[
          "left-4 top-4 border-l-2 border-t-2",
          "right-4 top-4 border-r-2 border-t-2",
          "bottom-4 left-4 border-b-2 border-l-2",
          "bottom-4 right-4 border-b-2 border-r-2",
        ].map((pos) => (
          <span
            key={pos}
            aria-hidden="true"
            className={`pointer-events-none absolute h-5 w-5 border-servo/70 ${pos}`}
          />
        ))}
        <p className="chamfer-sm pointer-events-none absolute bottom-4 right-12 bg-hull-2/90 px-3 py-1.5 font-mono text-[12px] text-fog">
          Drag to orbit
        </p>
      </div>
    </div>
  );
}
