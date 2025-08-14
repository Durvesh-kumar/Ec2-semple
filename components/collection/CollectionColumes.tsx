import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Delete from "../coustem ui/Delete";
import Link from "next/link";
import { Edit2 } from "lucide-react";

interface CollectionColumesPropes {
  data: CollectionType[];
}

const CollectionColumes: React.FC<CollectionColumesPropes> = ({ data }) => {
  return (
    <div className="container mx-auto border px-10 font-medium text-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SNo.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Products</TableHead>
            <TableHead className="text-right flex items-center justify-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: any, index) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">{index + 1}.</TableCell>
              <TableCell>
                <Link
                  href={`/collections/${item._id}`}
                  className="hover:text-blue-600"
                >
                  {item.title}
                </Link>
              </TableCell>
              <TableCell>{item.products.length}</TableCell>
              <TableCell className="text-right flex items-center justify-around">
                <Delete item="Colection" id={item._id} />
                <Link
                  className="flex items-center justify-center shadow-lg bg-blue-600 hover:bg-white text-white hover:text-black rounded border"
                  href={{
                    pathname: "collections/edit",
                    query: { id: item._id },
                  }}
                >
                  <Edit2 className="h-5 w-5 m-2" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CollectionColumes;
export const dynamic = "force-dynamic";
