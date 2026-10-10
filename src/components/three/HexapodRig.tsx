"use client";

import { Sparkles } from "@react-three/drei";
import HexapodModel from "./HexapodModel";
import StudioStage, { OVERLAY_LAYER } from "./StudioStage";
import LightCone from "./LightCone";
import StudioGrade from "./StudioGrade";
import { PALETTE } from "./palette";

const SCALE = 3.2;

// Case-study turntable: the same chrome and glass hexapod on the same lit
// studio platform as the hero, framed for orbiting.
export default function HexapodRig({
  animate = true,
  lowPower = false,
}: {
  animate?: boolean;
  lowPower?: boolean;
}) {
  return (
    <>
      <fog attach="fog" args={[PALETTE.obsidian, 7, 16]} />
      <group scale={SCALE}>
        <HexapodModel animate={animate} />
      </group>
      <StudioStage size={4} reflector={!lowPower} animate={animate} lowPower={lowPower} />
      <LightCone position={[0.2, 0, 0]} height={5.6} bottom={2.1} strength={0.06} />
      <Sparkles
        count={lowPower ? 10 : 24}
        scale={[5, 2.6, 5]}
        position={[0, 1.4, 0]}
        size={1.2}
        speed={animate ? 0.15 : 0}
        opacity={0.18}
        color={PALETTE.light}
        layers={OVERLAY_LAYER}
      />
      <StudioGrade lowPower={lowPower} />
    </>
  );
}
