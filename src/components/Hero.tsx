"use client";

import { motion } from "framer-motion";
import { ArrowDown, Send } from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "./Icons";
import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const socialLinks = [
  { icon: GitHubIcon, href: "https://github.com/llazdll", label: "GitHub" },
  { icon: LinkedInIcon, href: "https://www.linkedin.com/in/mohammad-hossein-azadi-56162b416/", label: "LinkedIn" },
  { icon: Send, href: "https://t.me/lllAzdlll", label: "Telegram" },
];

function Sparkle({ delay, x, y }: { delay: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-[#6c63ff]"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3,
      }}
    />
  );
}

const sparkles = [
  { delay: 0, x: "10%", y: "20%" },
  { delay: 0.5, x: "85%", y: "15%" },
  { delay: 1, x: "70%", y: "70%" },
  { delay: 1.5, x: "15%", y: "75%" },
  { delay: 2, x: "50%", y: "10%" },
  { delay: 0.3, x: "30%", y: "85%" },
  { delay: 0.8, x: "90%", y: "50%" },
  { delay: 1.2, x: "5%", y: "45%" },
  { delay: 1.8, x: "60%", y: "30%" },
  { delay: 0.6, x: "25%", y: "40%" },
  { delay: 2.2, x: "75%", y: "85%" },
  { delay: 0.4, x: "45%", y: "60%" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern"
    >
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#6c63ff]/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00d4aa]/8 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-[#6c63ff]/5 rounded-full blur-[80px]"
        />
      </div>

      {/* Sparkle particles */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((s, i) => (
          <Sparkle key={i} {...s} />
        ))}
      </div>

      {/* 3D Element - right side */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-64 h-64 lg:w-80 lg:h-80 opacity-70 hidden md:block pointer-events-none">
        <Hero3D />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-[#6c63ff]/10 text-[#6c63ff] border border-[#6c63ff]/20">
            Data Scientist & Developer
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6"
        >
          Hi, I&apos;m{" "}
          <span className="text-gradient">Mohammad Hossein</span>
          <br />
          <span className="text-gradient">Azadi</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-[#8888a0] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I turn data into insights and ideas into elegant digital experiences.
          Proficient in Python, R, and modern web technologies.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="#work"
            className="px-8 py-3.5 bg-[#6c63ff] hover:bg-[#5a52e0] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#6c63ff]/25 hover:-translate-y-0.5"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 border border-[#1e1e2e] hover:border-[#6c63ff]/50 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-5"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-[#12121a] border border-[#1e1e2e] text-[#8888a0] hover:text-[#6c63ff] hover:border-[#6c63ff]/30 transition-colors"
              aria-label={social.label}
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={20} className="text-[#8888a0]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
