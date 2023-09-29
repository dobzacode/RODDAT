"use client";

import { useState } from "react";
import Button from "./Button";
import Modal from "../user/LogInModal";

export default function LoginButton({}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsOpen(false);
  };
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
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p className="text-gray-800">
          This is the modal content. You can put any content here.
        </p>
        <button
          onClick={() => setIsOpen(false)}
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 mt-4 rounded"
        >
          Close Modal
        </button>
      </Modal>
    </>
  );
}
