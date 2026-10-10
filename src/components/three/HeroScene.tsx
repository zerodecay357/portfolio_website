"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import HexapodModel from "./HexapodModel";
import StudioLights from "./StudioLights";
import StudioStage, { OVERLAY_LAYER } from "./StudioStage";
import LightCone from "./LightCone";
import StudioGrade from "./StudioGrade";
import Settle from "./Settle";
import { PALETTE } from "./palette";
import { useMediaQuery, useOnScreen, useReducedMotionPref } from "./hooks";

const ROBOT_SCALE = 3.2;

// Camera orbit around the robot (spherical, radians). A raised three-quarter
// view so the lit platform square reads as a plane, like a product shot.
const TARGET = new THREE.Vector3(0.12, 0.38, 0);
const AZIMUTH = 0.78;
const ELEVATION = 0.3;
const DISTANCE = 7;
const INTRO_EXTRA = 2.2; // camera starts this much further out and glides in
// On wide layouts the canvas fills the right of the hero and its left edge
// fades into the copy, so the frame is shifted (film offset, no camera
// rotation) to sit the robot right of the canvas centre.
const WIDE_FILM_OFFSET = -1.8;

function orbit(out: THREE.Vector3, az: number, el: number, dist: number, target: THREE.Vector3) {
  return out.set(
    target.x + Math.sin(az) * Math.cos(el) * dist,
    target.y + Math.sin(el) * dist,
    target.z + Math.cos(az) * Math.cos(el) * dist
  );
}

const START = orbit(new THREE.Vector3(), AZIMUTH, ELEVATION + 0.08, DISTANCE + INTRO_EXTRA, TARGET).toArray();
const STILL = orbit(new THREE.Vector3(), AZIMUTH, ELEVATION, DISTANCE, TARGET).toArray();

// filmOffset persists on the camera; r3f's resize handler recomputes the
// projection with it, so it only needs setting when the layout changes.
function FilmOffset({ offset }: { offset: number }) {
  const get = useThree((s) => s.get);
  useEffect(() => {
    const { camera, invalidate } = get();
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    camera.filmOffset = offset;
    camera.updateProjectionMatrix();
    invalidate();
  }, [get, offset]);
  return null;
}

/**
 * Pointer parallax, a slow pendulum orbit and a scroll dolly. Pointer and
 * scroll are sampled inside the frame loop (no React state, no scroll
 * listeners) and the camera eases toward the target pose each frame.
 */
function CameraRig({ pointerParallax }: { pointerParallax: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });
  const eased = useRef({ x: 0, y: 0 });
  const desired = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());

  useEffect(() => {
    if (!pointerParallax) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerParallax]);

  useFrame(({ camera, clock }, delta) => {
    const k = 1 - Math.exp(-Math.min(delta, 0.05) * 2.2);
    eased.current.x += (pointer.current.x - eased.current.x) * k;
    eased.current.y += (pointer.current.y - eased.current.y) * k;

    const scroll = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.2);
    const t = clock.elapsedTime;
    const az = AZIMUTH + Math.sin(t * 0.08) * 0.22 + eased.current.x * 0.16;
    const el = ELEVATION + eased.current.y * 0.05 + scroll * 0.18;
    const dist = DISTANCE + scroll * 2.2;
    look.current.set(TARGET.x, TARGET.y - scroll * 0.2, TARGET.z);
    orbit(desired.current, az, el, dist, look.current);
    camera.position.lerp(desired.current, k);
    camera.lookAt(look.current);
  });
  return null;
}

function StillCamera() {
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.lookAt(TARGET);
  }, [camera]);
  return null;
}

function Ready({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady]);
  return null;
}

export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(wrap);
  const reduced = useReducedMotionPref();
  const mobile = useMediaQuery("(max-width: 767px)");
  const wide = useMediaQuery("(min-width: 1024px)");
  const finePointer = useMediaQuery("(pointer: fine)");
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  const animate = !reduced;

  return (
    <div
      ref={wrap}
      role="img"
      aria-label="3D render of the Hexabot V2 hexapod, with chrome legs and a glass chassis, standing on a lit square platform in a dark studio"
      className="absolute inset-0"
      style={{ opacity: ready ? 1 : 0, transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1)" }}
    >
      <Canvas
        frameloop={!onScreen ? "never" : animate ? "always" : "demand"}
        dpr={mobile ? [1, 1.5] : [1, 1.75]}
        camera={{ position: animate ? START : STILL, fov: 30, near: 0.1, far: 60 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={[PALETTE.obsidian]} />
        <fog attach="fog" args={[PALETTE.obsidian, 8, 18]} />
        <Suspense fallback={null}>
          <StudioLights />
          <group scale={ROBOT_SCALE}>
            <HexapodModel animate={animate} />
          </group>
          <StudioStage size={4.4} reflector={!mobile} animate={animate} lowPower={mobile} />
          <LightCone position={[0.2, 0, 0]} height={6.2} bottom={2.3} strength={mobile ? 0.05 : 0.07} />
          <Sparkles
            count={mobile ? 12 : 30}
            scale={[6, 3, 6]}
            position={[0, 1.6, 0]}
            size={1.2}
            speed={animate ? 0.15 : 0}
            opacity={0.18}
            noise={0.5}
            color={PALETTE.light}
            layers={OVERLAY_LAYER}
          />
          <StudioGrade lowPower={mobile} />
          <Ready onReady={markReady} />
        </Suspense>
        <FilmOffset offset={wide ? WIDE_FILM_OFFSET : 0} />
        {animate ? <CameraRig pointerParallax={finePointer && !mobile} /> : <StillCamera />}
        <Settle active={!animate && onScreen} />
      </Canvas>
    </div>
  );
}
