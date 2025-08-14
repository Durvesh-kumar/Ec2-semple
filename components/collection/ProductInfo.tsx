"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Delete from "../coustem ui/Delete";
import Link from "next/link";
import { Edit2 } from "lucide-react";
import { Input } from "../ui/input";

interface ProductInfoPropes {
  data: ProductType[];
}

const ProductInfo: React.FC<ProductInfoPropes> = ({ data }) => {

  const [queary, setQueary] = useState('');
  const [allData, setAllData] = useState(data)
  const [products, setProducts] = useState(data)

  const searchQueary = (queary:string)=>{
    let filterData = products;
    if(queary){
       filterData = products.filter((item:ProductType)=>
        item.title.toLocaleLowerCase().includes(queary.toLocaleLowerCase())||
        item.category.toLocaleLowerCase().includes(queary.toLocaleLowerCase())
      )
      setProducts(filterData)
    }else{
       setProducts(allData)
    }
  }

  useEffect(()=>{
    searchQueary(queary)
  }, [queary]);

  return (
    <div className="grid gap-5 mt-5">
      <Input type="text" placeholder="Search...." value={queary} onChange={(e)=> setQueary(e.target.value)} className="w-1/2"/>
    <Table className=" border-2 shadow-xl rounded">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SNo.</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price (&#8377;) </TableHead>
          <TableHead>Pay (&#8377;) </TableHead>
          <TableHead className="flex items-center justify-center">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.map((item: any, index) => (
          <TableRow key={item._id}>
            <TableCell className="font-medium">{index + 1}.</TableCell>
            <TableCell>
              <Link
                className="hover:text-blue-600"
                href={{
                  pathname: "/products/productId",
                  query: { id: item?._id },
                }}
              >
                {item?.title}
              </Link>
            </TableCell>
            
            <TableCell>{item?.category}</TableCell>
            <TableCell>{item?.price}</TableCell>
            <TableCell>{item?.pay}</TableCell>
            <TableCell className="text-right flex items-center justify-around">
              <Delete item="Product" id={item?._id} />
              <Link
                className="flex items-center justify-center bg-blue-600 hover:bg-white text-white hover:text-black rounded border"
                href={{
                  pathname: "/products/edit",
                  query: { id: item?._id },
                }}
              >
                <Edit2 className="h-5 w-5 m-2" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
};

export default ProductInfo;
