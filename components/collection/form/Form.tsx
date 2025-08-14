"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CollectionValidation, formSchema } from "./Validation";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/coustem ui/ImageUpload";
import Delete from "@/components/coustem ui/Delete";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "@/components/coustem ui/Loading";

interface FOPRMPROPS {
  initialData?: CollectionType | null;
}

const CollectionForm: React.FC<FOPRMPROPS> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: initialData ? { ...initialData } : CollectionValidation,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/collections/${initialData._id}`
        : "/api/collections";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast.success(
          `Collection ${initialData ? "updated" : "created"} Successfully`
        );
        window.location.href = "/collections";
        setLoading(false);
      }
    } catch (error) {
      console.log("Collection_POST", error);
      toast.error("Somthing went woring! Please try again.");
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
          <h1 className="font-bold text-3xl">Edit Collection</h1>
          <Delete item="Collection" id={initialData._id} />
        </div>
      ) : (
        <h1 className="font-bold text-3xl">Create Collection</h1>
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
                    placeholder="Collection title"
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
                    placeholder="Collection discription"
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={(url) => field.onChange("")}
                  />
                </FormControl>
                <FormMessage className="text-orange-700" />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-around">
            <Button
              onClick={() => router.push("/collections")}
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

export default CollectionForm;
