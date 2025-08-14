"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";

interface OrderItemPropes {
  data: any;
}

const OrderItemColums: React.FC<OrderItemPropes> = ({ data }) => {
  const [orderProduct, setOrderProduct] = useState(data);
  const [allOrderProduct, setAllOrderProduct] = useState(data);
  const [queary, setQueary] = useState("");

  const searchQueary = (queary: string) => {
    let filterData = orderProduct;
    if (queary) {
      filterData = orderProduct.filter(
        (item: any) =>
          item.product.title
            .toLocaleLowerCase()
            .includes(queary.toLocaleLowerCase()) ||
          item.size.toLocaleLowerCase().includes(queary.toLocaleLowerCase()) ||
          item.color.toLocaleLowerCase().includes(queary.toLocaleLowerCase())
      );
      setOrderProduct(filterData);
    }
    setOrderProduct(allOrderProduct);
  };

  useEffect(() => {
    searchQueary(queary);
  }, [queary]);
  return (
    <div className="grid gap-5">
      <Input
        type="text"
        placeholder="Search...."
        value={queary}
        onChange={(e) => setQueary(e.target.value)}
        className="w-1/2"
      />
      <Table className=" border-2 shadow-xl rounded">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SNo.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: OrderItemType, index: number) => (
            <TableRow key={item.product._id + index}>
              <TableCell>{index + 1}.</TableCell>
              <TableCell>{item?.product?.title}</TableCell>
              <TableCell>{item?.size}</TableCell>
              <TableCell>{item?.color}</TableCell>
              <TableCell>{item?.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderItemColums;
