"use client";
import { useModal } from "@/hooks/use-modal-store";
import { MenuIcon } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ModeToggle } from "../ModeToggle";
import MuteSound from "../MuteSound";
import Login from "../Login";

type Props = {};

const MobileSideBar = (props: Props) => {
  const { isOpen, onClose, type, onOpen } = useModal();
  const isModalOpen = isOpen && type === "mobileSideBar";

  return (
    <>
      {/* menu bar for small devides */}
      <button
        className="flex items-center md:hidden"
        onClick={() => onOpen("mobileSideBar")}
      >
        <MenuIcon />
      </button>

      <Dialog open={isModalOpen} onOpenChange={() => onClose("mobileSideBar")}>
        <DialogContent className="h-full flex justify-center items-center flex-col w-full">
          <Button className="w-[40%]">About Me</Button>
          <Button className="w-[40%]">Posts</Button>
          <Button className="w-[40%]">Archives</Button>
          <Button className="w-[40%]">Tools</Button>
          <div className="w-[40%]">
            <Login />
          </div>
          <ModeToggle />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MobileSideBar;
