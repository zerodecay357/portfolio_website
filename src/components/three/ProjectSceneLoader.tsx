"use client";

import dynamic from "next/dynamic";
import type { ThreeDKind } from "@/lib/projects";

// Kept separate from ProjectScene so THIS module (statically imported by
// every project page) stays free of three/r3f/drei — those only load when
// the dynamic import below actually resolves, i.e. only on pages that
// render a scene at all.
const ProjectScene = dynamic(() => import("./ProjectScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[440px] w-full items-center justify-center rounded-lg bg-noir-surface">
      <div className="h-10 w-10 animate-pulse rounded-full border-2 border-dim/40" />
    </div>
  ),
});

export default function ProjectSceneLoader({ kind }: { kind: ThreeDKind }) {
  return <ProjectScene kind={kind} />;
}
