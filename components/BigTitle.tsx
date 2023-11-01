import React from "react";
import { lunasima } from "@/app/fonts";

type Props = {
  title: string;
};

const BigTitle = ({ title }: Props) => {
  return (
    <div className={lunasima.className}>
      <h1 className="text-xl text-[#9C334F] tracking-widest py-4 px-4 mb-6 w-full">
        {title}
      </h1>
    </div>
  );
};

export default BigTitle;
