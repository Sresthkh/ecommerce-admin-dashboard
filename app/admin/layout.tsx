"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItem = (href: string, label: string) => {
    const active = pathname === href;

    return (
      <Link
        href={href}
        style={{
          padding: "10px 12px",
          borderRadius: "8px",
          color: active ? "#fff" : "#d1d5db",
          background: active ? "var(--primary)" : "transparent",
          textDecoration: "none",
          fontWeight: active ? 600 : 400,
        }}
      >
        {label}
      </Link>
    );
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "230px",
          background: "#111827",
          color: "#fff",
          padding: "20px",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <h2 style={{ marginBottom: "24px" }}>Admin Panel</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {navItem("/admin", "Dashboard")}
          {navItem("/admin/create", "Create Product")}
          {navItem("/admin/create-admin", "Create Admin")}
        </nav>

        <form action="/api/auth/signout" method="POST" style={{ marginTop: "auto" }}>
          <button
            className="button"
            style={{
              width: "100%",
              marginTop: "30px",
              background: "#374151",
              color: "#fff",
            }}
          >
            Logout
          </button>
        </form>
      </aside>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          padding: "30px",
          background: "var(--bg-main)",
        }}
      >
        {children}
      </main>
    </div>
  );
}
