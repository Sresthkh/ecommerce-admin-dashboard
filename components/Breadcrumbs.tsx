"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div style={{ marginBottom: "16px", fontSize: "14px", color: "#6b7280" }}>
      <Link href="/admin" style={{ color: "#2563eb", textDecoration: "none" }}>
        Admin
      </Link>

      {segments.slice(1).map((seg, i) => {
        const href = "/admin/" + segments.slice(1, i + 2).join("/");
        return (
          <span key={i}>
            {" / "}
            <Link
              href={href}
              style={{ color: "#2563eb", textDecoration: "none" }}
            >
              {seg.replace("-", " ")}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
