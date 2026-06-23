"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, BarChart3, Palette } from "lucide-react";

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "10+", label: "Projects Completed" },
  { value: "15+", label: "Technologies" },
  { value: "500+", label: "Code Commits" },
];

const highlights = [
  { icon: Code2, title: "Web Development", desc: "Building modern web apps with React & Next.js" },
  { icon: Database, title: "Data Analysis", desc: "Extracting insights with Python, R & SQL" },
  { icon: BarChart3, title: "Data Visualization", desc: "Creating compelling visual stories" },
  { icon: Palette, title: "UI/UX Design", desc: "Crafting elegant digital experiences" },
];

function AnimatedCounter({ value }: { value: string }) {
  return <span className="text-3xl sm:text-4xl font-bold text-gradient">{value}</span>;
}

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    ref.current.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transition: "transform 0.2s ease-out" }}
    >
      {children}
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#6c63ff] text-sm font-semibold tracking-widest uppercase">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-5">
            Know Me Better
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6c63ff] to-[#00d4aa] mx-auto rounded-full" />
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              A passionate <span className="text-gradient">Data scientist</span> based in{" "}
              <span className="text-[#00d4aa]">Karaj, Iran</span>
            </h3>
            <p className="text-[#8888a0] leading-relaxed mb-6">
              I hold a Bachelor&apos;s degree in Statistics from IKIU and associate degrees in
              Computer Science with focus on Python and R. I specialize in transforming
              complex data into actionable insights and building modern web applications
              that make an impact.
            </p>
            <p className="text-[#8888a0] leading-relaxed mb-8">
              From statistical analysis to full-stack development, I bring a unique
              combination of analytical thinking and creative problem-solving to every
              project. I&apos;m passionate about leveraging data to drive decisions and
              creating digital experiences that users love.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <AnimatedCounter value={stat.value} />
                  <p className="text-sm text-[#8888a0] mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Highlight cards with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              >
                <TiltCard className="relative p-5 rounded-2xl bg-[#12121a] border border-[#1e1e2e] hover:border-[#6c63ff]/30 transition-colors group h-full">
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-[#6c63ff]/10 flex items-center justify-center mb-3 group-hover:bg-[#6c63ff]/20 transition-colors"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  >
                    <item.icon size={20} className="text-[#6c63ff]" />
                  </motion.div>
                  <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-[#8888a0] leading-relaxed">{item.desc}</p>
                  {/* Animated gradient border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none p-[1px]">
                    <div className="w-full h-full rounded-2xl border border-transparent bg-gradient-to-br from-[#6c63ff]/20 via-transparent to-[#00d4aa]/20" />
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
