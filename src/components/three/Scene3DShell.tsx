"use client";

import { Suspense, useRef, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import StudioLights from "./StudioLights";
import Settle from "./Settle";
import { PALETTE } from "./palette";
import { useOnScreen } from "./hooks";
import Pill from "@/components/Pill";

/**
 * Square hairline viewport (corner ticks) for case-study scenes. Owns the canvas, the studio
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
    <div
      className={`relative w-full border border-hairline bg-obsidian ${className}`}
      style={{ height }}
    >
      <div ref={wrap} className="absolute inset-0 overflow-hidden" role="img" aria-label={label}>
        <Canvas
          frameloop={!onScreen ? "never" : animate ? "always" : "demand"}
          camera={{ position: cameraPosition, fov, near: 0.1, far: 80 }}
          dpr={lowPower ? [1, 1.5] : [1, 1.75]}
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <color attach="background" args={[PALETTE.obsidian]} />
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
      </div>
      {/* ticks on their own top layer (.ticks forces position: relative, hence the wrapper) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="ticks h-full w-full" />
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4">
        <Pill className="bg-obsidian/70 backdrop-blur-sm">Drag to orbit</Pill>
      </div>
    </div>
  );
}
