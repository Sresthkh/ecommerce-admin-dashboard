"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin",
    });
  }

  return (
    <div className="theme-login" style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
      <div className="card" style={{ maxWidth: "400px", width: "100%", padding: "40px" }}>
        <h1 className="accent-gradient" style={{ textAlign: "center", marginBottom: "30px", fontSize: "28px" }}>Admin Login</h1>

        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading} style={{ width: "100%", marginTop: "10px" }}>
            {loading ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
