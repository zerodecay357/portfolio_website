"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { mulberry32 } from "@/lib/rng";

// The one deliberately "flashy" 3D moment on the site: an equity curve
// rendered with depth — time (x) x cumulative PnL (y) x daily factor
// exposure (z) — plus a scatter of daily signal/return points around it.
export default function QuantSurface() {
  const { curvePoints, dots } = useMemo(() => {
    const rand = mulberry32(23);
    let cum = 0;
    const curve: THREE.Vector3[] = [];
    const dots: { pos: [number, number, number]; positive: boolean }[] = [];
    const days = 40;
    for (let i = 0; i < days; i++) {
      const ret = (rand() - 0.42) * 0.35;
      cum += ret;
      const x = (i / (days - 1)) * 6 - 3;
      const y = cum * 0.9;
      const z = Math.sin(i * 0.4) * 0.9 * (0.4 + rand() * 0.6);
      curve.push(new THREE.Vector3(x, y, z));
      dots.push({ pos: [x, y + (rand() - 0.5) * 0.4, z + (rand() - 0.5) * 0.5], positive: ret >= 0 });
    }
    return { curvePoints: curve, dots };
  }, []);

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(curvePoints),
    [curvePoints]
  );
  const tubeGeometry = useMemo(
    () => new THREE.TubeGeometry(curve, 200, 0.035, 8, false),
    [curve]
  );

  return (
    <group position={[0, 0.3, 0]}>
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial color="#B9826A" emissive="#B9826A" emissiveIntensity={0.4} />
      </mesh>
      {dots.map((d, i) => (
        <mesh key={i} position={d.pos}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshStandardMaterial
            color={d.positive ? "#8C9A7B" : "#6E665B"}
            emissive={d.positive ? "#8C9A7B" : "#000000"}
            emissiveIntensity={d.positive ? 0.3 : 0}
          />
        </mesh>
      ))}
      <gridHelper args={[8, 16, "#322D26", "#232019"]} rotation={[0, 0, 0]} position={[0, -1.4, 0]} />
    </group>
  );
}
