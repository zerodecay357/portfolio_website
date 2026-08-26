"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const BODY = "#232019"; // large chassis parts — dark neutral
const LEG = "#B9826A"; // legs / motors — terracotta accent
const JOINT_A = "#8C9A7B"; // small fasteners — sage, for contrast
const JOINT_B = "#CBB892"; // small fasteners, alternating — gold

export default function HexapodRig() {
  const { scene } = useGLTF("/models/hexapod.glb");
  const group = useRef<THREE.Group>(null);

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
        let color = LEG;
        if (volume > 0.00003) color = BODY;
        else if (volume < 0.000002) color = i % 2 === 0 ? JOINT_A : JOINT_B;
        child.material = new THREE.MeshStandardMaterial({
          color,
          metalness: 0.35,
          roughness: 0.45,
        });
        i++;
      }
    });
  }, [colored]);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.y = 0.4 + Math.sin(clock.getElapsedTime() * 1.2) * 0.02;
    }
  });

  return (
    <group ref={group} position={[0, 0.4, 0]} scale={5.2}>
      <primitive object={colored} />
      <pointLight position={[0, 1.4, 0]} intensity={0.6} color="#B9826A" distance={3} />
      <gridHelper args={[1.6, 20, "#8A8275", "#232019"]} position={[0, -0.31, 0]} />
    </group>
  );
}

useGLTF.preload("/models/hexapod.glb");
