"use client";
import CollectionDetails from "@/components/collection/CollectionDetails";
import Loader from "@/components/coustem ui/Loading";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Collection = ({ params }: { params: { collectionId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [collectionData, setCollectionData] = useState<CollectionType | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET",
      });
      const data = await res.json();
      setCollectionData(data);
      setLoading(false);
    } catch (error) {
      console.log("CollectionId_GET", error);
      toast.error("Somthing went wrong !. Please Try agian");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <CollectionDetails collectionData={collectionData} />
    </div>
  );
};

export const dynamic = "force-dynamic";
export default Collection;