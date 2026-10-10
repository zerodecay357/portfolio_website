"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { PALETTE } from "./palette";

/**
 * Dark photo studio built entirely from Lightformers (no network HDRs).
 * Long cool-white strip softboxes overhead and two tall vertical strips at
 * the sides lay crisp, long reflections down the chrome links and the
 * edges of the glass. An overhead key spot lights the platform pool.
 */
export default function StudioLights({ keyLight = true }: { keyLight?: boolean }) {
  return (
    <>
      <Environment resolution={256} frames={1} environmentIntensity={1}>
        <color attach="background" args={[PALETTE.obsidian]} />
        {/* overhead strip softboxes */}
        <Lightformer form="rect" intensity={4} color={PALETTE.light} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[10, 0.7, 1]} />
        <Lightformer form="rect" intensity={2.2} color={PALETTE.light} position={[0, 5, -1.8]} rotation-x={Math.PI / 2} scale={[10, 0.22, 1]} />
        <Lightformer form="rect" intensity={2.2} color={PALETTE.light} position={[0, 5, 1.8]} rotation-x={Math.PI / 2} scale={[10, 0.22, 1]} />
        {/* tall side strips for long vertical streaks */}
        <Lightformer form="rect" intensity={3.2} color={PALETTE.light} position={[-5, 2.2, -1.5]} rotation-y={Math.PI / 2} scale={[0.35, 7, 1]} />
        <Lightformer form="rect" intensity={2.6} color={PALETTE.light} position={[5, 2.2, 1.2]} rotation-y={-Math.PI / 2} scale={[0.3, 7, 1]} />
        {/* broad dim fills so chrome reflects soft grey gradients, not pure black */}
        <Lightformer form="rect" intensity={0.7} color={PALETTE.light} position={[0, 2.5, -7]} scale={[14, 5, 1]} />
        <Lightformer form="rect" intensity={0.9} color={PALETTE.light} position={[0, 4, 7]} rotation-y={Math.PI} scale={[12, 3, 1]} />
        <Lightformer form="rect" intensity={0.25} color={PALETTE.light} position={[0, -3, 0]} rotation-x={-Math.PI / 2} scale={[12, 12, 1]} />
        {/* low front card so the glass edges catch a rim */}
        <Lightformer form="rect" intensity={0.9} color={PALETTE.light} position={[1.5, 0.8, 6]} rotation-y={Math.PI} scale={[6, 0.35, 1]} />
      </Environment>
      <ambientLight intensity={0.05} />
      <directionalLight position={[3, 7, 4]} intensity={1.1} color={PALETTE.light} />
      {keyLight && (
        <spotLight
          position={[0.3, 6.5, 0]}
          angle={0.36}
          penumbra={1}
          intensity={90}
          distance={14}
          color={PALETTE.light}
        />
      )}
    </>
  );
}
