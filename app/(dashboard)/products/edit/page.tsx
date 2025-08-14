"use client";
import Loader from "@/components/coustem ui/Loading";
import ProductForm from "@/components/product/form/ProductForm";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";


const Edit = () => {
  const useSearch = useSearchParams();
  const productId = useSearch.get("id");

  const [getData, setGetData] = useState<ProductType | null >(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        setLoading(false);
        setGetData(data);
      }
    } catch (error) {
      console.log("[Edit_GET]", error);
      toast.error("Somthing went woreng!. Please try agian");
      window.location.href = "/products";
    }
  };

  useEffect(() => {
    fetchData();
  }, [1]);

  return loading ? <Loader /> : <ProductForm initialData={getData} />;
};

export const dynamic = "force-dynamic";
export default Edit;