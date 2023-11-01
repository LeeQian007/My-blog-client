import BigTitle from "@/components/BigTitle";
import PostBlock from "@/components/PostBlock";
import Posts from "@/components/Posts";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["React", "CSS", "NEXT.JS"];

export default function Home() {
  return (
    <div className="xl:max-w-[1280px] w-full h-full flex relative">
      <div className="xl:max-w-[1280px] mt-24 md:mt-44 py-32 px-10 flex w-full">
        <div className="w-full md:w-[65%]">
          {/* Posts */}
          <BigTitle title="RECENT POSTS" />

          <Posts />
        </div>

        <div className=" md:w-[35%] md:block hidden pl-4">
          {/* Cate */}
          <BigTitle title="CATEGORIES" />
          <div className="px-4 flex gap-3">
            {CATEGORIES.map((cate) => (
              <Button
                key={cate}
                variant="default"
                className="bg-lightBlue hover:bg-lightBlue hover:opacity-80 dark:bg-darkGrey dark:text-white"
              >
                {cate}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
