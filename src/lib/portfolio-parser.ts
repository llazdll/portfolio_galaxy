import { parseFrontmatter } from "./yaml-frontmatter";
import type { PortfolioProject } from "@/types/portfolio";

interface ParseOptions {
  repoName?: string;
  repoUrl?: string;
  stars?: number;
}

export function parsePortfolioMd(
  content: string,
  options: ParseOptions = {}
): PortfolioProject | null {
  const parsed = parseFrontmatter(content);

  console.log("[Parser] Raw content:", content);
  console.log("[Parser] Parsed frontmatter:", parsed);

  if (!parsed) return null;

  const data = parsed.data as Record<string, unknown>;

  // Required fields — existence of portfolio.md is the only gate
  const title = typeof data.title === "string" ? data.title : "";
  const description = typeof data.description === "string" ? data.description : "";
  const category = typeof data.category === "string" ? data.category : "";

  console.log("[Parser] Extracted fields:", { title, description, category });

  if (!title || !description || !category) return null;

  const technologies = Array.isArray(data.technologies)
    ? data.technologies.filter((t): t is string => typeof t === "string")
    : [];

  const features = Array.isArray(data.features)
    ? data.features.filter((f): f is string => typeof f === "string")
    : [];

  return {
    title,
    description,
    category,
    stack: technologies,
    technologies,
    features,
    role: typeof data.role === "string" ? data.role : undefined,
    year: typeof data.year === "string" || typeof data.year === "number"
      ? data.year
      : undefined,
    status: typeof data.status === "string" ? data.status : undefined,
    featured: data.featured === true,
    slug: typeof data.slug === "string" ? data.slug : undefined,
    image: typeof data.image === "string" ? data.image : undefined,
    demo: typeof data.demo === "string" ? data.demo : undefined,
    github: typeof data.github === "string" ? data.github : options.repoUrl || "",
    stars: typeof options.stars === "number" ? options.stars : undefined,
  };
}
