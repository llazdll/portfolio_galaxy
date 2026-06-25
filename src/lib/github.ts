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
  const url = `${GITHUB_API_BASE}${path}`;
  const res = await fetch(url, {
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
  const url = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos`;

  console.log("[GitHub] Fetching repositories:", url);

  const repos = await fetchFromGitHub<GitHubRepo[]>(
    `/users/${GITHUB_USERNAME}/repos`
  );

  console.log("[GitHub] Repositories response:", {
    status: 200,
    count: repos.length,
  });

  return repos.filter((repo) => !repo.name.startsWith("."));
}

export async function fetchPortfolioFile(
  repoName: string
): Promise<string | null> {
  const url = `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/contents/portfolio.md`;

  console.log("[GitHub] Checking portfolio file:", { repo: repoName, url });

  try {
    const res = await fetch(url, { next: { revalidate: 3600 }, headers });

    console.log("[GitHub] portfolio.md response:", {
      repo: repoName,
      status: res.status,
      exists: res.ok,
    });

    if (!res.ok) {
      if (res.status === 404) {
        console.log("[Portfolio] Ignored - no portfolio.md:", repoName);
      } else {
        console.error("[GitHub API Error]", {
          repo: repoName,
          status: res.status,
          statusText: res.statusText,
        });
      }
      return null;
    }

    const data = (await res.json()) as {
      content: string;
      encoding: string;
      name: string;
    };

    if (data.content && data.encoding === "base64") {
      console.log("[Portfolio] Found portfolio.md:", repoName);
      return Buffer.from(data.content, "base64").toString("utf-8");
    }

    console.log("[Portfolio] Ignored - no portfolio.md:", repoName);
    return null;
  } catch (error) {
    console.error("[GitHub API Error]", error);
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
        console.log("[Portfolio] Processing repo:", repo.name);

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

  console.log("[Portfolio] Final projects:", projects);

  return projects;
}
