"use client";

import React, { FC, useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { signIn } from "next-auth/react";
import Modal from "../ui/div/Modal";
import H2 from "../ui/text/H2";

import PopUp from "../ui/div/PopUp";
import CommunityForm from "./CommunityForm";

const NewCommunityModal: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  }, [isSuccess]);
  return (
    <>
      <Button
        size="small"
        intent="primary"
        modifier="brutalism"
        transparent={true}
        hover={true}
        rounded="small"
        onClick={() => setIsOpen(true)}
      >
        Create a community
      </Button>

      <Modal
        title="New community"
        titleCSS="text-secondary80 dark:text-secondary1"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <CommunityForm
          setIsSuccess={() => setIsSuccess(true)}
          setIsOpen={() => setIsOpen(false)}
          theme="primary"
          title="Create Community"
        ></CommunityForm>
      </Modal>
      <PopUp isSuccess={isSuccess}>
        <H2 type="sub-heading" textColor="text-success90">
          Your community was successfully created
        </H2>
      </PopUp>
    </>
  );
};

export default NewCommunityModal;
