import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

interface OrderColumesPropes {
  data: OrderType[];
}

const OrderColumes: React.FC<OrderColumesPropes> = ({ data }) => {
  console.log(data);

  return (
    <div className="container mx-auto border px-10 font-medium text-lg">
      <Table className="container mx-auto border px-10 font-medium text-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SNo.</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Delivery Type</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>TotalPrice</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((order: OrderType, index) => (
            <TableRow key={order._id}>
              <TableCell className="font-medium">{index + 1}.</TableCell>
              <TableCell>
                <Link
                  href={`/orders/${order._id}`}
                  className="hover:text-blue-600"
                >
                  {order?._id}
                </Link>
              </TableCell>
              <TableCell>{order?.customer}</TableCell>
              <TableCell>
                {order?.shippingRate === "shr_1Py1biSJdn7XAzbkbq5yZTkG"
                  ? "EXPRESS"
                  : "NORMAL"}
              </TableCell>
              <TableCell>{order?.products}</TableCell>
              <TableCell>{order?.totalAmount}</TableCell>
              <TableCell>{order?.createdAt}</TableCell>
              <TableCell className="text-right flex items-center justify-around"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderColumes;
