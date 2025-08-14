import { connectToDB } from "@/lib/db/mongoDB";
import Product from "@/lib/models/products";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest, {params}:{params: {productId: string}})=>{
  try {
    await connectToDB();

    const product = await Product.findById(params.productId);
   
    if(!product){
        return new NextResponse(JSON.stringify({message:"Product not found"}), {status: 404})
    }

    const relatedProducts = await Product.find({
        $or: [
            { category: product.category},
            { brand: product.brand},
            { collections: { $in: product.collections }}
        ],
        _id: { $ne: product._id } // Exclute the corrent product
    })

    if(!relatedProducts){
        return new NextResponse(JSON.stringify({message:"Related products not found"}), {status: 404})
    }

    return NextResponse.json(relatedProducts, {status: 200, 
        headers: {
            "Access-Control-Allow-Origin": `${process.env.ECOMMECRE_STORE_URL}`,
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Contect-Type"
        }
    })

  } catch (error) {
    console.log("related_GET", error);
    return new NextResponse("Internal Server Error", {status: 500})
  }
}
export const dynamic = "force-dynamic";