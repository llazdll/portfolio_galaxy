import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohammad Hossein Azadi | Data Scientist & Developer",
  description: "Portfolio of Mohammad Hossein Azadi — Data Scientist, Software Developer, and Creative Professional specializing in web development, data analysis, and digital experiences.",
  keywords: ["Data Scientist", "Developer", "Next.js", "Python", "R", "Web Development", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col gradient-bg">{children}</body>
    </html>
  );
}
