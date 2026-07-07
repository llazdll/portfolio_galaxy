import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Certificate {
  name: string;
  pdfPath: string;
  verifyUrl: string;
  issuer?: string;
  date?: string;
}

// Helper to extract filename without extension
function getBaseName(filename: string): string {
  return filename.replace(/\.pdf$/i, "");
}

// Helper to find matching verify URL from links.json
// Uses flexible matching: exact match first, then partial match (PDF name contains link key or vice versa)
function findVerifyUrl(pdfName: string, links: Record<string, string>): string {
  // Exact match
  if (links[pdfName]) {
    return links[pdfName];
  }

  // Try partial match: check if any link key is contained in PDF name
  for (const [linkKey, linkUrl] of Object.entries(links)) {
    if (pdfName.includes(linkKey) || linkKey.includes(pdfName)) {
      return linkUrl;
    }
  }

  return "";
}

// Helper to determine issuer from certificate name
function getIssuerFromName(name: string): string {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("power bi")) return "Power BI";
  if (lowerName.includes("tableau")) return "Tableau";
  if (lowerName.includes("spss")) return "IBM";
  if (lowerName.includes("ikiu") || lowerName.includes("deep learning")) return "IKIU";
  return "DataCamp";
}

// Helper to determine year from certificate name
function getDateFromName(name: string): string {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("updated- july 2022")) return "2022";
  return "2024";
}

export async function GET() {
  try {
    // Read PDF files from public/certificate directory
    const certificateDir = path.join(process.cwd(), "public", "certificate");
    const pdfFiles = fs.readdirSync(certificateDir).filter((file) => file.toLowerCase().endsWith(".pdf"));

    // Read links.json for verify URLs
    const linksPath = path.join(process.cwd(), "public", "links.json");
    let links: Record<string, string> = {};
    if (fs.existsSync(linksPath)) {
      const linksContent = fs.readFileSync(linksPath, "utf-8");
      links = JSON.parse(linksContent);
    }

    // Build certificates list from actual PDF files
    const certificates: Certificate[] = pdfFiles.map((filename) => {
      const name = getBaseName(filename);
      const verifyUrl = findVerifyUrl(name, links);

      return {
        name,
        pdfPath: `/certificate/${filename}`,
        verifyUrl,
        issuer: getIssuerFromName(name),
        date: getDateFromName(name),
      };
    });

    return NextResponse.json({ certificates }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch certificates:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}