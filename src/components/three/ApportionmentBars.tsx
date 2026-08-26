"use client";

import { useMemo } from "react";
import { Text } from "@react-three/drei";
import { mulberry32 } from "@/lib/rng";

// Turns seat-allocation math into a spatial object: two rows of 3D bars —
// seats under honest reporting vs. seats after a strategic fragment split —
// laid out state-by-state along the same axis so the manipulation gap reads
// as a visual delta rather than a table of numbers.
export default function ApportionmentBars() {
  const states = useMemo(() => {
    const rand = mulberry32(11);
    return Array.from({ length: 9 }, (_, i) => {
      const honest = 2 + rand() * 5;
      const manipulated =
        i === 4 ? honest + 1.6 + rand() * 0.8 : honest + (rand() - 0.5) * 0.4;
      return { honest, manipulated: Math.max(manipulated, 0.4) };
    });
  }, []);

  const spacing = 0.9;
  const offset = ((states.length - 1) * spacing) / 2;

  return (
    <group position={[0, -1, 0]}>
      {states.map((s, i) => {
        const x = i * spacing - offset;
        const isManipulated = i === 4;
        return (
          <group key={i} position={[x, 0, 0]}>
            <mesh position={[0, s.honest / 2, -0.28]}>
              <boxGeometry args={[0.34, s.honest, 0.34]} />
              <meshStandardMaterial color="#6E665B" />
            </mesh>
            <mesh position={[0, s.manipulated / 2, 0.28]}>
              <boxGeometry args={[0.34, s.manipulated, 0.34]} />
              <meshStandardMaterial
                color={isManipulated ? "#B9826A" : "#8C9A7B"}
                emissive={isManipulated ? "#B9826A" : "#000000"}
                emissiveIntensity={isManipulated ? 0.35 : 0}
              />
            </mesh>
          </group>
        );
      })}
      <Text
        position={[0, 3.4, 0]}
        fontSize={0.32}
        color="#F3EFE8"
        anchorX="center"
      >
        honest vs. split-manipulated allocation
      </Text>
      <gridHelper args={[10, 20, "#322D26", "#232019"]} position={[0, 0, 0]} />
    </group>
  );
}
