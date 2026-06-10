"use client";

import { useState } from "react";

export default function CreateAdminPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/admin/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Admin created successfully");
      setForm({ name: "", email: "", password: "" });
    } else {
      alert(data.error || "Failed to create admin");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "40px auto",
        background: "#fff",
        padding: "24px",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "16px" }}>
        Create New Admin
      </h1>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <label>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "16px" }}
        />

        <button
          disabled={loading}
          style={{
            width: "100%",
            background: "#000",
            color: "#fff",
            padding: "10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Creating..." : "Create Admin"}
        </button>
      </form>
    </div>
  );
}
