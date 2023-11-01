import { create } from "zustand";

export type ModalType =
  | "loginModal"
  | "registerModal"
  | "mobileSideBar"
  | "uploadPost";

type ModalStore = {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: (type: ModalType) => void;
};

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ type: null, isOpen: false }),
}));
