import indianCurrency from "@/lib/IndianPrice";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Edit2 } from "lucide-react";
import Gallery from "./Gallery";

interface ProductDetailsPropes {
  productData: ProductType | null;
}
const ProductDetails: React.FC<ProductDetailsPropes> = ({ productData }) => {

    const router = useRouter()

  return (
    <>
      <h1 className="flex items-center justify-center my-6 text-3xl font-bold">
        {productData?.title}
      </h1>
      <hr className="bg-gray-900 py-0.5 my-10 shadow-lg rounded-xl" />
      <section className="flex items-center justify-center my-7">
        <Gallery media={productData?.media}/>
      </section>
      <section>
        <h2 className="text-gray-950 font-bold my-3 text-lg">Discription</h2>
        <p
          className="mt-3 scrollbar-hide px-3 text-sm"
        >
          {productData?.discription}
        </p>
      </section>
      <section className="flex gap-x-10 items-center my-5">
        <div className="flex items-center gap-4">
          <h1 className="text-gray-950 font-bold my-3 text-lg">
            Price &nbsp;:
          </h1>
          <p className="text-gray-500 line-through">{indianCurrency(productData?.price)}</p>
        </div>
        <div className="flex items-center gap-4">
          <h1 className="text-gray-950 font-bold my-3 text-lg">Pay &nbsp;:</h1>
          <p className="text-gray-500">{indianCurrency(productData?.pay)}</p>
        </div>
      </section>
      <section className="grid lg:grid-cols-2 lg:gap-4 text-xl">
        <div className="">
            <h3 className="font-bold text-lg text-gray-950 my-5">Collections:</h3>
          <div className="flex items-center gap-2 flex-wrap ">
            {productData?.collections?.map((collection: any) => (
              <Badge key={collection?._id} className="flex items-center justify-center text-sm px-4 py-2 bg-slate-50 rounded-lg border border-gray-700 shadow-md w-fit">
                {collection.title}
              </Badge>
            ))}
          </div>
        </div>

        <div className="">
            <h3 className="font-bold text-lg text-gray-950 my-5">Size:</h3>
          <div className="flex items-center gap-2 flex-wrap ">
            {productData?.sizes?.map((item: string, index) => (
              <Badge key={item + index} className="flex items-center justify-center px-4 text-sm py-2 bg-slate-50 border-gray-700 rounded-lg border shadow-md w-fit">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div className="">
            <h3 className="font-bold text-lg text-gray-950 my-5">Tags:</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {productData?.tags?.map((tage: string, index) => (
              <Badge key={tage + index} className="flex items-center justify-center text-sm px-4 py-2 bg-slate-50 border-gray-700 rounded-lg border shadow-md w-fit">
                {tage}
              </Badge>
            ))}
          </div>
        </div>

        <div className="">
            <h3 className="font-bold text-lg text-gray-950 my-5">Colors:</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {productData?.colors?.map((color: string, index) => (
              <Badge key={color + index} className="flex items-center justify-center px-4 text-sm py-2 bg-slate-50 border-gray-700 rounded-lg border shadow-md w-fit">
                {color}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-gray-950 my-5">Category:</h3>
          <div className="flex items-center gap-2 flex-wrap text-sm">
            {productData?.category}
          </div>
        </div>
      </section>
      <section className="flex items-center justify-around my-6">
      <Button
              onClick={() => router.push("/products")}
              className="px-3 py-3 bg-orange-500 text-body-bold hover:bg-white hover:border text-lg border-black rounded-md text-white  hover:text-black"
            >
              Back
            </Button>
            <Link
              href={{
                pathname: "/products/edit",
                query: {id: productData?._id}
              }}
              className="px-3 flex items-center gap-x-2 flex-nowrap py-1.5 bg-blue-800 text-body-bold hover:bg-white hover:border text-lg border-black rounded-md text-white  hover:text-black"
            >
              <Edit2 className="w-4 h-4"/> Edit
            </Link>
      </section>
    </>
  );
};

export default ProductDetails;
