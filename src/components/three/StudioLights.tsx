"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { PALETTE } from "./palette";

/**
 * Studio lighting built entirely from Lightformers (no network HDRs).
 * A long overhead softbox gives the painted links their clearcoat streak,
 * side strips put a hard specular edge on the gunmetal, and one faint
 * servo and one faint coolant card tint the reflections like bay signage.
 */
export default function StudioLights() {
  return (
    <>
      <Environment resolution={256} frames={1} environmentIntensity={0.9}>
        <color attach="background" args={[PALETTE.void]} />
        {/* overhead softbox array */}
        <Lightformer form="rect" intensity={3.2} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[8, 1.2, 1]} />
        <Lightformer form="rect" intensity={1.6} position={[0, 5, -2.2]} rotation-x={Math.PI / 2} scale={[8, 0.5, 1]} />
        <Lightformer form="rect" intensity={1.6} position={[0, 5, 2.2]} rotation-x={Math.PI / 2} scale={[8, 0.5, 1]} />
        {/* key and rim strips */}
        <Lightformer form="rect" intensity={2.4} position={[5, 1.6, 2]} rotation-y={-Math.PI / 2.4} scale={[3, 0.35, 1]} />
        <Lightformer form="rect" intensity={1.4} position={[-5, 1.2, -1]} rotation-y={Math.PI / 2} scale={[4, 0.25, 1]} />
        {/* bay signage tints */}
        <Lightformer form="rect" intensity={0.9} color={PALETTE.servo} position={[-3, 0.8, 4]} rotation-y={Math.PI} scale={[2.5, 0.6, 1]} />
        <Lightformer form="ring" intensity={1.2} color={PALETTE.coolant} position={[2, 2.6, -5]} scale={1.6} />
      </Environment>
      <ambientLight intensity={0.08} />
      <directionalLight position={[4, 6, 3]} intensity={1.5} color="#f2f5f8" />
      <spotLight
        position={[-3.5, 4.5, -2.5]}
        angle={0.45}
        penumbra={0.9}
        intensity={22}
        distance={14}
        color={PALETTE.coolant}
      />
    </>
  );
}
