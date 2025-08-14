import { connectToDB } from "@/lib/db/mongoDB";
import Product from "@/lib/models/products";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest, {params}:{params: {categoryId: string}})=>{
    try {
        await connectToDB();
        
        const products = await Product.find({category: params.categoryId})
        
        return NextResponse.json(products, {status: 200,
            headers: {
                "Access-Control-Allow-Origin": `${process.env.ECOMMECRE_STORE_URL}`,
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Contect-Type"
            }
        })
        
    } catch (error) {
        console.log("categoryId_GET", error);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}
export const dynamic = "force-dynamic";