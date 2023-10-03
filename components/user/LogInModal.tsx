"use client";

import React, { useState } from "react";
import Button from "../button/Button";
import { signIn } from "next-auth/react";
import Modal from "../div/Modal";

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
          customCSS="bg-secondary20 text-secondary80 gap-extra-small sub-heading font-medium rounded-small flex justify-center items-center  brutalism-border px-sub-medium py-small border-secondary80"
        >
          Sign in with Google
        </Button>
      </Modal>
    </>
  );
}