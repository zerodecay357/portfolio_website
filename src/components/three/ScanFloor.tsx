"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Grid, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import { PALETTE, SCAN_PERIOD, SWEEP_SPEED } from "./palette";

// Floor-plane LiDAR overlay, one draw call: a polar dot lattice that lights
// up behind a rotating sweep, the sweep's leading edge, and a pair of rings
// expanding outward from the sensor every SCAN_PERIOD.
const sweepVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const sweepFragment = /* glsl */ `
  uniform float uTime;
  uniform float uRadius;
  uniform float uSpeed;
  uniform float uPeriod;
  uniform vec3 uColor;
  varying vec2 vUv;
  const float TAU = 6.28318530718;

  float ring(float r, float phase) {
    float rr = phase * uRadius;
    return (1.0 - smoothstep(0.0, 0.05, abs(r - rr))) * (1.0 - phase) * smoothstep(0.0, 0.08, phase);
  }

  void main() {
    vec2 p = (vUv - 0.5) * 2.0 * uRadius;
    float r = length(p);
    if (r > uRadius) discard;
    float a = atan(p.y, p.x);
    float sweepA = mod(uTime * uSpeed, TAU);
    float behind = mod(sweepA - a + TAU * 2.0, TAU);
    float trail = exp(-behind * 2.4);

    // polar dot lattice, roughly even spacing
    float spacing = 0.16;
    float ringIdx = floor(r / spacing);
    float rc = (ringIdx + 0.5) * spacing;
    float count = max(6.0, floor(TAU * rc / spacing));
    float cell = fract((a + TAU) / TAU * count) - 0.5;
    vec2 dd = vec2(r - rc, cell * TAU * rc / count);
    float dotMask = (1.0 - smoothstep(0.006, 0.02, length(dd)));

    float edge = (1.0 - smoothstep(0.0, 0.035, behind * r)) * step(0.0, r - 0.25);
    float t = uTime / uPeriod;
    float rings = ring(r, fract(t)) + ring(r, fract(t + 0.5));

    float fade = (1.0 - smoothstep(uRadius * 0.35, uRadius, r)) * smoothstep(0.18, 0.5, r);
    float glow = dotMask * (0.12 + trail * 1.5) + edge * 0.9 + rings * 0.75 + trail * 0.045;
    gl_FragColor = vec4(uColor * glow * fade, 1.0);
    #include <colorspace_fragment>
  }
`;

// Overlay layer: the camera sees it, ContactShadows' depth camera does not
// (otherwise the sweep plane would read as a giant occluder).
export const OVERLAY_LAYER = 1;

// Additive line set: the LiDAR's individual laser channels, sensor to floor.
function buildBeams(height: number, radius: number) {
  const channels = 14;
  const positions: number[] = [];
  const colors: number[] = [];
  const c = new THREE.Color(PALETTE.coolant);
  for (let i = 0; i < channels; i++) {
    const reach = 0.55 + (radius * 0.9 - 0.55) * Math.pow(i / (channels - 1), 1.35);
    positions.push(0, height, 0, reach, 0, 0);
    colors.push(c.r * 0.5, c.g * 0.5, c.b * 0.5, c.r * 0.08, c.g * 0.08, c.b * 0.08);
  }
  // translucent wedge under the beams
  const wedge = [0, height, 0, 0.55, 0, 0, radius * 0.9, 0, 0];
  const wedgeColors = [c.r * 0.16, c.g * 0.16, c.b * 0.16, c.r * 0.05, c.g * 0.05, c.b * 0.05, 0, 0, 0];
  return {
    lines: { positions: new Float32Array(positions), colors: new Float32Array(colors) },
    wedge: { positions: new Float32Array(wedge), colors: new Float32Array(wedgeColors) },
  };
}

export default function ScanFloor({
  reflector = true,
  animate = true,
  lowPower = false,
  radius = 4.4,
  center = [0, 0, 0],
  sensorHeight = 1.1,
  stillTime = 1.25,
}: {
  reflector?: boolean;
  animate?: boolean;
  lowPower?: boolean;
  radius?: number;
  center?: [number, number, number];
  sensorHeight?: number;
  stillTime?: number;
}) {
  const sweep = useRef<THREE.ShaderMaterial>(null);
  const fan = useRef<THREE.Group>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: stillTime },
      uRadius: { value: radius },
      uSpeed: { value: SWEEP_SPEED },
      uPeriod: { value: SCAN_PERIOD },
      uColor: { value: new THREE.Color(PALETTE.coolant) },
    }),
    [radius, stillTime]
  );
  const beams = useMemo(() => buildBeams(sensorHeight, radius), [sensorHeight, radius]);
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.layers.enable(OVERLAY_LAYER);
  }, [camera]);

  useFrame(({ clock }) => {
    const t = animate ? clock.elapsedTime : stillTime;
    if (sweep.current) sweep.current.uniforms.uTime.value = t;
    if (fan.current) fan.current.rotation.y = (t * SWEEP_SPEED) % (Math.PI * 2);
  });

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position-y={0}>
        <planeGeometry args={[40, 40]} />
        {reflector ? (
          <MeshReflectorMaterial
            resolution={lowPower ? 256 : 512}
            blur={[360, 110]}
            mixBlur={1}
            mixStrength={1.8}
            mixContrast={1.15}
            roughness={0.82}
            depthScale={1.1}
            minDepthThreshold={0.35}
            maxDepthThreshold={1.35}
            color="#0a0e13"
            metalness={0.6}
            mirror={0.55}
          />
        ) : (
          <meshStandardMaterial color="#0b1015" metalness={0.55} roughness={0.55} />
        )}
      </mesh>

      <Grid
        position={[0, 0.002, 0]}
        args={[24, 24]}
        cellSize={0.25}
        cellThickness={0.6}
        cellColor={PALETTE.conduit}
        sectionSize={1}
        sectionThickness={1}
        sectionColor={PALETTE.conduit2}
        fadeDistance={radius * 2.1}
        fadeStrength={1.6}
        fadeFrom={0}
      />

      <ContactShadows
        position={[0, 0.004, 0]}
        scale={6}
        blur={2.4}
        far={1.6}
        opacity={0.85}
        resolution={lowPower ? 256 : 512}
        frames={animate ? Infinity : 1}
        color="#000000"
      />

      <group position={center}>
        <mesh rotation-x={-Math.PI / 2} position-y={0.006} renderOrder={2} layers={OVERLAY_LAYER}>
          <planeGeometry args={[radius * 2, radius * 2]} />
          <shaderMaterial
            ref={sweep}
            vertexShader={sweepVertex}
            fragmentShader={sweepFragment}
            uniforms={uniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>

        <group ref={fan} rotation-y={(stillTime * SWEEP_SPEED) % (Math.PI * 2)}>
          <lineSegments renderOrder={3} layers={OVERLAY_LAYER}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[beams.lines.positions, 3]} />
              <bufferAttribute attach="attributes-color" args={[beams.lines.colors, 3]} />
            </bufferGeometry>
            <lineBasicMaterial
              vertexColors
              transparent
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </lineSegments>
          <mesh renderOrder={3} layers={OVERLAY_LAYER}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[beams.wedge.positions, 3]} />
              <bufferAttribute attach="attributes-color" args={[beams.wedge.colors, 3]} />
            </bufferGeometry>
            <meshBasicMaterial
              vertexColors
              transparent
              side={THREE.DoubleSide}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
