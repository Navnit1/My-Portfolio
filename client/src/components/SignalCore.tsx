import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Line } from "@react-three/drei";
import * as THREE from "three";

/**
 * SignalCore — the site's "AI presence" object.
 *
 * This stands in for the full speaking-3D-avatar described in the brief.
 * A photorealistic rigged avatar with lip-synced TTS is a separate,
 * much larger effort (rigged model + viseme mapping + a TTS provider);
 * see docs/EDITING_YOUR_PORTFOLIO.md for how to swap this out for one
 * later (e.g. Ready Player Me + ElevenLabs) without touching layout code.
 *
 * What this does today: a live, reactive wireframe core that pulses
 * while the boot sequence "speaks", and idles gently afterward —
 * real, running 3D, not a static image.
 */
function Core({ speaking }: { speaking: boolean }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * (speaking ? 0.6 : 0.18);
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
    if (inner.current) {
      const pulse = speaking
        ? 1 + Math.sin(state.clock.elapsedTime * 8) * 0.06
        : 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.03;
      inner.current.scale.setScalar(pulse);
    }
  });

  const ringPoints: [number, number, number][] = [];
  const ringCount = 64;
  for (let i = 0; i <= ringCount; i++) {
    const a = (i / ringCount) * Math.PI * 2;
    ringPoints.push([Math.cos(a) * 1.9, Math.sin(a) * 1.9, 0]);
  }

  return (
    <group ref={group}>
      <Icosahedron ref={inner} args={[1, 1]}>
        <meshBasicMaterial color="#4fd1c5" wireframe transparent opacity={0.85} />
      </Icosahedron>
      <Icosahedron args={[1.35, 0]}>
        <meshBasicMaterial color="#2f7a72" wireframe transparent opacity={0.3} />
      </Icosahedron>
      <Line points={ringPoints} color="#f2b155" transparent opacity={0.35} rotation={[Math.PI / 2.4, 0, 0]} />
    </group>
  );
}

export default function SignalCore({ speaking = false }: { speaking?: boolean }) {
  return (
    <div className="h-full w-full" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <Core speaking={speaking} />
        </Suspense>
      </Canvas>
    </div>
  );
}
