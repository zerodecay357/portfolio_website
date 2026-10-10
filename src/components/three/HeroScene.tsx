"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import HexapodModel from "./HexapodModel";
import StudioLights from "./StudioLights";
import ScanFloor, { OVERLAY_LAYER } from "./ScanFloor";
import ScanEffects from "./ScanEffects";
import BayStructure from "./BayStructure";
import Settle from "./Settle";
import { PALETTE } from "./palette";
import { useMediaQuery, useOnScreen, useReducedMotionPref } from "./hooks";

const ROBOT_SCALE = 3.2;
// LiDAR drum position in model space (x 0.086, y 0.268 + 0.023 root offset)
const SENSOR: [number, number, number] = [0.086 * ROBOT_SCALE, 0, 0];
const SENSOR_HEIGHT = 0.291 * ROBOT_SCALE;

// Camera orbit around the robot (spherical, radians)
const TARGET = new THREE.Vector3(0.15, 0.42, 0);
const AZIMUTH = 0.81;
const ELEVATION = 0.2;
const DISTANCE = 6.4;
const INTRO_EXTRA = 2.4; // camera starts this much further out and glides in

function orbit(out: THREE.Vector3, az: number, el: number, dist: number, target: THREE.Vector3) {
  return out.set(
    target.x + Math.sin(az) * Math.cos(el) * dist,
    target.y + Math.sin(el) * dist,
    target.z + Math.cos(az) * Math.cos(el) * dist
  );
}

const START = orbit(new THREE.Vector3(), AZIMUTH, ELEVATION + 0.06, DISTANCE + INTRO_EXTRA, TARGET).toArray();
const STILL = orbit(new THREE.Vector3(), AZIMUTH, ELEVATION, DISTANCE, TARGET).toArray();

/**
 * Pointer parallax, a slow pendulum orbit and a scroll dolly. Pointer and
 * scroll are sampled inside the frame loop (no React state, no scroll
 * listeners) and the camera eases toward the target pose each frame.
 */
function CameraRig({ animate, pointerParallax }: { animate: boolean; pointerParallax: boolean }) {
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
    if (!animate) return;
    const k = 1 - Math.exp(-Math.min(delta, 0.05) * 2.2);
    eased.current.x += (pointer.current.x - eased.current.x) * k;
    eased.current.y += (pointer.current.y - eased.current.y) * k;

    const scroll = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.2);
    const t = clock.elapsedTime;
    const az = AZIMUTH + Math.sin(t * 0.09) * 0.26 + eased.current.x * 0.2;
    const el = ELEVATION + eased.current.y * 0.07 + scroll * 0.22;
    const dist = DISTANCE + scroll * 2.4;
    look.current.set(TARGET.x, TARGET.y - scroll * 0.25, TARGET.z);
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
  const finePointer = useMediaQuery("(pointer: fine)");
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  const animate = !reduced;

  return (
    <div
      ref={wrap}
      role="img"
      aria-label="3D render of the Hexabot V2 hexapod standing in a LiDAR scan bay, a cyan scan sweeping the floor around it"
      className="absolute inset-0"
      style={{ opacity: ready ? 1 : 0, transition: "opacity 1.1s cubic-bezier(0.16,1,0.3,1)" }}
    >
      <Canvas
        frameloop={!onScreen ? "never" : animate ? "always" : "demand"}
        dpr={mobile ? [1, 1.5] : [1, 1.75]}
        camera={{ position: animate ? START : STILL, fov: 30, near: 0.1, far: 60 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={[PALETTE.void]} />
        <fog attach="fog" args={[PALETTE.void, 7.5, 17]} />
        <Suspense fallback={null}>
          <StudioLights />
          <group scale={ROBOT_SCALE}>
            <HexapodModel animate={animate} />
          </group>
          <BayStructure />
          <ScanFloor
            reflector={!mobile}
            animate={animate}
            lowPower={mobile}
            radius={4.2}
            center={SENSOR}
            sensorHeight={SENSOR_HEIGHT}
          />
          <Sparkles
            count={mobile ? 24 : 70}
            scale={[7, 2.6, 7]}
            position={[0, 1.4, 0]}
            size={1.6}
            speed={animate ? 0.22 : 0}
            opacity={0.35}
            noise={0.6}
            color="#a9c4cc"
            layers={OVERLAY_LAYER}
          />
          <ScanEffects lowPower={mobile} />
          <Ready onReady={markReady} />
        </Suspense>
        {animate ? <CameraRig animate pointerParallax={finePointer && !mobile} /> : <StillCamera />}
        <Settle active={!animate && onScreen} />
      </Canvas>
    </div>
  );
}
