"use client";

import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GrGroup } from "react-icons/gr";
import { RiHistoryLine } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const AppFooter = () => {
  const pathname = usePathname();

  return (
    <div className="sticky bottom-0 z-10 w-full rounded-t-md bg-dark px-8 py-4 shadow-md">
      <div className="flex items-center justify-between">
        <Link href="/">
          <FaHome
            size={24}
            className={clsx(
              "cursor-pointer hover:text-secondary",
              pathname === "/" && "text-secondary",
            )}
          />
        </Link>
        <Link href="/">
          <GrGroup
            size={24}
            className={clsx(
              "cursor-pointer hover:text-secondary",
              pathname === "/group" && "text-secondary",
            )}
          />
        </Link>
        <Link href="/">
          <RiHistoryLine
            size={24}
            className={clsx(
              "cursor-pointer hover:text-secondary",
              pathname === "/history" && "text-secondary",
            )}
          />
        </Link>
        <Link href="/youapp/profile">
          <CgProfile
            size={24}
            className={clsx(
              "cursor-pointer hover:text-secondary",
              pathname === "/youapp/profile" && "text-secondary",
            )}
          />
        </Link>
      </div>
    </div>
  );
};

export default AppFooter;
