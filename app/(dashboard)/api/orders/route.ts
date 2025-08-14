import { connectToDB } from "@/lib/db/mongoDB";
import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { NextResponse } from "next/server";
import {format} from "date-fns"

export const GET = async()=>{
    try {
        await connectToDB();

        const orders = await Order.find().sort({createdAt: "desc"})

        const orderDetails = await Promise.all(orders.map( async(order)=>{
            const customer = await Customer.findOne({clerkId: order.customerClerkId});
            return {
                _id: order._id,
                customer: customer.name,
                shippingRate: order.shippingRate,
                products: order.products.length,
                totalAmount: order.totalAmount,
                createdAt: format(order.createdAt, "MMM do, yyy")  // add date-fns
            }
        }))

        return NextResponse.json(orderDetails, {status: 200,
            headers: {
                "Access-Control-Allow-Origin": `${process.env.ECOMMECRE_STORE_URL}`,
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Contect-Type"
            }
        })
    } catch (error) {
        console.log("[orders_GET]", error);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}
export const dynamic = "force-dynamic";