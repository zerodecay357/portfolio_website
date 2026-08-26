"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const STAGES = ["FETCH", "DECODE", "ISSUE", "EXECUTE", "COMMIT"];
const STAGE_X = STAGES.map((_, i) => i * 1.6 - (STAGES.length - 1) * 0.8);
const INSTR_COUNT = 6;

function Instructions() {
  const group = useRef<THREE.Group>(null);
  const offsets = useMemo(
    () => Array.from({ length: INSTR_COUNT }, (_, i) => i * 1.1),
    []
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const cycle = ((t * 0.9 + offsets[i]) % (STAGES.length + 1)) - 0.5;
      const clamped = Math.min(Math.max(cycle, 0), STAGES.length - 1);
      const x =
        STAGE_X[0] +
        (STAGE_X[STAGE_X.length - 1] - STAGE_X[0]) *
          (clamped / (STAGES.length - 1));
      child.position.x = x;
      child.visible = cycle >= -0.2 && cycle <= STAGES.length - 0.8;
    });
  });

  return (
    <group ref={group}>
      {offsets.map((_, i) => (
        <mesh key={i} position={[STAGE_X[0], 0.55, (i - INSTR_COUNT / 2) * 0.18]}>
          <boxGeometry args={[0.28, 0.16, 0.16]} />
          <meshStandardMaterial color="#B9826A" emissive="#B9826A" emissiveIntensity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function ReorderBuffer() {
  const slots = 6;
  return (
    <group position={[STAGE_X[STAGE_X.length - 1] + 1.1, -0.1, 0]}>
      <Text position={[0, 0.9, 0]} fontSize={0.24} color="#F3EFE8" anchorX="center">
        ROB
      </Text>
      {Array.from({ length: slots }, (_, i) => (
        <mesh key={i} position={[0, 0.55 - i * 0.22, 0]}>
          <boxGeometry args={[0.7, 0.16, 0.3]} />
          <meshStandardMaterial
            color={i < 3 ? "#8C9A7B" : "#3a352c"}
            wireframe={i >= 3}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function RiscvPipeline() {
  return (
    <group position={[0, 0, 0]}>
      {STAGES.map((label, i) => (
        <group key={label} position={[STAGE_X[i], 0, 0]}>
          <mesh>
            <boxGeometry args={[1.2, 1.1, 1.1]} />
            <meshStandardMaterial color="#232019" transparent opacity={0.35} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.2, 1.1, 1.1)]} />
            <lineBasicMaterial color="#6E665B" />
          </lineSegments>
          <Text position={[0, -0.85, 0]} fontSize={0.19} color="#9A9082" anchorX="center">
            {label}
          </Text>
        </group>
      ))}
      <Instructions />
      <ReorderBuffer />
    </group>
  );
}
