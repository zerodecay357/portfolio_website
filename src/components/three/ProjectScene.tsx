"use client";

import dynamic from "next/dynamic";
import Scene3DShell from "./Scene3DShell";
import type { ThreeDKind } from "@/lib/projects";

const HexapodRig = dynamic(() => import("./HexapodRig"), { ssr: false });
const LidarPointCloud = dynamic(() => import("./LidarPointCloud"), { ssr: false });

const CAMERA: Record<ThreeDKind, [number, number, number]> = {
  hexapod: [3.2, 2.4, 3.6],
  "lidar-map": [4.5, 3.2, 4.5],
};

export default function ProjectScene({ kind }: { kind: ThreeDKind }) {
  const camera = CAMERA[kind];

  return (
    <Scene3DShell cameraPosition={camera} height={440}>
      {kind === "hexapod" && <HexapodRig />}
      {kind === "lidar-map" && <LidarPointCloud />}
    </Scene3DShell>
  );
}
