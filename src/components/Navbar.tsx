"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { BrainCircuit, LayoutDashboard, History, FileSearch, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = session
    ? [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/analyze", label: "Analyze", icon: FileSearch },
        { href: "/history", label: "History", icon: History },
      ]
    : [];

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(8, 11, 20, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "0.625rem",
              background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BrainCircuit size={18} color="white" />
          </div>
          <span style={{ fontFamily: "Sora, Inter, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            Resume<span className="gradient-text">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} className="desktop-nav">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.625rem",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: active ? "#f1f5f9" : "#64748b",
                  background: active ? "rgba(139, 92, 246, 0.12)" : "transparent",
                  transition: "all 0.2s",
                }}
              >
                <Icon size={15} />
                {link.label}
              </Link>
            );
          })}

          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="btn-secondary"
              style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
            >
              <LogOut size={14} />
              Sign Out
            </button>
          ) : (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link href="/auth/login" className="btn-secondary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem", textDecoration: "none" }}>
                Login
              </Link>
              <Link href="/auth/register" className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem", textDecoration: "none" }}>
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", color: "#f1f5f9", cursor: "pointer", display: "none" }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(8, 11, 20, 0.98)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.625rem",
                  textDecoration: "none",
                  color: "#f1f5f9",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
          {session ? (
            <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-secondary" style={{ fontSize: "0.875rem" }}>
              Sign Out
            </button>
          ) : (
            <>
              <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="btn-secondary" style={{ textDecoration: "none", textAlign: "center" }}>Login</Link>
              <Link href="/auth/register" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ textDecoration: "none", textAlign: "center" }}>Get Started</Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
