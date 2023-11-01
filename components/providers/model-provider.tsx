"use client";

import React, { useEffect, useState } from "react";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import UploadPostModal from "../modals/UploadPostModal";

type Props = {};

const ModalProvider = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <LoginModal />
      <RegisterModal />
      <UploadPostModal />
    </>
  );
};

export default ModalProvider;
