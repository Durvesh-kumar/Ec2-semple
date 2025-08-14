"use client"
import Loader from '@/components/coustem ui/Loading';
import OrderItemColums from '@/components/order/OrderItemsColems';
import { CircleUser, MapPinHouse } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const OrderDetails = ({params}:{params: {orderId: string}}) => {
    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState<CustomerType | null>(null);
    const [orderDetails, setOrderDetails] = useState<OrderType | null>(null);

    const fetchData = async()=>{
        try {
            const res = await fetch(`/api/orders/${params.orderId}`,{
                method: "GET"
            });
              
            if(res.ok){
                const data = await res.json();
                setLoading(false);
                setCustomer(data?.customer);
                setOrderDetails(data?.orderDetails);
            }
            
        } catch (error) {
            console.log();
            toast.error('Somthing went wrong! Please try agian')
        }
    }

    useEffect(()=>{
        fetchData()
    }, []);

    const address = orderDetails?.shippingAddress
    
  return loading ? <Loader/> : (
    <div className='grid gap-y-10'>
        <div className='text-2xl font-extrabold flex-wrap  flex gap-3'><span>OrderID :</span><span>{orderDetails?._id}</span></div>
        <hr className='p-0.5 bg-gray-900'/>
        <div className='flex items-center max-md:flex-col gap-5 justify-around'>
            <div className='flex flex-col gap-3 p-5 rounded shadow-md duration-500 hover:scale-105 hover:shadow-xl border'>
                <p className='font-bold text-xl text-gray-950 flex items-center justify-between px-4 mb-4'><span>Customer Details</span> <CircleUser className='w-8 h-8 text-blue-600' /></p>
                <p className='flex gap-2'><span className='text-gray-950'>ID: </span><span className=' text-slate-600'>{customer?.clerkId}</span></p>
                <p className='flex gap-2'><span className='text-gray-950'>Name: </span><span className=' text-slate-600'>{customer?.name}</span></p>
                <p className='flex gap-2'><span className='text-gray-950'>Email: </span><span className=' text-slate-600'>{customer?.email}</span></p>
                <p className='flex gap-2'><span className='text-gray-950'>Total Paid: </span ><span className=' text-slate-600'>{orderDetails?.totalAmount}</span></p>
            </div>
            <div className='flex flex-col gap-3 p-5 rounded shadow-md border duration-500 hover:scale-105 hover:shadow-xl'>
                <p className='font-bold text-xl text-gray-950 flex items-center justify-between px-4 mb-4'><span>Shipping Address</span><MapPinHouse className='w-8 h-8 text-blue-600' /></p>
                <p className='flex gap-2'><span className='text-gray-950'>Location: </span><span className=' text-slate-600'>{address?.street}</span></p>
                <p className='flex gap-2'><span className='text-gray-950'>State: </span><span className=' text-slate-600'>{address?.state}</span></p>
                <p className='flex gap-2'><span className='text-gray-950'>City: </span><span className=' text-slate-600'>{address?.city}</span></p>
                <p className='flex gap-2'><span className='text-gray-950'>Post Office: </span ><span className=' text-slate-600'>{address?.postalCode}</span></p>
            </div>
        </div>
        <OrderItemColums data={orderDetails?.products} />
    </div>
  )
}

export const dynamic = "force-dynamic";
export default OrderDetails;