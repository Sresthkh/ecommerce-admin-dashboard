"use client";

type Product = {
  name: string;
  stock: number;
  sales: number;
};

export default function SmartInventoryInsights({
  products,
}: {
  products: Product[];
}) {
  const highRisk = products.filter(
    (p) => p.sales >= 20 && p.stock <= 10
  );

  const overstocked = products.filter(
    (p) => p.sales < 5 && p.stock >= 20
  );

  const healthy = products.filter(
    (p) =>
      !(
        (p.sales >= 20 && p.stock <= 10) ||
        (p.sales < 5 && p.stock >= 20)
      )
  );

  return (
    <div
      style={{
        background: "#111827",
        color: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "30px",
      }}
    >
      <h3 style={{ marginBottom: "12px" }}>
        🤖 Smart Inventory Insights
      </h3>

      <ul style={{ lineHeight: "1.8" }}>
        {highRisk.length > 0 && (
          <li style={{ color: "#f87171" }}>
            ⚠ {highRisk.length} product
            {highRisk.length > 1 ? "s are" : " is"} at high risk of stockout.
          </li>
        )}

        {overstocked.length > 0 && (
          <li style={{ color: "#60a5fa" }}>
            🧊 {overstocked.length} product
            {overstocked.length > 1 ? "s are" : " is"} overstocked and selling slowly.
          </li>
        )}

        {highRisk.length === 0 && overstocked.length === 0 && (
          <li style={{ color: "#4ade80" }}>
            ✅ Inventory looks healthy with no immediate risks.
          </li>
        )}

        {healthy.length > 0 && (
          <li style={{ color: "#a7f3d0" }}>
            📦 {healthy.length} product
            {healthy.length > 1 ? "s are" : " is"} operating within normal levels.
          </li>
        )}
      </ul>
    </div>
  );
}
