"use client";

import { useRef, useState, useMemo, useCallback, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { motion, useInView } from "framer-motion";
import {
  SiPython,
  SiMysql,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiTensorflow,
  SiJupyter,
  SiPytorch,
  SiR,
  SiNextdotjs,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { IoLogoTableau } from "react-icons/io5";
import { FaChartBar,FaDatabase } from "react-icons/fa";

// ─── Icon mapping ────────────────────────────────────────────────────────────

const skillIcons: Record<string, IconType> = {
  Python: SiPython,
  R: SiR,
  SQL: FaDatabase,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  "Scikit-learn": SiScikitlearn,
  PyTorch: SiPytorch,
  TensorFlow: SiTensorflow,
  PowerBI: FaChartBar,
  Tableau: IoLogoTableau,
  Jupyter: SiJupyter,
  "Next.js": SiNextdotjs,
};

// Brand colors for icons
const skillIconColors: Record<string, string> = {
  Python: "#3776AB",
  R: "#276DC3",
  SQL: "#CC2927",
  Pandas: "#150458",
  NumPy: "#4DABCF",
  "Scikit-learn": "#F89939",
  PyTorch: "#EE4C2C",
  TensorFlow: "#FF6F00",
  PowerBI: "#F2C811",
  Tableau: "#E97627",
  Jupyter: "#F37626",
  "Next.js": "#ffffff",
};
// ─── Data ────────────────────────────────────────────────────────────────────

const skillCategories = [
  {
    name: "Data & Analytics",
    color: "#6c63ff",
    skills: [
      { name: "Python", level: 90 },
      { name: "R", level: 85 },
      { name: "SQL", level: 75 },
      { name: "Pandas", level: 92 },
      { name: "NumPy", level: 88 },
    ],
  },
  {
    name: "Machine Learning",
    color: "#00d4aa",
    skills: [
      { name: "Scikit-learn", level: 82 },
      { name: "PyTorch", level: 78 },
      { name: "TensorFlow", level: 80 },
      { name: "Jupyter", level: 88 },
    ],
  },
  {
    name: "Visualization",
    color: "#ffd93d",
    skills: [
      { name: "PowerBI", level: 72 },
      { name: "Tableau", level: 70 },
    ],
  },
  {
    name: "Web Development",
    color: "#4fc3f7",
    skills: [{ name: "Next.js", level: 88 }],
  },
];

// Flatten skills with category info for 3D positioning
const allSkills = skillCategories.flatMap((cat, catIdx) =>
  cat.skills.map((skill, skillIdx) => ({
    ...skill,
    category: cat.name,
    categoryColor: cat.color,
    categoryIndex: catIdx,
    skillIndex: skillIdx,
  }))
);

// ─── StarField ───────────────────────────────────────────────────────────────

function StarField() {
  const count = 200;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const { positions, scales } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
      scl[i] = Math.random() * 0.08 + 0.02;
    }
    return { positions: pos, scales: scl };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      const t = state.clock.elapsedTime;
      dummy.position.set(
        positions[i * 3] + Math.sin(t * 0.05 + i) * 0.3,
        positions[i * 3 + 1] + Math.cos(t * 0.03 + i * 0.7) * 0.3,
        positions[i * 3 + 2]
      );
      const s = scales[i] * (1 + Math.sin(t * 2 + i * 1.3) * 0.3);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </instancedMesh>
  );
}

// ─── Central Core ────────────────────────────────────────────────────────────

function CentralCore() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (meshRef.current) {
      const s = 0.55 + Math.sin(t * 1.2) * 0.05;
      meshRef.current.scale.set(s, s, s);
    }
    if (glowRef.current) {
      const gs = 0.8 + Math.sin(t * 0.8) * 0.1;
      glowRef.current.scale.set(gs, gs, gs);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.15 + Math.sin(t * 1.5) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial
          color="#6c63ff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Wireframe icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#6c63ff"
          emissive="#6c63ff"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Inner solid sphere */}
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color="#00d4aa"
          emissive="#00d4aa"
          emissiveIntensity={1.2}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Point lights */}
      <pointLight color="#6c63ff" intensity={3} distance={10} />
      <pointLight color="#00d4aa" intensity={1.5} distance={6} position={[0, 0, 0]} />
    </group>
  );
}

// ─── Orbital Ring ────────────────────────────────────────────────────────────

function OrbitalRing({
  radius,
  color,
  speed,
  tilt,
}: {
  radius: number;
  color: string;
  speed: number;
  tilt: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = tilt;
    ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.1) * 0.05;
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 8, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.25} />
    </mesh>
  );
}

// ─── Skill Node ──────────────────────────────────────────────────────────────

