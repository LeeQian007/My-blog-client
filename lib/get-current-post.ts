"use client";
import axiosInstance from "./axios-config";

export const getCurrentPost = async () => {
  try {
    const response = await axiosInstance.get("/api/post");
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
