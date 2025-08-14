import { connectToDB } from "@/lib/db/mongoDB";
import Product from "@/lib/models/products";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest, {params}:{params: {query: string}})=>{
    
    try {
        
        await connectToDB()
        const searchProdut = await Product.find({
            $or:[
                {title: {$regex: params.query, $options: "i"}},
                {category: {$regex: params.query, $options: "i"}},
                {brand: {$regex: params.query, $options: "i"}},
                {tags: {$in: [new RegExp(params.query, "i")]}}, // $in is used to match an array of values
                {tags: {$in: [new RegExp(params.query, "i")]}},
            ]
        });
        console.log(searchProdut);
        

        return NextResponse.json(searchProdut, {status: 200 });
    } catch (error) {
        console.log('[search-GET]', error);
        return new NextResponse('Internal Server Error', {status:500})
    }
}
export const dynamic = "force-dynamic";