"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, Briefcase, Download } from "lucide-react";

const education = [
  {
    year: "2023",
    title: "Bachelor's in Statistics",
    institution: "IKIU (Imam Khomeini International University)",
    description: "Focused on statistical analysis, probability theory, and applied mathematics.",
  },
  {
    year: "2023",
    title: "Associate Degree — Python",
    institution: "Computer Science Program",
    description: "Comprehensive study of Python programming, algorithms, and data structures.",
  },
  {
    year: "2023",
    title: "Associate Degree — R Language",
    institution: "Computer Science Program",
    description: "Specialized in R for statistical computing, data analysis, and visualization.",
  },
];

const certifications = [
  { year: "2022", title: "HTML 5", issuer: "SoloLearn" },
  { year: "2022", title: "CSS 3", issuer: "SoloLearn" },
  { year: "2022", title: "JavaScript", issuer: "SoloLearn" },
  { year: "2022", title: "Responsive Web Development", issuer: "SoloLearn" },
];

const skills = [
  { name: "Python", level: 90 },
  { name: "R", level: 85 },
  { name: "Next.js", level: 88 },
  { name: "React", level: 85 },
  { name: "TypeScript", level: 80 },
  { name: "JavaScript", level: 90 },
  { name: "SQL", level: 75 },
  { name: "Data Analysis", level: 92 },
  { name: "Machine Learning", level: 78 },
  { name: "UI/UX Design", level: 72 },
];

export default function Resume() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="resume" className="py-24 sm:py-32 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#1e1e2e] to-transparent" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#6c63ff] text-sm font-semibold tracking-widest uppercase">
            Resume
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-5">
            Education & Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6c63ff] to-[#00d4aa] mx-auto rounded-full mb-8" />
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#6c63ff] hover:bg-[#5a52e0] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#6c63ff]/25 hover:-translate-y-0.5"
          >
            <Download size={18} />
            Download CV
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left column — Education & Certifications */}
          <div>
            {/* Education Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#6c63ff]/10 flex items-center justify-center">
                  <GraduationCap size={20} className="text-[#6c63ff]" />
                </div>
                <h3 className="text-xl font-bold">Education</h3>
              </div>

              <div className="relative pl-8 border-l-2 border-[#1e1e2e]">
                {education.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                    className="relative mb-8 last:mb-0"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[#0a0a0f] border-2 border-[#6c63ff]">
                      <div className="absolute inset-1 rounded-full bg-[#6c63ff]" />
                    </div>
                    <span className="text-xs font-semibold text-[#6c63ff] mb-1 block">
                      {item.year}
                    </span>
                    <h4 className="font-bold text-sm mb-0.5">{item.title}</h4>
                    <p className="text-xs text-[#00d4aa] mb-1.5">{item.institution}</p>
                    <p className="text-xs text-[#8888a0] leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 flex items-center justify-center">
                  <Award size={20} className="text-[#00d4aa]" />
                </div>
                <h3 className="text-xl font-bold">Certifications</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                    whileHover={{ y: -3 }}
                    className="p-4 rounded-xl bg-[#12121a] border border-[#1e1e2e] hover:border-[#00d4aa]/30 transition-colors"
                  >
                    <span className="text-xs text-[#00d4aa] font-semibold">{cert.year}</span>
                    <h4 className="font-semibold text-sm mt-1">{cert.title}</h4>
                    <p className="text-xs text-[#8888a0]">{cert.issuer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column — Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#6c63ff]/10 flex items-center justify-center">
                <Briefcase size={20} className="text-[#6c63ff]" />
              </div>
              <h3 className="text-xl font-bold">Technical Skills</h3>
            </div>

            <div className="space-y-5">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-[#8888a0]">{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#1e1e2e] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + i * 0.08, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-[#6c63ff] to-[#00d4aa]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
