"use client";

import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

/**
 * Cinematic grade for the studio: restrained bloom that only catches the
 * unclipped light (platform outline, lenses, strip highlights), a vignette,
 * and a whisper of film noise. No chromatic aberration.
 */
export default function StudioGrade({ lowPower = false }: { lowPower?: boolean }) {
  return (
    <EffectComposer multisampling={lowPower ? 0 : 4}>
      <Bloom mipmapBlur intensity={0.55} luminanceThreshold={0.9} luminanceSmoothing={0.15} radius={0.6} />
      <Vignette offset={0.3} darkness={0.72} />
      <Noise opacity={0.025} premultiply />
    </EffectComposer>
  );
}
