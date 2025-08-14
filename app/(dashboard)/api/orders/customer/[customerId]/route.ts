import { connectToDB } from "@/lib/db/mongoDB";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/products";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { customerId: string } }
) => {
  try {
    await connectToDB();
    const orders = await Order.find({
      customerClerkId: params.customerId,
    }).populate({ path: "products.product", model: Product });

    return NextResponse.json(orders, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMECRE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Contect-Type",
      },
    });
    
  } catch (error) {
    console.log("[customerId_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
