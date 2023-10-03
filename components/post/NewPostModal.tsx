"use client";

import { useEffect, useState } from "react";
import Button from "../button/Button";
import Modal from "../div/Modal";
import PopUp from "../div/PopUp";
import H2 from "../text/H2";
import PostForm from "../form/PostForm";

export default function NewPostModal({}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  }, [isSuccess]);

  return (
    <>
      <Button
        size="small"
        color={"primary"}
        margin=""
        customCSS="brutalism-border border-primary80"
        rounded="rounded-small"
        onClick={() => setIsOpen(true)}
      >
        Create a post
      </Button>
      <Modal
        titleCSS="text-secondary80"
        title="New post"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <PostForm
          setIsSuccess={() => setIsSuccess(true)}
          setIsOpen={() => setIsOpen(false)}
          theme="secondary"
        ></PostForm>
      </Modal>
      <PopUp isSuccess={isSuccess}>
        <H2 type="sub-heading" textColor="text-success90">
          Your post was successfully created
        </H2>
      </PopUp>
    </>
  );
}
