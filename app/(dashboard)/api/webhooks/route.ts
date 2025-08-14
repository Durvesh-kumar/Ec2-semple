import { stripe } from '@/lib/chackout/route';
import { connectToDB } from '@/lib/db/mongoDB';
import Customer from '@/lib/models/Customer';
import Order from '@/lib/models/Order';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest)=>{
    try {
        const rawBody = await req.text();
        // console.log("rawBody" ,rawBody);
        
        const signature = req.headers.get("Stripe-Signature") as string;

        const event = stripe.webhooks.constructEvent(
            rawBody,
            signature,
            process.env.STRIPE_WEBHOOKS_SECRET!
        )

        if(event.type === "checkout.session.completed"){
            const session = event.data.object;

            // console.log('[webhooks_Post]', session);
            

            const customerInfo = {
                clerkId: session?.client_reference_id,
                name: session?.customer_details?.name,
                email: session?.customer_details?.email,
            }
    
            const shippingAddress = {
                street: session?.shipping_details?.address?.line1,
                city: session?.shipping_details?.address?.city,
                state: session?.shipping_details?.address?.state,
                postalCode: session?.shipping_details?.address?.postal_code,
                country: session?.shipping_details?.address?.country,
            }
    
            const retrieveSession = await stripe.checkout.sessions.retrieve(
                session.id,
                { expand: ['line_items.data.price.product']}
            )
    
            const lineItems = await retrieveSession?.line_items?.data;

            // console.log('webhooks_lineItems', lineItems);
            

            const orderItem = lineItems?.map((lineItem:any)=>{
                return{
                    product: lineItem?.price?.product?.metadata?.productId,
                    color:lineItem.price?.product?.metadata?.color || "N/A",
                    size:lineItem.price?.product?.metadata?.size || "N/A",
                    quantity: lineItem.quantity,
                }
            });


            await connectToDB();

            const newOrder = new Order({
                products: orderItem,
                shippingAddress,
                shippingRate: session?.shipping_cost?.shipping_rate,
                totalAmount: session.amount_total ? session.amount_total / 100 : 0,
                customerClerkId: customerInfo.clerkId,
            });

            await newOrder.save()

            let customer = await Customer.findOne({ clerkId:customerInfo?.clerkId})

            if(customer){
                customer.orders.push(newOrder._id);
                
            } else {
                customer = new Customer({
                    ...customerInfo,
                    orders: [newOrder._id]
                })
            }

            await customer.save()
        }

        return new NextResponse('order created', {status: 200})

    } catch (error) {
        console.log('[webhooke_POST]', error);
        return new NextResponse('Faild to create the order', {status: 500})
    }
}
export const dynamic = "force-dynamic";