"use client";

import type { PortfolioProject } from "@/types/portfolio";
import { ExternalLink, Star } from "lucide-react";

function GithubIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  let colorClass = "bg-[#2a2a3e] text-[#8888a0]";
  if (normalized === "completed") {
    colorClass = "bg-[#0d2818] text-[#4ade80]";
  } else if (normalized === "in progress" || normalized === "in-progress") {
    colorClass = "bg-[#2a2400] text-[#fbbf24]";
  }

  return (
    <span className={`px-2 py-0.5 text-[10px] font-medium rounded-md ${colorClass}`}>
      {status}
    </span>
  );
}

export default function ProjectCard({
  project,
}: {
  project: PortfolioProject;
}) {
  return (
    <div className="group relative rounded-xl bg-[#12121a] border border-[#1e1e2e] hover:border-[#2a2a3e] transition-all duration-300 overflow-hidden flex flex-col">
      {project.featured && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md bg-[#6c63ff]/20 text-[#6c63ff] border border-[#6c63ff]/30">
          <Star size={10} className="fill-[#6c63ff] text-[#6c63ff]" />
          Featured
        </div>
      )}

      {project.image && (
        <div className="relative h-48 overflow-hidden bg-[#0a0a0f]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent" />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-lg font-semibold text-[#ededed] group-hover:text-[#6c63ff] transition-colors">
            {project.title}
          </h3>
          {project.stars !== undefined && project.stars > 0 && (
            <div className="flex items-center gap-1 text-[#8888a0] text-xs shrink-0">
              <Star size={12} className="fill-[#ffd93d] text-[#ffd93d]" />
              {project.stars}
            </div>
          )}
        </div>

        {(project.role || project.year || project.status) && (
          <div className="flex items-center gap-2 text-[11px] text-[#8888a0] mb-2">
            {project.role && <span>{project.role}</span>}
            {project.role && project.year && <span className="text-[#2a2a3e]">·</span>}
            {project.year && <span>{project.year}</span>}
            {(project.role || project.year) && project.status && (
              <span className="text-[#2a2a3e]">·</span>
            )}
            {project.status && <StatusBadge status={project.status} />}
          </div>
        )}

        <p className="text-sm text-[#8888a0] mb-4 line-clamp-2 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-[#1e1e2e] text-[#8888a0] border border-[#2a2a3e]"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-[#1e1e2e] text-[#8888a0]">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        {project.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-transparent text-[#6c63ff]/70 border border-dashed border-[#6c63ff]/30"
              >
                {feature}
              </span>
            ))}
            {project.features.length > 3 && (
              <span className="px-2 py-0.5 text-[10px] font-medium rounded-md text-[#8888a0]/50">
                +{project.features.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex gap-2 mt-auto">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#6c63ff] text-white hover:bg-[#5b54e6] transition-colors"
            >
              <ExternalLink size={12} />
              Live Demo
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#1e1e2e] text-[#8888a0] border border-[#2a2a3e] hover:border-[#6c63ff]/30 hover:text-[#ededed] transition-colors"
          >
            <GithubIcon size={12} />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
