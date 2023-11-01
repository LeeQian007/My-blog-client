"use client";

import React from "react";
import { BiSolidHomeHeart, BiSolidCategory } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { FaLanguage } from "react-icons/fa";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";

type Props = {};

const NAVIGATION_ITEMS = [
  {
    title: "Home",
    icon: BiSolidHomeHeart,
  },
  {
    title: "About",
    icon: BsPersonFill,
  },
  {
    title: "Category",
    icon: BiSolidCategory,
  },
  {
    title: "Switch to Chinese",
    icon: FaLanguage,
  },
];

const Leftbar = (props: Props) => {
  return (
    <section className="hidden md:block md:w-[25%] ">
      {/* When true, the image will be considered high priority and preload. Lazy loading is automatically disabled for images using priority. */}
      <Image
        priority
        src={"/logo.png"}
        width={640}
        height={166}
        alt="logo"
      ></Image>
      <ModeToggle />
      hey im
    </section>
  );
};

export default Leftbar;
