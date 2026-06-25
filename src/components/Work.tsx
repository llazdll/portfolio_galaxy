"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PortfolioGrid from "./PortfolioGrid";

export default function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6c63ff]/[0.03] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#6c63ff] text-sm font-semibold tracking-widest uppercase">
            Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-5">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-[#8888a0] max-w-2xl mx-auto leading-relaxed">
            A collection of projects I&apos;ve built, sourced from my GitHub
            repositories. Any repository containing a{" "}
            <code className="text-[#6c63ff]">portfolio.md</code> file is
            automatically displayed here.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <PortfolioGrid />
        </motion.div>
      </div>
    </section>
  );
}
