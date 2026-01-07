"use client";

import { useState } from "react";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category?: string;
  imageUrl?: string; // ✅ added
};

export default function ProductTableClient({
  products,
}: {
  products: Product[];
}) {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* 🔍 Search Bar */}
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

      {/* ❌ No Search Results */}
      {search && filteredProducts.length === 0 && (
        <p style={{ color: "#777", marginBottom: "10px" }}>
          No results found for "<strong>{search}</strong>"
        </p>
      )}

      {/* 📦 Empty State */}
      {filteredProducts.length === 0 && !search ? (
        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "10px",
            textAlign: "center",
            color: "#555",
          }}
        >
          <h3>No products yet</h3>
          <p style={{ marginTop: "8px" }}>
            Start by creating your first product to populate the dashboard.
          </p>
        </div>
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
              <th align="left">Image</th> {/* ✅ added */}
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
                className="table-row"
                style={{
                  background:
                    product.stock === 0
                      ? "#fef2f2" // 🔴 Out of stock
                      : product.stock <= 5
                      ? "#fff7ed" // 🟠 Low stock
                      : "#ffffff",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                {/* 🖼 Image column */}
                <td style={{ padding: "14px" }}>
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      width={48}
                      height={48}
                      style={{
                        objectFit: "cover",
                        borderRadius: "6px",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                  ) : (
                    <span style={{ color: "#aaa", fontSize: "12px" }}>
                      No Image
                    </span>
                  )}
                </td>

                <td style={{ padding: "14px" }}>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.stock}</td>
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
                        fontSize: "13px",
                        textDecoration: "none",
                      }}
                    >
                      Edit
                    </Link>

                    <form
                      action={`/api/products?id=${product._id}`}
                      method="POST"
                    >
                      <input type="hidden" name="_method" value="DELETE" />
                      <button
                        type="submit"
                        style={{
                          background: "#dc2626",
                          color: "#fff",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                        title="This action cannot be undone"
                      >
                        Delete
                      </button>
                    </form>
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

/* ===== Helpers ===== */

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
