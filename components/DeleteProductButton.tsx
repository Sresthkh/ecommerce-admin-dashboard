"use client";

export default function DeleteProductButton({
  id,
}: {
  id: string;
}) {
  function handleDelete() {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    const form = document.createElement("form");
    form.method = "POST";
    form.action = `/api/products?id=${id}`;

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "_method";
    input.value = "DELETE";

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  }

  return (
    <button
      onClick={handleDelete}
      style={{
        background: "#dc2626",
        color: "#fff",
        border: "none",
        padding: "6px 10px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
      }}
    >
      Delete
    </button>
  );
}
