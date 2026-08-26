"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { mulberry32 } from "@/lib/rng";

// Representative point cloud of a RealSense D455 capture: a cluttered surface
// with one box face isolated and highlighted as the detected object.
function buildCapture() {
  const rand = mulberry32(42);
  const positions: number[] = [];
  const colors: number[] = [];
  const base = new THREE.Color("#4a4438");
  const noise = () => (rand() - 0.5) * 0.05;

  // background clutter plane
  for (let i = 0; i < 1400; i++) {
    const x = (rand() - 0.5) * 3.2;
    const y = (rand() - 0.5) * 2;
    const z = -0.4 + noise() * 4;
    positions.push(x, y, z);
    const c = base.clone().offsetHSL(0, 0, (rand() - 0.5) * 0.1);
    colors.push(c.r, c.g, c.b);
  }

  // isolated detected box face (dense, brighter, slightly forward)
  const boxColor = new THREE.Color("#B9826A");
  for (let i = 0; i < 900; i++) {
    const x = -0.5 + rand() * 1.0;
    const y = -0.4 + rand() * 0.8;
    positions.push(x, y, 0.05 + noise());
    const c = boxColor.clone().offsetHSL(0, 0, (rand() - 0.5) * 0.08);
    colors.push(c.r, c.g, c.b);
  }

  return { positions: new Float32Array(positions), colors: new Float32Array(colors) };
}

export default function KfsPointCloud() {
  const { positions, colors } = useMemo(buildCapture, []);

  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.028} vertexColors sizeAttenuation />
      </points>
      {/* bounding box around the detected face */}
      <lineSegments position={[0, 0, 0.05]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.05, 0.85, 0.15)]} />
        <lineBasicMaterial color="#B9826A" />
      </lineSegments>
      <mesh position={[0, 0.58, 0.05]}>
        <planeGeometry args={[0.01, 0.01]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </group>
  );
}
