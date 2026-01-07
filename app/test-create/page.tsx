"use client";

export default function TestCreatePage() {
  async function createProduct() {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test Product",
        description: "Created without Postman",
        price: 499,
        stock: 20,
        category: "Test",
        imageUrl: "https://dummyimage.com/300",
        sales: 0,
      }),
    });

    const data = await res.json();
    console.log(data);
    alert("Product created! Check console.");
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Test Create Product</h1>
      <button
        onClick={createProduct}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "black",
          color: "white",
        }}
      >
        Create Product
      </button>
    </div>
  );
}
