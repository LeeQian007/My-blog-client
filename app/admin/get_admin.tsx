import axiosInstance from "@/lib/axios-config";

type Props = {};

export const getAdmin = async () => {
  try {
    const response = await axiosInstance.get("/api/admin");
    return response;
  } catch (error) {
    console.log(error);
  }
};
