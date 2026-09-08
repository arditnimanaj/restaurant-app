"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

export function EmberScene() {
  return (
    <Canvas
      style={{ width: "100%", height: "100%", display: "block" }}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.6} />
      <Sparkles
        count={140}
        scale={[14, 8, 6]}
        size={4}
        speed={0.35}
        opacity={0.9}
        color="#fb923c"
        noise={1}
      />
      <Sparkles
        count={60}
        scale={[16, 9, 6]}
        size={2}
        speed={0.2}
        opacity={0.5}
        color="#fde68a"
        noise={1.4}
      />
    </Canvas>
  );
}
