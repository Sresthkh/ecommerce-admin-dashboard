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
  /* ===== Fetch & Normalize MongoDB Data (RSC-safe) ===== */
  let products: any[] = [];
  let dbError = false;
  let dbErrorMessage = "";

  try {
    await connectDB();
    const rawProducts = await Product.find().lean();
    products = rawProducts.map((p: any) => ({
      _id: p._id.toString(),
      name: p.name,
      price: p.price,
      stock: p.stock,
      category: p.category || "General",
      sales: p.sales ?? 0,
      createdAt: new Date(p.createdAt).toISOString(),
    }));
  } catch (error: any) {
    console.error("Failed to fetch products or connect to DB:", error);
    dbError = true;
    dbErrorMessage = error?.message || String(error);
  }

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

      {/* ===== Hero Section ===== */}
      {dbError && (
        <div style={{ background: "rgba(244, 63, 94, 0.15)", border: "1px solid #fb7185", color: "#fb7185", padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
          <strong>⚠️ Database Connection Error:</strong> MONGODB_URI is not configured correctly. Please add it to your Vercel Environment Variables.
          <div style={{ marginTop: "8px", fontSize: "12px", fontFamily: "monospace", color: "var(--text-muted)" }}>
            Details: {dbErrorMessage}
          </div>
        </div>
      )}

      <div className="card" style={{ padding: "40px", marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "32px", marginBottom: "8px" }} className="accent-gradient">
            Dashboard Overview
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "16px" }}>
            Monitor products, stock, and inventory health
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <InventoryHealthCard percentage={healthScore} />
        </div>
      </div>

      {/* ===== Analytics Cards Grid ===== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
          marginBottom: "40px",
        }}
      >
        <StatCard title="Total Products" value={totalProducts} />
        <StatCard title="Total Stock" value={totalStock} />
        <StatCard title="Categories" value={categories} />
        <StatCard title="Low Stock Items" value={lowStockCount} />
      </div>

      {/* ===== Inventory Alerts ===== */}
      {lowStockCount > 0 && (
        <LowStockAlertPanel products={lowStockProducts} />
      )}

      {/* ===== Charts Grid ===== */}
      <DashboardCharts products={products} />
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "40px" }}>
        <StockTrendChart products={products} />
        <InventoryRiskPanel products={products} />
      </div>
      
      <SmartInventoryInsights products={products} />

      {/* ===== Legend ===== */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          margin: "40px 0 16px",
          fontSize: "13px",
          color: "var(--text-muted)",
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
      <div className="card" style={{ padding: "24px" }}>
        <h2 style={{ marginBottom: "20px" }}>Products Inventory</h2>
        <ProductTableClient products={products} />
      </div>
    </div>
  );
}

/* ===== Helper Component ===== */

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div
      className="card card-hover"
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px"
      }}
    >
      <p style={{ color: "var(--text-muted)", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>{title}</p>
      <strong style={{ fontSize: "36px", color: "var(--text-main)", fontWeight: 800 }}>{value}</strong>
    </div>
  );
}
