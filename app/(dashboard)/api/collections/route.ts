import { connectToDB } from "@/lib/db/mongoDB";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/products";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unathorizes", { status: 404 });
    }
    const { title, image, discription } = await req.json();

    if (!title || !image || !discription) {
      return new NextResponse("Fill all fields", { status: 400 });
    }
    await connectToDB();

    const existCollection = await Collection.findOne({ title });

    if (existCollection) {
      
      return new NextResponse("Collection already exist", { status: 400 });
    }

    const collection = await Collection.create({ title, image, discription });
    await collection.save()

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("[Collection_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const GET = async () => {
  try {
    await connectToDB()

    const collections = await Collection.find().populate({path: 'products', model: Product}).sort({ createdAt: "desc" });

    return NextResponse.json(collections, { status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMECRE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Contect-Type"
    }
     });
    
  } catch (error) {
    console.log("[Collection_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
export const dynamic = "force-dynamic";