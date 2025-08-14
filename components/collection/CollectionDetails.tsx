import Image from 'next/image'
import React from 'react'
import ProductInfo from './ProductInfo'

interface CollectionDetailsPropes {
    collectionData: CollectionType | any
}

const CollectionDetails: React.FC<CollectionDetailsPropes> = ({collectionData}) => {
    
  return (
    <div className='grid gap-5'>
        <h1 className='flex items-center justify-center text-3xl text-gray-950 my-5 font-semibold mt-10'>{collectionData?.title}</h1>
        <hr className='bg-gray-950 py-0.5 my-5' />
        <section className='flex items-center justify-center'>
        <div className="flex items-center justify-center w-[500px] h-[350px] border rounded-lg border-gray-900 shadow-lg">
                  <Image
                    src={collectionData?.image}
                    alt="Product Image"
                    className="object-fill h-full w-full mix-blend-multiply rounded"
                    width={1000}
                    height={800}
                  />
                </div>
        </section>
        <section>
            <h3 className='font-bold text-lg my-5'>Discription</h3>
            <p>{collectionData?.discription}</p>
        </section>
        <section>
            {
                collectionData?.products[0] && (
                    <ProductInfo data={collectionData?.products}/>
                )
            }
        </section>

    </div>
  )
}

export default CollectionDetails