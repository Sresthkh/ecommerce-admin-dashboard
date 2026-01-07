"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category?: string;
  imageUrl?: string;
};

export default function ProductTableClient({
  products,
}: {
  products: Product[];
}) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(productId: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    const res = await fetch(`/api/products?id=${productId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete product");
      return;
    }

    // ✅ Refresh dashboard after delete
    router.refresh();
  }

  return (
    <div>
      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "300px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginBottom: "12px",
        }}
      />

      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0 10px",
          }}
        >
          <thead>
            <tr>
              <th align="left">Image</th>
              <th align="left">Name</th>
              <th align="left">Price</th>
              <th align="left">Stock</th>
              <th align="left">Status</th>
              <th align="left">Category</th>
              <th align="left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product._id}
                style={{
                  background:
                    product.stock === 0
                      ? "#fef2f2" // 🔴 out of stock
                      : product.stock <= 5
                      ? "#fff7ed" // 🟠 low stock
                      : "#ffffff",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                <td style={{ padding: "12px" }}>
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      width={50}
                      height={50}
                      style={{
                        borderRadius: "6px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </td>

                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.stock}</td>

                {/* ✅ STATUS BADGE RESTORED */}
                <td>
                  <StockBadge stock={product.stock} />
                </td>

                <td>{product.category || "-"}</td>

                <td>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Link
                      href={`/admin/edit/${product._id}`}
                      style={{
                        background: "#2563eb",
                        color: "#fff",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        textDecoration: "none",
                        fontSize: "13px",
                      }}
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      style={{
                        background: "#dc2626",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* =========================
   STOCK STATUS BADGE
========================= */
function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return <span className="badge badge-low">Out of Stock</span>;
  }

  if (stock <= 5) {
    return <span className="badge badge-low">Low</span>;
  }

  if (stock <= 15) {
    return <span className="badge badge-medium">Medium</span>;
  }

  return <span className="badge badge-high">In Stock</span>;
}
