"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Folder } from "lucide-react";
import { GitHubIcon } from "./Icons";

const categories = ["All", "Web", "Data", "Design"];

const projects = [
  {
    title: "Ketabyar",
    description:
      "A full-stack platform for book management built with Next.js, TypeScript, Prisma, and Supabase. Features authentication, CRUD operations, and responsive design.",
    category: "Web",
    tags: ["Next.js", "TypeScript", "Prisma", "Supabase"],
    liveUrl: "https://ketabyar.vercel.app",
    githubUrl: "https://github.com/llazdll/ketab-yar",
    gradient: "from-[#6c63ff] to-[#00d4aa]",
  },
  {
    title: "SPY",
    description:
      "A web application with interactive features and modern UI design showcasing creative development skills.",
    category: "Web",
    tags: ["React", "JavaScript", "CSS"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-[#ff6b6b] to-[#ffd93d]",
  },
  {
    title: "AZD Restaurant",
    description:
      "Restaurant website design with menu showcase, reservation system, and elegant visual presentation.",
    category: "Design",
    tags: ["Web Design", "UI/UX", "Responsive"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-[#00d4aa] to-[#6c63ff]",
  },
  {
    title: "Nike Clone",
    description:
      "A pixel-perfect recreation of the Nike landing page with smooth animations and responsive layout.",
    category: "Web",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-[#ff8a5c] to-[#ff6b6b]",
  },
  {
    title: "Data Analysis Dashboard",
    description:
      "Interactive data visualization dashboard built with Python and R for statistical analysis and reporting.",
    category: "Data",
    tags: ["Python", "R", "Pandas", "ggplot2"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-[#a855f7] to-[#6c63ff]",
  },
  {
    title: "Quote Generator",
    description:
      "A dynamic quote generator application with API integration and beautiful animated transitions.",
    category: "Web",
    tags: ["React", "API", "Animation"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-[#ffd93d] to-[#ff8a5c]",
  },
  {
    title: "Notebook App",
    description:
      "A digital notebook application with rich text editing, organization features, and cloud sync.",
    category: "Web",
    tags: ["React", "Firebase", "CRUD"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-[#00d4aa] to-[#a855f7]",
  },
  {
    title: "Tic-Tac-Toe",
    description:
      "An interactive tic-tac-toe game with AI opponent, score tracking, and smooth animations.",
    category: "Web",
    tags: ["JavaScript", "HTML", "CSS"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-[#6c63ff] to-[#ff6b6b]",
  },
];

export default function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-24 sm:py-32 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#1e1e2e] to-transparent" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#6c63ff] text-sm font-semibold tracking-widest uppercase">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-5">
            Featured Work
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6c63ff] to-[#00d4aa] mx-auto rounded-full" />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-3 mb-12 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#6c63ff] text-white shadow-lg shadow-[#6c63ff]/20"
                  : "bg-[#12121a] border border-[#1e1e2e] text-[#8888a0] hover:text-white hover:border-[#6c63ff]/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative rounded-2xl bg-[#12121a] border border-[#1e1e2e] hover:border-[#6c63ff]/30 overflow-hidden transition-all duration-300"
            >
              {/* Project thumbnail placeholder */}
              <div
                className={`h-44 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300 flex items-center justify-center`}
              >
                <Folder size={40} className="text-white/40" />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 group-hover:text-[#6c63ff] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-[#8888a0] leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-lg bg-[#1e1e2e] text-[#8888a0]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3">
                  {project.liveUrl !== "#" && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[#6c63ff] hover:text-[#8b83ff] transition-colors"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl !== "#" && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[#8888a0] hover:text-white transition-colors"
                    >
                      <GitHubIcon size={14} />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
