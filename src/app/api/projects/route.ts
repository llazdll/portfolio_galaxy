import { NextResponse } from "next/server";
import { getPortfolioProjects } from "@/lib/github";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET() {
  try {
    const projects = await getPortfolioProjects();
    console.log("[API] Projects found:", projects.length);
    console.log("[API] Project titles:", projects.map(p => p.title));
    return NextResponse.json(projects);
  } catch (error) {
    console.error("[API] Failed to fetch portfolio projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio projects", details: String(error) },
      { status: 500 }
    );
  }
}