function SkillNode({
  name,
  level,
  color,
  orbitRadius,
  angle,
  tilt,
  orbitSpeed,
  categoryIndex,
  isVisible,
}: {
  name: string;
  level: number;
  color: string;
  orbitRadius: number;
  angle: number;
  tilt: number;
  orbitSpeed: number;
  categoryIndex: number;
  isVisible: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const baseScale = (level / 100) * 0.35 + 0.15;
  const currentScale = useRef(0);
  const entryProgress = useRef(0);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Entry animation
    if (isVisible && entryProgress.current < 1) {
      entryProgress.current = Math.min(1, entryProgress.current + 0.012);
    }
    const entryEase = 1 - Math.pow(1 - entryProgress.current, 3);

    // Orbital position
    const orbitAngle = angle + t * orbitSpeed;
    const x = Math.cos(orbitAngle) * orbitRadius;
    const z = Math.sin(orbitAngle) * orbitRadius;
    const y = Math.sin(orbitAngle * 2 + categoryIndex) * tilt;

    meshRef.current.position.set(x, y, z);

    // Scale animation
    const s = hovered ? baseScale * 1.6 : baseScale;
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, s * entryEase, 0.08);
    meshRef.current.scale.set(currentScale.current, currentScale.current, currentScale.current);

    // Wobble
    const wobble = Math.sin(t * 2 + angle * 3) * 0.02;
    if (!hovered) {
      meshRef.current.scale.y = currentScale.current + wobble;
    }

    // Glow
    if (glowRef.current) {
      const glowMat = glowRef.current.material as THREE.MeshBasicMaterial;
      const targetOpacity = hovered ? 0.35 : 0.08;
      glowMat.opacity = THREE.MathUtils.lerp(glowMat.opacity, targetOpacity * entryEase, 0.1);
      const glowScale = hovered ? baseScale * 2.5 : baseScale * 1.8;
      const gs = THREE.MathUtils.lerp(glowRef.current.scale.x, glowScale * entryEase, 0.08);
      glowRef.current.scale.set(gs, gs, gs);
      glowRef.current.position.set(x, y, z);
    }

    // Look at camera slightly
    meshRef.current.lookAt(meshRef.current.position.x * 0.5, meshRef.current.position.y, meshRef.current.position.z * 0.5);
  });

  const handlePointerOver = useCallback(() => {
    setHovered(true);
    document.body.style.cursor = "pointer";
  }, []);

  const handlePointerOut = useCallback(() => {
    setHovered(false);
    document.body.style.cursor = "auto";
  }, []);

  return (
    <>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[baseScale, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      {/* Main node */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[baseScale, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.2 : 0.4}
          metalness={0.2}
          roughness={0.3}
          transparent
          opacity={0.92}
        />
        {/* Hover label */}
        {hovered && (
          <Html
            center
            distanceFactor={6}
            style={{ pointerEvents: "none" }}
          >
            <div className="skill-tooltip">
              <span className="skill-name">
                {(() => {
                  const Icon = skillIcons[name];
                  return Icon ? <Icon className="skill-icon-inline" /> : null;
                })()}
                {name}
              </span>
              <span className="skill-level">{level}%</span>
            </div>
          </Html>
        )}
      </mesh>
    </>
  );
}

// ─── Energy Lines ────────────────────────────────────────────────────────────

function EnergyLines({
  skills,
  orbitRadius,
  tilt,
  orbitSpeed,
  color,
  isVisible,
}: {
  skills: typeof allSkills;
  orbitRadius: number;
  tilt: number;
  orbitSpeed: number;
  color: string;
  isVisible: boolean;
}) {
  const linesRef = useRef<THREE.Group>(null);

  const linePoints = useMemo(() => {
    if (skills.length < 2) return [];
    const points: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < skills.length; i++) {
      const next = (i + 1) % skills.length;
      const a = skills[i];
      const b = skills[next];
      const angleA = (a.skillIndex / skills.length) * Math.PI * 2;
      const angleB = (b.skillIndex / skills.length) * Math.PI * 2;
      points.push([
        new THREE.Vector3(
          Math.cos(angleA) * orbitRadius,
          Math.sin(angleA * 2 + a.categoryIndex) * tilt,
          Math.sin(angleA) * orbitRadius
        ),
        new THREE.Vector3(
          Math.cos(angleB) * orbitRadius,
          Math.sin(angleB * 2 + b.categoryIndex) * tilt,
          Math.sin(angleB) * orbitRadius
        ),
      ]);
    }
    return points;
  }, [skills, orbitRadius, tilt]);

  useFrame((state) => {
    if (!linesRef.current || !isVisible) return;
    const t = state.clock.elapsedTime;
    linesRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      if (mesh.material && "opacity" in mesh.material) {
        (mesh.material as THREE.LineBasicMaterial).opacity =
          0.12 + Math.sin(t * 1.5 + i * 0.8) * 0.08;
      }
    });
  });

  return (
    <group ref={linesRef}>
      {linePoints.map(([start, end], i) => (
        <Line
          key={i}
          points={[start, end]}
          color={color}
          lineWidth={1}
          transparent
          opacity={0.15}
        />
      ))}
    </group>
  );
}

// ─── Scene ───────────────────────────────────────────────────────────────────

