"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Grid, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import { PALETTE, RING_PERIOD } from "./palette";

// Overlay layer: the camera sees it, ContactShadows' depth camera does not
// (otherwise the additive light planes would read as occluders).
export const OVERLAY_LAYER = 1;

// Light pool plus a rare hairline ring, one additive plane clipped to the
// platform square. The ring expands slowly once every RING_PERIOD.
const poolVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const poolFragment = /* glsl */ `
  uniform float uTime;
  uniform float uPeriod;
  uniform float uHalf;
  uniform float uRing;
  uniform vec3 uColor;
  varying vec2 vUv;

  void main() {
    vec2 p = (vUv - 0.5) * 2.0 * uHalf;
    float edge = max(abs(p.x), abs(p.y));
    float inside = 1.0 - smoothstep(uHalf - 0.04, uHalf, edge);
    float r = length(p);

    float pool = exp(-(r * r) / (2.0 * pow(uHalf * 0.42, 2.0))) * 0.2;

    float phase = fract(uTime / uPeriod) / 0.6;
    float rr = mix(0.5, uHalf * 1.3, phase);
    float ring = (1.0 - smoothstep(0.0, 0.012, abs(r - rr)))
      * (1.0 - smoothstep(0.55, 1.0, phase)) * step(phase, 1.0)
      * smoothstep(0.0, 0.1, phase) * 0.55 * uRing;

    gl_FragColor = vec4(uColor * (pool + ring) * inside, 1.0);
    #include <colorspace_fragment>
  }
`;

function Outline({ size, intensity, width }: { size: number; intensity: number; width: number }) {
  const h = size / 2;
  const bars: { pos: [number, number, number]; args: [number, number, number] }[] = [
    { pos: [0, 0, -h], args: [size + width, 0.004, width] },
    { pos: [0, 0, h], args: [size + width, 0.004, width] },
    { pos: [-h, 0, 0], args: [width, 0.004, size - width] },
    { pos: [h, 0, 0], args: [width, 0.004, size - width] },
  ];
  return (
    <group position-y={0.003}>
      {bars.map((b, i) => (
        <mesh key={i} position={b.pos} layers={OVERLAY_LAYER}>
          <boxGeometry args={b.args} />
          {/* over-unity color so only this thin line crosses the bloom threshold */}
          <meshBasicMaterial color={[1.6 * intensity, 1.66 * intensity, 1.74 * intensity]} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Lit square platform in a dark studio: a dark reflective plate on a
 * machined slab, a thin glowing square outline with a fainter inner square,
 * a faint perspective grid, a soft light pool and a rare hairline ring.
 */
export default function StudioStage({
  size = 4.2,
  reflector = true,
  animate = true,
  lowPower = false,
  ring = true,
  stillTime = 2.6,
}: {
  size?: number;
  reflector?: boolean;
  animate?: boolean;
  lowPower?: boolean;
  ring?: boolean;
  stillTime?: number;
}) {
  const pool = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: stillTime },
      uPeriod: { value: RING_PERIOD },
      uHalf: { value: size / 2 },
      uRing: { value: ring ? 1 : 0 },
      uColor: { value: new THREE.Color(PALETTE.light) },
    }),
    [size, ring, stillTime]
  );
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.layers.enable(OVERLAY_LAYER);
  }, [camera]);

  useFrame(({ clock }) => {
    if (pool.current) pool.current.uniforms.uTime.value = animate ? clock.elapsedTime : stillTime;
  });

  return (
    <group>
      {/* studio floor, dark and only slightly glossy */}
      <mesh rotation-x={-Math.PI / 2} position-y={-0.07}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#05070a" metalness={0.4} roughness={0.62} />
      </mesh>

      {/* machined slab; its top edge catches the strip lights */}
      <mesh position-y={-0.035}>
        <boxGeometry args={[size, 0.07, size]} />
        <meshPhysicalMaterial color="#0b0e12" metalness={0.85} roughness={0.28} clearcoat={0.5} />
      </mesh>

      {/* reflective plate */}
      <mesh rotation-x={-Math.PI / 2} position-y={0.0005}>
        <planeGeometry args={[size, size]} />
        {reflector ? (
          <MeshReflectorMaterial
            resolution={lowPower ? 256 : 512}
            blur={[320, 90]}
            mixBlur={1}
            mixStrength={2.4}
            mixContrast={1.1}
            roughness={0.55}
            depthScale={1}
            minDepthThreshold={0.3}
            maxDepthThreshold={1.3}
            color="#0a0d11"
            metalness={0.7}
            mirror={0.6}
          />
        ) : (
          <meshPhysicalMaterial color="#0b0e12" metalness={0.85} roughness={0.22} clearcoat={0.6} />
        )}
      </mesh>

      <Grid
        position={[0, 0.0015, 0]}
        args={[size, size]}
        cellSize={size / 16}
        cellThickness={0.5}
        cellColor={PALETTE.hairline}
        sectionSize={size / 4}
        sectionThickness={0.8}
        sectionColor={PALETTE.hairline2}
        fadeDistance={30}
        fadeStrength={1}
        layers={OVERLAY_LAYER}
      />

      <Outline size={size - 0.06} intensity={1} width={0.014} />
      <Outline size={size * 0.62} intensity={0.3} width={0.008} />

      <ContactShadows
        position={[0, 0.004, 0]}
        scale={size * 1.2}
        blur={2.2}
        far={1.6}
        opacity={0.9}
        resolution={lowPower ? 256 : 512}
        frames={animate ? Infinity : 1}
        color="#000000"
      />

      <mesh rotation-x={-Math.PI / 2} position-y={0.005} renderOrder={2} layers={OVERLAY_LAYER}>
        <planeGeometry args={[size, size]} />
        <shaderMaterial
          ref={pool}
          vertexShader={poolVertex}
          fragmentShader={poolFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
