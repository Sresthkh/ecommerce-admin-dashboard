"use client";

export default function TestUpdatePage() {
  async function updateProduct() {
    const productId = prompt("Enter Product ID");

    if (!productId) return;

    const res = await fetch(`/api/products?id=${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price: 799,
        stock: 15,
      }),
    });

    const data = await res.json();
    console.log(data);
    alert("Product updated! Check console.");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Test Update Product</h1>
      <button onClick={updateProduct}>
        Update Product
      </button>
    </div>
  );
}
