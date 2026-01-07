import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";

import Breadcrumbs from "@/components/Breadcrumbs";
import DashboardCharts from "@/components/DashboardCharts";
import StockTrendChart from "@/components/StockTrendChart";
import InventoryRiskPanel from "@/components/InventoryRiskPanel";
import SmartInventoryInsights from "@/components/SmartInventoryInsights";
import InventoryHealthCard from "@/components/InventoryHealthCard";
import LowStockAlertPanel from "@/components/LowStockAlertPanel";
import ProductTableClient from "@/components/ProductTableClient";

export const metadata = {
  title: "Admin Dashboard | Product Management",
  description: "Manage products, stock, and inventory efficiently",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await connectDB();

  /* ===== Fetch & Normalize MongoDB Data (RSC-safe) ===== */
  const rawProducts = await Product.find().lean();

  const products = rawProducts.map((p: any) => ({
    _id: p._id.toString(),
    name: p.name,
    price: p.price,
    stock: p.stock,
    category: p.category || "General",
    sales: p.sales ?? 0,
    imageUrl: p.imageUrl || "", // ✅ FIX: forward imageUrl
    createdAt: new Date(p.createdAt).toISOString(),
  }));

  /* ===== Metrics ===== */
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const categories = new Set(products.map((p) => p.category)).size;

  const lowStockProducts = products.filter((p) => p.stock <= 5);
  const lowStockCount = lowStockProducts.length;

  const healthScore =
    totalProducts === 0
      ? 0
      : Math.round(
          (products.reduce((sum, p) => {
            if (p.stock > 15) return sum + 1;
            if (p.stock > 5) return sum + 0.7;
            return sum + 0.2;
          }, 0) /
            totalProducts) *
            100
        );

  return (
    <div>
      {/* ===== Breadcrumbs ===== */}
      <Breadcrumbs />

      {/* ===== Page Header ===== */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ fontSize: "26px", marginBottom: "6px" }}>
          Dashboard Overview
        </h1>
        <p style={{ color: "#666" }}>
          Monitor products, stock, and inventory health
        </p>
      </div>

      {/* ===== Analytics Cards ===== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <InventoryHealthCard percentage={healthScore} />
        <StatCard title="Total Products" value={totalProducts} />
        <StatCard title="Total Stock" value={totalStock} />
        <StatCard title="Categories" value={categories} />
        <StatCard title="Low Stock Items" value={lowStockCount} />
      </div>

      {/* ===== Inventory Alerts ===== */}
      {lowStockCount > 0 && (
        <LowStockAlertPanel products={lowStockProducts} />
      )}

      {/* ===== Charts ===== */}
      <DashboardCharts products={products} />
      <StockTrendChart products={products} />
      <InventoryRiskPanel products={products} />
      <SmartInventoryInsights products={products} />

      {/* ===== Legend ===== */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "10px",
          fontSize: "13px",
          color: "#555",
        }}
      >
        <span>
          <span className="badge badge-high">In Stock</span> &gt; 15
        </span>
        <span>
          <span className="badge badge-medium">Medium</span> 6–15
        </span>
        <span>
          <span className="badge badge-low">Low</span> ≤ 5
        </span>
      </div>

      {/* ===== Products Table ===== */}
      <h2 style={{ margin: "30px 0 12px" }}>Products</h2>
      <ProductTableClient products={products} />
    </div>
  );
}

/* ===== Helper Component ===== */

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div
      className="card-hover"
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      <p style={{ color: "#666", marginBottom: "8px" }}>{title}</p>
      <strong style={{ fontSize: "28px" }}>{value}</strong>
    </div>
  );
}
