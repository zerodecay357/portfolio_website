"use client";

import dynamic from "next/dynamic";
import Scene3DShell from "./Scene3DShell";
import { useMediaQuery, useReducedMotionPref } from "./hooks";
import type { ThreeDKind } from "@/lib/projects";

const HexapodRig = dynamic(() => import("./HexapodRig"), { ssr: false });
const LidarPointCloud = dynamic(() => import("./LidarPointCloud"), { ssr: false });

const VIEW: Record<
  ThreeDKind,
  { camera: [number, number, number]; target: [number, number, number]; label: string }
> = {
  hexapod: {
    camera: [2.7, 1.7, 3],
    target: [0, 0.35, 0],
    label: "Interactive 3D model of the Hexabot V2 hexapod, chrome legs and a glass chassis, on a lit studio platform. Drag to orbit.",
  },
  "lidar-map": {
    camera: [4.6, 4.4, 5.2],
    target: [0, 0.3, 0],
    label:
      "Interactive 3D LiDAR point cloud of a mapped room, shaded from graphite to white by height, with the robot's trajectory. Drag to orbit.",
  },
};

export default function ProjectScene({ kind }: { kind: ThreeDKind }) {
  const reduced = useReducedMotionPref();
  const lowPower = useMediaQuery("(max-width: 767px)");
  const view = VIEW[kind];
  const animate = !reduced;

  return (
    <Scene3DShell
      cameraPosition={view.camera}
      target={view.target}
      height={440}
      animate={animate}
      lowPower={lowPower}
      label={view.label}
    >
      {kind === "hexapod" && <HexapodRig animate={animate} lowPower={lowPower} />}
      {kind === "lidar-map" && <LidarPointCloud animate={animate} lowPower={lowPower} />}
    </Scene3DShell>
  );
}
