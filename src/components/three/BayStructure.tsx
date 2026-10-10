"use client";

import { PALETTE } from "./palette";

/**
 * Static scan-bay architecture behind the robot: a steel gantry with
 * hazard-painted feet, a coolant strip light under the crossbeam, and two
 * ceiling light bars. It gives the reflective floor something to mirror and
 * the frame real depth. Rotated to face the default hero camera.
 */
export default function BayStructure() {
  const steel = { color: "#1a2129", metalness: 0.85, roughness: 0.38 } as const;
  const posts = [-2.7, 2.7];
  return (
    <group position={[-2.3, 0, -2.5]} rotation-y={0.74}>
      {posts.map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 1.6, 0]}>
            <boxGeometry args={[0.22, 3.2, 0.26]} />
            <meshStandardMaterial {...steel} />
          </mesh>
          {/* hazard paint band at the foot of each post */}
          <mesh position={[0, 0.32, 0]}>
            <boxGeometry args={[0.24, 0.42, 0.28]} />
            <meshPhysicalMaterial color="#e7b70b" metalness={0.25} roughness={0.4} clearcoat={0.6} />
          </mesh>
          <mesh position={[0, 0.58, 0]}>
            <boxGeometry args={[0.24, 0.08, 0.28]} />
            <meshStandardMaterial color="#0c0f13" roughness={0.5} />
          </mesh>
          {/* inner-face status strip */}
          <mesh position={[x < 0 ? 0.115 : -0.115, 1.7, 0]}>
            <boxGeometry args={[0.01, 1.4, 0.03]} />
            <meshStandardMaterial color="#000000" emissive="#cfd9e0" emissiveIntensity={1.1} toneMapped={false} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 3.12, 0]}>
        <boxGeometry args={[5.62, 0.24, 0.32]} />
        <meshStandardMaterial {...steel} />
      </mesh>
      <mesh position={[0, 2.98, 0.06]}>
        <boxGeometry args={[5.1, 0.03, 0.05]} />
        <meshStandardMaterial color="#000000" emissive={PALETTE.coolant} emissiveIntensity={2.6} toneMapped={false} />
      </mesh>
      {/* ceiling light bars, mostly seen in the floor reflection */}
      {[1.6, 3.6].map((z) => (
        <mesh key={z} position={[0, 4.2, z]}>
          <boxGeometry args={[4.4, 0.04, 0.12]} />
          <meshStandardMaterial color="#000000" emissive="#e8eef2" emissiveIntensity={1.6} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}
