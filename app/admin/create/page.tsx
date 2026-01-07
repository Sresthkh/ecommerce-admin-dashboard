"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { productSchema } from "@/lib/validators/product";

export default function CreateProductPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  function nextStep() {
    setStep((prev) => prev + 1);
  }

  function prevStep() {
    setStep((prev) => prev - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;

    console.log("✅ Submit clicked");
    console.log("📷 Image file:", imageFile);

    if (!imageFile) {
      alert("Please upload a product image");
      return;
    }

    try {
      setLoading(true);

      /* ========= 1️⃣ IMAGE UPLOAD ========= */
      const imgForm = new FormData();
      imgForm.append("file", imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: imgForm,
      });

      if (!uploadRes.ok) {
        throw new Error("Image upload failed");
      }

      const uploadData = await uploadRes.json();
      console.log("☁️ Uploaded Image URL:", uploadData.url);

      /* ========= 2️⃣ ZOD VALIDATION ========= */
      const parsed = productSchema.safeParse({
        name: formData.name,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category || undefined,
        description: formData.description || undefined,
        imageUrl: uploadData.url,
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

      /* ========= 3️⃣ CREATE PRODUCT ========= */
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        throw new Error("Product creation failed");
      }

      alert("✅ Product created successfully");
      router.push("/admin");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Check console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
      <h1>Create Product</h1>

      {step === 1 && (
        <>
          <label>Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Price *</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <button type="button" onClick={nextStep}>
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <label>Stock *</label>
          <input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            required
          />

          <label>Category</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
          />

          <button type="button" onClick={prevStep}>
            Back
          </button>
          <button type="button" onClick={nextStep}>
            Next
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <label>Product Image *</label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) =>
              setImageFile(e.target.files ? e.target.files[0] : null)
            }
          />

          <button type="button" onClick={prevStep}>
            Back
          </button>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Product"}
          </button>
        </>
      )}
    </form>
  );
}
