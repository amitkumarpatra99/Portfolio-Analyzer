import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ResumeAI – AI Resume & Portfolio Analyzer",
  description:
    "Upload your resume and get instant AI-powered feedback, scores, keyword analysis, and job match insights to accelerate your career.",
  keywords: ["resume analyzer", "AI resume", "job match", "ATS score", "career tools"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
