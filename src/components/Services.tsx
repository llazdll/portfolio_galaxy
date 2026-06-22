"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Video, Image, Search, BarChart3, Code2 } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Building fast, scalable, and SEO-friendly websites using React, Next.js, and modern web technologies with component-based architecture and server-side rendering.",
    color: "#6c63ff",
  },
  {
    icon: BarChart3,
    title: "Data Science",
    description:
      "Transforming raw data into actionable insights using statistical analysis, machine learning, and predictive modeling with Python, R, and SQL.",
    color: "#00d4aa",
  },
  {
    icon: Video,
    title: "Video Editing",
    description:
      "Professional video editing with transitions, color grading, and advanced effects using Adobe Premiere Pro for polished, engaging content.",
    color: "#ff6b6b",
  },
  {
    icon: Image,
    title: "Photo Editing",
    description:
      "Expert photo retouching, color enhancement, sharpening, and creative effects using Photoshop to bring visual content to life.",
    color: "#ffd93d",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Improving search engine visibility through keyword research, on-page optimization, technical SEO, and data-driven content strategies.",
    color: "#ff8a5c",
  },
  {
    icon: Code2,
    title: "Data Visualization",
    description:
      "Creating compelling charts, dashboards, and interactive visualizations that make complex data understandable and actionable.",
    color: "#a855f7",
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 sm:py-32 relative">
      {/* Subtle divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#1e1e2e] to-transparent" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#6c63ff] text-sm font-semibold tracking-widest uppercase">
            What I Do
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-5">
            My Services
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6c63ff] to-[#00d4aa] mx-auto rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group relative p-7 rounded-2xl bg-[#12121a] border border-[#1e1e2e] hover:border-[#6c63ff]/30 transition-all duration-300 overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${service.color}08 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <service.icon size={24} style={{ color: service.color }} />
                </div>
                <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                <p className="text-sm text-[#8888a0] leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
