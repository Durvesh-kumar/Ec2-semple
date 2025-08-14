"use client";
import { naveLink } from "@/lib/constant";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSideBar = () => {
  const usePath = usePathname();
  return (
    <div className="h-screen sticky top-0 left-0 flex flex-col bg-blue-2 shadow-lg max-lg:hidden p-10 gap-6">
      <Image
        src="/logo2.jpg"
        width={100}
        height={100}
        alt="Compnay-logo"
        className="h-16 w-28 mix-blend-multiply"
      />
      <div className="flex flex-col gap-12">
        {naveLink.map((item) => (
          <Link
            href={item.url}
            key={item.name}
            className={`flex items-center gap-3 ${
              usePath === item.url
                ? "text-blue-700"
                : "text-gray-950"
            }`}
          >
            {item.Icon}
            {item.name}
          </Link>
        ))}
        <div>
          <UserButton/>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
