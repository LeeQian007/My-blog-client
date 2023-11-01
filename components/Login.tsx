"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { userStore } from "@/hooks/user-store";
import { getCurrentUser } from "@/lib/get-current-user";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axiosInstance from "@/lib/axios-config";
import { getCurrentPost } from "@/lib/get-current-post";
import { error } from "console";
import { postStore } from "@/hooks/post-store";

type Props = {};

const Login = (props: Props) => {
  const { onOpen } = useModal();
  const { user, setUser } = userStore();
  const [avatar, setAvatar] = useState(false);

  const openLogin = () => {
    onOpen("loginModal");
  };

  const handleLogOut = async () => {
    // 1.先从本地获取 token
    const token = localStorage.getItem("token");

    // 2.发送请求，服务端redis清理token缓存
    const response = await axiosInstance.post("/api/logout", user, {
      headers: { Authorization: `TOKEN_${token}` },
    });

    // 3.清理本地的token
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }

    // 4.清理User State
    setUser(null);

    console.log(response.data.data);
  };

  // 开始获取 user 和 post
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 取token from localStorage
      const token = localStorage.getItem("token");
      if (token) {
        const user = getCurrentUser(token);
        user
          .then((result) => {
            // @ts-ignore
            setUser(result);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [setUser]);

  return (
    <>
      {user !== null || undefined ? (
        <div className="flex gap-2 cursor-pointer relative">
          <Button
            className="cursor-pointer bg-darkRed rounded-lg  transition duration-200 text-white hover:text-darkRed whitespace-nowrap"
            onClick={() => onOpen("uploadPost")}
          >
            Upload Post
          </Button>

          <Avatar onClick={() => setAvatar(!avatar)}>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {avatar && (
            <>
              <div className="absolute -bottom-32 -left-4 flex gap-2 bg-black rounded-lg p-3 flex-col">
                <div className="flex gap-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex-col text-sm">
                    <p>{user?.userName}</p>
                    <p>{user?.userEmail}</p>
                  </div>
                </div>
                <Button onClick={handleLogOut}>Log out</Button>
              </div>
            </>
          )}
        </div>
      ) : (
        <Button
          className="text-black dark:text-white whitespace-nowrap w-full"
          variant={"outline"}
          size={"sm"}
          onClick={openLogin}
        >
          Sign In
        </Button>
      )}
    </>
  );
};

export default Login;
