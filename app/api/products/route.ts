import { NextResponse } from "next/server";
import Product from "@/lib/models/Product";
import { connectDB } from "@/lib/db";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    const products = await Product.find().lean();
    return NextResponse.json(products);
  }

  const product = await Product.findById(id).lean();
  return NextResponse.json(product);
}

export async function POST(req: Request) {
  await connectDB();

  try {
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

export async function PUT(req: Request) {
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
  await Product.findByIdAndUpdate(id, body);

  return NextResponse.json({ success: true });
}
