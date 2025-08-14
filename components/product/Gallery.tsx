"use client";
import Image from "next/image";
import React, { useState } from "react";

interface GalleryPropes {
  media: any;
}

const Gallery: React.FC<GalleryPropes> = ({ media }) => {
  const [mianImage, setMainImage] = useState(media[0]);
  return (
    <div className="flex flex-col gap-3 max-w-[500px]">
      <Image
        src={mianImage}
        alt="product-Image"
        width={500}
        height={500}
        className="w-96 h-96 object-fill mix-blend-multiply rounded-lg shadow-xl"
      />
      <div className="flex gap-2 overflow-auto tailwind-scrollbar-hide">
        {media?.map((image:string) => (
          <Image
            key={image}
            src={image}
            alt="product-Image"
            width={200}
            height={200}
            onClick={() => setMainImage(image)}
            className={`w-20 h-20 object-fill mix-blend-multiply bg-slate-50 shadow-md border rounded-lg cursor-pointer ${
              mianImage === image ? "border-2 border-black" : null
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;