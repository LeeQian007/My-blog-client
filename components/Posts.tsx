"use client";
import React, { useEffect } from "react";
import PostBlock from "./PostBlock";
import { getCurrentPost } from "@/lib/get-current-post";
import { postStore } from "@/hooks/post-store";
import { getRandomValues, randomUUID } from "crypto";

type Props = {};

const Posts = (props: Props) => {
  const { posts, setPost } = postStore();
  useEffect(() => {
    const response = getCurrentPost();
    response
      .then((result) => {
        setPost(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setPost]);
  return (
    <>
      {posts?.map((post) => (
        <PostBlock
          key={"hey"}
          postTitle={post.postTitle}
          postContent={post.postContent}
        />
      ))}
    </>
  );
};

export default Posts;
