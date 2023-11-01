import { create } from "zustand";

type postInfo = {
  postTitle: String;
  postContent: String;
};

type postStore = {
  posts: Array<postInfo> | null | undefined;
  setPost: (post?: Array<postInfo> | null) => void;
};

export const postStore = create<postStore>((set) => ({
  posts: null,
  setPost: (posts) => set({ posts }),
}));
