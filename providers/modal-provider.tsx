"use client";
import { useEffect, useState } from "react";

// Modals

export const ModalProvider = () => {
  const [modalIsMounted, setModalIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setModalIsMounted(true);
  }, []);

  if (!modalIsMounted) {
    return null;
  }

  return <></>;
};
