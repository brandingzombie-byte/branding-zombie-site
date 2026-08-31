"use client";

/**
 * WebGL glitter texture (21st.dev "animated hero with WebGL glitter", adapted).
 *
 * House adaptations vs. the stock component:
 *  - `GlitterOverlay` scopes the effect to its PARENT section (absolute, not
 *    fixed/z-50) so it can texture a single hero instead of the whole page.
 *  - Sparkles are tinted through a `color` uniform (brand cyan by default)
 *    instead of pure white, and rendered over black with `mix-blend-lighten`,
 *    so black passes through and only the sparkle reads — no opaque backdrop.
 *  - Respects prefers-reduced-motion (renders nothing) and bails out when
 *    WebGL context creation fails. DPR capped at 1.5 to keep GPU cost down.
 *  - Mounted behind content (-z), pointer-events-none, aria-hidden.
 *
 * The original full-screen `GlitterFinal`/`Component` exports are preserved
 * below for reuse elsewhere.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ── Shaders ────────────────────────────────────────────────────────────────

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Noise sampled at two scales/speeds; pow() sharpens into distinct sparkles.
const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform sampler2D iChannel0;
  uniform vec3 uColor;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float result = 0.0;

    result += texture2D(iChannel0, uv * 1.1 + vec2(iTime * -0.005)).r;
    result *= texture2D(iChannel0, uv * 0.9 + vec2(iTime * 0.005)).g;

    result = pow(result, 12.0);

    gl_FragColor = vec4(uColor * 5.0 * result, 1.0);
  }
`;

function generateNoiseTexture(size = 512): THREE.DataTexture {
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    const stride = i * 4;
    data[stride] = Math.random() * 255;
    data[stride + 1] = Math.random() * 255;
    data[stride + 2] = Math.random() * 255;
    data[stride + 3] = 255;
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

interface SparklesPlaneProps {
  speed?: number;
  /** Sparkle tint as [r,g,b] in 0..1. Default: brand cyan. */
  tint?: [number, number, number];
}

function SparklesPlane({ speed = 1, tint = [0, 1, 0.83] }: SparklesPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const noiseTexture = useMemo(() => generateNoiseTexture(512), []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(
            typeof window !== "undefined" ? window.innerWidth : 1920,
            typeof window !== "undefined" ? window.innerHeight : 1080,
          ),
        },
        iChannel0: { value: noiseTexture },
        uColor: { value: new THREE.Vector3(...tint) },
      },
      vertexShader,
      fragmentShader,
      transparent: false,
      side: THREE.DoubleSide,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noiseTexture]);

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material instanceof THREE.ShaderMaterial) {
      meshRef.current.material.uniforms.iTime.value = state.clock.elapsedTime * speed;
      meshRef.current.material.uniforms.iResolution.value.set(
        state.size.width,
        state.size.height,
      );
    }
  });

  return (
    <mesh ref={meshRef} material={material}>
      <planeGeometry args={[10, 10]} />
    </mesh>
  );
}

/** True once mounted AND the user has not asked for reduced motion. */
function useMotionOk(): boolean {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setOk(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return ok;
}

// ── Scoped overlay (house variant) ─────────────────────────────────────────

interface GlitterOverlayProps {
  speed?: number;
  /** Sparkle tint as [r,g,b] 0..1. Default brand cyan (#00FFD4-ish). */
  tint?: [number, number, number];
  /** Overall strength via CSS opacity. Default 0.4. */
  opacity?: number;
  className?: string;
}

/**
 * GlitterOverlay — section-scoped glitter texture. Parent must be
 * `position: relative`; the canvas fills it, blends with `lighten` (black is
 * a no-op), ignores pointers, and vanishes for reduced-motion users.
 */
export function GlitterOverlay({
  speed = 0.75,
  tint,
  opacity = 0.4,
  className = "",
}: GlitterOverlayProps) {
  const motionOk = useMotionOk();
  if (!motionOk) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 mix-blend-lighten",
        className,
      )}
      style={{ opacity }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 35 }}
        dpr={[1, 1.5]}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        gl={{ powerPreference: "high-performance", antialias: false }}
      >
        <color attach="background" args={["#000000"]} />
        <SparklesPlane speed={speed} tint={tint} />
      </Canvas>
    </div>
  );
}

// ── Original full-screen variants (kept for reuse) ─────────────────────────

interface GlitterFinalProps {
  speed?: number;
  intensity?: number;
  className?: string;
}

/** Full-viewport glitter overlay (stock behavior, reduced-motion aware). */
export function GlitterFinal({ speed = 1, className = "" }: GlitterFinalProps) {
  const motionOk = useMotionOk();
  if (!motionOk) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-50 h-full w-full scale-125 opacity-50 mix-blend-lighten",
        className,
      )}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 35 }}
        dpr={[1, 1.5]}
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 10 }}
        gl={{ powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#000000"]} />
        <SparklesPlane speed={speed} tint={[1, 1, 1]} />
      </Canvas>
    </div>
  );
}

interface GlitterBackgroundProps {
  speed?: number;
  intensity?: number;
  className?: string;
}

/** Stock full-screen demo wrapper. */
export const Component = ({
  speed = 0.75,
  intensity = 5.0,
  className = "",
}: GlitterBackgroundProps) => {
  return (
    <div className={cn("min-w-screen relative h-screen min-h-screen", className)}>
      <GlitterFinal speed={speed} intensity={intensity} />
    </div>
  );
};
