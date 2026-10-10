"use client";

import { Sparkles } from "@react-three/drei";
import HexapodModel from "./HexapodModel";
import ScanFloor, { OVERLAY_LAYER } from "./ScanFloor";
import ScanEffects from "./ScanEffects";
import { PALETTE } from "./palette";

const SCALE = 3.2;

// Case-study turntable: the same PBR hexapod and scan floor as the hero,
// without the bay architecture so the orbit stays about the robot.
export default function HexapodRig({
  animate = true,
  lowPower = false,
}: {
  animate?: boolean;
  lowPower?: boolean;
}) {
  return (
    <>
      <fog attach="fog" args={[PALETTE.void, 6, 15]} />
      <group scale={SCALE}>
        <HexapodModel animate={animate} />
      </group>
      <ScanFloor
        reflector={!lowPower}
        animate={animate}
        lowPower={lowPower}
        radius={3.6}
        center={[0.086 * SCALE, 0, 0]}
        sensorHeight={0.291 * SCALE}
      />
      <Sparkles
        count={lowPower ? 20 : 50}
        scale={[6, 2.4, 6]}
        position={[0, 1.3, 0]}
        size={1.5}
        speed={animate ? 0.2 : 0}
        opacity={0.3}
        color="#a9c4cc"
        layers={OVERLAY_LAYER}
      />
      <ScanEffects lowPower={lowPower} />
    </>
  );
}
