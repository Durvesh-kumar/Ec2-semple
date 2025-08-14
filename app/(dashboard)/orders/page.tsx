"use client";
import Loader from "@/components/coustem ui/Loading";
import OrderColumes from "@/components/order/OrderColumm";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [queary, setQueary] =useState('')
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const res = await fetch("/api/orders", {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        setLoading(false);
        setAllOrders(data);
        setOrders(data);
      }
    } catch (error) {
      console.log("[Order_Get]", error);
      toast.error("Somting went wrong! Please try again");
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  const searchQueary = (queary:string)=>{
    let filterData = orders;
    if(queary){
        filterData = orders.filter((item:OrderType)=>
        item._id.toLocaleLowerCase().includes(queary.toLocaleLowerCase()) ||
        item.customer.toLocaleLowerCase().includes(queary.toLocaleLowerCase())
       )
        setOrders(filterData)
    }else{
        setOrders(allOrders)
    }
  }

  useEffect(()=>{
    searchQueary(queary)
  }, [queary])
  return loading ? (
    <Loader />
  ) : (
    <div className="grid gap-5">
      <p className="text-3xl font-bold text-gray-950">Orders</p>
      <hr className="p-0.5 bg-gray-900 shadow-md my-5" />

      <Input type="text" placeholder="Search..." value={queary} onChange={(e)=> setQueary(e.target.value)} className="w-1/2" />

      <OrderColumes data={orders} />
    </div>
  );
};

export const dynamic = "force-dynamic";
export default Orders;
