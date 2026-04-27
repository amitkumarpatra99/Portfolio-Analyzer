"use client"

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
    <>
      <div className="hero-bg" style={{ minHeight: "calc(100vh - 64px)" }}>
        {/* Hero */}
        <section
          className="hero-section"
        >
          {/* Badge */}
          <div
            className="glass-card"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              borderRadius: "9999px",
              padding: "0.5rem 1.25rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#a78bfa",
              marginBottom: "2rem",
              backdropFilter: "blur(12px)",
            }}
          >
            <Star size={14} fill="#a78bfa" /> Powered by Google Gemini AI
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
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              color: "#64748b",
              maxWidth: 600,
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
            }}
          >
            Upload your resume and get an instant AI-powered score, ATS feedback, keyword analysis,
            and job match insights - all in seconds.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              className="btn-primary btn-lg"
              onClick={() => router.push(session ? "/analyze" : "/auth/register")}
            >
              Analyze Your Resume <ArrowRight size={18} />
            </button>
            {!session && (
              <Link
                href="/auth/login"
                className="btn-secondary btn-lg"
                style={{ textDecoration: "none" }}
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
        <section className="features-section">
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
            <p style={{ color: "#64748b", fontSize: "clamp(1rem, 2vw, 1.125rem)" }}>
              Three powerful AI tools in one platform
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
              maxWidth: 1200,
              margin: "0 auto",
            }}
          >
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="glass-card glow-purple"
                  style={{
                    borderRadius: "1.5rem",
                    padding: "2.5rem",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "default",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px) scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0) scale(1)";
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: `linear-gradient(90deg, ${f.color}, transparent)`,
                    }}
                  />
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "1rem",
                      background: f.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.5rem",
                      border: `1px solid ${f.color}20`,
                    }}
                  >
                    <Icon size={26} color={f.color} />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "#f1f5f9",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: "1rem" }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section className="how-it-works-section">
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
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "2rem",
              maxWidth: 1000,
              margin: "0 auto",
              position: "relative",
            }}
          >
            {steps.map((s, index) => (
              <div key={s.step} className="glass-card" style={{
                borderRadius: "1.25rem",
                padding: "2rem",
                textAlign: "center",
                position: "relative",
                border: "1px solid rgba(139, 92, 246, 0.2)",
              }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: "white",
                    boxShadow: "0 8px 24px rgba(139, 92, 246, 0.3)",
                  }}
                >
                  {s.step}
                </div>
                <h3 style={{
                  fontWeight: 700,
                  color: "#f1f5f9",
                  marginBottom: "0.75rem",
                  fontSize: "1.125rem"
                }}>
                  {s.title}
                </h3>
                <p style={{
                  color: "#64748b",
                  fontSize: "1rem",
                  lineHeight: 1.6
                }}>{s.desc}</p>

                {index < steps.length - 1 && (
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    right: "-1rem",
                    transform: "translateY(-50%)",
                    width: "2rem",
                    height: "2px",
                    background: "linear-gradient(90deg, rgba(139, 92, 246, 0.5), transparent)",
                  }} className="step-connector" />
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: "4rem" }}>
            <div
              className="glass-strong cta-box"
              style={{
                display: "inline-block",
                borderRadius: "1.5rem",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                boxShadow: "0 16px 48px rgba(139, 92, 246, 0.2)",
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
                className="btn-primary btn-lg"
                onClick={() => router.push(session ? "/analyze" : "/auth/register")}
              >
                Start for Free <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </div>
      <style>{`
        .hero-section {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          padding: 6rem 2rem 4rem;
        }
        .features-section {
          padding: 4rem 2rem;
        }
        .how-it-works-section {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          padding: 4rem 2rem 6rem;
        }
        .cta-box {
          padding: 3rem 4rem;
        }

        @media (max-width: 1024px) {
          .hero-section { padding: 5rem 1.5rem 3rem; }
          .features-section { padding: 3rem 1.5rem; }
          .how-it-works-section { padding: 3rem 1.5rem 4rem; }
          .cta-box { padding: 2.5rem 3rem; }
        }

        @media (max-width: 768px) {
          .hero-section { padding: 4rem 1rem 2rem; }
          .features-section { padding: 2rem 1rem; }
          .how-it-works-section { padding: 2rem 1rem 3rem; }
          .cta-box { padding: 2rem 1.5rem; }
          .step-connector { display: none !important; }
        }

        @media (max-width: 480px) {
          .hero-section { padding: 3rem 1rem 1.5rem; }
          .features-section { padding: 1.5rem 1rem; }
          .how-it-works-section { padding: 1.5rem 1rem 2rem; }
          .cta-box { padding: 1.5rem 1rem; }
        }
      `}</style>
    </>
  );
}

