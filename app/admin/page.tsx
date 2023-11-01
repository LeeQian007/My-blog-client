import { Separator } from "@/components/ui/separator";
import { getAdmin } from "./get_admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Laptop, Laptop2, List, ListChecks, User2 } from "lucide-react";
import { BsHouse } from "react-icons/bs";
import Link from "next/link";

type Props = {};

const Page = async (props: Props) => {
  const response = await getAdmin();

  const {
    tag_count,
    user_count,
    tag_type_count,
    post_count,
    osInfo,
    hostInfo,
  } = response?.data;

  const { name: osName } = osInfo;
  const { name: hostName, address } = hostInfo;

  return (
    <div className="w-full h-full mt-40 z-10 flex items-center justify-center px-14 text-2xl ">
      <Card className="w-full shadow-xl">
        <CardHeader>
          <CardTitle>Basic Information:</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-2 items-center hover:text-lightBlue dark:hover:text-darkRed transition duration-200">
            <Laptop />
            Operating System: {osName}
          </div>
          <div className="flex gap-2 items-center hover:text-lightBlue dark:hover:text-darkRed transition duration-200">
            <Laptop2 />
            Host Name: {hostName}
          </div>
          <div className="flex gap-2 items-center hover:text-lightBlue dark:hover:text-darkRed transition duration-200">
            <BsHouse />
            Hosting IP: {address}
          </div>
          <Separator />
          <Link
            href={"/admin/post"}
            className="flex gap-2 items-center hover:text-lightBlue dark:hover:text-darkRed transition duration-200"
          >
            <Book />
            Total Posts: {post_count}
          </Link>
          <Link
            href={"/admin/user"}
            className="flex gap-2 items-center hover:text-lightBlue dark:hover:text-darkRed transition duration-200"
          >
            <User2 />
            Total Users: {user_count}
          </Link>
          <Link
            href={"/admin/user"}
            className="flex gap-2 items-center hover:text-lightBlue dark:hover:text-darkRed transition duration-200"
          >
            <List />
            Total Tags: {tag_count}
          </Link>
          <Link
            href={"/admin/user"}
            className="flex gap-2 items-center hover:text-lightBlue dark:hover:text-darkRed transition duration-200"
          >
            <ListChecks />
            Total Tags List: {tag_type_count}
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
