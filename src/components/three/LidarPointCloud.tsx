"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import type { Line2 } from "three-stdlib";
import * as THREE from "three";
import { mulberry32 } from "@/lib/rng";
import HexapodModel from "./HexapodModel";
import ScanEffects from "./ScanEffects";
import { PALETTE, SWEEP_SPEED } from "./palette";

/*
  Procedural stand-in for a FAST-LIO2 scan-to-map run. Instead of scattering
  points on planes, it simulates a 16-channel spinning LiDAR (elevation
  -15 to +15 degrees) from a series of poses along the robot's path and
  ray-casts every beam against a box model of a room (walls, a doorway into
  a corridor, a pillar, tables, cabinets, a shelf and stacked boxes). The
  accumulated returns carry the real artifacts of a spinning sensor: ring
  patterns on the floor, shadowed regions behind obstacles, and sparse far
  walls.
*/

type Box = [number, number, number, number, number, number]; // min xyz, max xyz

const ROOM_H = 2.6;
const BOXES: Box[] = [
  [-4, -0.05, -3, 4, 0, 3], // floor
  [6, -0.05, -1.5, 6.1, 0, 1.5], // corridor floor
  [4, -0.05, -1.5, 6, 0, 1.5],
  [-4.1, 0, -3, -4, ROOM_H, 3], // west wall
  [4, 0, -3, 4.1, ROOM_H, -0.5], // east wall, split by a doorway
  [4, 0, 0.5, 4.1, ROOM_H, 3],
  [4, 2.1, -0.5, 4.1, ROOM_H, 0.5],
  [-4, 0, -3.1, 4, ROOM_H, -3], // north wall
  [-4, 0, 3, 4, ROOM_H, 3.1], // south wall
  [4.1, 0, -1.6, 6, ROOM_H, -1.5], // corridor
  [4.1, 0, 1.5, 6, ROOM_H, 1.6],
  [6, 0, -1.5, 6.1, ROOM_H, 1.5],
  [-1.2, 0, -0.6, -0.8, ROOM_H, -0.2], // pillar
  // table A: top + legs
  [1, 0.72, -2.6, 2.6, 0.76, -1.6],
  [1.05, 0, -2.55, 1.1, 0.72, -2.5],
  [2.5, 0, -2.55, 2.55, 0.72, -2.5],
  [1.05, 0, -1.7, 1.1, 0.72, -1.65],
  [2.5, 0, -1.7, 2.55, 0.72, -1.65],
  // table B
  [-3.6, 0.72, 1.2, -2.4, 0.76, 2.8],
  [-3.55, 0, 1.25, -3.5, 0.72, 1.3],
  [-2.5, 0, 1.25, -2.45, 0.72, 1.3],
  [-3.55, 0, 2.7, -3.5, 0.72, 2.75],
  [-2.5, 0, 2.7, -2.45, 0.72, 2.75],
  // cabinets, shelf, boxes
  [-3.95, 0, -2.9, -3.4, 1.9, -1.4],
  [2.8, 0, 2.4, 3.95, 1.1, 2.95],
  [-1.8, 0, 2.6, 0.2, 2.0, 2.95],
  [0.6, 0, 1.4, 1.2, 0.5, 2.0],
  [1.25, 0, 1.6, 1.6, 0.35, 1.95],
  [0.7, 0.5, 1.5, 1.1, 0.8, 1.9],
];

// Robot path through the room (x, z), one scan per waypoint.
const WAYPOINTS: [number, number][] = [
  [-3, 0.2],
  [-2.2, -1.1],
  [-0.4, -1.5],
  [0.5, -0.4],
  [1.5, 0.4],
  [2.6, 0.7],
  [3.3, 0],
];
const SENSOR_Y = 0.32;
const CHANNELS = 16;
const AZ_STEPS = 480;
const MAX_RANGE = 12;
const SECONDS_PER_SCAN = 1.5;
const SCALE = 0.62;

