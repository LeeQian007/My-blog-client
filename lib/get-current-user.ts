"use client";
import axiosInstance from "./axios-config";

export const getCurrentUser = async (token: String) => {
  try {
    const response = await axiosInstance.get("/api/user/token", {
      headers: { Authorization: `TOKEN_${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
