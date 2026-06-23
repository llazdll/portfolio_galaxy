"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingShape({
  color,
  speed,
}: {
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.6;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.4;
    meshRef.current.position.y =
      Math.sin(state.clock.elapsedTime * speed) * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function InnerShape({
  color,
  speed,
}: {
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const scale = 0.6 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    meshRef.current.scale.set(scale, scale, scale);
    meshRef.current.rotation.y = -state.clock.elapsedTime * speed * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        wireframe
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} color="#6c63ff" intensity={1} />
        <pointLight position={[-3, -2, 2]} color="#00d4aa" intensity={0.5} />
        <FloatingShape color="#6c63ff" speed={0.5} />
        <InnerShape color="#00d4aa" speed={0.8} />
      </Canvas>
    </div>
  );
}
