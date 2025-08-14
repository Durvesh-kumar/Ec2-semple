'use client'
import Loader from "@/components/coustem ui/Loading";
import ProductDetails from "@/components/product/ProductDetails";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";



const Product = () => {

  const useSearch = useSearchParams();
  const productId = useSearch.get("id");

  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState<ProductType | null>(null)

  const fetchData = async()=>{

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method:"GET"
      })
  
      if(res.ok){
        const data = await res.json();
        setLoading(false);
        setProductData(data)
      }
    } catch (error) {
      console.log('[ProductDetails_GET]', error);
      toast.error('Somthing went error !. Plesae try agian')
    }
    
  }
  useEffect(()=>{
    fetchData()
  }, [productId])
  return loading ? <Loader/> : (
    <ProductDetails productData={productData} />
  );
};

export const dynamic = "force-dynamic";
export default Product;