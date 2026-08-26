"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { mulberry32 } from "@/lib/rng";
import HexapodModel from "./HexapodModel";

// Procedural stand-in for a FAST-LIO2 scan-to-map point cloud: a room shell
// (floor + four walls) plus scattered clutter, colored by height like a
// typical LiDAR intensity/height colormap.
function buildRoomCloud() {
  const rand = mulberry32(7);
  const positions: number[] = [];
  const colors: number[] = [];
  const heightColor = (y: number) => {
    const c = new THREE.Color().setHSL(0.62 - Math.min(y / 2.2, 1) * 0.5, 0.55, 0.55);
    return c;
  };

  const pushPoint = (x: number, y: number, z: number) => {
    positions.push(x, y, z);
    const c = heightColor(y);
    colors.push(c.r, c.g, c.b);
  };

  // floor scan
  for (let i = 0; i < 2200; i++) {
    const x = (rand() - 0.5) * 5.6;
    const z = (rand() - 0.5) * 5.6;
    pushPoint(x, 0.02 * rand(), z);
  }
  // four walls
  const wallSpecs = [
    { axis: "x", at: 2.8 },
    { axis: "x", at: -2.8 },
    { axis: "z", at: 2.8 },
    { axis: "z", at: -2.8 },
  ] as const;
  for (const w of wallSpecs) {
    for (let i = 0; i < 900; i++) {
      const h = rand() * 2.1;
      const along = (rand() - 0.5) * 5.6;
      if (w.axis === "x") pushPoint(w.at, h, along);
      else pushPoint(along, h, w.at);
    }
  }
  // clutter / obstacles
  for (let i = 0; i < 5; i++) {
    const cx = (rand() - 0.5) * 4;
    const cz = (rand() - 0.5) * 4;
    const cw = 0.3 + rand() * 0.5;
    const ch = 0.3 + rand() * 1.1;
    for (let j = 0; j < 260; j++) {
      pushPoint(
        cx + (rand() - 0.5) * cw,
        rand() * ch,
        cz + (rand() - 0.5) * cw
      );
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
  };
}

export default function LidarPointCloud() {
  const { positions, colors } = useMemo(buildRoomCloud, []);

  return (
    <group position={[0, -0.6, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.03} vertexColors sizeAttenuation />
      </points>
      {/* robot pose marker at scan origin — the actual hexapod, scaled down */}
      <group position={[0, 0, 0]} scale={1.8}>
        <HexapodModel glowIntensity={0.4} />
      </group>
    </group>
  );
}
