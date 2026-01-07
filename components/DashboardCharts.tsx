"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#f59e0b", "#7c3aed"];

export default function DashboardCharts({ products }: { products: any[] }) {
  /* ===== Empty State ===== */
  if (!products || products.length === 0) {
    return (
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "10px",
          marginBottom: "40px",
          textAlign: "center",
          color: "#555",
        }}
      >
        <h3 style={{ fontSize: "18px" }}>No analytics yet 📊</h3>
        <p style={{ marginTop: "8px" }}>
          Charts will appear once products are added.
        </p>
      </div>
    );
  }

  /* ===== Bar Chart Data ===== */
  const barData = products.map((p) => ({
    id: p._id.toString(), // unique key
    label: `${p.name} (${p.category || "General"})`,
    stock: p.stock,
  }));

  /* ===== Pie Chart Data ===== */
  const categoryMap: Record<string, number> = {};
  products.forEach((p) => {
    if (!p.category) return;
    categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
  });

  const pieData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "30px",
        marginBottom: "40px",
      }}
    >
      {/* ===== Stock Bar Chart ===== */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}>
        <h3 style={{ marginBottom: "10px" }}>Stock per Product</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="label" hide />
            <YAxis />
            <Tooltip content={<CustomBarTooltip />} />
            <Bar dataKey="stock" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ===== Category Pie Chart ===== */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}>
        <h3 style={{ marginBottom: "10px" }}>Category Distribution</h3>

        {pieData.length === 0 ? (
          <p style={{ color: "#777" }}>No category data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

/* ===== Custom Tooltip ===== */
function CustomBarTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const { label, stock } = payload[0].payload;

    return (
      <div
        style={{
          background: "#111",
          color: "#fff",
          padding: "8px 12px",
          borderRadius: "6px",
          fontSize: "13px",
        }}
      >
        <strong>{label}</strong>
        <div>Stock: {stock}</div>
      </div>
    );
  }
  return null;
}
