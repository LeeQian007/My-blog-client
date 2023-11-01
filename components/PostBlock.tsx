import { lunasima_light } from "@/app/fonts";
import React from "react";

type Props = {
  postTitle: String;
  postContent: String;
};

const PostBlock = ({ postTitle, postContent }: Props) => {
  const wordsArray = postContent.split(/\s+/);
  // 获取前20个单词
  const first20Words = wordsArray.slice(0, 20);
  const content = first20Words.join(" ");
  return (
    <div className="flex items-start flex-col gap-3 w-full py-4 shadow-lg cursor-pointer group px-4 rounded-md mb-14">
      <h1 className="text-2xl group-hover:text-[#0099FE] transition duration-200">
        {postTitle}
      </h1>
      <p className={lunasima_light.className}>{content}</p>
      {/* <button className="font-bold text-lg">Read More</button> */}
    </div>
  );
};

export default PostBlock;
