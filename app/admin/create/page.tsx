"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { productSchema } from "@/lib/validators/product";

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const parsed = productSchema.safeParse({
        name: formData.name,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category || undefined,
        description: formData.description || undefined,
        sales: 0,
      });

      if (!parsed.success) {
        alert(
          Object.values(parsed.error.flatten().fieldErrors)
            .flat()
            .join("\n")
        );
        setLoading(false);
        return;
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        throw new Error("Product creation failed");
      }

      alert("Product created successfully");
      router.push("/admin");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Check console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="theme-create">
      <div className="card" style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
        <h1 className="accent-gradient" style={{ marginBottom: "30px", fontSize: "28px" }}>Create New Product</h1>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
            <div>
              <label>Product Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label>Price (₹) *</label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="0.00"
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
            <div>
              <label>Initial Stock *</label>
              <input
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
                placeholder="0"
              />
            </div>
            <div>
              <label>Category</label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Electronics"
              />
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Product details..."
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}>
            <button 
              type="button" 
              onClick={() => router.push("/admin")}
              style={{ background: "transparent", color: "var(--text-main)", border: "1px solid var(--border-color)" }}
            >
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
