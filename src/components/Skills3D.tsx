"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion, useInView } from "framer-motion";

const skills = [
  { name: "Python", level: 90, color: "#6c63ff" },
  { name: "R", level: 85, color: "#00d4aa" },
  { name: "SQL", level: 75, color: "#6c63ff" },
  { name: "Scikit-learn", level: 82, color: "#00d4aa" },
  { name: "PyTorch", level: 78, color: "#6c63ff" },
  { name: "TensorFlow", level: 80, color: "#00d4aa" },
  { name: "PowerBI", level: 72, color: "#6c63ff" },
  { name: "Tableau", level: 70, color: "#00d4aa" },
  { name: "Jupyter", level: 88, color: "#6c63ff" },
  { name: "Pandas", level: 92, color: "#00d4aa" },
  { name: "NumPy", level: 88, color: "#6c63ff" },
  { name: "Next.js", level: 88, color: "#00d4aa" },
];

function SkillBar({
  name,
  level,
  index,
  color,
  isVisible,
}: {
  name: string;
  level: number;
  index: number;
  color: string;
  isVisible: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const targetHeight = (level / 100) * 3;

  const x = (index % 4) * 1.5 - 2.25;
  const z = Math.floor(index / 4) * 1.5 - 1.5;

  useFrame((state) => {
    if (!meshRef.current) return;
    const currentHeight = meshRef.current.scale.y;
    const newHeight = THREE.MathUtils.lerp(
      currentHeight,
      isVisible ? targetHeight : 0.01,
      0.05
    );
    meshRef.current.scale.y = newHeight;
    meshRef.current.position.y = newHeight / 2;

    if (hovered) {
      meshRef.current.scale.x = THREE.MathUtils.lerp(
        meshRef.current.scale.x,
        1.2,
        0.1
      );
      meshRef.current.scale.z = THREE.MathUtils.lerp(
        meshRef.current.scale.z,
        1.2,
        0.1
      );
    } else {
      meshRef.current.scale.x = THREE.MathUtils.lerp(
        meshRef.current.scale.x,
        1,
        0.1
      );
      meshRef.current.scale.z = THREE.MathUtils.lerp(
        meshRef.current.scale.z,
        1,
        0.1
      );
    }

    const pulse = Math.sin(state.clock.elapsedTime * 2 + index * 0.5) * 0.02;
    if (isVisible && !hovered) {
      meshRef.current.scale.y = newHeight + pulse;
    }
  });

  return (
    <group position={[x, 0, z]}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <boxGeometry args={[0.8, 1, 0.8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.6 : 0.2}
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Label sprite */}
      <sprite position={[0, -0.7, 0]} scale={[1.2, 0.3, 1]}>
        <spriteMaterial
          color="#8888a0"
          transparent
          opacity={0.8}
        />
      </sprite>
    </group>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 60;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = Math.random() * 6 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#6c63ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function GlowingFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[12, 8]} />
      <meshStandardMaterial
        color="#0a0a0f"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

function CentralOrb() {
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!orbRef.current) return;
    const scale = 0.3 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    orbRef.current.scale.set(scale, scale, scale);
    orbRef.current.position.y = 4.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
  });

  return (
    <group>
      <mesh ref={orbRef} position={[0, 4.5, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#6c63ff"
          emissive="#6c63ff"
          emissiveIntensity={1.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      <pointLight position={[0, 4.5, 0]} color="#6c63ff" intensity={2} distance={8} />
    </group>
  );
}

function CameraController() {
  const { camera } = useThree();
  const angleRef = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  useFrame((state) => {
    // Gentle auto-rotation of camera around scene
    angleRef.current = state.clock.elapsedTime * 0.1;
    const radius = 8;
    camera.position.x = Math.sin(angleRef.current) * radius;
    camera.position.z = Math.cos(angleRef.current) * radius;
    camera.position.y = 5;
    camera.lookAt(0, 1.5, 0);
  });

  return null;
}

function Scene({ isVisible }: { isVisible: boolean }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} castShadow />
      <pointLight position={[-5, 5, -5]} color="#00d4aa" intensity={0.5} />
      <pointLight position={[5, 3, 5]} color="#6c63ff" intensity={0.5} />

      <GlowingFloor />
      <CentralOrb />
      <FloatingParticles />

      {skills.map((skill, i) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          level={skill.level}
          index={i}
          color={skill.color}
          isVisible={isVisible}
        />
      ))}

      <CameraController />
    </>
  );
}

export default function Skills3D() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6c63ff]/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#6c63ff] text-sm font-semibold tracking-widest uppercase">
            Skills
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-5">
            Data Science <span className="text-gradient">Toolkit</span>
          </h2>
          <p className="text-[#8888a0] max-w-2xl mx-auto leading-relaxed">
            I specialize in transforming raw, complex data into actionable business insights
            through advanced analytics, statistical modeling, and machine learning.
          </p>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-[500px] sm:h-[550px] rounded-2xl overflow-hidden border border-[#1e1e2e] bg-[#0a0a0f]/80 backdrop-blur-sm"
        >
          <Canvas
            camera={{ position: [0, 5, 8], fov: 50 }}
            shadows
            gl={{ antialias: true, alpha: true }}
          >
            <Scene isVisible={isInView} />
          </Canvas>
        </motion.div>

        {/* Skill legend below canvas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3"
        >
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#12121a] border border-[#1e1e2e]"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: skill.color }}
              />
              <span className="text-xs text-[#8888a0]">{skill.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Instruction hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="text-center text-xs text-[#8888a0] mt-4"
        >
          Auto-rotating 3D visualization • Hover bars to explore
        </motion.p>
      </div>
    </section>
  );
}
