import { connectToDB } from "@/lib/db/mongoDB";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/products";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 404 });
    }
    const {
      title,
      media,
      discription,
      price,
      pay,
      sizes,
      colors,
      category,
      tags,
      brand,
      collections,
    } = await req.json();

    if (
      !title ||
      !media ||
      !discription ||
      !price ||
      !pay ||
      !sizes ||
      !colors ||
      !category ||
      !tags ||
      !brand ||
      !collections
    ) {
      return new NextResponse("Fill all fields", { status: 400 });
    }

    
    

    await connectToDB();

    const product = await Product.create({
      title,
      media,
      discription,
      price,
      pay,
      sizes,
      colors,
      category,
      tags,
      brand,
      collections,
    });

    const newProduct = await product.save();

    if (collections) {
      for (let collectionId of collections) {
        const collection = await Collection.findById({ _id: collectionId });
        await collection.products.push(newProduct._id)
        await collection.save()
      }
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[Products_POST]", error);
    return new NextResponse("Internal Sever Error", { status: 500 });
  }
};

export const GET = async(req: NextRequest)=>{
  
    try {
       await connectToDB() ;
       const products = await Product.find<[]>().populate({path: "collections", model: Collection}).sort({createdAt: 'desc'});
       
       

       if(!products){
         return new NextResponse('Product not found', {status: 400})
       }

       return NextResponse.json(products, {status: 200, 
        headers: {
            "Access-Control-Allow-Origin": `${process.env.ECOMMECRE_STORE_URL}`,
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Contect-Type"
        }

       })

    } catch (error) {
        console.log("[Products_GET]", error);
    return new NextResponse("Internal Sever Error", { status: 500 });
    }
}
export const dynamic = "force-dynamic";