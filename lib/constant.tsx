import { LayoutDashboard, Shapes, ShoppingBag, Tag, Users } from "lucide-react";

export const naveLink = [
    {
        url: "/",
        Icon: <LayoutDashboard />,
        name: "Dashboard"
    },
    {
        url: "/collections",
        Icon: <Shapes />,
        name: "Collections"
    },
    {
        url: "/products",
        Icon: <Tag />,
        name: "Products"
    },
    {
        url: "/orders",
        Icon: <ShoppingBag/>,
        name: "Orders"
    },
    {
        url: "/customers",
        Icon: <Users />,
        name: "Customers"
    },
]