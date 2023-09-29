"use client";

import React, { useState } from "react";
import Button from "../button/Button";
import { signIn } from "next-auth/react";
import Modal from "../div/Modal";
import H2 from "../text/H2";
import Form from "../form/Form";

export default function NewCommunityModal({}) {
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
        Create a community
      </Button>
      <Modal
        title="New community"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="flex flex-col gap-medium">
          <Form theme="secondary"></Form>
        </div>
      </Modal>
    </>
  );
}
