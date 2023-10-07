"use client";

import React, { FC, useState } from "react";
import Button from "../ui/button/Button";
import { signIn } from "next-auth/react";
import Modal from "../ui/div/Modal";

const LoginModal: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <Button
        onClick={() => openModal()}
        className="sub-heading brutalism-border flex items-center justify-center gap-extra-small rounded-full border-primary80  bg-white px-sub-medium py-small font-medium"
      >
        Login
      </Button>
      <Modal title="Login" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Button
          onClick={() => signIn("google")}
          hover={true}
          className="sub-heading brutalism-border flex items-center justify-center gap-extra-small rounded-small border-secondary80 bg-secondary20  px-sub-medium py-small font-medium text-secondary80"
        >
          Sign in with Google
        </Button>
      </Modal>
    </>
  );
};

export default LoginModal;
