import { connectToDB } from "@/lib/db/mongoDB";
import Product from "@/lib/models/products";
import { NextResponse } from "next/server";

export const GET = async()=>{
    try {
        await connectToDB();
        const categorys = await Product.distinct('category');

        const productsCategorys = [];

        for(let category of categorys){
            const products = await Product.findOne<[]>({category});
            

            if(products){
                productsCategorys.push(products);
            }
        }
        return NextResponse.json(productsCategorys, {status: 200,
            headers: {
                "Access-Control-Allow-Origin": `${process.env.ECOMMECRE_STORE_URL}`,
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Contect-Type"
            }
        });
    } catch (error) {
        console.log("[category_GET]", error);
        return new NextResponse('Internal Server Error', {status: 500});
    }
}
export const dynamic = "force-dynamic";