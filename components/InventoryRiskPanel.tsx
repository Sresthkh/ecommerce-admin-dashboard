"use client";

type Product = {
  name: string;
  stock: number;
  sales: number;
};

export default function InventoryRiskPanel({
  products,
}: {
  products: Product[];
}) {
  const risks = products.map((p) => {
    if (p.sales >= 20 && p.stock <= 10)
      return { ...p, status: "High Risk", color: "#dc2626" };

    if (p.sales >= 20 && p.stock > 10)
      return { ...p, status: "Selling Well", color: "#f59e0b" };

    if (p.sales < 5 && p.stock >= 20)
      return { ...p, status: "Overstocked", color: "#2563eb" };

    return { ...p, status: "Healthy", color: "#16a34a" };
  });

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        marginBottom: "30px",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>
        📉 Sales vs Stock Risk Analysis
      </h3>

      <div style={{ display: "grid", gap: "10px" }}>
        {risks.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              borderRadius: "6px",
              background: "#f9fafb",
            }}
          >
            <span>{r.name}</span>
            <span style={{ color: r.color, fontWeight: 600 }}>
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
