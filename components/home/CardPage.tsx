import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeIndianRupee, CircleUser, IndianRupee, ShoppingBag, ShoppingCart, UsersRound } from "lucide-react";
import React from "react";

interface CardPagePropes {
  totalRevenue:number,
  totalCustomer:number,
  totalOrders: number,
}

const CardPage:React.FC<CardPagePropes> = ({totalRevenue, totalCustomer, totalOrders}) => {
  return (
   <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Totel Revenue</CardTitle>
        <BadgeIndianRupee className="max-sm:hidden" />
      </CardHeader>
      <CardContent>
        <p className="flex items-center text-xl gap-2"><IndianRupee className="w-5 h-5"/>{totalRevenue}</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Totel Customers</CardTitle>
        <CircleUser className="max-sm:hidden"/>
      </CardHeader>
      <CardContent>
        <p className="flex items-center text-xl gap-4"><UsersRound className="w-5 h-5" />{totalCustomer}</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Totel Orders</CardTitle>
        <ShoppingCart className="max-sm:hidden"/>
      </CardHeader>
      <CardContent>
        <p className="flex items-center text-xl gap-4"><ShoppingBag className="w-5 h-5" />{totalOrders}</p>
      </CardContent>
    </Card>
   </div>
  );
};

export default CardPage;