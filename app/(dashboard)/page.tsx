import SalesChart from "@/components/coustem ui/SalesChart";
import CardPage from "@/components/home/CardPage";
import { getSalePerMonth, getTotalCustomers, getTotalSales } from "@/lib/actions/acrions"

const Home = async() => {
  const totalRevenue = await getTotalSales().then((date)=> date.totleRevenus);
  // console.log(await getTotalSales());
  
  const totalOrders = await getTotalSales().then((date)=> date.totalOrders);
  const totalCustomer = await getTotalCustomers();
  const graphDate = await getSalePerMonth();
  // console.log(graphDate);
  

  return (
    <div className="grid gap-6">
      <h1 className="text-gray-950 text-3xl font-extrabold">Dashboard</h1>
      <hr className="bg-gray-900 my-4 shadow-lg p-0.5"/>
      <CardPage totalRevenue={totalRevenue} totalCustomer={totalCustomer} totalOrders={totalOrders}/>
      <SalesChart graphDate={graphDate}/>
    </div>
  )
}

export const dynamic = "force-dynamic";
export default Home;