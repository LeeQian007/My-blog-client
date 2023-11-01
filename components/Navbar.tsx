import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import MuteSound from "./MuteSound";
import Login from "./Login";
import MobileSideBar from "./modals/MobileSideBar";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <section className="px-14 py-5 w-full top-0  flex gap-6 justify-between fixed z-10 dark:bg-[#1A1F24] bg-[#0099FE] text-white  ">
      <div className="flex gap-24 justify-between">
        {/* logo part */}
        <Link href={"/"} className="w-[200px]">
          <Image
            priority
            src={"/logo.png"}
            width={640}
            height={166}
            alt="logo"
            className="text-black dark:text-white"
          ></Image>
        </Link>

        {/* menu part */}
        {/* <div className="md:flex items-center justify-center gap-4   w-[60%] text-center hidden whitespace-nowrap">
          <Link className="flex-1" href={"/posts"}>
            Posts
          </Link>
          <Link className="flex-1" href={"archives"}>
            Archives
          </Link>
          <Link className="flex-1" href={""}>
            Tools
          </Link>
        </div> */}
      </div>

      {/* toggle light */}
      <div className="md:flex hidden items-center gap-6">
        <MuteSound />
        <ModeToggle />
        <Login />
      </div>

      <MobileSideBar />
    </section>
  );
};

export default Navbar;
