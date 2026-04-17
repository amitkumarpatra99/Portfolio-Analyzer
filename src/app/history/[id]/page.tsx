"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Target, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import ScoreRing from "@/components/ScoreRing";

interface AnalysisDetail {
  _id: string;
  fileName: string;
  resumeText: string;
  score: number;
  atsScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  skills: string[];
  missingKeywords: string[];
  improvements: string[];
  createdAt: string;
  jobMatch?: {
    jobDescription: string;
    matchScore: number;
    matchedSkills: string[];
    missingSkills: string[];
    tailoringSuggestions: string[];
    summary: string;
  };
}

export default function AnalysisDetailPage() {
  const params = useParams() as { id?: string };
  const router = useRouter();
  const invalidId = !params?.id;
  const [analysis, setAnalysis] = useState<AnalysisDetail | null>(null);
  const [loading, setLoading] = useState(!invalidId);
  const [error, setError] = useState(invalidId ? "Invalid report ID." : "");

  useEffect(() => {
    if (invalidId) return;

    fetch(`/api/history/${params.id}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Unable to load report.");
        }
        setAnalysis(data);
      })
      .catch((err) => setError(err.message || "Unable to load report."))
      .finally(() => setLoading(false));
  }, [invalidId, params.id]);

  const handleGoBack = () => router.push("/history");

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 64px)" }}>
        <Loader2 size={32} color="#8b5cf6" style={{ animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="hero-bg" style={{ minHeight: "calc(100vh - 64px)", padding: "2.5rem 1.5rem" }}>
        <div className="glass" style={{ maxWidth: 720, margin: "0 auto", padding: "2rem" }}>
          <button onClick={handleGoBack} className="btn-secondary" style={{ marginBottom: "1.25rem" }}>
            <ArrowLeft size={16} /> Back to history
          </button>
          <p style={{ color: "#fca5a5", fontWeight: 600 }}>{error || "Report not found."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-bg" style={{ minHeight: "calc(100vh - 64px)", padding: "2.5rem 1.5rem" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <button onClick={handleGoBack} className="btn-secondary" style={{ marginBottom: "1rem" }}>
              <ArrowLeft size={16} /> Back
            </button>
            <h1 style={{ fontFamily: "Sora, Inter, sans-serif", fontSize: "2rem", fontWeight: 700, color: "#f1f5f9" }}>
              Analysis details
            </h1>
            <p style={{ color: "#64748b" }}>Deep dive into your saved resume analysis.</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <span className="chip chip-blue">{new Date(analysis.createdAt).toLocaleString()}</span>
            <span className="chip chip-purple">{analysis.fileName}</span>
          </div>
        </div>

        <div className="glass" style={{ borderRadius: "1.5rem", padding: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              <span style={{ color: "#64748b", fontSize: "0.75rem" }}>Overall score</span>
              <ScoreRing score={analysis.score} size={100} label="" />
            </div>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              <span style={{ color: "#64748b", fontSize: "0.75rem" }}>ATS score</span>
              <ScoreRing score={analysis.atsScore} size={100} color="#06b6d4" label="" />
            </div>
            {analysis.jobMatch && (
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <span style={{ color: "#64748b", fontSize: "0.75rem" }}>Job match</span>
                <ScoreRing score={analysis.jobMatch.matchScore} size={100} color="#10b981" label="" />
              </div>
            )}
          </div>
        </div>

        <div className="glass" style={{ borderRadius: "1.5rem", padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem" }}>Summary</h2>
          <p style={{ color: "#94a3b8", lineHeight: 1.75 }}>{analysis.summary}</p>
        </div>

        <div style={{ display: "grid", gap: "1rem" }}>
          <div className="glass" style={{ borderRadius: "1.25rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontWeight: 700, color: "#f1f5f9" }}>Strengths</h3>
              <CheckCircle size={18} color="#10b981" />
            </div>
            <ul style={{ display: "grid", gap: "0.75rem" }}>
              {analysis.strengths.map((item) => (
                <li key={item} style={{ color: "#94a3b8" }}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="glass" style={{ borderRadius: "1.25rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontWeight: 700, color: "#f1f5f9" }}>Areas to improve</h3>
              <XCircle size={18} color="#ef4444" />
            </div>
            <ul style={{ display: "grid", gap: "0.75rem" }}>
              {analysis.weaknesses.map((item) => (
                <li key={item} style={{ color: "#94a3b8" }}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="glass" style={{ borderRadius: "1.25rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontWeight: 700, color: "#f1f5f9" }}>Improvements</h3>
              <Lightbulb size={18} color="#f59e0b" />
            </div>
            <ul style={{ display: "grid", gap: "0.75rem" }}>
              {analysis.improvements.map((item) => (
                <li key={item} style={{ color: "#94a3b8" }}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="glass" style={{ borderRadius: "1.25rem", padding: "1.5rem" }}>
          <h3 style={{ fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem" }}>Detected skills</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {analysis.skills.map((skill) => (
              <span key={skill} className="chip chip-purple">{skill}</span>
            ))}
          </div>
        </div>

        <div className="glass" style={{ borderRadius: "1.25rem", padding: "1.5rem" }}>
          <h3 style={{ fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem" }}>Missing keywords</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {analysis.missingKeywords.map((keyword) => (
              <span key={keyword} className="chip chip-cyan">{keyword}</span>
            ))}
          </div>
        </div>

        {analysis.jobMatch && (
          <div className="glass" style={{ borderRadius: "1.25rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontWeight: 700, color: "#f1f5f9" }}>Job match details</h3>
              <Target size={18} color="#10b981" />
            </div>
            <p style={{ color: "#94a3b8", marginBottom: "1rem" }}>{analysis.jobMatch.summary}</p>
            <div style={{ display: "grid", gap: "1rem" }}>
              <div>
                <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Matched skills</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {analysis.jobMatch.matchedSkills.map((skill) => (
                    <span key={skill} className="chip chip-green">{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Missing skills</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {analysis.jobMatch.missingSkills.map((skill) => (
                    <span key={skill} className="chip chip-red">{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Tailoring suggestions</p>
                <ul style={{ color: "#94a3b8", display: "grid", gap: "0.5rem" }}>
                  {analysis.jobMatch.tailoringSuggestions.map((suggestion) => (
                    <li key={suggestion}>• {suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
