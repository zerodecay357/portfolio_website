"use client";

import dynamic from "next/dynamic";

// Placeholder with the exact footprint of the scene (it fills the same
// absolutely positioned slot), so the lazy canvas never shifts layout.
function BaySkeleton() {
  return (
    <div aria-hidden="true" className="absolute inset-0 bg-void">
      <div className="bg-blueprint absolute inset-x-0 bottom-0 h-1/2 opacity-40 [mask-image:linear-gradient(to_top,black,transparent)]" />
      <div className="absolute left-1/2 top-[58%] h-[2px] w-[38%] -translate-x-1/2 bg-conduit-2" />
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
      <BaySkeleton />
      <HeroScene />
    </>
  );
}
