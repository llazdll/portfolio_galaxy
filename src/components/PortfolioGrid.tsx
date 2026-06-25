"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioProject } from "@/types/portfolio";
import ProjectCard from "./ProjectCard";

export default function PortfolioGrid() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load projects");
        return res.json();
      })
      .then((data: PortfolioProject[]) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl bg-[#12121a] border border-[#1e1e2e] overflow-hidden animate-pulse"
          >
            <div className="h-48 bg-[#1e1e2e]" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-[#1e1e2e] rounded w-2/3" />
              <div className="h-4 bg-[#1e1e2e] rounded w-full" />
              <div className="h-4 bg-[#1e1e2e] rounded w-4/5" />
              <div className="flex gap-2">
                <div className="h-6 bg-[#1e1e2e] rounded w-16" />
                <div className="h-6 bg-[#1e1e2e] rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-[#ff6b6b] text-sm">{error}</p>
        <p className="text-[#8888a0] text-xs mt-2">Please try again later.</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#8888a0] text-sm">
          No portfolio projects found. Add a{" "}
          <code className="text-[#6c63ff]">portfolio.md</code> file to your
          GitHub repositories.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
              activeCategory === cat
                ? "bg-[#6c63ff] text-white"
                : "bg-[#12121a] text-[#8888a0] border border-[#1e1e2e] hover:border-[#6c63ff]/30 hover:text-[#ededed]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.github}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
