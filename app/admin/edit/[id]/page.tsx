"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    imageUrl: "",
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
        imageUrl: data.imageUrl || "",
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

  /* ================= IMAGE UPDATE ================= */
  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setImageUploading(true);

      const imgForm = new FormData();
      imgForm.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: imgForm,
      });

      const data = await res.json();

      setFormData((prev) => ({
        ...prev,
        imageUrl: data.url,
      }));
    } catch (err) {
      alert("Image upload failed");
    } finally {
      setImageUploading(false);
    }
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

      {/* ===== CURRENT IMAGE ===== */}
      {formData.imageUrl && (
        <img
          src={formData.imageUrl}
          alt="Product"
          width={140}
          style={{
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        />
      )}

      {/* ===== IMAGE UPLOAD ===== */}
      <label>Update Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {imageUploading && <p>Uploading image...</p>}

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

      <button type="submit" disabled={saving || imageUploading}>
        {saving ? "Updating..." : "Update Product"}
      </button>
    </form>
  );
}
