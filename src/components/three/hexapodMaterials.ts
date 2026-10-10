import * as THREE from "three";
import { mulberry32 } from "@/lib/rng";
import { PALETTE } from "./palette";

/*
  PBR kit for the Hexabot V2 model, styled like an industrial robot cell:
  servo-yellow painted links, gunmetal chassis, near-black servo housings,
  bright machined hubs and fasteners, rubber feet, and thin coolant-cyan
  emissive rings at the knees and chassis seam (the only glowing parts).
*/
export type HexapodMaterials = {
  paint: THREE.MeshPhysicalMaterial;
  gunmetal: THREE.MeshStandardMaterial;
  graphite: THREE.MeshStandardMaterial;
  housing: THREE.MeshStandardMaterial;
  steel: THREE.MeshStandardMaterial;
  rubber: THREE.MeshStandardMaterial;
  glow: THREE.MeshStandardMaterial;
  lens: THREE.MeshStandardMaterial;
};

// Brushed-metal roughness streaks, generated once and shared. Gives the
// metal reflections a machined grain instead of a plastic-smooth sheen.
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

export function createHexapodMaterials(): HexapodMaterials {
  const grain = brushedTexture();
  return {
    paint: new THREE.MeshPhysicalMaterial({
      color: "#e7b70b",
      metalness: 0.28,
      roughness: 0.36,
      clearcoat: 0.8,
      clearcoatRoughness: 0.22,
    }),
    gunmetal: new THREE.MeshStandardMaterial({
      color: "#4a535d",
      metalness: 0.92,
      roughness: 0.34,
      roughnessMap: grain,
      envMapIntensity: 1.2,
    }),
    graphite: new THREE.MeshStandardMaterial({
      color: "#161b21",
      metalness: 0.6,
      roughness: 0.46,
    }),
    housing: new THREE.MeshStandardMaterial({
      color: "#0c0f13",
      metalness: 0.35,
      roughness: 0.4,
    }),
    steel: new THREE.MeshStandardMaterial({
      color: "#aab3bb",
      metalness: 1,
      roughness: 0.24,
      roughnessMap: grain,
    }),
    rubber: new THREE.MeshStandardMaterial({
      color: "#07080a",
      metalness: 0,
      roughness: 0.94,
    }),
    glow: new THREE.MeshStandardMaterial({
      color: "#06171a",
      emissive: PALETTE.coolant,
      emissiveIntensity: 2.4,
      toneMapped: false,
    }),
    lens: new THREE.MeshStandardMaterial({
      color: "#031014",
      emissive: PALETTE.coolant,
      emissiveIntensity: 4,
      roughness: 0.1,
      toneMapped: false,
    }),
  };
}

export function disposeHexapodMaterials(m: HexapodMaterials) {
  Object.values(m).forEach((mat) => mat.dispose());
}

/** Picks a material slot from the GLB node name (see report for the node map). */
export function slotFor(name: string): keyof HexapodMaterials {
  if (name.includes("glow_ring") || name.includes("accent_band")) return "glow";
  if (name.includes("lens")) return "lens";
  if (/_(coxa|femur|tibia)$/.test(name)) return "paint";
  if (name.includes("servo_case") || name.includes("ankle_joint") || name === "lidar_drum")
    return "housing";
  if (name.includes("servo_rim") || name.includes("femur_rib") || name.includes("tibia_guard"))
    return "graphite";
  if (name.includes("servo_hub") || name.includes("bolt_boss") || name.includes("heatsink_fin"))
    return "steel";
  if (name.includes("foot_pad") || name.includes("foot_grip")) return "rubber";
  if (
    name === "chassis_core" ||
    name === "deck_riser" ||
    name === "battery_pack" ||
    name === "sensor_head"
  )
    return "graphite";
  return "gunmetal";
}