function Scene({ isVisible }: { isVisible: boolean }) {
  const orbitRadii = [2.5, 4.0, 5.2, 6.3];
  const orbitTilts = [0.3, 0.5, 0.2, 0.4];
  const orbitSpeeds = [0.15, -0.1, 0.08, -0.06];

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 8, 5]} intensity={0.5} />

      <CentralCore />
      <StarField />

      {/* Orbital rings */}
      {skillCategories.map((cat, i) => (
        <OrbitalRing
          key={cat.name}
          radius={orbitRadii[i]}
          color={cat.color}
          speed={orbitSpeeds[i]}
          tilt={orbitTilts[i]}
        />
      ))}

      {/* Energy lines per category */}
      {skillCategories.map((cat, i) => (
        <EnergyLines
          key={`lines-${cat.name}`}
          skills={allSkills.filter((s) => s.category === cat.name)}
          orbitRadius={orbitRadii[i]}
          tilt={orbitTilts[i]}
          orbitSpeed={orbitSpeeds[i]}
          color={cat.color}
          isVisible={isVisible}
        />
      ))}

      {/* Skill nodes */}
      {allSkills.map((skill) => {
        const catSkills = skillCategories[skill.categoryIndex].skills;
        const angle = (skill.skillIndex / catSkills.length) * Math.PI * 2;
        return (
          <SkillNode
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={skill.categoryColor}
            orbitRadius={orbitRadii[skill.categoryIndex]}
            angle={angle}
            tilt={orbitTilts[skill.categoryIndex]}
            orbitSpeed={orbitSpeeds[skill.categoryIndex]}
            categoryIndex={skill.categoryIndex}
            isVisible={isVisible}
          />
        );
      })}

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={5}
        maxDistance={18}
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

// ─── Loading Fallback ────────────────────────────────────────────────────────

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-[#6c63ff]/30 border-t-[#6c63ff] rounded-full animate-spin" />
        <span className="text-[#8888a0] text-sm">Loading 3D scene...</span>
      </div>
    </div>
  );
}

// ─── Category Card ───────────────────────────────────────────────────────────

function CategoryCard({
  category,
  index,
  isVisible,
}: {
  category: (typeof skillCategories)[0];
  index: number;
  isVisible: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.6 + index * 0.12 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative rounded-xl p-4 sm:p-5 bg-[#12121a]/80 backdrop-blur-sm border border-[#1e1e2e] hover:border-[#2a2a3e] transition-all duration-300 overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${category.color}15, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{
              backgroundColor: `${category.color}20`,
              color: category.color,
            }}
          >
            {category.name.charAt(0)}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#ededed] leading-tight">
              {category.name}
            </h4>
            <span className="text-[10px] text-[#8888a0]">
              {category.skills.length} skill{category.skills.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Skills list with icons */}
        <div className="space-y-2.5">
          {category.skills.map((skill) => {
            const Icon = skillIcons[skill.name];
            const iconColor = skillIconColors[skill.name] || category.color;
            return (
              <div key={skill.name} className="group/skill">
                <div className="flex items-center gap-2 mb-1">
                  {Icon && (
                    <Icon
                      size={14}
                      className="shrink-0 transition-transform duration-200 group-hover/skill:scale-125"
                      style={{ color: iconColor }}
                    />
                  )}
                  <span className="text-[11px] text-[#ededed] font-medium truncate">
                    {skill.name}
                  </span>
                  <span
                    className="text-[10px] font-mono ml-auto shrink-0"
                    style={{ color: category.color }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div className="h-1 bg-[#1e1e2e] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.8 + index * 0.1 + Math.random() * 0.3,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export default function Skills3D() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6c63ff]/[0.03] rounded-full blur-[200px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#00d4aa]/[0.03] rounded-full blur-[150px]" />
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
            My <span className="text-gradient">Tech Galaxy</span>
          </h2>
          <p className="text-[#8888a0] max-w-2xl mx-auto leading-relaxed">
            Drag to explore • Hover nodes for details • Each orbit represents a skill category
          </p>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-[450px] sm:h-[550px] md:h-[600px] rounded-2xl overflow-hidden border border-[#1e1e2e] bg-[#08080d]/90 backdrop-blur-sm relative"
        >
          <Suspense fallback={<LoadingFallback />}>
            <Canvas
              camera={{ position: [0, 6, 12], fov: 45 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
              frameloop="always"
              style={{ background: "transparent" }}
            >
              <Scene isVisible={isInView} />
            </Canvas>
          </Suspense>

          {/* Corner badges */}
          <div className="absolute top-4 left-4 flex gap-2 pointer-events-none">
            {skillCategories.map((cat) => (
              <div
                key={cat.name}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a0a0f]/70 backdrop-blur-sm border border-[#1e1e2e]/50"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-[10px] text-[#8888a0] font-medium">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>

          {/* Interaction hint */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a0a0f]/70 backdrop-blur-sm border border-[#1e1e2e]/50 pointer-events-none">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8888a0" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            <span className="text-[10px] text-[#8888a0]">Drag to rotate • Scroll to zoom</span>
          </div>
        </motion.div>

        {/* Category cards below canvas */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((cat, i) => (
            <CategoryCard
              key={cat.name}
              category={cat}
              index={i}
              isVisible={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
