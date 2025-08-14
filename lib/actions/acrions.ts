import { connectToDB } from "../db/mongoDB"
import Customer from "../models/Customer";
import Order from "../models/Order";

export const getTotalSales = async()=>{
    await connectToDB();
    const orders = await Order.find();
    const totalOrders = orders.length;
    const totleRevenus = orders.reduce((acc, order)=> acc + order.totalAmount, 0);

    return { totalOrders, totleRevenus}
};

export const getTotalCustomers = async ()=>{
    await connectToDB();
    const customers = await Customer.find();
    const totalCustomers = customers.length;
    return totalCustomers
};

export const getSalePerMonth = async()=>{
    await connectToDB();

    const orders = await Order.find();

    const salesPerMonth = orders.reduce((acc, order)=> {
        const monthIndex = new Date(order?.createdAt).getMonth();  // 0 for January --> 11 for December
        acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount
        // for June
        // acc[5] = (acc[5] || 0) + order.totalAmount (orders have monthsIndex 5)
        return acc
    }, {});

    const graphData = Array.from({ length: 12}, (_, i)=>{
        const month = new Intl.DateTimeFormat('en-IN', {month: 'short'}).format(new Date(0, i, 1));
        return { name: month, sales: salesPerMonth[i] || 0}
    });

    return graphData;
};