"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const BODY = "#232019"; // chassis — dark, non-glowing
const LEG = "#B9826A"; // legs / motors — terracotta, glowing
const JOINT_A = "#8C9A7B"; // small fasteners — sage, glowing
const JOINT_B = "#CBB892"; // small fasteners, alternating — gold, glowing

// Shared, recolored hexapod mesh — every non-chassis part glows so the
// model reads the same whether it's the hero piece or a small prop.
export default function HexapodModel(props: { glowIntensity?: number }) {
  const { glowIntensity = 0.5 } = props;
  const { scene } = useGLTF("/models/hexapod.glb");
  const colored = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    let i = 0;
    colored.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.computeBoundingBox();
        const box = child.geometry.boundingBox!;
        const size = new THREE.Vector3();
        box.getSize(size);
        const volume = size.x * size.y * size.z;
        let color: string = LEG;
        let glow = glowIntensity * 3.2;
        if (volume > 0.00003) {
          color = BODY;
          glow = 0;
        } else if (volume < 0.000002) {
          color = i % 2 === 0 ? JOINT_A : JOINT_B;
          glow = glowIntensity * 2;
        }
        child.material = new THREE.MeshStandardMaterial({
          color,
          emissive: glow ? color : "#000000",
          emissiveIntensity: glow,
          metalness: 0.35,
          roughness: 0.45,
        });
        i++;
      }
    });
  }, [colored, glowIntensity]);

  return <primitive object={colored} />;
}

useGLTF.preload("/models/hexapod.glb");
