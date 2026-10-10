"use client";

import dynamic from "next/dynamic";

// Placeholder with the exact footprint of the scene (it fills the same
// absolutely positioned slot), so the lazy canvas never shifts layout:
// a dark studio with a soft overhead pool where the platform will be.
function StudioSkeleton() {
  return (
    <div aria-hidden="true" className="absolute inset-0 bg-obsidian">
      <div className="absolute inset-0 bg-[radial-gradient(40%_32%_at_58%_62%,rgb(200_215_230/0.07),transparent_70%)]" />
    </div>
  );
}

// three, r3f, drei and postprocessing load only in this client chunk,
// after hydration, and never on the server. The skeleton stays underneath
// and the canvas fades in over it once the model has loaded.
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function HeroSceneLoader() {
  return (
    <>
      <StudioSkeleton />
      <HeroScene />
    </>
  );
}
