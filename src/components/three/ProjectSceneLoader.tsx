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
    <div aria-hidden="true" className="relative h-[440px] w-full border border-hairline bg-obsidian">
      <div className="absolute inset-0 bg-[radial-gradient(40%_35%_at_50%_60%,rgb(200_215_230/0.06),transparent_70%)]" />
      <div className="absolute inset-0">
        <div className="ticks h-full w-full" />
      </div>
    </div>
  ),
});

export default function ProjectSceneLoader({ kind }: { kind: ThreeDKind }) {
  return <ProjectScene kind={kind} />;
}
