import axiosInstance from "@/lib/axios-config";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<User[] | undefined> {
  // Fetch data from your API here.

  try {
    const response = await axiosInstance.get("api/admin/user");
    const { records } = response.data.userPage;
    return records;
  } catch (error) {
    console.log(error);
  }
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10 mt-36 md:mt-44">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
