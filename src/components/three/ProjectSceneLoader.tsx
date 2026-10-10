"use client";

import dynamic from "next/dynamic";
import type { ThreeDKind } from "@/lib/projects";

// Kept separate from ProjectScene so THIS module (statically imported by
// every project page) stays free of three/r3f/drei. Those only load when
// the dynamic import below actually resolves, i.e. only on pages that
// render a scene at all.
const ProjectScene = dynamic(() => import("./ProjectScene"), {
  ssr: false,
  loading: () => (
    <div aria-hidden="true" className="plate h-[440px] w-full">
      <div className="plate-inner relative overflow-hidden bg-void">
        <div className="bg-blueprint absolute inset-x-0 bottom-0 h-1/2 opacity-40 [mask-image:linear-gradient(to_top,black,transparent)]" />
      </div>
    </div>
  ),
});

export default function ProjectSceneLoader({ kind }: { kind: ThreeDKind }) {
  return <ProjectScene kind={kind} />;
}
