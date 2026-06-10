import Link from "next/link";
import React from "react";

function navItem(href: string, label: string) {
  return (
    <Link
      href={href}
      style={{
        padding: "12px 16px",
        borderRadius: "8px",
        textDecoration: "none",
        color: "var(--text-main)",
        display: "block",
        transition: "all 0.2s ease",
        fontWeight: 500,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "var(--bg-input)";
        e.currentTarget.style.color = "var(--accent-color)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = "var(--text-main)";
      }}
    >
      {label}
    </Link>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-admin" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar - Minimalist */}
      <aside
        style={{
          width: "260px",
          backgroundColor: "var(--bg-card)",
          borderRight: "1px solid var(--border-color)",
          padding: "32px 24px",
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: "40px", padding: "0 8px" }}>
          <h2 className="accent-gradient" style={{ fontSize: "1.75rem", fontWeight: "800" }}>
            Nexus
          </h2>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {navItem("/admin", "Dashboard")}
          {navItem("/admin/create", "Create Product")}
          {navItem("/admin/create-admin", "Admin Access")}
        </nav>

        <form action="/api/auth/signout" method="POST" style={{ marginTop: "auto" }}>
          <button
            style={{
              width: "100%",
              marginTop: "30px",
              background: "transparent",
              border: "1px solid var(--border-color)",
              color: "var(--text-muted)",
              padding: "12px",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "var(--bg-input)";
              e.currentTarget.style.color = "var(--text-main)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            Sign Out
          </button>
        </form>
      </aside>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          padding: "40px 60px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
