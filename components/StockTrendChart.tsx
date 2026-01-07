"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StockTrendChart({
  products,
}: {
  products: {
    createdAt: string;
    stock: number;
  }[];
}) {
  // Group products by date
  const dailyStockMap: Record<string, number> = {};

  products.forEach((p) => {
    const date = new Date(p.createdAt).toLocaleDateString();
    dailyStockMap[date] = (dailyStockMap[date] || 0) + p.stock;
  });

  const trendData = Object.entries(dailyStockMap).map(
    ([date, stock]) => ({
      date,
      stock,
    })
  );

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>
        📈 Inventory Stock Trend
      </h3>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={trendData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="stock"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
