import Link from "next/link";
import React from "react";

function navItem(href: string, label: string) {
  return (
    <Link href={href} className="nav-item">
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
          <button className="btn-signout">
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
