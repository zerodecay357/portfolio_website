"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT = "#B9826A";
const LEG_ANGLES = [-50, -100, -150, 50, 100, 150]; // degrees around body, per leg mount

function Leg({ angle, phase }: { angle: number; phase: number }) {
  const coxaRef = useRef<THREE.Group>(null);
  const femurRef = useRef<THREE.Group>(null);
  const tibiaRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 2 + phase;
    const lift = Math.max(0, Math.sin(t));
    if (coxaRef.current) coxaRef.current.rotation.z = Math.sin(t) * 0.12;
    if (femurRef.current) femurRef.current.rotation.x = -0.3 - lift * 0.5;
    if (tibiaRef.current) tibiaRef.current.rotation.x = 0.5 + lift * 0.6;
  });

  const rad = (angle * Math.PI) / 180;
  return (
    <group
      position={[Math.cos(rad) * 0.62, 0.05, Math.sin(rad) * 0.62]}
      rotation={[0, -rad, 0]}
    >
      <group ref={coxaRef}>
        <mesh position={[0.18, 0, 0]}>
          <boxGeometry args={[0.36, 0.09, 0.09]} />
          <meshStandardMaterial color="#3a352c" />
        </mesh>
        <group position={[0.36, 0, 0]} ref={femurRef}>
          <mesh position={[0.24, 0, 0]}>
            <boxGeometry args={[0.48, 0.08, 0.08]} />
            <meshStandardMaterial color={ACCENT} />
          </mesh>
          <group position={[0.48, 0, 0]} ref={tibiaRef}>
            <mesh position={[0, -0.32, 0]}>
              <boxGeometry args={[0.07, 0.64, 0.07]} />
              <meshStandardMaterial color="#3a352c" />
            </mesh>
            <mesh position={[0, -0.64, 0]}>
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshStandardMaterial color="#111" />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

export default function HexapodRig() {
  const legs = useMemo(
    () => LEG_ANGLES.map((angle, i) => ({ angle, phase: (i % 2) * Math.PI })),
    []
  );

  return (
    <group position={[0, 0.4, 0]}>
      {/* body */}
      <mesh>
        <cylinderGeometry args={[0.55, 0.55, 0.22, 6]} />
        <meshStandardMaterial color="#232019" metalness={0.2} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.06, 6]} />
        <meshStandardMaterial color={ACCENT} metalness={0.3} roughness={0.4} />
      </mesh>
      {legs.map((l, i) => (
        <Leg key={i} angle={l.angle} phase={l.phase} />
      ))}
      <gridHelper args={[6, 24, "#322D26", "#232019"]} position={[0, -0.42, 0]} />
    </group>
  );
}
