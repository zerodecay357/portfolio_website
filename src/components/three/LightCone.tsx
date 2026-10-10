"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { PALETTE } from "./palette";
import { OVERLAY_LAYER } from "./StudioStage";

const coneVertex = /* glsl */ `
  varying float vH;
  varying float vFacing;
  void main() {
    vH = uv.y;
    vec3 n = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vFacing = abs(dot(n, normalize(-mv.xyz)));
    gl_Position = projectionMatrix * mv;
  }
`;

const coneFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uStrength;
  varying float vH;
  varying float vFacing;
  void main() {
    // brightest near the lamp, gone before the floor; soft silhouette edges
    float fall = smoothstep(0.0, 0.85, vH) * (1.0 - smoothstep(0.92, 1.0, vH));
    float soft = pow(vFacing, 2.2);
    gl_FragColor = vec4(uColor * fall * soft * uStrength, 1.0);
    #include <colorspace_fragment>
  }
`;

/**
 * Volumetric-looking overhead light: an open cone with an additive vertical
 * gradient, faded at its silhouette so it reads as haze, not geometry.
 */
export default function LightCone({
  height = 6,
  top = 0.22,
  bottom = 2.1,
  strength = 0.07,
  position = [0, 0, 0],
}: {
  height?: number;
  top?: number;
  bottom?: number;
  strength?: number;
  position?: [number, number, number];
}) {
  const uniforms = useMemo(
    () => ({ uColor: { value: new THREE.Color(PALETTE.light) }, uStrength: { value: strength } }),
    [strength]
  );
  return (
    <mesh position={[position[0], position[1] + height / 2, position[2]]} renderOrder={4} layers={OVERLAY_LAYER}>
      <cylinderGeometry args={[top, bottom, height, 48, 1, true]} />
      <shaderMaterial
        vertexShader={coneVertex}
        fragmentShader={coneFragment}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}
