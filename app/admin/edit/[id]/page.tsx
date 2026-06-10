"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });

  /* ================= FETCH EXISTING PRODUCT ================= */
  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products?id=${id}`);
      const data = await res.json();

      setFormData({
        name: data.name || "",
        price: data.price?.toString() || "",
        stock: data.stock?.toString() || "",
        category: data.category || "",
        description: data.description || "",
      });

      setLoading(false);
    }

    if (id) fetchProduct();
  }, [id]);

  /* ================= INPUT HANDLER ================= */
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }



  /* ================= UPDATE PRODUCT ================= */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const res = await fetch(`/api/products?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      alert("Failed to update product");
    }

    setSaving(false);
  }

  if (loading) return <p>Loading product...</p>;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
      <h1>Edit Product</h1>

      {/* ===== (Image removed) ===== */}

      <label>Name</label>
      <input name="name" value={formData.name} onChange={handleChange} />

      <label>Price</label>
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
      />

      <label>Stock</label>
      <input
        name="stock"
        type="number"
        value={formData.stock}
        onChange={handleChange}
      />

      <label>Category</label>
      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
      />

      <label>Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <button type="submit" disabled={saving}>
        {saving ? "Updating..." : "Update Product"}
      </button>
    </form>
  );
}
