"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ScoreRing from "@/components/ScoreRing";
import { FileSearch, History, TrendingUp, Award, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

interface Analysis {
  _id: string;
  fileName: string;
  score: number;
  atsScore: number;
  skills: string[];
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/history")
        .then((r) => r.json())
        .then((data) => {
          setAnalyses(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 64px)" }}>
        <Loader2 size={32} color="#8b5cf6" style={{ animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const avgScore = analyses.length > 0 ? Math.round(analyses.reduce((s, a) => s + a.score, 0) / analyses.length) : 0;
  const bestScore = analyses.length > 0 ? Math.max(...analyses.map((a) => a.score)) : 0;
  const allSkills = [...new Set(analyses.flatMap((a) => a.skills))].slice(0, 8);

  const stats = [
    { icon: FileSearch, label: "Total Analyses", value: analyses.length, color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.1)" },
    { icon: TrendingUp, label: "Average Score", value: avgScore, color: "#3b82f6", bg: "rgba(59, 130, 246, 0.1)", suffix: "/100" },
    { icon: Award, label: "Best Score", value: bestScore, color: "#10b981", bg: "rgba(16, 185, 129, 0.1)", suffix: "/100" },
  ];

  return (
    <div className="hero-bg" style={{ minHeight: "calc(100vh - 64px)", padding: "2.5rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "Sora, Inter, sans-serif", fontSize: "2rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.375rem" }}>
            Welcome back, {session?.user?.name?.split(" ")[0]} 👋
          </h1>
          <p style={{ color: "#64748b" }}>Here&apos;s an overview of your resume performance</p>
        </div>

        {/* Stats cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="glass" style={{ borderRadius: "1.25rem", padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: 48, height: 48, borderRadius: "0.875rem", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={22} color={s.color} />
                </div>
                <div>
                  <div style={{ fontSize: "1.875rem", fontWeight: 800, color: "#f1f5f9", lineHeight: 1, fontFamily: "Sora, Inter, sans-serif" }}>
                    {s.value}{s.suffix ?? ""}
                  </div>
                  <div style={{ fontSize: "0.8125rem", color: "#64748b", marginTop: "0.25rem" }}>{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main content */}
        <div style={{ display: "grid", gridTemplateColumns: analyses.length > 0 ? "1fr 320px" : "1fr", gap: "1.5rem" }}>
          {/* Recent analyses */}
          <div className="glass" style={{ borderRadius: "1.25rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h2 style={{ fontWeight: 700, color: "#f1f5f9", fontSize: "1.125rem" }}>
                Recent Analyses
              </h2>
              {analyses.length > 0 && (
                <Link href="/history" style={{ color: "#a78bfa", textDecoration: "none", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  View all <ArrowRight size={13} />
                </Link>
              )}
            </div>

            {analyses.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <FileSearch size={40} color="#334155" style={{ margin: "0 auto 1rem" }} />
                <p style={{ color: "#64748b", marginBottom: "1.25rem" }}>No analyses yet. Upload your first resume!</p>
                <Link href="/analyze" className="btn-primary" style={{ textDecoration: "none" }}>
                  Analyze Resume <ArrowRight size={15} />
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {analyses.slice(0, 5).map((a) => (
                  <div key={a._id} className="glass" style={{ borderRadius: "0.875rem", padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                    <ScoreRing score={a.score} size={60} strokeWidth={6} label="" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, color: "#f1f5f9", fontSize: "0.9375rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {a.fileName}
                      </div>
                      <div style={{ color: "#64748b", fontSize: "0.8125rem", marginTop: "0.2rem" }}>
                        ATS: {a.atsScore}/100 · {new Date(a.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <span className={`chip ${a.score >= 70 ? "chip-green" : a.score >= 50 ? "chip-blue" : "chip-red"}`}>
                      {a.score >= 70 ? "Good" : a.score >= 50 ? "Fair" : "Needs Work"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top skills */}
          {analyses.length > 0 && (
            <div className="glass" style={{ borderRadius: "1.25rem", padding: "1.5rem", alignSelf: "start" }}>
              <h2 style={{ fontWeight: 700, color: "#f1f5f9", fontSize: "1.125rem", marginBottom: "1.25rem" }}>
                Your Top Skills
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {allSkills.map((skill) => (
                  <span key={skill} className="chip chip-purple">{skill}</span>
                ))}
                {allSkills.length === 0 && <p style={{ color: "#64748b", fontSize: "0.875rem" }}>Skills will appear here after analysis.</p>}
              </div>

              <div style={{ marginTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem" }}>
                <Link href="/analyze" className="btn-primary" style={{ textDecoration: "none", width: "100%", justifyContent: "center" }}>
                  New Analysis <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
