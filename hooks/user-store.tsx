import { create } from "zustand";

type userInfo = {
  userEmail: String;
  userName: String;
};

type userStore = {
  user: userInfo | null;
  setUser: (user?: userInfo | null) => void;
};

export const userStore = create<userStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
