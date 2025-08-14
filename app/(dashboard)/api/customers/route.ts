import Customer from "@/lib/models/Customer";
import { NextResponse } from "next/server";

export const GET = async ()=>{
    try {
        const customer = await Customer.find().sort({ createdAt: "desc"});
        return NextResponse.json(customer, {status: 200})
    } catch (error) {
        console.log("[customer_GET]", error);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}
export const dynamic = "force-dynamic";