'use client'
import CollectionForm from '@/components/collection/form/Form';
import Loader from '@/components/coustem ui/Loading';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Edit = () => {
    const useParems = useSearchParams()
    const router = useRouter()
    const Id = useParems.get('id')
    const [loading, setLoading] = useState(true);
    const [getData, setGetData] = useState<CollectionType | null>(null)

    const fetchData = async()=>{
        try {
            const res = await fetch(`/api/collections/${Id}`, {
                method: "GET"
            })
    
            if(res.ok){
                const data = await res.json();
                setLoading(false);
                setGetData(data)
            }
        } catch (error) {
            console.log('[Edit_GET', error);
            router.push('/collection');
            toast.error('Somthing went worng! Prease try agian')
        }
    }

    useEffect(()=>{
        fetchData()
    },[1])
  return loading ? <Loader/> : (
    <CollectionForm initialData={getData} />
  )
}
export const dynamic = "force-dynamic";
export default Edit