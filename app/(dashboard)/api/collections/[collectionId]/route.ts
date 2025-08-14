import { connectToDB } from "@/lib/db/mongoDB";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/products";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {

    await connectToDB();
    const collection = await Collection.findOne({ _id: params.collectionId })
      .populate({ path: "products", model: Product })
      .sort({ createdAt: "desc" });

      

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(collection, { status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMECRE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Contect-Type"
    }
     });
  } catch (error) {
    console.log("[CollectionId_GET", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  console.log("hii");

  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorize", { status: 404 });
    }

    const { title, image, discription } = await req.json();

    if (!title || !image || !discription) {
      return new NextResponse("Fill all fields", { status: 400 });
    }

    await connectToDB();

    const collection = await Collection.findById(params.collectionId);

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 400 }
      );
    }

    const updateCollection = await Collection.findByIdAndUpdate(
      collection._id,
      {
        title,
        image,
        discription,
      },
      { new: true }
    );

    await updateCollection.save();

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("[CollectionId_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorize", { status: 404 });
    }

    await connectToDB();

    const collection = await Collection.findById(params.collectionId);

    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }

    await Collection.findByIdAndDelete(params.collectionId);

    await Product.updateMany(
      { collections: collection._id },
      { $pull: { collections: collection._id } }
    );

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("[CollectionId_DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
export const dynamic = "force-dynamic";