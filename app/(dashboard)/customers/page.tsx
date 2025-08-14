"use client"
import Loader from '@/components/coustem ui/Loading';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import Link from 'next/link';

const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [allCustomers, setAllCustomers] = useState([]);
    const [queary, setQueary] = useState('');
    const [loading, setLoading] = useState(true)
    const getCustomer = async()=>{
        try {
            const res = await fetch("/api/customers", {
                method: "GET"
            });
            if(res.ok){
                const data = await res.json();
                setLoading(false);
                setCustomers(data)
                setAllCustomers(data)
            }
        } catch (error) {
            console.log('[customer_GET]', error);
            toast.error('Somthing went wrong! Please try agian')
        }
    }

    useEffect(()=>{
        getCustomer()
    }, [])

    const searchQueary = (queary:string)=>{
      let filterData = customers;
      if(queary){
        filterData = customers.filter((item: CustomerType)=>
          item.name.toLocaleLowerCase().includes(queary.toLocaleLowerCase())||
          item.email.toLocaleLowerCase().includes(queary.toLocaleLowerCase())||
          item._id.toLocaleLowerCase().includes(queary.toLocaleLowerCase())
        )
        setCustomers(filterData)
      }else{
        setCustomers(allCustomers)
      }
    }

    useEffect(()=>{
      searchQueary(queary)
  }, [queary])
    
  return loading ? <Loader/>: (
    <div className='grid gap-5'>
        <h1 className='text-2xl font-semibold text-gray-950'>Customers</h1>
        <hr className='p-0.5 bg-gray-900 shadow-lg'/>
        <Input type='text' placeholder='Search......' value={queary} onChange={(e)=> setQueary(e.target.value)} className='w-1/2'/>

        <Table className="container mx-auto border px-10 font-medium text-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SNo.</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Orders</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {customers?.map((customer:CustomerType, index) => (
            <TableRow key={customer._id}>
              <TableCell className="font-medium">{index + 1}.</TableCell>
              <TableCell>
                <Link
                  href={`/orders/${customer?.orders[0]}`}
                  className="hover:text-blue-600"
                >
                  {customer?.clerkId}
                </Link>
              </TableCell>
              <TableCell>{customer?.name}</TableCell>
              <TableCell>{customer?.email}</TableCell>
              <TableCell>{customer?.orders.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export const dynamic = "force-dynamic";
export default Customer;