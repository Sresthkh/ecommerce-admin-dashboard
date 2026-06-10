"use client";

export function StatCardSkeleton() {
  return (
    <div
      style={{
        background: "#e5e7eb",
        height: "90px",
        borderRadius: "8px",
        animation: "pulse 1.5s infinite",
      }}
    />
  );
}

export function ChartSkeleton() {
  return (
    <div
      style={{
        background: "#e5e7eb",
        height: "340px",
        borderRadius: "8px",
        animation: "pulse 1.5s infinite",
      }}
    />
  );
}

export function TableSkeleton() {
  return (
    <div style={{ marginTop: "20px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          style={{
            background: "#e5e7eb",
            height: "54px",
            borderRadius: "6px",
            marginBottom: "10px",
            animation: "pulse 1.5s infinite",
          }}
        />
      ))}
    </div>
  );
}