function rayBox(o: number[], d: number[], b: Box) {
  let tmin = -Infinity;
  let tmax = Infinity;
  for (let a = 0; a < 3; a++) {
    if (Math.abs(d[a]) < 1e-9) {
      if (o[a] < b[a] || o[a] > b[a + 3]) return Infinity;
      continue;
    }
    let t1 = (b[a] - o[a]) / d[a];
    let t2 = (b[a + 3] - o[a]) / d[a];
    if (t1 > t2) [t1, t2] = [t2, t1];
    if (t1 > tmin) tmin = t1;
    if (t2 < tmax) tmax = t2;
    if (tmin > tmax) return Infinity;
  }
  return tmin > 0.05 ? tmin : Infinity;
}

function simulateMap() {
  const rand = mulberry32(7);
  const pos: number[] = [];
  const height: number[] = [];
  const reveal: number[] = [];
  WAYPOINTS.forEach(([px, pz], pose) => {
    const o = [px, SENSOR_Y, pz];
    const spin = rand() * Math.PI * 2;
    for (let c = 0; c < CHANNELS; c++) {
      const el = THREE.MathUtils.degToRad(-15 + (30 * c) / (CHANNELS - 1));
      const ce = Math.cos(el);
      const se = Math.sin(el);
      for (let s = 0; s < AZ_STEPS; s++) {
        const frac = s / AZ_STEPS;
        const az = spin + frac * Math.PI * 2;
        const d = [Math.cos(az) * ce, se, Math.sin(az) * ce];
        let t = MAX_RANGE;
        for (const b of BOXES) t = Math.min(t, rayBox(o, d, b));
        if (t >= MAX_RANGE) continue;
        // drop most far returns, like a real sensor's falling point density
        if (t > 5 && rand() < 0.45) continue;
        const n = (rand() - 0.5) * 0.03;
        const x = o[0] + d[0] * (t + n);
        const y = o[1] + d[1] * (t + n);
        const z = o[2] + d[2] * (t + n);
        pos.push(x, y, z);
        height.push(THREE.MathUtils.clamp(y / ROOM_H, 0, 1));
        reveal.push(pose + frac);
      }
    }
  });
  return {
    positions: new Float32Array(pos),
    heights: new Float32Array(height),
    reveals: new Float32Array(reveal),
  };
}

const cloudVertex = /* glsl */ `
  attribute float aHeight;
  attribute float aReveal;
  uniform float uProgress;
  uniform float uSweep;
  uniform float uHighlight;
  uniform vec2 uCenter;
  uniform float uSize;
  uniform vec3 uLow;
  uniform vec3 uMid;
  uniform vec3 uHigh;
  varying vec3 vColor;
  varying float vVisible;
  const float TAU = 6.28318530718;

  vec3 colormap(float h) {
    return h < 0.5 ? mix(uLow, uMid, h * 2.0) : mix(uMid, uHigh, (h - 0.5) * 2.0);
  }

  void main() {
    float age = uProgress - aReveal;
    vVisible = step(0.0, age);
    float flash = exp(-max(age, 0.0) * 4.0) * vVisible;

    vec2 d = position.xz - uCenter;
    float ang = atan(-d.y, d.x);
    float behind = mod(uSweep - ang + TAU * 2.0, TAU);
    float hl = exp(-behind * 2.6) * uHighlight;

    vColor = colormap(aHeight) * (0.7 + hl * 0.9) + vec3(0.35) * flash;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uSize * (1.0 + flash * 0.8) * (6.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const cloudFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vVisible;
  void main() {
    if (vVisible < 0.5) discard;
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    gl_FragColor = vec4(vColor, 1.0);
    #include <colorspace_fragment>
  }
`;

