import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";

/* =========================
   GET PRODUCTS (READ)
========================= */
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const product = await Product.findById(id);
      if (!product) {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(product);
    }

    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

/* =========================
   CREATE PRODUCT
========================= */
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const product = await Product.create(body);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Product creation failed" },
      { status: 500 }
    );
  }
}

/* =========================
   UPDATE PRODUCT
========================= */
export async function PUT(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Product ID missing" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { message: "Product update failed" },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE PRODUCT ✅ (FIX)
========================= */
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Product ID missing" },
        { status: 400 }
      );
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Product deletion failed" },
      { status: 500 }
    );
  }
}
