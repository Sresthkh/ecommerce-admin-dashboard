import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  stock: number;
};

export default function LowStockAlertPanel({
  products,
}: {
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        marginBottom: "30px",
        borderLeft: "6px solid #dc2626",
      }}
    >
      <h3 style={{ marginBottom: "12px", color: "#dc2626" }}>
        ⚠️ Low Stock Alerts ({products.length})
      </h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map((p) => (
          <li
            key={p._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <div>
              <strong>{p.name}</strong>
              <div style={{ fontSize: "13px", color: "#666" }}>
                Stock remaining: {p.stock}
              </div>
            </div>

            <Link
              href={`/admin/edit/${p._id}`}
              style={{
                background: "#dc2626",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "13px",
                textDecoration: "none",
              }}
            >
              Restock
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
