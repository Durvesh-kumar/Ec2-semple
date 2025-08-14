"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, number } from 'zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/coustem ui/ImageUpload";
import { useRouter } from "next/navigation";
import { formSchema, ProductValidation } from "./Validation";
import MultiText from "@/components/coustem ui/MultiText";
import Delete from "@/components/coustem ui/Delete";
import MultiSelect from "@/components/coustem ui/MultiSelect";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/coustem ui/Loading";

interface FOPRMPROPS {
  initialData? : ProductType | null;
}

const ProductForm: React.FC<FOPRMPROPS> = ({ initialData }) => {

  const router = useRouter();

  const [loading, setLoaing] = useState(true);
  const [collections, setCollections] = useState<CollectionType[]>([]);

  const fetchData = async()=>{
    try {
     const res = await fetch('/api/collections', {
       method: "GET"
     })
     if(res.ok){
       const data = await res.json()
       setCollections(data)
       setLoaing(false)
     }
    } catch (error) {
      console.log('[Collection_GET]', error);
      toast.error('Somthing went wrong! Please try agian')
    }
   }
   useEffect(()=>{
     fetchData()
   },[])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: initialData
      ? {
          ...initialData,
          collections: initialData.collections.map((collection:any) => collection._id),
        }
      : ProductValidation,
  });
  

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    try {
      setLoaing(true);
      const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast.success(
          `Product ${initialData ? "update" : "create"} Successfully`
        );
        window.location.href = "/products";
        setLoaing(false);
      }
    } catch (error) {
      console.log("[Products_POST]", error);
      router.push('/products/new')
      toast.error("Somthing went wrong!. Please try agian");
    }
  }
  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  
  return loading ? (
    <Loader />
  ) : (
    <>
      {initialData ? (
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-3xl">Edit Product</h1>
          <Delete item="Product" id={initialData._id} />
        </div>
      ) : (
        <h1 className="font-bold text-3xl">Create Product</h1>
      )}
      <hr className="bg-gray-900 shadow-lg h-1 my-10" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 text-xl "
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product title"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-orange-700" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Discription</FormLabel>
                <FormControl>
                  <Textarea
                    onKeyDown={handleKeyPress}
                    placeholder="Product discription"
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormMessage className="text-orange-700" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={(url) =>
                      field.onChange(field.value=[...field.value, url])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((item) => item !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage className="text-orange-700" />
              </FormItem>
            )}
          />

          <section className="grid md:grid-cols-2  lg:grid-cols-3 gap-10">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Product price"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-orange-700" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Pay</FormLabel>
                  <FormControl>
                    <Input onKeyDown={handleKeyPress} type="number" min={10} placeholder="Product pay" {...field} />
                  </FormControl>
                  <FormMessage className="text-orange-700" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Brand</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product brand"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-orange-700" />
                </FormItem>
              )}
            />
            {
              collections[0] &&(
                <FormField
                control={form.control}
                name="collections"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Collection</FormLabel>
                    <FormControl>
                      <MultiSelect
                        value={field.value}
                        onChange={(collection) =>
                          field.onChange([...field.value, collection])
                        }
                        onRemove={(collection) =>
                          field.onChange([
                            ...field.value.filter(
                              (item) => item !== collection
                            ),
                          ])
                        }
                        collections={collections}
                        placeHolder="Select collection"
                      />
                    </FormControl>
                    <FormMessage className="text-orange-700" />
                  </FormItem>
                )}
              />
              )
            }
              

            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Sizes</FormLabel>
                  <FormControl>
                    <MultiText
                      value={field.value}
                      onChange={(size) =>
                        field.onChange([...field.value, size])
                      }
                      onRemove={(size) =>
                        field.onChange([
                          ...field.value.filter((item) => item !== size),
                        ])
                      }
                      placeHolder="Product sizes"
                    />
                  </FormControl>
                  <FormMessage className="text-orange-700" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Colors</FormLabel>
                  <FormControl>
                    <MultiText
                      placeHolder="Product colors"
                      value={field.value}
                      onChange={(color) =>
                        field.onChange([...field.value, color])
                      }
                      onRemove={(color) =>
                        field.onChange([
                          ...field.value.filter((item) => item !== color),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-orange-700" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Tags</FormLabel>
                  <FormControl>
                    <MultiText
                      placeHolder="Product tags"
                      value={field.value}
                      onChange={(tag) => field.onChange([...field.value, tag])}
                      onRemove={(tag) =>
                        field.onChange([
                          ...field.value.filter((item) => item !== tag),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-orange-700" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product category"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-orange-700" />
                </FormItem>
              )}
            />
          </section>
          <div className="flex items-center justify-around">
            <Button
              onClick={() => router.push("/products")}
              className="px-3 py-3 bg-red-800 text-body-bold hover:bg-white hover:border text-lg border-black rounded-md text-white  hover:text-black"
            >
              Discard
            </Button>
            <Button
              type="submit"
              className="px-3 py-3 bg-blue-800 text-body-bold hover:bg-white hover:border text-lg border-black rounded-md text-white  hover:text-black"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
