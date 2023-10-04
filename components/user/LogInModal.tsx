"use client";

import React, { useState } from "react";
import Button from "../ui/button/Button";
import { signIn } from "next-auth/react";
import Modal from "../ui/div/Modal";

export default function LoginModal({}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <Button
        onClick={() => openModal()}
        customCSS="bg-white gap-extra-small sub-heading font-medium rounded-full flex justify-center items-center  brutalism-border px-sub-medium py-small border-primary80"
      >
        Login
      </Button>
      <Modal title="Login" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Button
          onClick={() => signIn("google")}
          hover="secondary-hover"
          customCSS="bg-secondary20 text-secondary80 gap-extra-small sub-heading font-medium rounded-small flex justify-center items-center  brutalism-border px-sub-medium py-small border-secondary80"
        >
          Sign in with Google
        </Button>
      </Modal>
    </>
  );
}
