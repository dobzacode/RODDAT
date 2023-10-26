"use client";

import { signIn } from "next-auth/react";
import Button from "../ui/button/Button";
import Modal from "../ui/div/Modal";

export default function LogInModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Function;
}) {
  return (
    <Modal title="Login" isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Button
        onClick={() => signIn("google")}
        hover={true}
        intent={"pastelPrimary"}
        size={"small"}
        modifier={"brutalism"}
        rounded={"medium"}
      >
        Sign in with Google
      </Button>
    </Modal>
  );
}
