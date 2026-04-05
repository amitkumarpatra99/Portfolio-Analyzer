"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BrainCircuit, Zap, Target, BarChart3, ArrowRight, CheckCircle, Star } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    color: "#8b5cf6",
    bg: "rgba(139, 92, 246, 0.1)",
    title: "AI Resume Score",
    desc: "Get an instant 0-100 score with detailed strengths and weaknesses breakdown from our advanced AI.",
  },
  {
    icon: Zap,
    color: "#06b6d4",
    bg: "rgba(6, 182, 212, 0.1)",
    title: "ATS Optimization",
    desc: "Discover missing keywords and skills that ATS systems are looking for. Beat the bots.",
  },
  {
    icon: Target,
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.1)",
    title: "Job Description Match",
    desc: "Paste any job listing and see your exact match %. Get tailoring tips to land the interview.",
  },
];

const steps = [
  { step: "01", title: "Upload Resume", desc: "Drag & drop your PDF resume" },
  { step: "02", title: "AI Analyzes", desc: "Gemini AI processes in seconds" },
  { step: "03", title: "Get Insights", desc: "Receive score, feedback & tips" },
];

export default function LandingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="hero-bg" style={{ minHeight: "calc(100vh - 64px)" }}>
      {/* Hero */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "6rem 1.5rem 4rem",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(139, 92, 246, 0.1)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "9999px",
            padding: "0.375rem 1rem",
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "#a78bfa",
            marginBottom: "2rem",
          }}
        >
          <Star size={13} fill="#a78bfa" /> Powered by Google Gemini AI
        </div>

        <h1
          style={{
            fontFamily: "Sora, Inter, sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem",
            color: "#f1f5f9",
          }}
        >
          Supercharge Your Resume
          <br />
          <span className="gradient-text">with AI Intelligence</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "#64748b",
            maxWidth: 560,
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          Upload your resume and get an instant AI-powered score, ATS feedback, keyword analysis,
          and job match insights - all in seconds.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            className="btn-primary"
            onClick={() => router.push(session ? "/analyze" : "/auth/register")}
            style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}
          >
            Analyze Your Resume <ArrowRight size={18} />
          </button>
          {!session && (
            <Link
              href="/auth/login"
              className="btn-secondary"
              style={{ fontSize: "1rem", padding: "0.875rem 2rem", textDecoration: "none" }}
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Trust badges */}
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            justifyContent: "center",
            marginTop: "3rem",
            flexWrap: "wrap",
          }}
        >
          {["AI-Powered Analysis", "ATS Optimized", "Job Match Score", "Free to Start"].map((t) => (
            <span
              key={t}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                color: "#64748b",
                fontSize: "0.875rem",
              }}
            >
              <CheckCircle size={14} color="#10b981" /> {t}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontFamily: "Sora, Inter, sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "#f1f5f9",
              marginBottom: "0.75rem",
            }}
          >
            Everything You Need to{" "}
            <span className="gradient-text">Land Your Dream Job</span>
          </h2>
          <p style={{ color: "#64748b", fontSize: "1.0625rem" }}>
            Three powerful AI tools in one platform
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="glass glow-purple"
                style={{
                  borderRadius: "1.25rem",
                  padding: "2rem",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "0.875rem",
                    background: f.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <Icon size={24} color={f.color} />
                </div>
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    color: "#f1f5f9",
                    marginBottom: "0.625rem",
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: "0.9375rem" }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "4rem 1.5rem 6rem",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "Sora, Inter, sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
            fontWeight: 700,
            color: "#f1f5f9",
            marginBottom: "3rem",
          }}
        >
          How It Works
        </h2>

        <div
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            flexWrap: "wrap",
            position: "relative",
          }}
        >
          {steps.map((s) => (
            <div key={s.step} style={{ flex: "1 1 200px", maxWidth: 260 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                {s.step}
              </div>
              <h3 style={{ fontWeight: 700, color: "#f1f5f9", marginBottom: "0.5rem" }}>
                {s.title}
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.9rem" }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: "4rem" }}>
          <div
            className="glass"
            style={{
              display: "inline-block",
              borderRadius: "1.5rem",
              padding: "3rem 4rem",
              background:
                "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))",
              border: "1px solid rgba(139, 92, 246, 0.2)",
            }}
          >
            <BrainCircuit size={40} color="#8b5cf6" style={{ marginBottom: "1rem" }} />
            <h3
              style={{
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "#f1f5f9",
                marginBottom: "0.75rem",
              }}
            >
              Ready to stand out?
            </h3>
            <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>
              Join thousands of job seekers who improved their resume score.
            </p>
            <button
              className="btn-primary"
              onClick={() => router.push(session ? "/analyze" : "/auth/register")}
              style={{ fontSize: "1rem", padding: "0.875rem 2.5rem" }}
            >
              Start for Free <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

