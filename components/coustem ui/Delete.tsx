import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeletePropes {
  item: string;
  id: string;
}
const Delete: React.FC<DeletePropes> = ({ id, item }) => {
  const router = useRouter();

  const [loaging, setLoading] = useState(true);

  const itemType = item === "Product" ? "products" : "collections";

  const handleDelete = async (id: string) => {
    try {
      console.log(id);
      
      const res = await fetch(`/api/${itemType}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success(`${item} is delete Successfully`);
        setLoading(false);
        window.location.href = `/${itemType}`;
      }
    } catch (error) {
      console.log("[DELETE]", error);
      router.push(`/${itemType}`);
      toast.error("Something went wrong! Please try agian");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>

        <Button
          type="button"
          size="sm"
          
          className="bg-red-600 shadow-lg text-white rounded hover:bg-white hover:text-black border"
        >
          <Trash2 className=" w-5 h-5 my-0.5" />
        </Button>
        
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your &nbsp;
            {item} and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction type="button" onClick={() => handleDelete(id)} className="bg-red-600 text-white">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
