"use client";

import React, { FC, useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { signIn, useSession } from "next-auth/react";
import Modal from "../ui/div/Modal";
import H2 from "../ui/text/H2";

import PopUp from "../ui/div/PopUp";
import CommunityForm from "./CommunityForm";
import { Session } from "next-auth";

const NewCommunityModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { data: session } = useSession();

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

      {session ? (
        <Modal
          title="New community"
          titleCSS="text-primary80 dark:text-primary1"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <CommunityForm
            isModal={true}
            setIsSuccess={() => setIsSuccess(true)}
            setIsOpen={() => setIsOpen(false)}
            theme="primary"
            title="Create Community"
          ></CommunityForm>
        </Modal>
      ) : (
        <Modal title="Login" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Button
            onClick={() => signIn("google")}
            hover={true}
            className="sub-heading brutalism-border flex items-center justify-center gap-extra-small rounded-small border-secondary80 bg-secondary20  px-sub-medium py-small font-medium text-secondary80"
          >
            Sign in with Google
          </Button>
        </Modal>
      )}
      <PopUp isSuccess={isSuccess}>
        <H2 type="sub-heading" textColor="text-success90">
          Your community was successfully created
        </H2>
      </PopUp>
    </>
  );
};

export default NewCommunityModal;
