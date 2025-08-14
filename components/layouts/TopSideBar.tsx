"use client"
import { naveLink } from "@/lib/constant"
import { UserButton } from "@clerk/nextjs"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const TopSideBar = () => {
    const usePath = usePathname()

    const [menuDown, setMenuDown] = useState(false)
  return (
    <div className=" sticky top-0 left-0 border-b-2 z-50 bg-gray-300 flex lg:hidden items-center justify-between w-full gap-x-10 border shadow-md font-medium px-10 py-1">
        <Image src='/logo2.jpg' width={100} height={1000} alt='Compnay logo' className=" mix-blend-multiply h-11 w-24"/>
        <div className="max-md:hidden flex items-center justify-between gap-6">
        {
            naveLink.map((item)=>(
                <Link href={item.url} key={item.name}
                 className={` items-start flex gap-3 ${usePath === item.url ? 'text-blue-600 outline-1': 'text-gray-950'}`}
                >
                  {item.Icon}
                  <p>{item.name}</p>
                </Link>
            ))
        }
        <UserButton/>
        </div>

        <div className=" relative flex items-center justify-between gap-4 md:hidden">
           <Menu
            className=" cursor-pointer lg:hidden "
            onClick={()=>setMenuDown(!menuDown)}/>
          <div className=" text-lg space-y-3 bg-white rounded border shadow-lg absolute py-4 top-12 right-0">
          { 
           menuDown && (
            naveLink.map((item)=>(
              <Link href={item.url} key={item.name}
              onClick={()=> setMenuDown(!menuDown)}
               className={` items-start px-10 flex gap-3 ${usePath === item.url ? 'text-blue-600 outline-1': 'text-gray-950'}`}
              >
                {item.Icon}
                <p>{item.name}</p>
              </Link>
          ))
           )
            
        }
          </div>
          <UserButton/>
        </div>
        
    </div>
  )
}

export default TopSideBar