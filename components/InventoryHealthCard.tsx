type Props = {
  percentage: number;
};

export default function InventoryHealthCard({ percentage }: Props) {
  let label = "Healthy";
  let color = "#16a34a";

  if (percentage < 40) {
    label = "Critical";
    color = "#dc2626";
  } else if (percentage < 70) {
    label = "Moderate";
    color = "#f59e0b";
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <p style={{ color: "#666", marginBottom: "8px" }}>
        Inventory Health
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <strong style={{ fontSize: "28px", color }}>
          {percentage}%
        </strong>
        <span
          style={{
            background: color,
            color: "#fff",
            padding: "4px 10px",
            borderRadius: "999px",
            fontSize: "12px",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
