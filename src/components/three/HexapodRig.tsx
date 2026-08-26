"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import HexapodModel from "./HexapodModel";

export default function HexapodRig() {
  const group = useRef<THREE.Group>(null);
  const baseY = 0.02;

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.y = baseY + Math.sin(clock.getElapsedTime() * 1.2) * 0.02;
    }
  });

  return (
    <group ref={group} position={[0, baseY, 0]} scale={5.2}>
      <HexapodModel glowIntensity={0.6} />

      {/* interesting lighting — warm key + cool rim, playing off the joint glow */}
      <pointLight position={[0, 1.4, 0]} intensity={0.6} color="#B9826A" distance={3} />
      <pointLight position={[-0.6, 0.5, 0.6]} intensity={0.5} color="#CBB892" distance={2.5} />
      <pointLight position={[0.5, 0.3, -0.6]} intensity={0.45} color="#8C9A7B" distance={2.5} />

      <gridHelper args={[1.6, 20, "#8A8275", "#232019"]} position={[0, -0.005, 0]} />

      <EffectComposer>
        <Bloom
          intensity={1.4}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.3}
          mipmapBlur
        />
      </EffectComposer>
    </group>
  );
}
