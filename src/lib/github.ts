import type { PortfolioProject } from "@/types/portfolio";
import { parsePortfolioMd } from "@/lib/portfolio-parser";

const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "llazdll";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers: HeadersInit = GITHUB_TOKEN
  ? {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    }
  : { "Content-Type": "application/json" };

async function fetchFromGitHub<T>(path: string): Promise<T> {
  const res = await fetch(`${GITHUB_API_BASE}${path}`, {
    next: { revalidate: 3600 },
    headers,
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  default_branch: string;
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const repos = await fetchFromGitHub<GitHubRepo[]>(
    `/users/${GITHUB_USERNAME}/repos`
  );
  return repos.filter((repo) => !repo.name.startsWith("."));
}

export async function fetchPortfolioFile(
  repoName: string
): Promise<string | null> {
  try {
    const data = await fetchFromGitHub<{      content: string;
      encoding: string;
      name: string;
    }>(`/repos/${GITHUB_USERNAME}/${repoName}/contents/portfolio.md`);

    if (data.content && data.encoding === "base64") {
      return Buffer.from(data.content, "base64").toString("utf-8");
    }

    return null;
  } catch {
    return null;
  }
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const repos = await fetchGitHubRepos();
  const projects: PortfolioProject[] = [];

  const batchSize = 5;
  for (let i = 0; i < repos.length; i += batchSize) {
    const batch = repos.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(async (repo): Promise<PortfolioProject | null> => {
        const raw = await fetchPortfolioFile(repo.name);
        if (!raw) return null;

        const project = parsePortfolioMd(raw, {
          repoName: repo.name,
          repoUrl: repo.html_url,
          stars: repo.stargazers_count,
        });

        if (!project) return null;

        const enriched: PortfolioProject = {
          title: project.title,
          description: project.description,
          category: project.category,
          stack: project.stack,
          technologies: project.technologies,
          features: project.features,
          role: project.role,
          year: project.year,
          status: project.status,
          featured: project.featured,
          slug: project.slug,
          image: project.image,
          demo: project.demo,
          github: project.github || repo.html_url,
          stars: project.stars ?? repo.stargazers_count,
        };

        return enriched;
      })
    );

    projects.push(
      ...batchResults.filter((p): p is PortfolioProject => p !== null)
    );
  }

  return projects;
}
