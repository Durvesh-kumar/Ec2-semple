import { ImageUp, Plus, Trash2 } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface ImagePropes {
  value: string[];
  onChange: (value:string)=>void;
  onRemove: (value: string) => void;
}



const ImageUpload: React.FC<ImagePropes> = ({ onRemove, onChange, value }) => {

  const onUpload = (result: any) => {
    const showUrl = result?.info.secure_url;

    onChange(showUrl)
  };
  
  return (
    <>
        <div className="flex items-center flex-wrap my-4  gap-4">
          {value?.map((url:any, index) => (
            <div key={index} className=" relative w-[200px] h-[200px] bg-slate-200 rounded-lg border">
              <Image
                src={url}
                alt="Collection Image"
                className="object-fill mix-blend-multiply rounded"
                fill
                sizes="sm"
              />
              <div className=" absolute top-1 right-1 z-10">
              <button type="button" onClick={()=> onRemove(url)}  className="bg-red-200 text-white rounded hover:bg-red-1"><Trash2 className="w-6 h-6 m-1"/></button>
              </div>
            </div>
          ))}
        </div>
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
        onSuccess={onUpload}
      >
        {({ open }) => {
          return<button type="button" onClick={() => open()} className="bg-orange-700 flex-nowrap rounded px-8 py-2 flex w-fit text-white text-xl gap-4 font-bold items-center justify-center ">
            {
              value[0] ? <Plus/> : <ImageUp /> 
            }
          Upload an Image
        </button>;
        }}
      </CldUploadWidget>
    </>
  );
};

export default ImageUpload;
