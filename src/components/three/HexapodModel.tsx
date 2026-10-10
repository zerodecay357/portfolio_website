"use client";

import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import {
  createHexapodMaterials,
  disposeHexapodMaterials,
  GLOW_BASE,
  slotFor,
  type HexapodMaterials,
} from "./hexapodMaterials";
import { RING_PERIOD } from "./palette";

const MODEL_URL = "/models/hexapod.glb";

// Tripod gait: legs 1, 3, 5 swing together, 2, 4, 6 half a cycle later.
// Leg nodes are pivoted at the hip with local +X pointing outward, so a
// +Z rotation lifts the foot and a Y rotation swings it fore and aft.
const GAIT_PERIOD = 2.8;
const LIFT = 0.2;
const SWING = 0.13;
const TURRET_PIVOT_X = 0.08; // sensor head centre, from the GLB
// Time used for the reduced-motion still: mid-stride, one tripod raised.
const STILL_T = 0.62;

type Rig = {
  root: THREE.Object3D;
  body: THREE.Object3D | null;
  baseBodyY: number;
  legs: { node: THREE.Object3D; base: THREE.Quaternion; phase: number }[];
  pan: THREE.Group | null;
  drum: THREE.Object3D | null;
  mats: HexapodMaterials;
};

function buildRig(scene: THREE.Object3D): Rig {
  const mats = createHexapodMaterials();
  const root = scene.clone(true);
  root.traverse((child) => {
    if (child instanceof THREE.Mesh) child.material = mats[slotFor(child.name)];
  });

  const legs: Rig["legs"] = [];
  for (let i = 1; i <= 6; i++) {
    const node = root.getObjectByName(`leg_${i}`);
    if (node) legs.push({ node, base: node.quaternion.clone(), phase: i % 2 ? 0 : Math.PI });
  }

  // The turret parts are siblings around the chassis origin; re-parent them
  // under a pivot at the sensor head so the pan turns in place.
  let pan: THREE.Group | null = null;
  const turret = root.getObjectByName("sensor_turret");
  if (turret) {
    pan = new THREE.Group();
    pan.position.x = TURRET_PIVOT_X;
    [...turret.children].forEach((c) => {
      c.position.x -= TURRET_PIVOT_X;
      pan!.add(c);
    });
    turret.add(pan);
  }

  const body = root.getObjectByName("hexapod") ?? null;
  return {
    root,
    body,
    baseBodyY: body?.position.y ?? 0,
    legs,
    pan,
    drum: root.getObjectByName("lidar_drum") ?? null,
    mats,
  };
}

const tmpQ = new THREE.Quaternion();
const tmpE = new THREE.Euler();

function applyPose(rig: Rig, t: number) {
  const w = (Math.PI * 2) / GAIT_PERIOD;
  for (const leg of rig.legs) {
    const a = t * w + leg.phase;
    const lift = Math.pow(Math.max(0, Math.sin(a)), 1.6) * LIFT;
    tmpE.set(0, Math.cos(a) * SWING, lift);
    leg.node.quaternion.copy(leg.base).multiply(tmpQ.setFromEuler(tmpE));
  }
  if (rig.body) {
    // Body dips slightly each time a tripod plants, and rolls with the gait.
    rig.body.position.y = rig.baseBodyY + Math.abs(Math.sin(t * w)) * 0.004;
    rig.body.rotation.z = Math.sin(t * w) * 0.012;
    rig.body.rotation.x = Math.cos(t * w) * 0.01;
  }
  if (rig.pan) rig.pan.rotation.y = Math.sin(t * 0.45) * 0.42;
  if (rig.drum) rig.drum.rotation.y = t * 5;
  // The chassis seam brightens softly as each platform ring is emitted.
  const beat = (t % RING_PERIOD) / RING_PERIOD;
  rig.mats.glow.emissiveIntensity = GLOW_BASE + 0.9 * Math.exp(-beat * 9);
}

/**
 * Hexabot V2 with the shared chrome and glass kit. Animates an idle tripod gait, a
 * sensor-head pan and the LiDAR drum spin; with `animate` off it holds a
 * composed mid-stride still.
 */
export default function HexapodModel({ animate = true }: { animate?: boolean }) {
  const { scene } = useGLTF(MODEL_URL);
  const rig = useMemo(() => buildRig(scene), [scene]);

  useEffect(() => {
    if (!animate) applyPose(rig, STILL_T);
  }, [rig, animate]);

  useEffect(() => () => disposeHexapodMaterials(rig.mats), [rig]);

  useFrame(({ clock }) => {
    if (animate) applyPose(rig, clock.elapsedTime);
  });

  return <primitive object={rig.root} />;
}

useGLTF.preload(MODEL_URL);