export default function LidarPointCloud({
  animate = true,
  lowPower = false,
}: {
  animate?: boolean;
  lowPower?: boolean;
}) {
  const cloud = useMemo(() => simulateMap(), []);
  const dpr = useThree((s) => s.viewport.dpr);
  const total = WAYPOINTS.length;
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        WAYPOINTS.map(([x, z]) => new THREE.Vector3(x, 0.03, z)),
        false,
        "centripetal"
      ),
    []
  );
  const pathPoints = useMemo(() => curve.getPoints(160), [curve]);

  const material = useRef<THREE.ShaderMaterial>(null);
  const robot = useRef<THREE.Group>(null);
  const traveled = useRef<Line2>(null);
  const elapsed = useRef(0);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: animate ? 0 : total },
      uSweep: { value: 0.8 },
      uHighlight: { value: animate ? 0 : 0.6 },
      uCenter: { value: new THREE.Vector2(...WAYPOINTS[total - 1]) },
      uSize: { value: 2.4 },
      uLow: { value: new THREE.Color(PALETTE.deepBlue) },
      uMid: { value: new THREE.Color(PALETTE.coolant) },
      uHigh: { value: new THREE.Color(PALETTE.servo) },
    }),
    [animate, total]
  );

  const tmp = useMemo(() => ({ p: new THREE.Vector3(), t: new THREE.Vector3() }), []);

  useFrame((_, delta) => {
    const mat = material.current;
    if (!mat) return;
    mat.uniforms.uSize.value = (lowPower ? 3.2 : 3) * dpr;
    let progress = total;
    if (animate) {
      elapsed.current += Math.min(delta, 0.05);
      progress = Math.min(elapsed.current / SECONDS_PER_SCAN, total);
      mat.uniforms.uProgress.value = progress;
      mat.uniforms.uSweep.value = (elapsed.current * SWEEP_SPEED) % (Math.PI * 2);
      mat.uniforms.uHighlight.value = THREE.MathUtils.clamp((progress - total) + 1, 0, 1);
    }
    // robot rides the path, centred on each scan while it happens
    const u = THREE.MathUtils.clamp((progress - 0.5) / (total - 1), 0, 1);
    curve.getPointAt(u, tmp.p);
    curve.getTangentAt(Math.min(u, 0.999), tmp.t);
    if (robot.current) {
      robot.current.position.set(tmp.p.x, 0, tmp.p.z);
      robot.current.rotation.y = Math.atan2(-tmp.t.z, tmp.t.x);
    }
    if (traveled.current) {
      const segs = Math.max(1, Math.floor(u * (pathPoints.length - 1)));
      traveled.current.geometry.instanceCount = segs;
    }
  });

  return (
    <>
      <group scale={SCALE} position={[-0.8 * SCALE, 0, 0]}>
        <points frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[cloud.positions, 3]} />
            <bufferAttribute attach="attributes-aHeight" args={[cloud.heights, 1]} />
            <bufferAttribute attach="attributes-aReveal" args={[cloud.reveals, 1]} />
          </bufferGeometry>
          <shaderMaterial
            ref={material}
            vertexShader={cloudVertex}
            fragmentShader={cloudFragment}
            uniforms={uniforms}
          />
        </points>

        {/* planned path, then the traveled part drawn over it in servo */}
        <Line points={pathPoints} color={PALETTE.conduit2} lineWidth={1.5} dashed dashSize={0.12} gapSize={0.08} />
        <Line ref={traveled} points={pathPoints} color={PALETTE.servo} lineWidth={2.5} position-y={0.005} />
        {WAYPOINTS.map(([x, z]) => (
          <mesh key={`${x},${z}`} position={[x, 0.05, z]} rotation-y={Math.PI / 4}>
            <boxGeometry args={[0.09, 0.02, 0.09]} />
            <meshBasicMaterial color={PALETTE.servo} toneMapped={false} />
          </mesh>
        ))}

        <group ref={robot}>
          <group scale={0.75}>
            <HexapodModel animate={animate} />
          </group>
        </group>
      </group>
      <ScanEffects lowPower={lowPower} />
    </>
  );
}
