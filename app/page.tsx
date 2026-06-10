import Link from "next/link";

export default function Home() {
  return (
    <main className="theme-home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "20px" }}>
      <div className="card" style={{ padding: "60px 40px", maxWidth: "600px", width: "100%" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "16px" }} className="accent-gradient">
          Nexus Commerce
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "18px", marginBottom: "40px" }}>
          Next-generation admin dashboard built with Next.js and MongoDB.
        </p>
        <Link href="/login" className="btn" style={{ fontSize: "16px", padding: "14px 32px" }}>
          Go to Login
        </Link>
      </div>
    </main>
  );
}
