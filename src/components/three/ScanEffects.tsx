"use client";

import { useMemo } from "react";
import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * Camera-feed grade for the bay: bloom only catches the unclipped emissive
 * parts (coolant rings, lenses, sweep), a hair of chromatic aberration at the
 * frame edges, vignette, and a low sensor-noise grain.
 */
export default function ScanEffects({ lowPower = false }: { lowPower?: boolean }) {
  const caOffset = useMemo(() => new THREE.Vector2(0.0007, 0.0005), []);
  return (
    <EffectComposer multisampling={lowPower ? 0 : 4}>
      <Bloom mipmapBlur intensity={1.15} luminanceThreshold={0.82} luminanceSmoothing={0.18} radius={0.7} />
      <ChromaticAberration offset={caOffset} radialModulation modulationOffset={0.35} />
      <Vignette offset={0.26} darkness={0.78} />
      <Noise opacity={0.05} premultiply />
    </EffectComposer>
  );
}
