import * as THREE from "three";
import { mulberry32 } from "@/lib/rng";
import { PALETTE } from "./palette";

/*
  PBR kit for the Hexabot V2 model, styled like studio-lit lab hardware:
  polished chrome links, transparent glass chassis plates and turret shell
  with the dark internals (core, battery, deck, heatsink) visible through
  them, glossy graphite servo housings, satin machined hubs and fasteners,
  and a few small ember accents (knee rings, core band). The only emissive
  parts are the cool-white sensor lenses and chassis seam, plus a faint
  ember on the accent bits.
*/
export type HexapodMaterials = {
  chrome: THREE.MeshPhysicalMaterial;
  satin: THREE.MeshStandardMaterial;
  glass: THREE.MeshPhysicalMaterial;
  internal: THREE.MeshStandardMaterial;
  housing: THREE.MeshPhysicalMaterial;
  rubber: THREE.MeshStandardMaterial;
  ember: THREE.MeshStandardMaterial;
  glow: THREE.MeshStandardMaterial;
  lens: THREE.MeshStandardMaterial;
};

// Brushed-metal roughness streaks, generated once and shared. Gives the
// satin metal a machined grain instead of a plastic-smooth sheen.
let brushed: THREE.DataTexture | null = null;
function brushedTexture() {
  if (brushed) return brushed;
  const size = 128;
  const rand = mulberry32(31);
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    const row = rand() * 46;
    for (let x = 0; x < size; x++) {
      const v = Math.min(255, 150 + row + rand() * 22);
      const i = (y * size + x) * 4;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 255;
    }
  }
  brushed = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  brushed.wrapS = brushed.wrapT = THREE.RepeatWrapping;
  brushed.repeat.set(2, 2);
  brushed.needsUpdate = true;
  return brushed;
}

export const GLOW_BASE = 0.8;

export function createHexapodMaterials(): HexapodMaterials {
  const grain = brushedTexture();
  return {
    chrome: new THREE.MeshPhysicalMaterial({
      color: "#eef1f4",
      metalness: 1,
      roughness: 0.13,
      clearcoat: 0.7,
      clearcoatRoughness: 0.06,
      envMapIntensity: 1.35,
    }),
    satin: new THREE.MeshStandardMaterial({
      color: "#c2c8ce",
      metalness: 1,
      roughness: 0.3,
      roughnessMap: grain,
      envMapIntensity: 1.1,
    }),
    // Physical transmission (one shared transmission pass per frame) instead
    // of drei's MeshTransmissionMaterial, which renders a buffer per material.
    glass: new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      metalness: 0,
      roughness: 0.05,
      transmission: 1,
      thickness: 0.03,
      ior: 1.5,
      attenuationColor: new THREE.Color("#cfe0ea"),
      attenuationDistance: 0.35,
      specularIntensity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      envMapIntensity: 1.4,
    }),
    internal: new THREE.MeshStandardMaterial({
      color: "#15191e",
      metalness: 0.55,
      roughness: 0.42,
    }),
    housing: new THREE.MeshPhysicalMaterial({
      color: "#3a414a",
      metalness: 0.7,
      roughness: 0.3,
      clearcoat: 0.6,
      clearcoatRoughness: 0.18,
    }),
    rubber: new THREE.MeshStandardMaterial({
      color: "#07080a",
      metalness: 0,
      roughness: 0.94,
    }),
    ember: new THREE.MeshStandardMaterial({
      color: PALETTE.ember,
      metalness: 0.15,
      roughness: 0.35,
      emissive: "#ff5a1a",
      emissiveIntensity: 0.3,
    }),
    glow: new THREE.MeshStandardMaterial({
      color: "#0c0f12",
      emissive: PALETTE.light,
      emissiveIntensity: GLOW_BASE,
      toneMapped: false,
    }),
    lens: new THREE.MeshStandardMaterial({
      color: "#05070a",
      emissive: PALETTE.light,
      emissiveIntensity: 1.6,
      roughness: 0.08,
      toneMapped: false,
    }),
  };
}

export function disposeHexapodMaterials(m: HexapodMaterials) {
  Object.values(m).forEach((mat) => mat.dispose());
}

/** Picks a material slot from the GLB node name. */
export function slotFor(name: string): keyof HexapodMaterials {
  if (name.includes("lens")) return "lens";
  if (name === "chassis_glow_ring") return "glow";
  if (name.includes("knee_glow_ring") || name.includes("accent_band")) return "ember";
  if (name === "chassis_top_plate" || name === "chassis_bottom_plate" || name === "sensor_head")
    return "glass";
  if (name === "chassis_core" || name === "deck_riser" || name === "battery_pack") return "internal";
  if (/_(coxa|femur|tibia)$/.test(name)) return "chrome";
  if (
    name.includes("servo_case") ||
    name.includes("ankle_joint") ||
    name.includes("tibia_guard") ||
    name === "lidar_drum"
  )
    return "housing";
  if (name.includes("foot_pad") || name.includes("foot_grip")) return "rubber";
  return "satin";
}
